import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';


class HomeNav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
                <ul className="navbar-nav homenav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Buy</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/sell">Sell</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Settings</a> { /* @info: # represents redirecting to same page empty href will do nothing */}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="" onClick={this.props.logOut}>LogOut</a> { /* @debug: Float this to right */ }
                    </li>
                </ul>
            </nav>
        )
    }
}

export default HomeNav;