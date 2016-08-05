import React, {Component} from 'react';
import {Link} from 'react-router'

export default class Header extends Component {
    render() {
        return (
            <header className="navbar-fixed-top">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link to="/" className="navbar-brand"><img src="styles/img/logo.png" height="20" /></Link>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown user-dropdown">
                            <a className="pointer" data-toggle="dropdown" aria-expanded="false"><i className="glyphicon glyphicon-user"></i> <span className="username">Admin</span></a>
                            <ul className="dropdown-menu">
                                <li><a href="javascript:void(0)"><i className="fa fa-user"></i> Profile</a></li>
                                <li><a href="javascript:void(0)"><i className="fa fa-sign-out"></i> Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </header>
        );
  }
}
