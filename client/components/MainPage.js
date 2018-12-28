import React from 'react'
import Canvas from './Canvas'
import { postWord, loadWordList } from '../store/word'
import {connect} from 'react-redux'

class MainPage extends React.Component {
  constructor() {
    super()

    this.state = {
      words: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
      console.log(event.target.value)
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.words === "") {
      console.log('please fill out word before submitting')
      alert('please fill out word')
    }
    else {
      this.props.postWord(this.state)
    }
  }

  render() {

    return (
      <div>
        <form id="submit-word" onSubmit={this.handleSubmit}>
          <label htmlFor="">Create your own word:</label>
          <input
            className="form-control"
            placeholder="Enter your word"
            name="words"
            type="text"
            onChange={this.handleChange}
            value={this.props.words}
          />

          <button type="submit" >Create</button>
        </form>
        <Canvas />
      </div>
    )
  }
}

// export default MainPage
const mapDispatch = dispatch => ({
  postWord: (word) => dispatch(postWord(word)),
  loadWordList: () => dispatch(loadWordList())
})

export default connect(null, mapDispatch)(MainPage)

