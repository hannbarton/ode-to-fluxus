import React from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Text} from 'react-konva'
import Konva from 'konva'
import {WordMaker} from './WordMaker'
import {fetchWordList, eraseWord} from '../store/word'
// import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'

export class Canvas extends React.Component {
  componentDidMount() {
    this.props.loadwords()
  }

  // toggleCreate() {
  //     this.setState({
  //         dragging: !this.state.dragging
  //     })
  // }

  render() {
    let counter= 0;
    console.log('props', this.props.words)
    return (
      <Stage width={window.innerWidth * 0.8} height={window.innerHeight * 0.8}>
        <Layer>
          {this.props.words.map(eachWord => (
                     <Text
                     key={eachWord}
                     text={`${eachWord}`}
                     x={50}
                     y={counter++ * 20}
                     draggable
                     fontSize={18}
                    //  fill={this.state.isDragging ? 'orange' : 'black'}
                    //  onDragStart={() => {
                    //    this.setState({
                    //      isDragging: true,
                    //      text: ''
                    //    })
                    //  }}
                    //  onDragEnd={() => {
                    //    this.setState({
                    //      isDragging: false
                    //    })
                    //  }}
                   />
          ))}

          <Text
            text='word'
            x={50}
            y={20}
            draggable
            fontSize={18}
            // fill={this.state.isDragging ? 'orange' : 'black'}
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
  loadwords: () => dispatch(fetchWordList),
  destorywords: id => dispatch(eraseWord(id))
})

export default connect(mapState, mapDispatch)(Canvas)

// export default Canvas;
