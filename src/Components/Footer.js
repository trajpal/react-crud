import React, { Component } from 'react'

class Footer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <>
                <hr />
                @ 2020 - {new Date().getFullYear()} Copyright. All Right Reserved by Tushant Rajpal.
            </>
        )
    }
}

export default Footer