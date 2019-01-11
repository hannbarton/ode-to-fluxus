import React from 'react'
import {Login} from '../components'
import {Link} from 'react-router-dom'

class HomePage extends React.Component {
    render() {
        return(
            <div>
                <Link to="/poem">Don't log in and make a poem from trending hashtags</Link>

            <Login/>
            </div>
        )
    }
}

export default HomePage
