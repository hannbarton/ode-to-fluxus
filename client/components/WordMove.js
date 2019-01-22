import React from 'react'
import styled, {css} from 'styled-components'

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

    console.log(clientX, clientY)

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

  handleMouseUp = evt => {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)

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
    const {children} = this.props
    const {translateX, translateY, isDragging} = this.state

    return (
      <WordContainer
        onMouseDown={this.handleMouseDown}
        x={translateX}
        y={translateY}
        isDragging={isDragging}
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
  font-family: helvetica;
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

export default WordMove
