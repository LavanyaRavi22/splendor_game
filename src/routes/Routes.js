import React, { Component } from 'react'
import { Route, Router, Switch as RouteSwitch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Home from './home/Home'
import GameLayout from './game/GameLayout'
import tierOneCards from '../cards/TierOne'
import tierTwoCards from '../cards/TierTwo'
import tierThreeCards from '../cards/TierThree'
import nobles from '../cards/Nobles'

const history = createBrowserHistory()

class Routes extends Component {
  state = {
    numberOfPlayers: null,
    player_1: ' ',
    player_2: ' ',
    player_3: ' ',
    player_4: ' ',
  }

  componentDidMount() {
    localStorage.setItem('tierOne', JSON.stringify(tierOneCards))
    localStorage.setItem('tierTwo', JSON.stringify(tierTwoCards))
    localStorage.setItem('tierThree', JSON.stringify(tierThreeCards))
    localStorage.setItem('nobles', JSON.stringify(nobles))
    localStorage.removeItem('data')
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
