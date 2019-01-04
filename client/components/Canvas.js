import React from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Text, Rect} from 'react-konva'
import Konva from 'konva'
import {WordMaker} from './WordMaker'
import {fetchWordList, eraseWord, postWord} from '../store/word'
import {connect} from 'react-redux'

export class Canvas extends React.Component {
  constructor() {
    super()

    this.state = {
      id: ""
    }

    this.deleteHandler = this.deleteHandler.bind(this)
    this.setWord = this.setWord.bind(this)
  }

  componentDidMount() {
    this.props.loadwords()
  }

  setWord(evt) {
    console.log('event', evt)
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  deleteHandler() {
    this.props.destroywords(this.state.id)
  }

  render() {
    let counter = 0
    return (
      <Stage width={window.innerWidth * 0.8} height={window.innerHeight * 0.8}>
        <Layer>
        <Rect fill={'pink'} x={50} y={500} width={50} height={50}
        onMouseOver={(evt) => console.log(evt)} />
          {this.props.words.map(eachWord => {
            return (
            <Text
              key={eachWord.id}
              text={`${eachWord.words}`}
              x={50}
              y={counter++ * 30}
              draggable
              fontSize={18}
              onDblClick={() => this.props.destroywords(eachWord.id)}
              onDragMove={this.setWord}
              onDragStart={(evt) => {
                console.log(evt)
                if (evt.evt.screenX >= 40 && evt.evt.screenY <= 100) {
                this.props.destroywords(eachWord.id)
              }
            }}


            />
          )})}

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
  destroywords: id => dispatch(eraseWord(id)),
  postWord: word => dispatch(postWord(word))
})

export default connect(mapState, mapDispatch)(Canvas)
