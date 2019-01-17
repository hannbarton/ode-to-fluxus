import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const UserHome = props => {
  const {displayName} = props

  return (
    <div>
      <h3>Welcome, {displayName}</h3>
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
