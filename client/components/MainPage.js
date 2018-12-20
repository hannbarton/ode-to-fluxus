import React from 'react'
import Canvas from './Canvas'

class MainPage extends React.Component {
  constructor() {
    super()

    this.state = {
      word: ''
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
    if (this.state.word === '') {
      console.log('please fill out word before submitting')
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
            name="word"
            type="text"
            onChange={this.handleChange}
            value={this.props.word}
          />

          <button type="submit" value="Submit" >Create</button>
        </form>
        <Canvas />
      </div>
    )
  }
}

export default MainPage
