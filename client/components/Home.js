import React from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Text, Circle} from 'react-konva'

class Home extends React.Component {

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
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default Home
