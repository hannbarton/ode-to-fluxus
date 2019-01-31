import React from 'react'
import {WordMove} from './'
import {fetchMyTweets} from '../store/word'
import {connect} from 'react-redux'

class TweetCanvas extends React.Component {
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
    this.props.loadMyTweets()
  }

  handleStartToggle() {
    this.setState({
      startToggle: true
    })
  }

  onDragOver = (event) => {
    event.preventDefault()
  }

  onDrop = (event) => {
    event.preventDefault()
    if (this.props.single.id) {
      this.props.eraseTwitter(this.props.single.id)
    }
    else if (this.props.singleMyWord.id) {
      this.props.eraseWord(this.props.singleMyWord.id)
    }
  }

  render() {
    let counter = 0
    return (
      <div className="canvas" onClick={this.handleStartToggle}>
        {this.props.tweet &&
          this.props.tweet.map(eachTweet => {
            return (
              <WordMove
                key={eachTweet.id}
                id={eachTweet.id}
                startx={0}
                starty={counter++ * 20}
              >
                {`${eachTweet.tweet}`}
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
  tweet: state.word.tweet
})

const mapDispatch = dispatch => ({
  loadMyTweets: () => dispatch(fetchMyTweets())
})

export default connect(mapState, mapDispatch)(TweetCanvas)
