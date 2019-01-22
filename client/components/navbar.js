import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav>
    {isLoggedIn ? (
      <div className="nav-bar-login">
        <Link to="/">Home</Link>
        <a href="#" onClick={handleClick}>
          Logout
        </a>
        <img src="./images/plus.png" id="plus-btn" />
      </div>
    ) : (
      <div className="nav-bar-unlogin">
        <Link to="/">Home</Link>{" "}
        <Link to="/login">Login</Link>
        <img src="./images/plus.png" id="plus-btn" />
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
