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

export class Canvas extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      startToggle: false,
      isMoved: false
    }

    this.handleStartToggle = this.handleStartToggle.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.isMoved = this.isMoved.bind(this)
  }

  componentDidMount() {
    this.props.loadTwitter()
    this.props.loadwords()
  }

  componentWillUnmount() {
    console.log('SECOND UNMOUNT')
  }

  handleStartToggle() {
    this.setState({
      startToggle: true
    })
  }

  onDragOver = (event, target) => {
    // console.log(target)
    // console.log('dragging')
    event.preventDefault()
  }

  onDrop(event, target) {
    console.log(target)
    if (this.props.single.id) {
      // event.preventDefault()
      this.props.eraseTwitter(this.props.single.id)
      console.log('after')
    } else {
      // event.preventDefault()
    }
  }

  isMoved(event) {
    console.log('event***', event)
    console.log('state', this.state)
    console.log(event.target)

    this.setState({
      isMoved: true
    })
  }

  render() {
    console.log("PROPSP", this.props.name)

    return (
      <div className="canvas" onClick={this.handleStartToggle}>
      {this.props.name && Object.entries(this.props.name).map(([key, value]) => {
        console.log("should be the word",value.name)
        return (
          <WordMove
          key={key}
          id={key}
          >
            {`${value.name}`}
          </WordMove>
        )
      })}
        {this.props.words &&
          this.props.words.map(eachWord => {
            return (
              <WordMove key={eachWord.id} id={eachWord.id}>
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
