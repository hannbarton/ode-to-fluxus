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
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text
            text="sample draggable text"
            x={50}
            y={50}
            draggable
            fill={this.state.isDragging ? 'pink' : 'black'}
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
