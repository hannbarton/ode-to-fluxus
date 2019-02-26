import React from 'react'
import {CreateWord, Navbar, Canvas} from '../'

class TrendingPage extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <CreateWord />
        <br/>
        <Canvas />
      </div>
    )
  }
}

export default TrendingPage

