import React from 'react'
import styled from 'styled-components'
import ReservedCardModal from './ReservedCardModal'

class CurrentPlayer extends React.Component {
  state = {
    showCards: false,
  }

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
      secondaryColor = 'black'
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

  setShowCards = () => {
    this.setState({
      showCards: true,
    })
  }

  handleOk = () => {
    this.setState({
      showCards: false,
    })
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
            fontSize: '30px',
          }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 'bolder' }}>
            {player.name}
          </p>
          <p>{player.points}</p>
        </div>
        <div>
          <div style={{ display: 'flex' }}>{coinSection}</div>
          <div style={{ display: 'flex' }}>{cardSection}</div>
        </div>
        {(player.reservedCards.length > 0 || player.nobleCards.length > 0) && (
          <CardLabel style={{ marginLeft: '30px' }} onClick={this.setShowCards}>
            Cards
          </CardLabel>
        )}
        <ReservedCardModal
          showCards={this.state.showCards}
          handleOk={this.handleOk}
          player={player}
          getReservedCard={this.props.getReservedCard}
          nextTurn={this.props.nextTurn}
        />
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
  margin-top: -70px;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: -200px;

  p {
    margin: 0;
  }
`

const CardLabel = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`
