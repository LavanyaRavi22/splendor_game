import React, { Component } from 'react'
import CoinSection from './CoinSection'
import PlayerSection from './PlayerSection'
import CardSection from './CardSection'
import NobleSection from './NobleSection'
// import tierOneCards from '../../cards/TierOne'
// import tierTwoCards from '../../cards/TierTwo'
// import tierThreeCards from '../../cards/TierThree'
//import nobles from '../../cards/Nobles'
import styled from 'styled-components'
import { Prompt } from 'react-router'

function shuffle(cards) {
  let shuffledCards = rearrange(cards, [])

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
      cardCoins: {
        red: 0,
        green: 0,
        blue: 0,
        white: 0,
        brown: 0,
      },
      cards: [],
      reservedCards: [],
      nobleCards: [],
      points: 0,
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
      cardCoins: {
        red: 0,
        green: 0,
        blue: 0,
        white: 0,
        brown: 0,
      },
      cards: [],
      reservedCards: [],
      nobleCards: [],
      points: 0,
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
      cardCoins: {
        red: 0,
        green: 0,
        blue: 0,
        white: 0,
        brown: 0,
      },
      cards: [],
      reservedCards: [],
      nobleCards: [],
      points: 0,
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
      cardCoins: {
        red: 0,
        green: 0,
        blue: 0,
        white: 0,
        brown: 0,
      },
      cards: [],
      reservedCards: [],
      nobleCards: [],
      points: 0,
    },
    currentPlayer: 'player_1',
    totalCoins: {
      red: 7,
      green: 7,
      blue: 7,
      white: 7,
      brown: 7,
      yellow: 7,
    },
    tierOneCards: [],
    remainingTierOneCards: [],
    tierTwoCards: [],
    remainingTierTwoCards: [],
    tierThreeCards: [],
    remainingTierThreeCards: [],
    nobles: [],
    cardSet: false,
    turnDone: false,
  }

  componentDidMount() {
    let cachedData = JSON.parse(localStorage.getItem('data'))
    if (cachedData) {
      this.setState({
        ...cachedData,
      })
    } else {
      let tierOneCards = JSON.parse(localStorage.getItem('tierOne'))
      let tierTwoCards = JSON.parse(localStorage.getItem('tierTwo'))
      let tierThreeCards = JSON.parse(localStorage.getItem('tierThree'))
      let nobles = JSON.parse(localStorage.getItem('nobles'))
      let tierOne = shuffle(tierOneCards)
      let tierTwo = shuffle(tierTwoCards)
      let tierThree = shuffle(tierThreeCards)
      let nobleCards = shuffle(nobles)
      let totalCoins = Object.assign({}, this.state.totalCoins)

      if (this.props.numberOfPlayers === 2) {
        for (let key in totalCoins) totalCoins[key] = 4
      } else if (this.props.numberOfPlayers === 3) {
        for (let key in totalCoins) totalCoins[key] = 5
      }

      this.setState(
        {
          tierOneCards: tierOne.splice(0, 4),
          remainingTierOneCards: tierOne,
          tierTwoCards: tierTwo.splice(0, 4),
          remainingTierTwoCards: tierTwo,
          tierThreeCards: tierThree.splice(0, 4),
          remainingTierThreeCards: tierThree,
          nobles: nobleCards.splice(0, 4),
          totalCoins: totalCoins,
          cardSet: true,
        },
        () => localStorage.setItem('data', JSON.stringify(this.state)),
      )
    }
  }

  componentWillUnmount() {
    localStorage.removeItem('data')
  }

  getCard = async (card, index, tier) => {
    let currentPlayer = this.state.currentPlayer
    let player = Object.assign({}, this.state[this.state.currentPlayer])
    let buyCard = true
    let playerCoin = Object.assign({}, this.state[this.state.currentPlayer].coins)
    let playerCardCoin = Object.assign({}, this.state[this.state.currentPlayer].cardCoins)
    let playerCard = this.state[this.state.currentPlayer].cards
    let tierOne = Object.assign([], this.state.tierOneCards)
    let remainingTierOneCards = Object.assign([], this.state.remainingTierOneCards)
    let tierTwo = Object.assign([], this.state.tierTwoCards)
    let remainingTierTwoCards = Object.assign([], this.state.remainingTierTwoCards)
    let tierThree = Object.assign([], this.state.tierThreeCards)
    let remainingTierThreeCards = Object.assign([], this.state.remainingTierThreeCards)
    let totalCoins = Object.assign({}, this.state.totalCoins)

    for (let key in card.cost) {
      if (card.cost[key] > player.coins[key] + player.cardCoins[key]) buyCard = false
    }

    if (buyCard) {
      for (let key in card.cost) {
        if (playerCardCoin[key]) {
          if (playerCardCoin[key] >= card.cost[key]) continue
          else {
            playerCoin[key] = playerCoin[key] - (card.cost[key] - playerCardCoin[key])
            totalCoins[key] = totalCoins[key] + (card.cost[key] - playerCardCoin[key])
          }
        } else {
          playerCoin[key] -= card.cost[key]
          totalCoins[key] += card.cost[key]
        }
      }

      playerCardCoin[card.color] += 1

      if (card.value) player.points += card.value

      let nextPlayer =
        (Number(currentPlayer.slice(currentPlayer.length - 1, currentPlayer.length)) + 1) %
        this.props.numberOfPlayers

      if (nextPlayer === 0) nextPlayer = this.props.numberOfPlayers

      if (tier === 1) {
        if (remainingTierOneCards.length > 0)
          tierOne.splice(index, 1, remainingTierOneCards.shift())
        else tierOne.splice(index, 1, {})
      } else if (tier === 2) {
        if (remainingTierTwoCards.length > 0)
          tierTwo.splice(index, 1, remainingTierTwoCards.shift())
        else tierTwo.splice(index, 1, {})
      } else if (tier === 3) {
        if (remainingTierThreeCards.length > 0)
          tierThree.splice(index, 1, remainingTierThreeCards.shift())
        else tierThree.splice(index, 1, {})
      }

      await this.setState(
        {
          [this.state.currentPlayer]: {
            ...player,
            coins: playerCoin,
            cardCoins: playerCardCoin,
            cards: [...playerCard, card],
          },
          totalCoins: totalCoins,
          tierOneCards: tierOne,
          remainingTierOneCards: remainingTierOneCards,
          tierTwoCards: tierTwo,
          remainingTierTwoCards: remainingTierTwoCards,
          tierThreeCards: tierThree,
          remainingTierThreeCards: remainingTierThreeCards,
        },
        () => {
          this.checkNobleCard()
          this.checkPoints()
          this.setState(
            {
              turnDone: true,
              currentPlayer: 'player_' + String(nextPlayer),
            },
            () => localStorage.setItem('data', JSON.stringify(this.state)),
          )
        },
      )
    }
  }

  getReservedCard = async (card, index) => {
    let currentPlayer = this.state.currentPlayer
    let player = Object.assign({}, this.state[this.state.currentPlayer])
    let reservedCards = this.state[this.state.currentPlayer].reservedCards
    let playerCoin = Object.assign({}, this.state[this.state.currentPlayer].coins)
    let playerCardCoin = Object.assign({}, this.state[this.state.currentPlayer].cardCoins)
    let playerCard = this.state[this.state.currentPlayer].cards
    let totalCoins = Object.assign({}, this.state.totalCoins)
    let buyCard = true

    for (let key in card.cost) {
      if (card.cost[key] > player.coins[key] + player.cardCoins[key]) buyCard = false
    }

    if (buyCard) {
      for (let key in card.cost) {
        if (playerCardCoin[key]) {
          if (playerCardCoin[key] >= card.cost[key]) continue
          else {
            playerCoin[key] = playerCoin[key] - (card.cost[key] - playerCardCoin[key])
            totalCoins[key] = totalCoins[key] + (card.cost[key] - playerCardCoin[key])
          }
        } else {
          playerCoin[key] -= card.cost[key]
          totalCoins[key] += card.cost[key]
        }
      }

      playerCardCoin[card.color] += 1

      if (card.value) player.points += card.value

      let nextPlayer =
        (Number(currentPlayer.slice(currentPlayer.length - 1, currentPlayer.length)) + 1) %
        this.props.numberOfPlayers

      if (nextPlayer === 0) nextPlayer = this.props.numberOfPlayers

      reservedCards.splice(index, 1)

      await this.setState(
        {
          [this.state.currentPlayer]: {
            ...player,
            coins: playerCoin,
            cardCoins: playerCardCoin,
            cards: [...playerCard, card],
            reservedCards: reservedCards,
          },
          totalCoins: totalCoins,
        },
        () => {
          this.checkNobleCard()
          this.checkPoints()
          this.setState(
            {
              turnDone: true,
              currentPlayer: 'player_' + String(nextPlayer),
            },
            () => localStorage.setItem('data', JSON.stringify(this.state)),
          )
        },
      )
    }
  }

  reserveCard = async (card, index, tier) => {
    let currentPlayer = this.state.currentPlayer
    let player = Object.assign({}, this.state[this.state.currentPlayer])
    let reservedCards = this.state[this.state.currentPlayer].reservedCards
    let tierOne = Object.assign([], this.state.tierOneCards)
    let remainingTierOneCards = Object.assign([], this.state.remainingTierOneCards)
    let tierTwo = Object.assign([], this.state.tierTwoCards)
    let remainingTierTwoCards = Object.assign([], this.state.remainingTierTwoCards)
    let tierThree = Object.assign([], this.state.tierThreeCards)
    let remainingTierThreeCards = Object.assign([], this.state.remainingTierThreeCards)

    reservedCards.push(card)

    let nextPlayer =
      (Number(currentPlayer.slice(currentPlayer.length - 1, currentPlayer.length)) + 1) %
      this.props.numberOfPlayers

    if (nextPlayer === 0) nextPlayer = this.props.numberOfPlayers

    if (tier === 1) {
      if (remainingTierOneCards.length > 0) tierOne.splice(index, 1, remainingTierOneCards.shift())
      else tierOne.splice(index, 1, {})
    } else if (tier === 2) {
      if (remainingTierTwoCards.length > 0) tierTwo.splice(index, 1, remainingTierTwoCards.shift())
      else tierTwo.splice(index, 1, {})
    } else if (tier === 3) {
      if (remainingTierThreeCards.length > 0)
        tierThree.splice(index, 1, remainingTierThreeCards.shift())
      else tierThree.splice(index, 1, {})
    }

    await this.setState(
      {
        [this.state.currentPlayer]: {
          ...player,
          reservedCards: reservedCards,
        },
        tierOneCards: tierOne,
        remainingTierOneCards: remainingTierOneCards,
        tierTwoCards: tierTwo,
        remainingTierTwoCards: remainingTierTwoCards,
        tierThreeCards: tierThree,
        remainingTierThreeCards: remainingTierThreeCards,
      },
      () => {
        this.setState(
          {
            turnDone: true,
            currentPlayer: 'player_' + String(nextPlayer),
          },
          () => localStorage.setItem('data', JSON.stringify(this.state)),
        )
      },
    )
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

    await this.setState(
      {
        currentPlayer: 'player_' + String(nextPlayer),
        [currentPlayer]: {
          ...currentPlayerDetails,
          coins: {
            ...currentPlayerCoins,
          },
        },
        turnDone: true,
      },
      () => localStorage.setItem('data', JSON.stringify(this.state)),
    )
  }

  nextTurn = () => {
    this.setState(
      {
        turnDone: false,
      },
      () => localStorage.setItem('data', JSON.stringify(this.state)),
    )
  }

  checkNobleCard = () => {
    let nobles = Object.assign([], this.state.nobles)
    //let currentPlayer = Object.assign({}, this.state.currentPlayer)
    let player = Object.assign({}, this.state[this.state.currentPlayer])

    nobles.map(async (nobleCard, index) => {
      let totalCount = 0
      let countMatched = 0

      let cardRequired = nobleCard.cards
      for (var key in cardRequired) {
        totalCount++
        if (player.cardCoins[key] >= nobleCard.cards[key]) countMatched++
      }

      if (totalCount === countMatched) {
        player.nobleCards.push(nobleCard)
        if (nobleCard.value) player.points += nobleCard.value
        nobles.splice(1, index)
      }

      await this.setState({
        [this.state.currentPlayer]: player,
        nobles: nobles,
      })
    })

    localStorage.setItem('data', JSON.stringify(this.state))
  }

  checkPoints = () => {
    let player = Object.assign({}, this.state[this.state.currentPlayer])

    if (player.points >= 15) {
      alert(`${player.name} won!`)
      this.props.routeProps.history.push('/')
    }
  }

  render() {
    let player = this.state[this.state.currentPlayer]

    let otherPlayers = []
    for (let i = 1; i <= this.props.numberOfPlayers; i++) {
      if (this.state.currentPlayer === 'player_' + i) continue
      else otherPlayers.push(this.state['player_' + i])
    }

    return (
      <React.Fragment>
        <Prompt when={true} message="Are you sure you want to leave?" />
        <div>
          <Splendor>SPLENDOR</Splendor>
          <div style={{ display: 'flex' }}>
            {this.state.cardSet && (
              <React.Fragment>
                <CoinSection
                  coins={this.state.totalCoins}
                  getCoins={this.getCoins}
                  currentPlayer={this.state.currentPlayer}
                  turnDone={this.state.turnDone}
                  nextTurn={this.nextTurn}
                />

                <CardSection
                  tierOneCards={this.state.tierOneCards}
                  tierTwoCards={this.state.tierTwoCards}
                  tierThreeCards={this.state.tierThreeCards}
                  getCard={this.getCard}
                  currentPlayer={this.state.currentPlayer}
                  turnDone={this.state.turnDone}
                  nextTurn={this.nextTurn}
                  reserveCard={this.reserveCard}
                />
                <NobleSection nobles={this.state.nobles} />
              </React.Fragment>
            )}
          </div>
          <PlayerSection
            player={player}
            otherPlayers={otherPlayers}
            getReservedCard={this.getReservedCard}
            nextTurn={this.nextTurn}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default GameLayout

const Splendor = styled.p`
  font-family: 'Lilita One', cursive;
  font-size: 42px;
  margin: 0;
  margin-left: 40px;
  margin-bottom: 10px;
`
