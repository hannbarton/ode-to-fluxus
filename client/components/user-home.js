import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Home} from './'

export const UserHome = props => {
  const {displayName} = props

  return (
    <div>
      <p>Welcome, {displayName}</p>
      <Home/>
    </div>
  )
}

const mapState = state => {
  return {
    displayName: state.user.displayName
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  displayName: PropTypes.string
}
