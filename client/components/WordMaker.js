import React from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Text} from 'react-konva'

const WordMaker = () => {
    return (
        <Text
        text="text"
        x={50}
        y={50}
        draggable
        fontSize={18}
        // fill={this.state.isDragging ? 'orange' : 'black'}
        // onDragStart={() => {
        //   this.setState({
        //     isDragging: true,
        //     text: ''
        //   })
        // }}
        // onDragEnd={() => {
        //   this.setState({
        //     isDragging: false
        //   })
        // }}
      />
    )
}

export default WordMaker;
