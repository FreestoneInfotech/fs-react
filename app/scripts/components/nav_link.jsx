// modules/NavLink.js
import React from 'react'
import { Link, IndexLink } from 'react-router'

export default React.createClass({
  render() {
    return <IndexLink {...this.props}  activeClassName="active-menu"/>
  }
})
