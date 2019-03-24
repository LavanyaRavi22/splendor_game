import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, Modal } from 'antd'

const Tier = styled.div`
  display: flex;
  flex-direction: row;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 240px;
  height: 165px;
  border: 2px solid black;
  margin: 5px;
  border-radius: 10px;
`

const Coin = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`

const CoinList = styled.div`
  width: 236px;
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

const ReservedCoin = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: #eeeb53;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Cormorant Garamond', serif;
  font-weight: bold;
  border: 1px solid #a78400;
  color: #a78400;
`

class CardSection extends Component {
  state = {
    tierOne: this.props.tierOneCards,
    tierTwo: this.props.tierTwoCards,
    tierThree: this.props.tierThreeCards,
    showBuyCardModal: false,
    showReserveCardModal: false,
    card: {},
    index: null,
    tier: null,
    reserveCard: {},
    reserveIndex: null,
    reserveTier: null,
  }

  setBuyCardModal = (card, index, tier) => {
    this.setState({
      card,
      index,
      tier,
      showBuyCardModal: true,
    })
  }

  setReserveCardModal = (card, index, tier) => {
    this.setState({
      reserveCard: card,
      reserveIndex: index,
      reserveTier: tier,
      showReserveCardModal: true,
    })
  }

  buyCard = async () => {
    let { card, index, tier } = this.state
    await this.props.getCard(card, index, tier)
    this.props.nextTurn()
    this.setState({
      showBuyCardModal: false,
    })
  }

  cancel = () => {
    this.setState({
      showBuyCardModal: false,
    })
  }

  reserveCard = async () => {
    let { reserveCard, reserveIndex, reserveTier } = this.state
    await this.props.reserveCard(reserveCard, reserveIndex, reserveTier)
    this.setState({
      showReserveCardModal: false,
    })
  }

  cancelReserve = () => {
    this.setState({
      showReserveCardModal: false,
    })
  }

  componentDidMount() {
    //this.props.nextTurn()
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentPlayer !== state.currentPlayer || props.turnDone) {
      return {
        tierOne: props.tierOneCards,
        tierTwo: props.tierTwoCards,
        tierThree: props.tierThreeCards,
      }
    } else {
      return null
    }
  }

  getCoinList(card) {
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
        secondaryColor = 'black'
        fontColor = 'white'
      }
      coin.push(
        <Coin
          style={{
            backgroundColor: primaryColor,
            borderColor: secondaryColor,
            color: fontColor,
          }}>
          {card.cost[key]}
        </Coin>,
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
    return (
      <div style={{ width: '1000px' }}>
        <Tier>
          {this.state.tierOne &&
            this.state.tierOne.map((card, index) => {
              let coin = this.getCoinList(card)
              if (card.value || card.value === 0) {
                let { borderColor, backgroundColor } = this.getColor(card.color)
                return (
                  <Card
                    style={{ borderColor: borderColor, backgroundColor: backgroundColor }}
                    onClick={() => {
                      this.setBuyCardModal(card, index, 1)
                    }}>
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', margin: '5px' }}>
                      <p
                        style={{
                          fontSize: '35px',
                          margin: '0',
                          marginLeft: '10px',
                          color: 'white',
                          textShadow: '1px 1px 3px black',
                        }}>
                        {card.value}
                      </p>
                      <ReservedCoin
                        onClick={e => {
                          e.stopPropagation()
                          this.setReserveCardModal(card, index, 1)
                        }}>
                        R
                      </ReservedCoin>
                    </div>
                    <CoinList>
                      {coin.map(c => {
                        return c
                      })}
                    </CoinList>
                    {/* 
                    <button
                      onClick={async () => {
                        await this.props.reserveCard(card, index, 1)
                        this.props.nextTurn()
                      }}>
                      Reserve
                    </button> */}
                  </Card>
                )
              } else return <Card />
            })}
        </Tier>
        <Tier>
          {this.state.tierTwo &&
            this.state.tierTwo.map((card, index) => {
              let coin = this.getCoinList(card)
              if (card.value || card.value === 0) {
                let { borderColor, backgroundColor } = this.getColor(card.color)
                return (
                  <Card
                    style={{ borderColor: borderColor, backgroundColor: backgroundColor }}
                    onClick={() => {
                      this.setBuyCardModal(card, index, 2)
                    }}>
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', margin: '5px' }}>
                      <p
                        style={{
                          fontSize: '35px',
                          margin: '0',
                          marginLeft: '10px',
                          color: 'white',
                          textShadow: '1px 1px 3px black',
                        }}>
                        {card.value}
                      </p>
                      <ReservedCoin
                        onClick={e => {
                          e.stopPropagation()
                          this.setReserveCardModal(card, index, 2)
                        }}>
                        R
                      </ReservedCoin>
                    </div>
                    <CoinList>
                      {coin.map(c => {
                        return c
                      })}
                    </CoinList>
                    {/* <button
                      onClick={async () => {
                        await this.props.getCard(card, index, 2)
                        this.props.nextTurn()
                      }}>
                      Buy
                    </button>
                    <button
                      onClick={async () => {
                        await this.props.reserveCard(card, index, 2)
                        this.props.nextTurn()
                      }}>
                      Reserve
                    </button> */}
                  </Card>
                )
              } else return <Card />
            })}
        </Tier>
        <Tier>
          {this.state.tierThree &&
            this.state.tierThree.map((card, index) => {
              let coin = this.getCoinList(card)
              if (card.value || card.value === 0) {
                let { borderColor, backgroundColor } = this.getColor(card.color)
                return (
                  <Card
                    style={{ borderColor: borderColor, backgroundColor: backgroundColor }}
                    onClick={() => {
                      this.setBuyCardModal(card, index, 3)
                    }}>
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', margin: '5px' }}>
                      <p
                        style={{
                          fontSize: '35px',
                          margin: '0',
                          marginLeft: '10px',
                          color: 'white',
                          textShadow: '1px 1px 3px black',
                        }}>
                        {card.value}
                      </p>
                      <ReservedCoin
                        onClick={e => {
                          e.stopPropagation()
                          this.setReserveCardModal(card, index, 3)
                        }}>
                        R
                      </ReservedCoin>
                    </div>
                    <CoinList>
                      {coin.map(c => {
                        return c
                      })}
                    </CoinList>
                    {/* <button
                      onClick={async () => {
                        await this.props.getCard(card, index, 3)
                        this.props.nextTurn()
                      }}>
                      Buy
                    </button>
                    <button
                      onClick={async () => {
                        await this.props.reserveCard(card, index, 3)
                        this.props.nextTurn()
                      }}>
                      Reserve
                    </button> */}
                  </Card>
                )
              } else return <Card />
            })}
        </Tier>
        <Modal
          visible={this.state.showBuyCardModal}
          title={null}
          closable={false}
          footer={[
            <Button key="submit" onClick={this.cancel}>
              No
            </Button>,
            <Button key="submit" type="primary" onClick={this.buyCard}>
              Yes
            </Button>,
          ]}>
          <p>Do you want to buy this card?</p>
        </Modal>
        <Modal
          visible={this.state.showReserveCardModal}
          title={null}
          closable={false}
          footer={[
            <Button key="submit" onClick={this.cancelReserve}>
              No
            </Button>,
            <Button key="submit" type="primary" onClick={this.reserveCard}>
              Yes
            </Button>,
          ]}>
          <p>Do you want to reserve this card?</p>
        </Modal>
      </div>
    )
  }
}

export default CardSection
