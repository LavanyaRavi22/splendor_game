import React, { Component } from 'react'
import CoinSection from './CoinSection'
import PlayerSection from './PlayerSection'

class GameLayout extends Component {
  state = {
    player_1: {
      name: this.props.player_1,
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
      name: this.props.player_2,
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
      name: this.props.player_3,
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
      name: this.props.player_4,
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
    // console.log(this.props)
  }

  // addMoreCoins = (player, newCoins) => {
  //   const updatePlayer = Object.assign({}, this.state)

  //   // console.log(updatePlayer['player_' + player].coins)
  //   // console.log(newCoins)
  // }

  addCards = (player, card) => {
    const updatePlayer = Object.assign({}, this.state)

    // console.log(updatePlayer['player_' + player].cards)
    // console.log(card)
  }

  addReservedCard = (player, card) => {
    const updatePlayer = Object.assign({}, this.state)

    // console.log(updatePlayer['player_' + player].reservedCards)
    // console.log(card)
  }

  getCoins = async purchasedCoins => {
    let currentPlayer = this.state.currentPlayer

    for (let key in purchasedCoins) {
      if (purchasedCoins[key] !== 0) {
        await this.setState({
          totalCoins: {
            ...this.state.totalCoins,
            [key]: this.state.totalCoins[key] - purchasedCoins[key],
          },
        })
      }
    }

    let nextPlayer =
      (Number(currentPlayer.slice(currentPlayer.length - 1, currentPlayer.length)) + 1) %
      this.props.numberOfPlayers

    if (nextPlayer === 0) nextPlayer = this.props.numberOfPlayers

    this.setState({
      currentPlayer: 'player_' + String(nextPlayer),
    })
  }

  render() {
    let player = this.state[this.state.currentPlayer]

    return (
      <div>
        <h3>Splendor</h3>
        <CoinSection
          coins={this.state.totalCoins}
          getCoins={this.getCoins}
          currentPlayer={this.state.currentPlayer}
        />
        {/* <CardSection /> */}
        <PlayerSection player={player} />
      </div>
    )
  }
}

export default GameLayout
