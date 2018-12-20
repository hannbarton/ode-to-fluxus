import React from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Rect, Text} from 'react-konva'

class Canvas extends React.Component {
  constructor() {
    super()

    this.state = {
      isDragging: false
    }
  }

  render() {
    return (
      <Stage width={window.innerWidth * .8} height={window.innerHeight * .8}>
        <Layer>
          <Text
            text="sample draggable text"
            x={50}
            y={50}
            draggable
            fontSize={18}
            fill={this.state.isDragging ? 'orange' : 'black'}
            onDragStart={() => {
              this.setState({
                isDragging: true
              })
            }}
            onDragEnd={() => {
              this.setState({
                isDragging: false
              })
            }}
          />
        </Layer>
      </Stage>
    )
  }
}

export default Canvas
