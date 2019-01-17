import React from 'react'
import {Login, UserHome, Navbar} from '../components'
import {Link} from 'react-router-dom'

class HomePage extends React.Component {
    render() {
        return(
            <div>
                <Navbar/>
                <UserHome/>
                <Link to="/poem">Don't log in and make a poem from trending hashtags</Link>
                <br/>
                <br/>
            <Login/>
            <br/>
            <Link to='/tweet'> THIRD LINK TO POEM TWEETS</Link>
            </div>
        )
    }
}

export default HomePage
