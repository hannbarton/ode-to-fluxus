import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav>
    {isLoggedIn ? (
      <div className="nav-bar-login">
        {/* <Link to="/home">Home</Link> {" "} */}
        <a href="/home">
        <img src="./images/back.png" id="plus-btn" /></a>
        <button type='button' id='twitter-logout' onClick={handleClick}>Logout</button>
          <a href="#"></a>
      </div>
    ) : (
      <div className="nav-bar-unlogin">
        {/* <Link to="/home">Home</Link>{" "} */}
        {/* <Link to="/login">Login</Link> */}
        <a href="/home">
        <img src="./images/back.png" id="plus-btn" /></a>
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
