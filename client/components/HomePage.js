import React from 'react'
import {Login, UserHome, Navbar} from '../components'
import {Link} from 'react-router-dom'

class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page">
        <Navbar />
        <UserHome />
        <div className="inner-paper">
          <div className="home-links">
            <h2>Found Poetry:</h2>
            <p>Make a poem based on trending twitter hashtags</p>
            <br />
            <br />
            <br />
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

export default HomePage
