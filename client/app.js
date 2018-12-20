import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {MainPage} from './components'

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes />
      <MainPage/>
    </div>
  )
}

export default App
