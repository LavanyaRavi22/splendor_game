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
    let backgroundColor
    if (color === 'red') {
      borderColor = '#FF2400'
      backgroundColor = '#FF9984'
    } else if (color === 'white') {
      borderColor = 'black'
      backgroundColor = 'white'
    } else if (color === 'blue') {
      borderColor = '#0080FF'
      backgroundColor = '#83CFFF'
    } else if (color === 'green') {
      borderColor = '#3BB143'
      backgroundColor = '#BEFFBC'
    } else if (color === 'brown') {
      borderColor = 'black'
      backgroundColor = '#868686'
    }
    return { borderColor, backgroundColor }
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
        bodyStyle={{ maxHeight: '400px', overflow: 'scroll' }}
        footer={[
          <Button key="submit" type="primary" onClick={this.props.handleOk}>
            OK
          </Button>,
        ]}>
        <Title>
          <p>{player.name}</p>
          <span>{player.points}</span>
        </Title>
        <CoinSection>{coinSection}</CoinSection>
        <CoinSection>{cardSection}</CoinSection>

        {player.nobleCards.length > 0 && (
          <div>
            <hr />
            <p
              style={{
                margin: '0',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '20px',
                fontWeight: 'bold',
              }}>
              Noble Cards:
            </p>
          </div>
        )}
        <CardSection>
          {player.nobleCards &&
            player.nobleCards.map(card => {
              let cards = []
              for (let key in card.cards)
                cards.push(this.getColor(key, card.cards[key], 'nobleCard'))
              return (
                <NobleCard>
                  <p
                    style={{ fontSize: '20px', color: 'black', textShadow: '2px 2px 5px #979797' }}>
                    {card.value}
                  </p>
                  <CardList>{cards}</CardList>
                </NobleCard>
              )
            })}
        </CardSection>
        {player.reservedCards.length > 0 && (
          <div>
            <hr />
            <p
              style={{
                margin: '0',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '20px',
                fontWeight: 'bold',
              }}>
              Reserved Cards:
            </p>
          </div>
        )}
        <CardSection>
          {player.reservedCards.length > 0 &&
            player.reservedCards.map((card, index) => {
              let coin = []
              let { borderColor, backgroundColor } = this.getBorderColor(card.color)
              for (var key in card.cost) {
                coin.push(this.getColor(key, card.cost[key], 'reservedCoin'))
              }
              return (
                <ReservedCard
                  style={{ borderColor: borderColor, backgroundColor: backgroundColor }}>
                  <p
                    style={{
                      fontSize: '20px',
                      margin: '0',
                      marginLeft: '10px',
                      color: 'white',
                      textShadow: '1px 1px 3px black',
                    }}>
                    {card.value}
                  </p>
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

  p {
    font-weight: bold;
    font-family: 'Cormorant Garamond', serif;
  }
`

const CoinSection = styled.div`
  display: flex;
  justify-content: center;
`

const CardSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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
  border-radius: 10px;
`

const ReservedCoin = styled.div`
  width: 35px;
  height: 35px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3px;
`

const CoinList = styled.div`
  width: 155px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-flow: wrap;
  margin-bottom: 20px;
  background-color: #fcfbfb;
  height: 70px;
  margin-bottom: 0;
  border-radius: 0px 0px 10px 10px;
  border-top: 1px solid #b6b6b6;
  opacity: 0.8;
`
