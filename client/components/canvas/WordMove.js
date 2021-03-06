import React from 'react'
import styled, {css} from 'styled-components'
import {
  fetchSingleWord,
  clearSingleWord,
  fetchSingleMyWord,
  fetchSingleTweet,
} from '../../store/word'
import {connect} from 'react-redux'

class WordMove extends React.Component {
  state = {
    isDragging: false,

    originalX: this.props.startx,
    originalY: this.props.starty,

    translateX: this.props.startx,
    translateY: this.props.starty,

    lastTranslateX: this.props.startx,
    lastTranslateY: this.props.starty,
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDown = ({clientX, clientY}) => {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)

    if (this.props.onDragStart) {
      this.props.onDragStart()
    }
    if (this.props.id) {
      this.props.fetchSingleWord(this.props.id)
    }
    else if (this.props.myId) {
      this.props.fetchSingleMyWord(this.props.myId)
    }
    else if (this.props.tweetId) {
      this.props.fetchSingleTweet(this.props.tweetId)
    }

    this.setState({
      originalX: clientX,
      originalY: clientY,

      isDragging: true,
    })
  }

  handleMouseMove = ({clientX, clientY}) => {
    const {isDragging} = this.state
    const {onDrag} = this.props

    if (!isDragging) {
      return
    }
    this.setState(
      prevState => ({
        translateX: clientX - prevState.originalX + prevState.lastTranslateX,
        translateY: clientY - prevState.originalY + prevState.lastTranslateY
      }),
      () => {
        if (onDrag) {
          onDrag({
            translateX: this.state.translateX,
            translateY: this.state.translateY
          })
        }
      }
    )
  }

  handleMouseUp = (event, target) => {

    event.preventDefault()

    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)

    if (!target) {
      this.props.clearSingleWord()
    }

    this.setState(
      {
        lastTranslateX: this.state.translateX,
        lastTranslateY: this.state.translateY,
        isDragging: false
      },
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd()
        }
      }
    )
  }
  render() {
    // console.log(this.props)
    const {children, id, startx, starty, myId, tweetId} = this.props
    const {translateX, translateY, isDragging} = this.state

    return (
      <WordContainer
        onMouseDown={this.handleMouseDown}
        y={translateY}
        x={translateX}
        isDragging={isDragging}
        id={id}
        myId={myId}
        tweetId={tweetId}
        startx={startx}
        starty={starty}
      >
        {children}
      </WordContainer>
    )
  }
}

const WordContainer = styled.div.attrs({
  style: ({x, y}) => ({
    transform: `translate(${x}px, ${y}px)`
  })
})`
  color: black;
  cursor: grab;
  font-size: 12pt;
  font-family: Futura medium, monospace;
  padding: 0rem 1rem 0rem 1rem;
  display: inline-block;
  position: absolute;

  ${({isDragging}) =>
    isDragging &&
    css`
      opacity: 0.8;
      cursor: grabbing;
      color: green;
    `};
`

const mapState = state => ({
  single: state.single || {},
  singleMyWord: state.singleMyWord || {}
})

const mapDispatch = dispatch => ({
  fetchSingleWord: id => dispatch(fetchSingleWord(id)),
  clearSingleWord: () => dispatch(clearSingleWord()),
  fetchSingleMyWord: id => dispatch(fetchSingleMyWord(id)),
  fetchSingleTweet: id => dispatch(fetchSingleTweet(id))
})

export default connect(mapState, mapDispatch)(WordMove)
