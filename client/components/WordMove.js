import React from 'react'
import styled, {css} from 'styled-components'
import {
  fetchSingleWord,
  clearSingleWord
} from '../store/word'
import {connect} from 'react-redux'

class WordMove extends React.PureComponent {
  state = {
    isDragging: false,

    originalX: 0,
    originalY: 0,

    translateX: 0,
    translateY: 0,

    lastTranslateX: 0,
    lastTranslateY: 0,
  }

  componentWillUnmount() {
    console.log('component will unlasmdoj')

    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  componentDidMount() {
    console.log('DID UODATE', this.state)
    this.setState(
      {
        isDragging: false
      }
    )
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
    // console.log(this.state)

    // console.log('dragging not', clientX, clientY)
    // if (!isDragging) {
    //   return
    // }
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
    // console.log('propssss', this.props)

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
          console.log('ON DRAG END')
          this.props.onDragEnd()
        }
      }
    )
  }
  render() {
    const {children, id} = this.props
    const {translateX, translateY, isDragging} = this.state
    // console.log(translateX)

    // console.log('LAST', this.props)

    return (
      <WordContainer
        onMouseDown={this.handleMouseDown}
        y={translateY}
        x={translateX}
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
    transform: `translate(${x}px, ${y}px)`
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
      color: green;
    `};
`

const mapState = state => ({
  // words: state.word.words,
  // name: state.word.name,
  single: state.single || {}
})

const mapDispatch = dispatch => ({
  fetchSingleWord: id => dispatch(fetchSingleWord(id)),
  clearSingleWord: () => dispatch(clearSingleWord())
})

export default connect(mapState, mapDispatch)(WordMove)
