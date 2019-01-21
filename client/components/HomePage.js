import React from 'react'
import {Login, UserHome, Navbar} from '../components'
import {Link} from 'react-router-dom'
import {FoundPoetry} from './'

class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page">
        <Navbar />
        <FoundPoetry />
        {/* <UserHome /> */}

            <p>Make a poem based on trending twitter hashtags</p>
            <br />
            <br />
            <br />
            <Link to="/poem">Make a poem from trending hashtags</Link>
            <br />
            <br />
            <Login />

      </div>
    )
  }
}

export default HomePage
