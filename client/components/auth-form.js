import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {auth} from '../store'


const AuthForm = props => {
  const {name, displayName, handleSubmit, error, isLoggedIn} = props

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <a href="/tweet">Make a poem from your own tweets</a>
        </div>
      ) : (
        <div>
          <a href="/auth/twitter">
            {displayName} with Twitter to make a poem from your own tweets
          </a>
        </div>
      )}
    </div>
  )
}

//  Login and Signup share the same Component; keep code dry
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    isLoggedIn: !!state.user.id
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired
}
