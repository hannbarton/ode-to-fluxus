import React from 'react'
import {WordMove} from './'
import {
  fetchWordList,
  eraseWord,
  postWord,
  fetchTwitter,
  eraseTwitter
} from '../store/word'
import {connect} from 'react-redux'

export class Canvas extends React.Component {
  constructor() {
    super()

    this.state = {
      startToggle: false
    }

    this.handleStartToggle = this.handleStartToggle.bind(this)
  }

  componentDidMount() {
    this.props.loadTwitter()
    this.props.loadwords()
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
      <img src='./images/trash.jpg' id='trash' onMouseOver={(evt) => console.log(evt)}/>
        {this.props.name &&
          this.props.name.map(eachHash => {
            return (
              <WordMove
                key={eachHash.id}
                x={50 * width}
                y={layout()}
                onDblClick={() => this.props.eraseTwitter(eachHash.id)}
              >
                {`${eachHash.name}`}
              </WordMove>
            )
          })}
        {this.props.words.map(eachWord => {
          return (
            <WordMove
              key={eachWord.id}
              x={50 * width}
              y={layout()}
              onDblClick={() => this.props.destroywords(eachWord.id)}
            >
              {`${eachWord.words}`}
            </WordMove>
          )
        })}
        <div className="start-toggle">
          {this.state.startToggle ? (
            <div>{''}</div>
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
  name: state.word.name
})

const mapDispatch = dispatch => ({
  loadwords: () => dispatch(fetchWordList()),
  destroywords: id => dispatch(eraseWord(id)),
  postWord: word => dispatch(postWord(word)),
  loadTwitter: () => dispatch(fetchTwitter()),
  eraseTwitter: id => dispatch(eraseTwitter(id))
})

export default connect(mapState, mapDispatch)(Canvas)
