import React from 'react'
import { TweetCanvas, CreateWord, Navbar } from '../index';

class TweetPage extends React.Component {

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

export default TweetPage

