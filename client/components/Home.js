import React from 'react'
import {Login, UserHome, Navbar} from '../components'
import {Link} from 'react-router-dom'

class Home extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <br />
        {/* <UserHome /> */}
        <br/>
        <Link to="/poem">Make a poem from trending hashtags</Link>
        <br />
        <br />
        <Login />
      </div>
    )
  }
}

export default Home
