import React from 'react'
import styled from 'styled-components'

class CurrentPlayer extends React.Component {
  getColor = (color, numberOfCoins, type) => {
    let primaryColor
    let secondaryColor
    let fontColor

    if (color === 'red') {
      primaryColor = '#FF2400'
      secondaryColor = '#b22222'
      fontColor = 'white'
    } else if (color === 'white') {
      primaryColor = 'white'
      secondaryColor = 'black'
      fontColor = 'black'
    } else if (color === 'blue') {
      primaryColor = '#0080FF'
      secondaryColor = '#0E4C92'
      fontColor = 'white'
    } else if (color === 'green') {
      primaryColor = '#3BB143'
      secondaryColor = '#0B6623'
      fontColor = 'white'
    } else if (color === 'brown') {
      primaryColor = 'black'
      secondaryColor = 'white'
      fontColor = 'white'
    }

    if (type === 'coin')
      return (
        <Coin
          style={{ backgroundColor: primaryColor, borderColor: secondaryColor, color: fontColor }}>
          {numberOfCoins}
        </Coin>
      )
    else if (type === 'card')
      return (
        <Card
          style={{ backgroundColor: primaryColor, borderColor: secondaryColor, color: fontColor }}>
          {numberOfCoins}
        </Card>
      )
    else if (type === 'nobleCard')
      return (
        <Card
          style={{
            backgroundColor: primaryColor,
            borderColor: secondaryColor,
            color: fontColor,
            width: '20px',
            height: '20px',
            marginRight: '5px',
            marginLeft: '5px',
          }}>
          {numberOfCoins}
        </Card>
      )
    else if (type === 'reservedCoin')
      return {
        /* <ReservedCoin
          style={{ backgroundColor: primaryColor, borderColor: secondaryColor, color: fontColor }}>
          {numberOfCoins}
        </ReservedCoin> */
      }
  }

  getBorderColor = color => {
    let borderColor
    if (color === 'red') {
      borderColor = '#FF2400'
    } else if (color === 'white') {
      borderColor = 'white'
    } else if (color === 'blue') {
      borderColor = '#0080FF'
    } else if (color === 'green') {
      borderColor = '#3BB143'
    } else if (color === 'brown') {
      borderColor = 'black'
    }
    return borderColor
  }

  render() {
    let player = this.props.player
    console.log(player)
    let coinSection = []
    let cardSection = []

    for (let key in player.coins) {
      coinSection.push(this.getColor(key, player.coins[key], 'coin'))
    }

    for (let key in player.cardCoins) {
      cardSection.push(this.getColor(key, player.cardCoins[key], 'card'))
    }

    return (
      <Player>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '200px',
          }}>
          <p>{player.name}</p>
          <p>{player.points}</p>
        </div>
        <div>
          <div style={{ display: 'flex' }}>{coinSection}</div>
          <div style={{ display: 'flex' }}>{cardSection}</div>
        </div>
        {/* <ReservedCardModal /> */}
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
      </Player>
    )
  }
}

export default CurrentPlayer

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

const Player = styled.div`
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: center;
`

const ReservedCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 160px;
  height: 110px;
  border: 2px solid black;
  margin: 5px;
  padding: 5px;
  background-color: #fcfbfb;
`
const ReservedCoin = styled.div`
  width: 35px;
  height: 35px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  margin-bottom: 10px;
`

const CoinList = styled.div`
  width: 150px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-flow: wrap;
`
