import React from 'react'
import {Login, Navbar} from '../index'
import {Link} from 'react-router-dom'
import { Keyframes, animated} from 'react-spring/renderprops'

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
        <img src="./images/about.png" id="about-btn" onClick={this.toggle} />
        <br />

        <div className="home-container">
          <br />
          <Link to="/poem" id='home-page-link'>Make a poem from trending hashtags</Link>
          <br />
          <br />
          <Login />
        </div>
        <Sidebar native state={state}>
          {({x}) => (
            <animated.div
              className="sidebar"
              style={{
                transform: x.interpolate(y => `translate3d(${y}%,0,0)`)
              }}
            >
              <div className="home">
                <h1>
                  Found Poetry is a type of poetry created by taking words,
                  phrases, and sometimes whole passages from other sources and
                  reframing them by making changes in spacing and lines, or by
                  adding or deleting text, thus imparting new meaning.
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
