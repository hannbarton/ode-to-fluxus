import React from 'react'
import {WordMove} from '../index'
import {
  fetchWordList,
  eraseWord,
  fetchTwitter,
  eraseTwitter
} from '../../store/word'
import {connect} from 'react-redux'

export class Canvas extends React.Component {
  constructor() {
    super()

    this.state = {
      startToggle: false
    }

    this.handleStartToggle = this.handleStartToggle.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
  }

  componentDidMount() {
    this.props.loadTwitter()
    this.props.loadwords()
  }

  handleStartToggle() {
    this.setState({
      startToggle: true
    })
  }

  onDragOver = event => {
    event.preventDefault()
  }

  onDrop = event => {
    event.preventDefault()
    if (this.props.single.id) {
      this.props.eraseTwitter(this.props.single.id)
    } else if (this.props.singleMyWord.id) {
      this.props.eraseWord(this.props.singleMyWord.id)
    }
  }

  render() {
    let counter = 0
    let newCounter = 0
    return (
      <div className="canvas" onClick={this.handleStartToggle}>
        {this.props.name &&
          this.props.name.map(eachWord => {
            return (
              <WordMove
                key={eachWord.id}
                id={eachWord.id}
                startx={0}
                starty={counter++ * 20}
              >
                {`${eachWord.name}`}
              </WordMove>
            )
          })}
        {this.props.words &&
          this.props.words.map(eachWord => {
            return (
              <WordMove
                key={eachWord.id}
                myId={eachWord.id}
                startx={270}
                starty={newCounter++ * 20}
              >
                {`${eachWord.words}`}
              </WordMove>
            )
          })}
        <div className="start-toggle">
          {this.state.startToggle ? (
            <div
              className="trash"
              onMouseOver={event => this.onDragOver(event)}
              onMouseUp={event => this.onDrop(event)}
            />
          ) : (
            <div className="drag-words">DRAG WORDS ONTO CANVAS</div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  words: state.word.words,
  name: state.word.name,
  single: state.word.single || {},
  singleMyWord: state.word.singleMyWord || {}
})

const mapDispatch = dispatch => ({
  loadwords: () => dispatch(fetchWordList()),
  eraseWord: id => dispatch(eraseWord(id)),
  loadTwitter: () => dispatch(fetchTwitter()),
  eraseTwitter: id => dispatch(eraseTwitter(id))
})

export default connect(mapState, mapDispatch)(Canvas)
