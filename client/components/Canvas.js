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

  // componentWillUnmount() {
  //   this.props.loadTwitter()
  //   this.props.loadwords()
  // }

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
    event.preventDefault()
      this.props.eraseTwitter(this.props.single.id)
  }

  render() {
    console.log(this)
    return (
      <div className="canvas" onClick={this.handleStartToggle}>
        {this.props.name &&
          this.props.name.map(eachHash => {
            return (
              <WordMove
                key={eachHash.id}
                id={eachHash.id}
                x={0}
                y={0}
              >
                {`${eachHash.name}`}
              </WordMove>
            )
          })}
        {this.props.words.map(eachWord => {
          return (
            <WordMove
              key={eachWord.id}
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
              onMouseUp={(event) => this.onDrop(event)}
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
