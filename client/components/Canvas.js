import React from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Text} from 'react-konva'
import Konva from 'konva'
import {WordMaker} from './WordMaker'

class Canvas extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDragging: false,
      text: 'drag a word here to start building your poem',
      newWord: '',
      listOfWords: '',
      dragging: 'false'
    }
  }

  toggleCreate() {
      this.setState({
          dragging: !this.state.dragging
      })
  }


  render() {
    const factory = (
      <Text
        text="text"
        x={50}
        y={50}
        draggable
        fontSize={18}
        fill={this.state.isDragging ? 'orange' : 'black'}
        onDragStart={() => {
          this.setState({
            isDragging: false,
            text: ''
          })
        }}
        onDragEnd={() => {
          this.setState({
            isDragging: false
          })
        }}
      />
    )

    const circle = new Konva.Circle({
        radius: 10,
        fill: 'red',
        id : 'face',
        name : 'red circle'
});
// layer.add(circle);


    return (
      <Stage width={window.innerWidth * 0.8} height={window.innerHeight * 0.8}>
        <Layer >
          <Text
          onClick={() => Layer.add(circle).draw()}
            text="sample draggable text"
            x={50}
            y={50}
            draggable
            fontSize={18}
            fill={this.state.isDragging ? 'orange' : 'black'}
            onDragStart={() => {
              this.setState({
                isDragging: true,
                text: ''
              })
            }}
            onDragEnd={() => {
              this.setState({
                isDragging: false
              })
            }}
          />

          <Text
            text={this.state.text}
            x={window.innerWidth / 3}
            y={window.innerHeight / 3}
          />
        </Layer>
      </Stage>
    )
  }
}

export default Canvas
