import React from 'react'
import {render} from 'react-dom'
import { TweetCanvas, CreateMyTweet, Navbar } from './';

class TweetPage extends React.Component {

  render() {

    return (
      <div>
        <Navbar />
        <CreateMyTweet />
        <TweetCanvas />
      </div>
    )
  }
}

export default TweetPage

