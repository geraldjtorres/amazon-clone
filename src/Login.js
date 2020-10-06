import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase'
import './Login.css'

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = e => {
    e.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        console.log('logged in auth', auth)
        alert(`Success! Logged in as ${email}`)
        history.push('/')
      })
      .catch(err => alert(err.message))
  }

  const register = e => {
    e.preventDefault()
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(auth => {
        // It successfully created a new user with email and password
        console.log('auth', auth)
        if (auth) {
          alert(`Success! Account created for ${email}`)
          history.push('/')
        }
      })
      .catch(err => alert(err.message))
  }

  return (
    <div className='login'>
      <Link to='/'>
        <img
          className='login__logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          alt=''
        />
      </Link>

      <div className='login__container'>
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            className='login__signInButton'
            onClick={signIn}
            type='submit'
          >
            Sign In
          </button>
        </form>

        <p>
          By signing in you agree to AMAZON FAKE CLONE's Conditions of Use &
          Sale. Please see our Private Notice, our Cookies Notice and our
          Internet-Based Ads
        </p>

        <button className='login__registerButton' onClick={register}>
          Create your Amazon account
        </button>
      </div>
    </div>
  )
}

export default Login
