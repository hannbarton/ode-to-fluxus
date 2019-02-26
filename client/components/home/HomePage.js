import React from 'react'
import {Navbar} from '..'
import {Link} from 'react-router-dom'
import {FoundPoetry} from '..'
import {ToastContainer, toast} from 'react-toastify'

const found = ['F', 'O', 'U', 'N', 'D']
const poetry = ['P', 'O', 'E', 'T', 'R', 'Y']

class HomePage extends React.Component {
  constructor() {
    super()

    this.state = {
      start: true
    }

    this.handleSiteStart = this.handleSiteStart.bind(this)
  }

  handleSiteStart() {
    if (this.state.start === true) {
      toast('We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.', {
        position: 'bottom-right',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }
    this.setState({
      start: false
    })
  }

  render() {
    return (
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
        />
        <div className="mobileShow">
          Not currently mobile compatible. Please use desktop
        </div>
        <div className="show" onMouseOver={this.handleSiteStart}>
          <Navbar />
          <div className="home-page">
            <div className="poetry-inline-block">
              {found.map((each, i) => {
                return <FoundPoetry key={i}>{each}</FoundPoetry>
              })}
              <br />
              {poetry.map((each, i) => {
                return <FoundPoetry key={i}>{each}</FoundPoetry>
              })}
            </div>
          </div>
          <div className="enter">
            <Link to="/home">Enter</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
