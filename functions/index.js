const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(
  'sk_test_51HUUBdG2XA7yAteDPQo9zT1XY7B8zxMeXdaCevYrNdVjoJHSL940oIakKkV3NqjVbjLRkIOG2MwCjpPfSSiNhwxR00PLLXgtBC'
)

// Set up API

// - App Config

const app = express()

// - Middlewares
app.use(cors({ origin: true }))
app.use(express.json())

// - API routes
app.get('/', (req, res) => res.status(200).send('Hello world!'))

app.post('/payments/create', async (request, response) => {
  const total = request.query.total

  console.log('payment request recieved for this amount >>', total)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd'
  })

  // ok - created payment intent
  response.status(201).send({
    clientSecret: paymentIntent.client_secret
  })
})

// - Listen command
exports.api = functions.https.onRequest(app)

// Eg endpoint
// http://localhost:5001/amz-clone-69649/us-central1/api
