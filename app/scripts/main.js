import debug from 'debug';
import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import routes from './routers/routes'
import { render } from 'react-dom';
import { Router, browserHistory, hashHistory } from 'react-router';
import { IntlProvider, FormattedNumber, FormattedPlural } from 'react-intl';
import NotificationSystem from 'react-notification-system'

export default class Root extends Component {
  _notificationSystem = null
  componentDidMount() {
    window.App={}
    App.notificationSystem = this.refs.notificationSystem;
  }
  render() {
    return (
        <div>
          <Router history={hashHistory} routes={routes} />
          <NotificationSystem ref="notificationSystem" />
        </div>
    )
  }
}

render(
  <Root />, document.getElementById('main_region')
)
