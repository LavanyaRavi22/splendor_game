import { Modal, Button } from 'antd'
import React from 'react'
import styled from 'styled-components'

class PlayerModal extends React.Component {
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
      return (
        <ReservedCoin
          style={{ backgroundColor: primaryColor, borderColor: secondaryColor, color: fontColor }}>
          {numberOfCoins}
        </ReservedCoin>
      )
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
    let player = this.props.otherPlayer
    let coinSection = []
    let cardSection = []

    for (let key in player.coins) {
      coinSection.push(this.getColor(key, player.coins[key], 'coin'))
    }

    for (let key in player.cardCoins) {
      cardSection.push(this.getColor(key, player.cardCoins[key], 'card'))
    }

    return (
      <Modal
        visible={this.props.showOtherPlayer}
        title={null}
        closable={false}
        bodyStyle={{ height: '400px', overflow: 'scroll' }}
        footer={[
          <Button key="submit" type="primary" onClick={this.props.handleOk}>
            OK
          </Button>,
        ]}>
        <Title>
          <p>{player.name}</p>
          <p>{player.points}</p>
        </Title>
        <CoinSection>{coinSection}</CoinSection>
        <CoinSection>{cardSection}</CoinSection>
        <hr />
        {player.nobleCards.length > 0 && <p> Noble Cards: </p>}
        <CardSection>
          {player.nobleCards &&
            player.nobleCards.map(card => {
              let cards = []
              for (let key in card.cards)
                cards.push(this.getColor(key, card.cards[key], 'nobleCard'))
              return (
                <NobleCard>
                  <p>{card.value}</p>
                  <CardList>{cards}</CardList>
                </NobleCard>
              )
            })}
        </CardSection>
        <hr />
        {player.reservedCards.length > 0 && <p> Reserved Cards: </p>}
        <CardSection>
          {player.reservedCards.length > 0 &&
            player.reservedCards.map((card, index) => {
              let coin = []
              for (var key in card.cost) {
                coin.push(this.getColor(key, card.cost[key], 'reservedCoin'))
              }
              return (
                <ReservedCard style={{ borderColor: this.getBorderColor(card.color) }}>
                  <p>{card.value}</p>
                  <CoinList>
                    {coin.map(c => {
                      return c
                    })}
                  </CoinList>
                </ReservedCard>
              )
            })}
        </CardSection>
      </Modal>
    )
  }
}

export default PlayerModal

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 50px;
  font-size: 30px;
  font-family: 'Cormorant Garamond', serif;
  font-weight: bold;
`

const CoinSection = styled.div`
  display: flex;
  justify-content: center;
`

const CardSection = styled.div`
  display: flex;
`

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

const NobleCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100px;
  height: 100px;
  border: 2px solid #979797;
  margin: 10px;
  padding: 10px;
  background-color: #f7ecec;
`

const CardList = styled.div`
  width: 85px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-flow: wrap;
  margin-right: 10px;
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
  margin-right: 5px;
  margin-bottom: 10px;
`

const CoinList = styled.div`
  width: 150px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-flow: wrap;
`
