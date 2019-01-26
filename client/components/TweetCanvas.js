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
  }

  componentDidMount() {
    this.props.loadMyTweets()
  }

  handleStartToggle() {
    this.setState({
      startToggle: true
    })
  }

  render() {
    return (
      <div className="canvas" onClick={this.handleStartToggle}>
        {this.props.tweet &&
          this.props.tweet.map(eachTweet => {
            return (
              <WordMove key={eachTweet.id} id={eachTweet.id}>
                {`${eachTweet.tweet}`}
              </WordMove>
            )
          })}
        <div className="start-toggle">
          {this.state.startToggle ? (
            <div />
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
