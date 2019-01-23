import React from 'react'
import {Login, UserHome, Navbar} from '../components'
import {Link} from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <div className='home-outer'>
      <Navbar />
      <br/>
        <div className="home">
          <h1>Found Poetry
          is a type of poetry created by taking words, phrases, and sometimes whole passages from other sources and imparting new meaning.</h1>
          <div className="home-container">
          <br/>
          <Link to="/poem">Make a poem from trending hashtags</Link>
          <br />
          <br />
          <Login />
        </div>
        </div>
      </div>
    )
  }
}

export default Home
