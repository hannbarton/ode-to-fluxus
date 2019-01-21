import React from 'react'
import {Login, UserHome, Navbar} from '../components'
import {Link} from 'react-router-dom'
import {FoundPoetry} from './'

class HomePage extends React.Component {
  render() {
    return (
      // <div className="home-page">
       <div>
        <Navbar />
        {/* <UserHome /> */}
        {/* <div className="inner-paper">
          <div className="home-links">
            <h2>Found Poetry</h2>
            <p>is a type of poetry created by taking words, phrases, and sometimes whole passages from other sources and reframing them by making changes in spacing and lines, or by adding or deleting text, thus imparting new meaning. The resulting poem can be defined as either treated: changed in a profound and systematic manner; or untreated: virtually unchanged from the order, syntax and meaning of the poem.</p>
            <p>Make a poem based on trending twitter hashtags</p>
            <br />
            <br />
            <br />
            <Link to="/poem">Make a poem from trending hashtags</Link>
            <br />
            <br />
            <Login />
          </div> */}

        <FoundPoetry />
      </div>
    )
  }
}

export default HomePage
