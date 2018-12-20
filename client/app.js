import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {Canvas} from './components'

const App = () => {
  return (
    <div>
      <Canvas/>
      {/* <Navbar /> */}
      <Routes />
    </div>
  )
}

export default App
