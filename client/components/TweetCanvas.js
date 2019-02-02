import React from 'react'
import {WordMove} from './'
import {
  fetchMyTweets,
  eraseWord,
  postWord,
  fetchWordList,
  eraseMyTweets
} from '../store/word'
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
    if (this.props.singleTweet.id) {
      this.props.eraseMyTweets(this.props.singleTweet.id)
    }
    if (this.props.singleMyWord.id) {
      this.props.eraseWord(this.props.singleMyWord.id)
    }
  }

  render() {
    console.log('props', this.props)
    let counter = 0
    let newCounter = 0
    return (
      <div className="canvas" onClick={this.handleStartToggle}>
        {this.props.tweet &&
          this.props.tweet.map(eachTweet => {
            return (
              <WordMove
                key={eachTweet.id}
                tweetId={eachTweet.id}
                startx={0}
                starty={counter++ * 20}
              >
                {`${eachTweet.tweet}`}
              </WordMove>
            )
          })}
        {this.props.words &&
          this.props.words.map(eachWord => {
            return (
              <WordMove
                key={eachWord.id}
                tweetId={eachWord.id}
                myId={eachWord.id}
                startx={150}
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
  tweet: state.word.tweet,
  single: state.word.single || {},
  singleTweet: state.word.singleTweet || {},
  singleMyWord: state.word.singleMyWord || {}
})

const mapDispatch = dispatch => ({
  loadMyTweets: () => dispatch(fetchMyTweets()),
  loadwords: () => dispatch(fetchWordList()),
  eraseWord: id => dispatch(eraseWord(id)),
  postWord: word => dispatch(postWord(word)),
  eraseMyTweets: id => dispatch(eraseMyTweets(id)),
  fetchSingleTweet: id => dispatch(fetchSingleTweet(id))
})

export default connect(mapState, mapDispatch)(TweetCanvas)
