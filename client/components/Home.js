import React from 'react'
import {Login, UserHome, Navbar} from '../components'
import {Link} from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="home">
          <br />

          <h1>Found Poetry</h1>
          <p>is a type of poetry created by taking words, phrases,</p>
          <p>and sometimes whole passages from other sources and reframing </p>
          <p>them by making changes in spacing and lines, or by adding or </p>
          <p>deleting text, thus</p>
          <p>imparting new meaning. </p>
          <p>The resulting poem can be defined as either treated: </p>
          <p>changed in a profound and systematic manner; </p>
          <p>or </p>
          <p>untreated:</p>
          <p>virtually unchanged from the order, syntax and meaning of the poem.</p>
          {/* <UserHome /> */}
          <br />
          <br/>
          <Link to="/poem">Make a poem from trending hashtags</Link>
          <br />
          <br />
          <Login />
        </div>
      </div>
    )
  }
}

export default Home
