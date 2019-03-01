import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styles.css';

class HomeNav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav homenav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Buy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Sell</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Settings</a> { /* @info: # represents redirecting to same page empty href will do nothing */}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="" onClick={this.props.logOut}>LogOut</a> { /* @debug: Float this to right */ }
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default HomeNav;