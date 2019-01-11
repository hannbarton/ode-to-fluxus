import React from 'react'
import {Login} from '../components'

class HomePage extends React.Component {
    render() {
        return(
            <div>
                <button>
                    Make a poem with trending Twitter hashtags
                </button>

            <Login/>
            </div>
        )
    }
}

export default HomePage
