import React, {Component} from 'react';
import NavLink from '../components/nav_link'

import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

export default class AppNavBar extends Component {

    render() {
        return(
            <aside>
              <div id="sidebar" className="nav-collapse " tabIndex="5000">
                  <ul className="sidebar-menu" style={{"display": "block"}}>
                      <li>
                              <NavLink to="/"><i className="fa fa-dashboard"></i> Dashboard </NavLink>
                      </li>
                      <li>
                              <NavLink to="/facebook-data-table"><i className="fa fa-search-plus"></i> Facebook Data Table </NavLink>
                      </li>
                      <li>
                              <NavLink to="/bootstrap-components"><i className="fa fa-search-plus"></i> Bootstrap Components </NavLink>
                      </li>
                      <li>
                              <NavLink to="/notifications"><i className="fa fa-search-plus"></i> Notification </NavLink>
                      </li>
                  </ul>
              </div>
            </aside>
      )
   }
}
