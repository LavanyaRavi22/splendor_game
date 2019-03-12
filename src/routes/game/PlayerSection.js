import React, { Component } from 'react'
import styled from 'styled-components'

class PlayerSection extends Component {
  render() {
    let player = this.props.player
    return (
      <div>
        <p>Player Details</p>
        <p>{player.name}</p>
        <p>{player.points}</p>
        <div style={{ display: 'flex' }}>
          <Coin style={{ backgroundColor: 'red' }}>{player.coins.red}</Coin>
          <Coin style={{ backgroundColor: 'green' }}>{player.coins.green}</Coin>
          <Coin style={{ backgroundColor: 'blue' }}>{player.coins.blue}</Coin>
          <Coin style={{ backgroundColor: 'white' }}>{player.coins.white}</Coin>
          <Coin style={{ backgroundColor: 'brown' }}>{player.coins.brown}</Coin>
        </div>
        <div style={{ display: 'flex' }}>
          <Card style={{ backgroundColor: 'red' }}>{player.cardCoins.red}</Card>
          <Card style={{ backgroundColor: 'green' }}>{player.cardCoins.green}</Card>
          <Card style={{ backgroundColor: 'blue' }}>{player.cardCoins.blue}</Card>
          <Card style={{ backgroundColor: 'white' }}>{player.cardCoins.white}</Card>
          <Card style={{ backgroundColor: 'brown' }}>{player.cardCoins.brown}</Card>
        </div>
        {player.reservedCards.length > 0 &&
          player.reservedCards.map((card, index) => {
            let coin = []
            for (var key in card.cost) {
              coin.push(
                <ReservedCoin style={{ backgroundColor: key }}>{card.cost[key]}</ReservedCoin>,
              )
            }
            return (
              <ReservedCard style={{ backgroundColor: card.color }}>
                <p>{card.value}</p>
                <CoinList>
                  {coin.map(c => {
                    return c
                  })}
                </CoinList>
                <button
                  onClick={async () => {
                    await this.props.getReservedCard(card, index)
                    this.props.nextTurn()
                  }}>
                  Buy
                </button>
              </ReservedCard>
            )
          })}
      </div>
    )
  }
}

export default PlayerSection

const Coin = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 20px;
`
const Card = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 20px;
`
const ReservedCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
`
const ReservedCoin = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 20px;
`

const CoinList = styled.div`
  width: 200px;
  height: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-flow: wrap;
`
