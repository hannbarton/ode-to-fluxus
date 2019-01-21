import React from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Text, Circle} from 'react-konva'

class Home extends React.Component {
  constructor() {
    super()

    this.homeclickhandler = this.homeclickhandler.bind(this)
  }

  homeclickhandler() {
    console.log('clicked')
  }

  render() {
    return (
      <div>
        <Stage width={window.innerWidth} height={window.innerHeight * 0.9}>
          <Layer>
            <Circle
              draggable
              x={window.innerWidth / 2}
              y={window.innerHeight / 2.5}
              radius={window.innerHeight / 3}
              stroke="black"
            />
            <Circle
              draggable
              x={window.innerWidth / 2.1}
              y={window.innerHeight / 6.5}
              radius={window.innerHeight / 6.9}
              stroke="black"
            />
            <Circle
              draggable
              x={window.innerWidth / 2.3}
              y={window.innerHeight / 3}
              radius={window.innerHeight / 6}
              stroke="black"
            />
            <Circle
              draggable
              x={window.innerWidth / 1.88}
              y={window.innerHeight / 3}
              radius={window.innerHeight / 10}
              stroke="black"
            />
            <Circle
              draggable
              x={window.innerWidth / 2.5}
              y={window.innerHeight / 1.5}
              radius={window.innerHeight / 8}
              stroke="black"
            />
            <Text
              x={window.innerWidth / 2.1 - 60}
              y={window.innerHeight / 6.5 - 20}
              text="Found Poetry"
              // draggable={true}
              fontSize={18}
              fontFamily="Special Elite"
              onClick={this.homeclickhandler}
            />
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default Home
