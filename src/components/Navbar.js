import React, { Component } from 'react';
import logo from '../assets/logo.jpeg';
import { Link } from 'react-router-dom';
import Menus from './Menu'

export default class Navbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isLoggedIn: false
        }
    } 
    render() {
        return (
        this.state.isLoggedIn ?  (
            <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
            <Link className="navbar-brand" to={"/landing"}><img src={logo} alt='logo' width="140px" height="50px" /></Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            <li className="menu">
                <Menus />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>) 
    :  
    (<div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <Link className="navbar-brand" to={"/landing"}><img src={logo} alt='logo' width="140px" height="50px" /></Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Sign In</Link>
                    </li>
                    <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                    </li>
                </ul>
          </div>
        </div>
      </nav>
    </div>)
        )
        
    }
}
