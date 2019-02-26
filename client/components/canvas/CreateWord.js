import React from 'react'
import {postWord, loadWordList} from '../../store/word'
import {connect} from 'react-redux'

class CreateWord extends React.Component {
  constructor() {
    super()

    this.state = {
      words: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.words === '') {
      console.log('please fill out word before submitting')
      alert('please fill out word')
    } else {
      this.props.postWord(this.state)
    }
  }

  render() {
    return (
      <div className='create-word'>
        <form id="submit-word" onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            placeholder="ADD A WORD"
            name="words"
            type="text"
            onChange={this.handleChange}
            value={this.props.words}
          />

          <button type="submit" className='create-button'>CREATE</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  postWord: word => dispatch(postWord(word)),
  loadWordList: () => dispatch(loadWordList())
})

export default connect(null, mapDispatch)(CreateWord)
