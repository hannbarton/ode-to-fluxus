import React from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Text, Rect} from 'react-konva'
import Konva from 'konva'
import {fetchMyTweets} from '../store/word'
import {connect} from 'react-redux'

class TweetCanvas extends React.Component {
  componentDidMount() {
    this.props.loadMyTweets()
  }

  render() {
    let counter = 0;

    return (
      <Stage width={window.innerWidth * 0.8} height={window.innerHeight * 0.8}>
        <Layer>
            <Rect fill='orange' x={50} y={500} width={50} height={50} />

            {this.props.tweet && this.props.tweet.map(eachTweet => {
              return(
                <Text
                key={eachTweet.tweet}
                text={eachTweet.tweet}
                x={50}
                y={counter++ * 20}
                draggable
                fontSize={12}
                />
              )
            })}
        </Layer>
      </Stage>
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
