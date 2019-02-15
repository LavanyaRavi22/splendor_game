import React, { Component } from 'react'
import CoinSection from './CoinSection'

class GameLayout extends Component {
  state = {
    player_1: {
      name: 'Bharath',
      coins: {
        red: 0,
        green: 0,
        blue: 0,
        white: 0,
        brown: 0,
      },
      cards: [],
      reservedCards: [],
    },
    player_2: {
      name: '',
      coins: {
        red: 0,
        green: 0,
        blue: 0,
        white: 0,
        brown: 0,
      },
      cards: [],
      reservedCards: [],
    },
    player_3: {
      name: '',
      coins: {
        red: 0,
        green: 0,
        blue: 0,
        white: 0,
        brown: 0,
      },
      cards: [],
      reservedCards: [],
    },
    player_4: {
      name: '',
      coins: {
        red: 0,
        green: 0,
        blue: 0,
        white: 0,
        brown: 0,
      },
      cards: [],
      reservedCards: [],
    },
    currentPlayer: 'player_1',
    totalCoins: {
      red: 5,
      green: 5,
      blue: 5,
      white: 5,
      brown: 5,
      yellow: 5,
    },
  }

  componentDidMount() {
    console.log(this.props)
  }

  addMoreCoins = (player, newCoins) => {
    const updatePlayer = Object.assign({}, this.state)

    console.log(updatePlayer['player_' + player].coins)
    console.log(newCoins)
  }

  addCards = (player, card) => {
    const updatePlayer = Object.assign({}, this.state)

    console.log(updatePlayer['player_' + player].cards)
    console.log(card)
  }

  addReservedCard = (player, card) => {
    const updatePlayer = Object.assign({}, this.state)

    console.log(updatePlayer['player_' + player].reservedCards)
    console.log(card)
  }

  render() {
    let player = this.state[this.state.currentPlayer]
    console.log(player)
    return (
      <div>
        <h3>Splendor</h3>
        <CoinSection coins={this.state.totalCoins} />
        {/* <CardSection />
        <PlayerSection /> */}
      </div>
    )
  }
}

export default GameLayout
