import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Checkout from './Checkout'
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import { useStateValue } from './StateProvider'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { basketTotal } from './reducer'
import axios from './axios'
import { db } from './firebase'

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue()

  const stripe = useStripe()
  const elements = useElements()
  const history = useHistory()

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState('')
  const [clientSecret, setClientSecret] = useState(true)

  useEffect(() => {
    // Generate stripe secret when basket changes. Stripe secret allows us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // Stripe expects the total in a currencies subunit
        url: `/payments/create?total=${basketTotal(basket) * 100}`
      })
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret()
  }, [basket])

  console.log('THE SECRET IS >>>', clientSecret)

  const handleSubmit = async event => {
    // Do all the fancy stripe shizzle
    event.preventDefault()
    setProcessing(true)

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      })
      .then(({ paymentIntent }) => {
        // paymentInten = payment confirmation

        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id) // created a document
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
          })

        setSucceeded(true)
        setError(null)
        setProcessing(false)

        dispatch({
          type: 'EMPTY_BASKET'
        })

        history.replace('/orders')
      })
  }

  const handleChange = e => {
    // Listen for changes in the cardElement
    // And display any errors as the customer types their card details
    setDisabled(e.empty)
    setError(e.error ? e.error.messages : '')
  }

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>32 Oxford Street</p>
            <p>London, UK</p>
            <p>W6 12P</p>
          </div>
        </div>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {/* Products */}
            {basket.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            {/* Stripe magic */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={value => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={basketTotal(basket)}
                  displayType={'text'}
                  thousandSeperator={true}
                  prefix={'$'}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>
              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
