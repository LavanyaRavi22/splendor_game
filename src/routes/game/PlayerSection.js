import React, { Component } from 'react'
import styled from 'styled-components'

class PlayerSection extends Component {
  render() {
    let player = this.props.player
    console.log(this.props.otherPlayers)
    return (
      <Players>
        <OtherPlayers>
          {this.props.otherPlayers &&
            this.props.otherPlayers.map(player => {
              return (
                <div className="player">
                  <p>{player.name}</p>
                  <span>{player.points}</span>
                </div>
              )
            })}
        </OtherPlayers>
        <CurrentPlayer>
          <div>
            <p>{player.name}</p>
            <p>{player.points}</p>
          </div>
          <div>
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
        </CurrentPlayer>
      </Players>
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

const OtherPlayers = styled.div`
  margin-top: -100px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-weight: bold;

  .player {
    display: flex;
    width: 200px;
    justify-content: space-between;
    padding: 10px 20px;
    border: 1px solid black;
    margin-bottom: 20px;
  }

  p {
    margin: 0;
  }
`

const Players = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const CurrentPlayer = styled.div`
  margin-top: -40px;
  margin-left: 200px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    margin: 0;
  }
`
