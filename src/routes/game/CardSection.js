import React, { Component } from 'react'
import styled from 'styled-components'

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
  padding: 5px;
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
  width: 225px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-flow: wrap;
  margin-bottom: 20px;
  background-color: #fcfbfb;
  height: 110px;
  margin-bottom: 0;
  padding-top: 35px;
  border-radius: 10px;
  border: 1px solid #b6b6b6;
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
        secondaryColor = 'white'
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
                    onClick={async () => {
                      await this.props.getCard(card, index, 1)
                      this.props.nextTurn()
                    }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p>{card.value}</p>
                      <ReservedCoin
                        onClick={async e => {
                          e.stopPropagation()
                          await this.props.reserveCard(card, index, 1)
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
                    onClick={async () => {
                      await this.props.getCard(card, index, 2)
                      this.props.nextTurn()
                    }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p>{card.value}</p>
                      <ReservedCoin
                        onClick={async e => {
                          e.stopPropagation()
                          await this.props.reserveCard(card, index, 2)
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
                    onClick={async () => {
                      await this.props.getCard(card, index, 3)
                      this.props.nextTurn()
                    }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p>{card.value}</p>
                      <ReservedCoin
                        onClick={async e => {
                          e.stopPropagation()
                          await this.props.reserveCard(card, index, 3)
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
      </div>
    )
  }
}

export default CardSection
