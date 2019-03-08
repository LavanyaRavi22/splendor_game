import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
`
const CardList = styled.div`
  width: 200px;
  height: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-flow: wrap;
`
const Coin = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 20px;
`

class NobleSection extends React.Component {
  render() {
    return (
      <div>
        {this.props.nobles &&
          this.props.nobles.map(card => {
            let cards = []
            for (var key in card.cards) {
              cards.push(<Coin style={{ backgroundColor: key }}>{card.cards[key]}</Coin>)
            }
            return (
              <Card>
                <p>{card.value}</p>
                <CardList>
                  {cards.map(c => {
                    return c
                  })}
                </CardList>
              </Card>
            )
          })}
      </div>
    )
  }
}

export default NobleSection
