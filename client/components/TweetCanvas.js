import React from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Text, Rect} from 'react-konva'
import Konva from 'konva'
import {WordMaker} from './WordMaker'
import {fetchWordList, eraseWord, postWord, fetchTwitter} from '../store/word'
import {connect} from 'react-redux'

export class Canvas extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Stage width={window.innerWidth * 0.8} height={window.innerHeight * 0.8}>
        <Layer>
            <Rect fill='orange' x={50} y={500} width={50} height={50} />
            hello world
        </Layer>
      </Stage>
    )
  }
}
