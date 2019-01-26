import React from 'react'
import styled, {css} from 'styled-components'
import {
  fetchWordList,
  eraseWord,
  eraseTwitter,
  fetchTwitter,
  fetchSingleWord,
  clearSingleWord
} from '../store/word'
import {connect} from 'react-redux'

class WordMove extends React.Component {
  state = {
    isDragging: false,

    originalX: 0,
    originalY: 0,

    translateX: 0,
    translateY: 0,

    lastTranslateX: 0,
    lastTranslateY: 0
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

    this.props.fetchSingleWord(this.props.id)

    this.setState({
      originalX: clientX,
      originalY: clientY,

      isDragging: true
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
    console.log('promos.', this.props)

    event.preventDefault()

    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)

    if (!target) {
      this.props.clearSingleWord()
    }

    this.setState(
      {
        originalX: 0,
        originalY: 0,
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
    const {children, id, x, y} = this.props
    const {translateX, translateY, isDragging} = this.state
    return (
      <WordContainer
        onMouseDown={this.handleMouseDown}
        x={translateX}
        y={translateY}
        isDragging={isDragging}
        id={id}
      >
        {children}
      </WordContainer>
    )
  }
}

const WordContainer = styled.div.attrs({
  style: ({x, y}) => ({
    transform: `translate(${x}px, ${y}px)`,
  })
})`
  color: black;
  cursor: grab;
  font-size: 12pt;
  font-family: Futura medium, monospace;
  padding: 0rem 1rem 0rem 1rem;
  display: inline-block;


  ${({isDragging}) =>
    isDragging &&
    css`
      opacity: 0.8;
      cursor: grabbing;
      color: green
    `};
`

const mapState = state => ({
  words: state.word.words,
  name: state.word.name,
  single: state.single
})

const mapDispatch = dispatch => ({
  loadwords: () => dispatch(fetchWordList()),
  loadTwitter: () => dispatch(fetchTwitter()),
  destroywords: id => dispatch(eraseWord(id)),
  eraseTwitter: id => dispatch(eraseTwitter(id)),
  fetchSingleWord: id => dispatch(fetchSingleWord(id)),
  clearSingleWord: () => dispatch(clearSingleWord())
})

export default connect(mapState, mapDispatch)(WordMove)
