import React from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Text} from 'react-konva'
import Konva from 'konva'
import {WordMaker} from './WordMaker'
import {fetchWordList, eraseWord, postWord} from '../store/word'
// import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'

export class Canvas extends React.Component {
  componentDidMount() {
    this.props.loadwords()
  }

  handleDragStart(evt) {
    console.log('event dot target', evt.target)
  }

  render() {
    let counter = 0
    console.log('props', this.props)
    return (
      <Stage width={window.innerWidth * 0.8} height={window.innerHeight * 0.8}>
        <Layer>
          {this.props.words.map(eachWord => (
            <Text
              key={eachWord.id}
              text={`${eachWord.words}`}
              x={50}
              y={counter++ * 30}
              draggable
              fontSize={18}
              //  fill={this.state.isDragging ? 'orange' : 'black'}
              //  onDragStart={this.handleDragStart}
              //  onDragEnd={() => {
              //    this.setState({
              //      isDragging: false
              //    })
              //  }}

            />
          ))}

          {/* <Text
            text="word"
            x={50}
            y={250}
            draggable
            fontSize={18} }
            fill={this.state.isDragging ? 'orange' : 'black'}
          />
          {/* <Text
            x={window.innerWidth / 3}
            y={window.innerHeight / 3}
          /> */}
        </Layer>
      </Stage>
    )
  }
}

const mapState = state => ({
  words: state.word.words
})

const mapDispatch = dispatch => ({
  loadwords: () => dispatch(fetchWordList()),
  destorywords: id => dispatch(eraseWord(id)),
  postWord: (word) => dispatch(postWord(word))
})

export default connect(mapState, mapDispatch)(Canvas)

// export default Canvas;
