import React from 'react'
import {CreateWord, Navbar, TweetCanvas} from './'

class TrendingPage extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <CreateWord />
        <TweetCanvas />
      </div>
    )
  }
}

export default TrendingPage

