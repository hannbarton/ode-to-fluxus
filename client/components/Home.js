import React from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Text, Circle} from 'react-konva'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Stage width={window.innerWidth} height={window.innerHeight*.9}>
          <Layer>
            <Circle x={window.innerWidth/2} y={window.innerHeight/2.5} radius={window.innerHeight/3} stroke="black" />
            <Circle x={window.innerWidth/2.1} y={window.innerHeight/6.5} radius={window.innerHeight/7} stroke="black"/>
            <Circle x={window.innerWidth/4} y={window.innerHeight/3} radius={window.innerHeight/10} stroke="black"/>
            <Link><Text
            x={window.innerWidth/2.1 - 60}
            y={window.innerHeight/6.5 - 20}
            text="Found Poetry"
            draggable={true}
            fontSize={18}
            fontFamily="Special Elite"
            /></Link>
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default Home
