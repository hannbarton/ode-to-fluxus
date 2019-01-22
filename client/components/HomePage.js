import React from 'react'
import {Navbar} from '../components'
import {Link} from 'react-router-dom'
import {FoundPoetry} from './'

const found = ['F', 'O', 'U', 'N', 'D']
const poetry = ['P', 'O', 'E', 'T', 'R', 'Y']

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="home-page">
          {/* <UserHome /> */}
          <div className="poetry-inline-block">
            {found.map((each, i) => {
              return <FoundPoetry key={i}>{each}</FoundPoetry>
            })}
            <br />
            {poetry.map((each, i) => {
              return <FoundPoetry key={i}>{each}</FoundPoetry>
            })}
          </div>
        </div >
        <div className='enter'>

        <Link to="/home">Enter</Link>
        </div>
      </div>
    )
  }
}

export default HomePage
