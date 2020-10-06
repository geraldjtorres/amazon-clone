import React, { useEffect } from 'react'
import './App.css'
import Header from './Header'
import Home from './Home'
import Checkout from './Checkout'
import Payment from './Payment'
import Login from './Login'
import Orders from './Orders'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe(
  'pk_test_51HUUBdG2XA7yAteDC3UXENe6w1orYBPtNQlAXjPDFNZ9IkHciBVlJxdSNsokH8VyFJ2cTXfIRT6By2C8ms9kPHCM00JCA7C0o6'
)

function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    // Will only fire once when the App component loads..
    auth.onAuthStateChanged(authUser => {
      console.log('The user is >>>', authUser)

      if (authUser) {
        // User logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // User is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/checkout'>
            <Checkout />
          </Route>
          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
