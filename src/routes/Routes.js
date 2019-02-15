import React, { Component } from 'react'
import { Route, Router, Switch as RouteSwitch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Home from './home/Home'
import GameLayout from './game/GameLayout'

const history = createBrowserHistory({})

class Routes extends Component {
  state = {
    numberOfPlayers: null,
    player_1: ' ',
    player_2: ' ',
    player_3: ' ',
    player_4: ' ',
  }

  setPlayerDetails = (numberOfPlayers, player_1, player_2, player_3, player_4) => {
    console.log('setPlayerDetails')
    this.setState({
      numberOfPlayers,
      player_1,
      player_2,
      player_3,
      player_4,
    })
  }

  render() {
    let { numberOfPlayers, player_1, player_2, player_3, player_4 } = this.state

    return (
      <Router history={history}>
        <RouteSwitch>
          <Route
            exact
            path="/"
            render={props => <Home {...props} setPlayerDetails={this.setPlayerDetails} />}
          />
          <Route
            path="/play"
            render={() => (
              <GameLayout
                numberOfPlayers={numberOfPlayers}
                player_1={player_1}
                player_2={player_2}
                player_3={player_3}
                player_4={player_4}
              />
            )}
          />
        </RouteSwitch>
      </Router>
    )
  }
}

export default Routes
