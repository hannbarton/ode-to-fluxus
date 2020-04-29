import React from 'react'
import styled, {css} from 'styled-components'

class FoundPoetry extends React.Component {
  state = {
    isDragging: false,

    originalX: 0,
    originalY: 0,

    translateX: 0,
    translateY: 0,

    lastTranslateX: 0,
    lastTranslateY: 0,

    rotate: 0
  }


  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseOver() {
    let random = Math.floor((Math.random() * 4) + 1) * 90

    this.setState({
        rotate: random
    })

  }

  handleMouseDown = ({clientX, clientY}) => {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)

    if (this.props.onDragStart) {
      this.props.onDragStart()
    }

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
    console.log(evt, this)
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
    const {translateX, translateY, isDragging, rotate} = this.state

    return (
        <Container
          onMouseDown={this.handleMouseDown}
          x={translateX}
          y={translateY}
          deg={rotate}
          onMouseOver={this.handleMouseOver.bind(this)}
          isDragging={isDragging}
        >{children}</Container>
    )
  }
}

const Container = styled.div.attrs({
  style: ({x, y, deg}) => ({
    transform: `translate(${x}px, ${y}px) rotate(${deg}deg)`,
    animation: `${deg} 1s`
  }),
})`
@font-face {
  font-family: Montserrat-Bold;
  src: url(../../../public/montserrat/Montserrat-Bold.ttf);
}
  color: white;
  cursor: move;
  font-family: Montserrat-Bold;
  font-size: 9vw;
  display: inline-block;
  padding: 0rem .3rem 0rem .3rem;
  &:hover {
    color: #2d9c55;

  ${({rotate}) =>
  rotate &&
  css`
  animation: ${rotate} 2s
  `
  };
}

  ${({isDragging}) =>
    isDragging &&
    css`
      opacity: 0.8;
      cursor: grabbing;
    `};
`

export default FoundPoetry
