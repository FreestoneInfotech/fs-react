import React from 'react'
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router'
import App from '../main'

import DashboardContainer from '../containers/dashboard/dashboard_container'
import FacebookDataTableContainer from '../containers/facebook_data_table/facebook_data_table_container'
import BootstrapComponentsContainer from '../containers/bootstrap_components/bootstrap_components_container'
import notificationContainer from '../containers/notification/notification_container'

export default (
  <Route path="/" component={null} name="Home">
    <IndexRoute name="Dashboard" component={DashboardContainer} />
    <Route path="dashboard" name="Dashboard" component={DashboardContainer} />
    <Route path="facebook-data-table" name="Facebook Data Table" component={FacebookDataTableContainer} />
    <Route path="bootstrap-components" name="Bootstrap Components" component={BootstrapComponentsContainer} />
    <Route path="notifications" name="Notification" component={notificationContainer} />
  </Route>
)
