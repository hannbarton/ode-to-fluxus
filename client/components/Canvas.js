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
    console.log(event.target)
    console.log('dragging')
    event.preventDefault()
  }

  onDrop(event) {
      this.props.eraseTwitter(this.props.single.id)
  }

  render() {
    let height = 1
    let width = 1

    const layout = () => {
      if (height > window.height * 0.85) {
        width += 4
        height = 0
      } else {
        height += 20
      }
      return height
    }

    return (
      <div className="canvas" onClick={this.handleStartToggle}>
        {this.props.name &&
          this.props.name.map(eachHash => {
            return (
              <WordMove
                key={eachHash.id}
                x={50 * width}
                y={layout()}
                id={eachHash.id}
              >
                {`${eachHash.name}`}
              </WordMove>
            )
          })}
        {this.props.words.map(eachWord => {
          return (
            <WordMove
              key={eachWord.id}
              x={50 * width}
              y={layout()}
              id={eachWord.id}
            >
              {`${eachWord.words}`}
            </WordMove>
          )
        })}
        <div className="start-toggle">
          {this.state.startToggle ? (
            <div
              className="trash"
              onDragOver={event => this.onDragOver(event)}
              onMouseUp={(event, target) => this.onDrop(event, target)}
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
  single: state.word.single
})

const mapDispatch = dispatch => ({
  loadwords: () => dispatch(fetchWordList()),
  destroywords: id => dispatch(eraseWord(id)),
  postWord: word => dispatch(postWord(word)),
  loadTwitter: () => dispatch(fetchTwitter()),
  eraseTwitter: id => dispatch(eraseTwitter(id))
})

export default connect(mapState, mapDispatch)(Canvas)
