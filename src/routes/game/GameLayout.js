import React, { Component } from 'react'
import CoinSection from './CoinSection'
import PlayerSection from './PlayerSection'
import CardSection from './CardSection'
import tierOneCards from '../../cards/TierOne'

function shuffle(cards) {
  let shuffledCards = rearrange(cards, [])

  console.log(shuffledCards)

  return shuffledCards
}

function rearrange(cards, shuffledCards) {
  let length = cards.length
  let randomNumber = Math.floor(Math.random() * length)
  shuffledCards.push(...cards.splice(randomNumber, 1))

  if (cards.length) return rearrange(cards, shuffledCards)
  else return shuffledCards
}

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
    tierOneCards: [],
    remainingTierOneCards: [],
    cardSet: false,
  }

  componentDidMount() {
    console.log(tierOneCards)
    let tierOne = shuffle(tierOneCards)
    this.setState(
      {
        tierOneCards: tierOne.splice(0, 4),
        remainingTierOneCards: tierOne,
        cardSet: true,
      },
      () => console.log(this.state),
    )
    // console.log(tierOne)
  }

  // addMoreCoins = (player, newCoins) => {
  //   const updatePlayer = Object.assign({}, this.state)

  //   // console.log(updatePlayer['player_' + player].coins)
  //   // console.log(newCoins)
  // }

  getCard = card => {
    let player = Object.assign({}, this.state[this.state.currentPlayer])
    let buyCard = true
    let playerCoin = Object.assign({}, this.state[this.state.currentPlayer].coins)
    let playerCard = this.state[this.state.currentPlayer].cards

    for (var key in card.cost) {
      if (card.cost[key] > player.coins[key]) buyCard = false
    }

    if (buyCard) {
      for (var key in card.cost) {
        playerCoin[key] -= card.cost[key]
      }

      this.setState(
        {
          [this.state.currentPlayer]: {
            ...player,
            coins: playerCoin,
            cards: [...playerCard, card],
          },
        },
        () => console.log(this.state),
      )
    }
  }

  addReservedCard = (player, card) => {
    const updatePlayer = Object.assign({}, this.state)

    // console.log(updatePlayer['player_' + player].reservedCards)
    // console.log(card)
  }

  getCoins = async purchasedCoins => {
    let currentPlayer = this.state.currentPlayer

    let currentPlayerDetails = this.state[currentPlayer]
    let currentPlayerCoins = this.state[currentPlayer].coins

    for (let key in purchasedCoins) {
      if (purchasedCoins[key] !== 0) {
        await this.setState({
          totalCoins: {
            ...this.state.totalCoins,
            [key]: this.state.totalCoins[key] - purchasedCoins[key],
          },
        })

        currentPlayerCoins[key] += purchasedCoins[key]
      }
    }

    let nextPlayer =
      (Number(currentPlayer.slice(currentPlayer.length - 1, currentPlayer.length)) + 1) %
      this.props.numberOfPlayers

    if (nextPlayer === 0) nextPlayer = this.props.numberOfPlayers

    this.setState({
      currentPlayer: 'player_' + String(nextPlayer),
      [currentPlayer]: {
        ...currentPlayerDetails,
        coins: {
          ...currentPlayerCoins,
        },
      },
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
        {this.state.cardSet && (
          <CardSection tierOneCards={this.state.tierOneCards} getCard={this.getCard} />
        )}
        <PlayerSection player={player} />
      </div>
    )
  }
}

export default GameLayout
