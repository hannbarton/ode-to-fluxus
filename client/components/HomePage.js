import React from 'react'
import {Login, UserHome, Navbar} from '../components'
import {Link} from 'react-router-dom'
import {FoundPoetry} from './'

const found = ['F', 'O', 'U', 'N', 'D']

const poetry = ['P', 'O', 'E', 'T', 'R', 'Y']

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <br />
        <Link to="/poem">Make a poem from trending hashtags</Link>
        <br />
        <br />
        <Login />

        <div className="home-page">
          {/* <UserHome /> */}
          <div className="poetry-inline-block">
            {found.map((each, i) => {
              return <FoundPoetry key={i}>{each}</FoundPoetry>
            })}
            <br />
            {poetry.map((each, i) => {
              return <FoundPoetry key={i}>{each}</FoundPoetry>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
