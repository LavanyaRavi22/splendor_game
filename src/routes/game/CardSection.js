import React, { Component } from 'react'
import styled from 'styled-components'

const Tier = styled.div`
  display: flex;
  flex-direction: row;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
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

const CoinList = styled.div`
  width: 200px;
  height: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-flow: wrap;
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

  render() {
    return (
      <div style={{ width: '80%' }}>
        <Tier>
          {this.state.tierOne &&
            this.state.tierOne.map((card, index) => {
              let coin = []
              for (var key in card.cost) {
                coin.push(<Coin style={{ backgroundColor: key }}>{card.cost[key]}</Coin>)
              }
              if (card.value || card.value === 0)
                return (
                  <Card style={{ backgroundColor: card.color }}>
                    <p>{card.value}</p>
                    <CoinList>
                      {coin.map(c => {
                        return c
                      })}
                    </CoinList>
                    <button
                      onClick={async () => {
                        await this.props.getCard(card, index, 1)
                        this.props.nextTurn()
                      }}>
                      Buy
                    </button>
                    <button
                      onClick={async () => {
                        await this.props.reserveCard(card, index, 1)
                        this.props.nextTurn()
                      }}>
                      Reserve
                    </button>
                  </Card>
                )
              else return <Card />
            })}
        </Tier>
        <Tier>
          {this.state.tierTwo &&
            this.state.tierTwo.map((card, index) => {
              let coin = []
              for (var key in card.cost) {
                coin.push(<Coin style={{ backgroundColor: key }}>{card.cost[key]}</Coin>)
              }
              if (card.value || card.value === 0)
                return (
                  <Card style={{ backgroundColor: card.color }}>
                    <p>{card.value}</p>
                    <CoinList>
                      {coin.map(c => {
                        return c
                      })}
                    </CoinList>
                    <button
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
                    </button>
                  </Card>
                )
              else return <Card />
            })}
        </Tier>
        <Tier>
          {this.state.tierThree &&
            this.state.tierThree.map((card, index) => {
              let coin = []
              for (var key in card.cost) {
                coin.push(<Coin style={{ backgroundColor: key }}>{card.cost[key]}</Coin>)
              }
              if (card.value || card.value === 0)
                return (
                  <Card style={{ backgroundColor: card.color }}>
                    <p>{card.value}</p>
                    <CoinList>
                      {coin.map(c => {
                        return c
                      })}
                    </CoinList>
                    <button
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
                    </button>
                  </Card>
                )
              else return <Card />
            })}
        </Tier>
      </div>
    )
  }
}

export default CardSection
