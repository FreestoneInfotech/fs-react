import React from 'react'
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router'
import App from '../main'

import DashboardContainer from '../containers/dashboard/dashboard_container'
//import AuditsAndAlertsContainer from '../containers/audits_and_alerts/audits_and_alerts_container'

export default (
  <Route path="/" component={null} name="Home">
    <IndexRoute name="Dashboard" component={DashboardContainer} />
    <Route path="dashboard" name="Dashboard" component={DashboardContainer} />
    <Route path="facebook-data-table" name="Facebook Data Table" component={DashboardContainer} />
  </Route>
)
