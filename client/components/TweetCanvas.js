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
        {this.props.tweet &&
          this.props.tweet.map(eachTweet => {
            return (
              <WordMove key={eachTweet.id} x={50 * width} y={layout()}>
                {`${eachTweet.tweet}`}
              </WordMove>
            )
          })}
        <div className="start-toggle">
          {this.state.startToggle ? (
            <div/>
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
