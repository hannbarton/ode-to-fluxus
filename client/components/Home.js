import React from 'react'
import {Login, Navbar} from '../components'
import {Link} from 'react-router-dom'
import {Keyframes, animated} from 'react-spring'

const Sidebar = Keyframes.Spring({
  peek: [{x: 0, from: {x: 100}, delay: 500}, {x: 100, delay: 800}],
  open: {delay: 0, x: 0},
  close: async call => {
    await call({delay: 0, x: 100})
  }
})

class Home extends React.Component {
  state = {open: undefined}
  toggle = () => this.setState(state => ({open: !state.open}))
  render() {
    const state =
      this.state.open === 'close' ? 'peek' : this.state.open ? 'open' : 'close'
    return (
      <div className="home-outer">
        <Navbar />
        <br />
        <img src="./images/plus.png" id="plus-btn" onClick={this.toggle} />

        <div className="home-container">
          <br />
          <Link to="/poem">Make a poem from trending hashtags</Link>
          <br />
          <br />
          <Login />
        </div>
        <Sidebar native state={state}>
          {({x}) => (
            <animated.div
              className="sidebar"
              style={{
                transform: x.interpolate(x => `translate3d(${x}%,0,0)`)
              }}
            >
              <div className="home">
                <h1>
                  Found Poetry is a type of poetry created by taking words,
                  phrases, and sometimes whole passages from other sources and
                  imparting new meaning.
                </h1>
              </div>
            </animated.div>
          )}
        </Sidebar>
      </div>
    )
  }
}

export default Home
