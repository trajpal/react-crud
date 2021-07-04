import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                    {/* <!-- Brand --> */}
                    <Link className="navbar-brand" to="/">Logo</Link> 

                    {/* <!-- Toggler/collapsibe Button --> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* <!-- Navbar links --> */}
                    <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link> 
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">Users</Link> 
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contactus">Contact Us</Link> 
                            </li>
                            <li className="nav-item">
                                <form className="form-inline" action="/action_page.php">
                                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                                    <button className="btn btn-success" type="submit">Search</button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}

export default Header