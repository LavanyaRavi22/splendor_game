import React, { Component } from 'react'
import styled from 'styled-components'

class CoinSection extends Component {
  state = {
    red: {
      total: this.props.coins.red,
      selected: 0,
    },
    green: {
      total: this.props.coins.green,
      selected: 0,
    },
    white: {
      total: this.props.coins.white,
      selected: 0,
    },
    blue: {
      total: this.props.coins.blue,
      selected: 0,
    },
    brown: {
      total: this.props.coins.brown,
      selected: 0,
    },
    yellow: {
      total: this.props.coins.yellow,
      selected: 0,
    },
  }

  componentDidMount() {
    console.log(this.state)
  }

  selectCoin = selectedCoin => {
    let numberOfCoin = this.state[selectedCoin]
    console.log(numberOfCoin)
    if (numberOfCoin.total > 0) {
      this.setState({
        [selectedCoin]: {
          total: numberOfCoin.total - 1,
          selected: numberOfCoin.selected + 1,
        },
      })
    } else {
      alert(`No ${selectedCoin} coins are available. Select another.`)
    }
  }

  removeCoin = selectedCoin => {
    let numberOfCoin = this.state[selectedCoin]
    console.log(numberOfCoin)

    this.setState({
      [selectedCoin]: {
        total: numberOfCoin.total + 1,
        selected: numberOfCoin.selected - 1,
      },
    })
  }

  render() {
    let { red, green, white, blue, brown, yellow } = this.state

    return (
      <div>
        <AllCoin>
          <Coin style={{ backgroundColor: 'red' }} onClick={() => this.selectCoin('red')}>
            {red.total}
          </Coin>
          {red.selected !== 0 && (
            <Coin style={{ backgroundColor: 'red' }} onClick={() => this.removeCoin('red')}>
              {red.selected}
            </Coin>
          )}
        </AllCoin>
        <AllCoin>
          <Coin style={{ backgroundColor: 'white' }} onClick={() => this.selectCoin('white')}>
            {white.total}
          </Coin>
          {white.selected !== 0 && (
            <Coin style={{ backgroundColor: 'white' }} onClick={() => this.removeCoin('white')}>
              {white.selected}
            </Coin>
          )}
        </AllCoin>
        <AllCoin>
          <Coin style={{ backgroundColor: 'blue' }} onClick={() => this.selectCoin('blue')}>
            {blue.total}
          </Coin>
          {blue.selected !== 0 && (
            <Coin style={{ backgroundColor: 'blue' }} onClick={() => this.removeCoin('blue')}>
              {blue.selected}
            </Coin>
          )}
        </AllCoin>
        <AllCoin>
          <Coin style={{ backgroundColor: 'green' }} onClick={() => this.selectCoin('green')}>
            {green.total}
          </Coin>
          {green.selected !== 0 && (
            <Coin style={{ backgroundColor: 'green' }} onClick={() => this.removeCoin('green')}>
              {green.selected}
            </Coin>
          )}
        </AllCoin>
        <AllCoin>
          <Coin style={{ backgroundColor: 'brown' }} onClick={() => this.selectCoin('brown')}>
            {brown.total}
          </Coin>
          {brown.selected !== 0 && (
            <Coin style={{ backgroundColor: 'brown' }} onClick={() => this.removeCoin('brown')}>
              {brown.selected}
            </Coin>
          )}
        </AllCoin>
        <AllCoin>
          <Coin style={{ backgroundColor: 'yellow' }} onClick={() => this.selectCoin('yellow')}>
            {yellow.total}
          </Coin>
          {yellow.selected !== 0 && (
            <Coin style={{ backgroundColor: 'yellow' }} onClick={() => this.removeCoin('yellow')}>
              {yellow.selected}
            </Coin>
          )}
        </AllCoin>
      </div>
    )
  }
}

export default CoinSection

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

const AllCoin = styled.div`
  display: flex;
`
