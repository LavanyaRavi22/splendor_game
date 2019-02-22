import React, { Component } from 'react'
import styled from 'styled-components'

const Tier = styled.div`
  display: flex;
  flex-direction: column;
`

const Card = styled.div`
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

class CardSection extends Component {
  state = {
    tierOne: this.props.tierOneCards,
  }

  render() {
    console.log(this.state.tierOne)
    return (
      <div>
        <Tier>
          {this.state.tierOne &&
            this.state.tierOne.map(card => {
              let coin = []
              for (var key in card.cost) {
                coin.push(<Coin style={{ backgroundColor: key }}>{card.cost[key]}</Coin>)
              }

              console.log(coin)
              console.log(card.cost)
              return (
                <Card>
                  <p>{card.value}</p>
                  {coin.map(c => {
                    return c
                  })}
                  <button onClick={() => this.props.getCard(card)}>Buy</button>
                </Card>
              )
            })}
        </Tier>
      </div>
    )
  }
}

export default CardSection
