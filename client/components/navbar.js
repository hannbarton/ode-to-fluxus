import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav>
    {isLoggedIn ? (
      <div className="nav-bar-login">
        <a href="/home">
          <img src="./images/back.png" id="plus-btn" />
        </a>
        <button type="button" id="twitter-logout" onClick={handleClick}>
          Logout
        </button>
        <a href="#" />
      </div>
    ) : (
      <div className="nav-bar-unlogin">
        <a href="/home">
          <img src="./images/back.png" id="plus-btn" />
        </a>
      </div>
    )}
  </nav>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
