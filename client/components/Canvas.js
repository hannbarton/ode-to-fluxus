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

    this.state = {
      fontFamily: 'Special Elite'
    }

    this.deleteHandler = this.deleteHandler.bind(this)
    this.cursorHandler = this.cursorHandler.bind(this)
  }

  componentDidMount() {

    this.props.loadTwitter()
    this.props.loadwords()
  }

  cursorHandler() {
    console.log('mouseover')
    this.setState({cursor: 'pointer'})
  }

  deleteHandler() {
    this.props.destroywords(this.state.id)
  }

  render() {
    console.log('props', this.props.name)
    let counter = 0
    return (
      <Stage width={window.innerWidth * 0.8} height={window.innerHeight * 0.8}>
        <Layer ref={node => this.layer = node}>
        <Rect fill='pink' x={50} y={500} width={50} height={50}
        // onMouseOver={(evt) => console.log(evt)}
        onMouseOver={(evt) => console.log(evt.evt.screenX, evt.evt.screenY)}/>
          {this.props.words.map(eachWord => {
            return (
            <Text
              key={eachWord.id}
              text={`${eachWord.words}`}
              x={50}
              y={counter++ * 20}
              draggable
              fontSize={14}
              fontFamily='Roboto, sans-serif'
              onMouseOver={this.cursorHandler}
              onDblClick={() => this.props.destroywords(eachWord.id)}
              onDragMove={(evt) => {
                if (evt.evt.screenX >= 45 && evt.evt.screenX < 80 && evt.evt.screenY >= 600 && evt.evt.screenY < 650) {
                  console.log('hovering event', evt)
                  return (<Rect
                  fill='red' x={45} y={80} width={5} height={5}/>)
                }
              }}
              onMouseUp={(evt) => {
                console.log(evt.evt)
                console.log(evt.target._id)
                if (evt.evt.screenX >= 45 && evt.evt.screenX < 80 && evt.evt.screenY >= 600 && evt.evt.screenY < 650) {
                this.props.destroywords(eachWord.id)
              }
            }}
            />
          )
          })}
          {this.props.name && Array.from(new Set(this.props.name)).
          map(eachHash => {

            return(
                <Text
                key={eachHash.url}
                text={`${eachHash.name}`}
                x={50}
                y={counter++ * 10}
                draggable
                fontFamily='Special Elite'
                fontSize={11}
                />
              )
            }
          )}
        </Layer>
      </Stage>
    )
  }
}

const mapState = state => ({
  words: state.word.words,
  name: state.word.name
})

const mapDispatch = dispatch => ({
  loadwords: () => dispatch(fetchWordList()),
  destroywords: id => dispatch(eraseWord(id)),
  postWord: word => dispatch(postWord(word)),
  loadTwitter: () => dispatch(fetchTwitter())
})

export default connect(mapState, mapDispatch)(Canvas)
