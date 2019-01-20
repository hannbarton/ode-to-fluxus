import React from 'react'
import Canvas from './Canvas'
import Navbar from './navbar'
import CreateMyTweet from './CreateMyTweet'

class TweetPage extends React.Component {

  render() {

    return (
      <div>
        <Navbar />
        <CreateMyTweet />
        <Canvas />
      </div>
    )
  }
}

export default TweetPage

