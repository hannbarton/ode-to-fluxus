import React from 'react'
import {WordMove} from './'
import {
  fetchWordList,
  eraseWord,
  postWord,
  fetchTwitter,
  eraseTwitter
} from '../store/word'
import {connect} from 'react-redux'

export class Canvas extends React.Component {
  constructor() {
    super()

    this.state = {
      startToggle: false,
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

  onDragOver = (event) => {
    event.preventDefault()
  }

  onDrop(event) {
    event.preventDefault()
    if (this.props.single.id) {
      this.props.eraseTwitter(this.props.single.id)
    }
  }

  render() {
    let counter = 0;
    let newCounter = 0;
    console.log(counter)
    console.log('props', this.props)
    return (
      <div className="canvas" onClick={this.handleStartToggle}>
        {
          Object.entries(this.props.name).map(([key, value]) => {
            return (
              <WordMove
              key={key} id={key}
              startx={0}
              starty={counter++ * 20}
              >
                {`${value.name}`}
              </WordMove>
            )
          })}
        {this.props.words &&
          this.props.words.map(eachWord => {
            return (
              <WordMove key={eachWord.id} id={eachWord.id}
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

const mapState = state => {
  return {
    words: state.word.words,
    name: state.word.name,
    single: state.word.single || {}
  }
}

const mapDispatch = dispatch => ({
  loadwords: () => dispatch(fetchWordList()),
  destroywords: id => dispatch(eraseWord(id)),
  postWord: word => dispatch(postWord(word)),
  loadTwitter: () => dispatch(fetchTwitter()),
  eraseTwitter: id => dispatch(eraseTwitter(id))
})

export default connect(mapState, mapDispatch)(Canvas)
