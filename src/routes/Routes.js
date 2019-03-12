import React, { Component } from 'react'
import { Route, Router, Switch as RouteSwitch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Home from './home/Home'
import GameLayout from './game/GameLayout'

const history = createBrowserHistory()

class Routes extends Component {
  state = {
    numberOfPlayers: null,
    player_1: ' ',
    player_2: ' ',
    player_3: ' ',
    player_4: ' ',
  }

  render() {
    return (
      <Router history={history}>
        <RouteSwitch>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route
            path="/play"
            render={props => (
              <GameLayout
                routeProps={props}
                numberOfPlayers={Number(props.location.state.numberOfPlayers)}
                player_1={props.location.state.player_1}
                player_2={props.location.state.player_2}
                player_3={props.location.state.player_3}
                player_4={props.location.state.player_4}
              />
            )}
          />
        </RouteSwitch>
      </Router>
    )
  }
}

export default Routes
