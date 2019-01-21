import React from 'react'
import {render} from 'react-dom'
import {Stage, Layer, Text, Rect} from 'react-konva'
import {fetchWordList, eraseWord, postWord, fetchTwitter, eraseTwitter} from '../store/word'
import {connect} from 'react-redux'

export class Canvas extends React.Component {

  componentDidMount() {
    this.props.loadTwitter()
    this.props.loadwords()
  }

  render() {
    console.log('props', this.props)

    let height = 1
    let width = 1;

    const layout = () => {
      if (height > window.innerHeight * .85) {
        width += 4
        height = 0
      }
      else {
        height += 20
      }
      return height
    }

    return (
      <Stage width={window.innerWidth * 1} height={window.innerHeight * .8}>
        <Layer>
        {/* <Rect fill='pink' x={50} y={500} width={50} height={50}
        // onMouseOver={(evt) => console.log(evt)}
        onMouseOver={(evt) => console.log(evt.evt.screenX, evt.evt.screenY)}/> */}
          {/* {this.props.words.map(eachWord => {
            return (
            <Text
              key={eachWord.id}
              text={`${eachWord.words}`}
              x={50}
              y={counter++ * 20}
              draggable
              fontSize={14}
              fontFamily='Roboto, sans-serif'
              onMouseOver={this.cursorHandler}
              onDblClick={() => this.props.destroywords(eachWord.id)}
              onDragMove={(evt) => {
                if (evt.evt.screenX >= 45 && evt.evt.screenX < 80 && evt.evt.screenY >= 600 && evt.evt.screenY < 650) {
                  console.log('hovering event', evt)
                  return (<Rect
                  fill='red' x={45} y={80} width={5} height={5}/>)
                }
              }}
              onMouseUp={(evt) => {
                console.log(evt.evt)
                console.log(evt.target._id)
                if (evt.evt.screenX >= 45 && evt.evt.screenX < 80 && evt.evt.screenY >= 600 && evt.evt.screenY < 650) {
                this.props.destroywords(eachWord.id)
              }
            }}
            />
          )
          })} */}
          {this.props.name && this.props.name.
          map(eachHash => {

            return(
                <Text

                key={eachHash.id}
                text={`${eachHash.name}`}
                x={50 * width}
                y={layout()}
                draggable
                fontFamily='monospace'
                fontSize={14}
                onDblClick={() => this.props.eraseTwitter(eachHash.id)}
                />
              )
            }
          )}
          {this.props.words.map(eachWord => {
            return(
              <Text
              key={eachWord.id}
              text={`${eachWord.words}`}
              x={50 * width}
              y={layout()}
              draggable
              fontSize={14}
              fontFamily='monospace'
              onDblClick={() => this.props.destroywords(eachWord.id)}
              />
            )
          })}
        </Layer>
      </Stage>
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
