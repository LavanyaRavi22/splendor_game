import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 150px;
  height: 150px;
  border: 2px solid #979797;
  margin: 10px;
  padding: 10px;
  background-color: #f7ecec;
`
const CardList = styled.div`
  width: 135px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-flow: wrap;
  margin-bottom: 10px;
`
const Coin = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  margin-right: 5px;
`

class NobleSection extends React.Component {
  getCoinList(card) {
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
          {card[key]}
        </Coin>,
      )
    }
    return coin
  }

  render() {
    return (
      <div style={{ width: '20%', paddingLeft: '20px', marginTop: '-25px' }}>
        {this.props.nobles &&
          this.props.nobles.map(card => {
            let cards = this.getCoinList(card.cards)
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
