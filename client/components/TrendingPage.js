import React from 'react'
import Canvas from './Canvas'
import Navbar from './navbar'
import CreateWord from './CreateWord'

class TrendingPage extends React.Component {

  render() {

    return (
      <div>
        <Navbar />
        <CreateWord />
        <Canvas />
      </div>
    )
  }
}

export default TrendingPage

