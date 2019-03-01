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

  componentDidMount() {
    //this.props.nextTurn()
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentPlayer !== state.currentPlayer || props.turnDone) {
      return {
        tierOne: props.tierOneCards,
      }
    } else {
      return null
    }
  }

  render() {
    console.log(this.state.tierOne)
    return (
      <div>
        <Tier>
          {this.state.tierOne &&
            this.state.tierOne.map((card, index) => {
              let coin = []
              for (var key in card.cost) {
                coin.push(<Coin style={{ backgroundColor: key }}>{card.cost[key]}</Coin>)
              }
              if (card.value || card.value === 0)
                return (
                  <Card>
                    <p>{card.value}</p>
                    {coin.map(c => {
                      return c
                    })}
                    <button
                      onClick={async () => {
                        await this.props.getCard(card, index)
                        this.props.nextTurn()
                      }}>
                      Buy
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
