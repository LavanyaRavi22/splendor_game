import React, { Component } from 'react'
import { Route, Router, Switch as RouteSwitch, matchPath } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import Home from './home/Home'

const history = createBrowserHistory({})

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <RouteSwitch>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route path="/play" render={() => <div>Second Page</div>} />
        </RouteSwitch>
      </Router>
    )
  }
}

export default Routes
