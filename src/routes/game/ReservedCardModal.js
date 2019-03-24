import React from 'react'
import { Modal, Button, Popconfirm } from 'antd'
import styled from 'styled-components'

class ReservedCardModal extends React.Component {
  buyReservedCard = async (card, index) => {
    await this.props.getReservedCard(card, index)
    this.props.nextTurn()
  }

  cancel = () => {}

  getCoinList = card => {
    let coin = []
    let primaryColor
    let secondaryColor
    let fontColor

    for (var key in card.cost) {
      if (key === 'red') {
        primaryColor = '#FF2400'
        secondaryColor = '#b22222'
        fontColor = 'white'
      } else if (key === 'white') {
        primaryColor = 'white'
        secondaryColor = 'black'
        fontColor = 'black'
      } else if (key === 'blue') {
        primaryColor = '#0080FF'
        secondaryColor = '#0E4C92'
        fontColor = 'white'
      } else if (key === 'green') {
        primaryColor = '#3BB143'
        secondaryColor = '#0B6623'
        fontColor = 'white'
      } else if (key === 'brown') {
        primaryColor = 'black'
        secondaryColor = 'white'
        fontColor = 'white'
      }
      coin.push(
        <ReservedCoin
          style={{
            backgroundColor: primaryColor,
            borderColor: secondaryColor,
            color: fontColor,
          }}>
          {card.cost[key]}
        </ReservedCoin>,
      )
    }

    return coin
  }

  getNobleCoinList = card => {
    let coin = []
    let primaryColor
    let secondaryColor
    let fontColor

    for (var key in card) {
      if (key === 'red') {
        primaryColor = '#FF2400'
        secondaryColor = '#b22222'
        fontColor = 'white'
      } else if (key === 'white') {
        primaryColor = 'white'
        secondaryColor = 'black'
        fontColor = 'black'
      } else if (key === 'blue') {
        primaryColor = '#0080FF'
        secondaryColor = '#0E4C92'
        fontColor = 'white'
      } else if (key === 'green') {
        primaryColor = '#3BB143'
        secondaryColor = '#0B6623'
        fontColor = 'white'
      } else if (key === 'brown') {
        primaryColor = 'black'
        secondaryColor = 'black'
        fontColor = 'white'
      }
      coin.push(
        <NobleCoin
          style={{
            backgroundColor: primaryColor,
            borderColor: secondaryColor,
            color: fontColor,
          }}>
          {card[key]}
        </NobleCoin>,
      )
    }
    return coin
  }

  getColor = color => {
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
    let player = this.props.player
    return (
      <Modal
        visible={this.props.showCards}
        title={null}
        closable={false}
        bodyStyle={{ maxHeight: '400px', overflow: 'scroll' }}
        footer={[
          <Button key="submit" type="primary" onClick={this.props.handleOk}>
            OK
          </Button>,
        ]}>
        {player.reservedCards.length > 0 && (
          <p
            style={{
              margin: '0',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '20px',
              fontWeight: 'bold',
            }}>
            Reserved Cards:
          </p>
        )}
        <CardSection>
          {player.reservedCards.length > 0 &&
            player.reservedCards.map((card, index) => {
              let coin = this.getCoinList(card)
              let { borderColor, backgroundColor } = this.getColor(card.color)
              return (
                <Popconfirm
                  title="Buy this card?"
                  onConfirm={() => this.buyReservedCard(card, index)}
                  onCancel={this.cancel}
                  okText="Yes"
                  placement="bottom"
                  cancelText="No">
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
                    {/* <button
                  onClick={async () => {
                    await this.props.getReservedCard(card, index)
                    this.props.nextTurn()
                  }}>
                  Buy
                </button> */}
                  </ReservedCard>
                </Popconfirm>
              )
            })}
        </CardSection>
        {player.reservedCards.length > 0 && player.nobleCards.length > 0 && <hr />}
        {player.nobleCards.length > 0 && (
          <p
            style={{
              margin: '0',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '20px',
              fontWeight: 'bold',
            }}>
            Noble Cards:
          </p>
        )}
        <CardSection>
          {player.nobleCards &&
            player.nobleCards.map(card => {
              let cards = this.getNobleCoinList(card.cards)
              return (
                <NobleCard>
                  <p
                    style={{ fontSize: '20px', color: 'black', textShadow: '2px 2px 5px #979797' }}>
                    {card.value}
                  </p>
                  <NobleCardList>{cards}</NobleCardList>
                </NobleCard>
              )
            })}
        </CardSection>
      </Modal>
    )
  }
}

export default ReservedCardModal

const CardSection = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
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
const NobleCardList = styled.div`
  width: 85px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-flow: wrap;
  margin-right: 10px;
`
const NobleCoin = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;
`
