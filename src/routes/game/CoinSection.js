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
    currentPlayer: this.props.currentPlayer,
    turnDone: this.props.turnDone,
  }

  componentDidMount() {
    //console.log(this.state)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentPlayer !== state.currentPlayer || props.turnDone) {
      return {
        red: {
          total: props.coins.red,
          selected: 0,
        },
        green: {
          total: props.coins.green,
          selected: 0,
        },
        white: {
          total: props.coins.white,
          selected: 0,
        },
        blue: {
          total: props.coins.blue,
          selected: 0,
        },
        brown: {
          total: props.coins.brown,
          selected: 0,
        },
        yellow: {
          total: props.coins.yellow,
          selected: 0,
        },
        currentPlayer: props.currentPlayer,
        turnDone: props.turnDone,
      }
    } else return null
  }

  selectCoin = selectedCoin => {
    let totalSelected = 0
    let doubleCoin

    console.log(selectedCoin)

    for (var key in this.state) {
      if (key !== 'currentPlayer' && key !== 'turnDone') {
        console.log(this.state[key].selected)
        totalSelected += this.state[key].selected
        // console.log(this.state[key].selected)
        if (
          (this.state[key].selected === 1 && selectedCoin === key) ||
          this.state[key].selected === 2
        )
          doubleCoin = key
      }
    }

    console.log(doubleCoin)
    console.log(totalSelected)

    if (doubleCoin && totalSelected > 1) {
      alert(`You can only select 2 coins of same color or three of different colors`)
    } else if (totalSelected < 3) {
      let numberOfCoin = this.state[selectedCoin]

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
    } else {
      alert(`You have selected maximum number of coins allowed.`)
    }
  }

  removeCoin = selectedCoin => {
    let numberOfCoin = this.state[selectedCoin]
    // console.log(numberOfCoin)

    this.setState({
      [selectedCoin]: {
        total: numberOfCoin.total + 1,
        selected: numberOfCoin.selected - 1,
      },
    })
  }

  getCoins = async () => {
    let purchasedCoins = {
      red: this.state.red.selected,
      green: this.state.green.selected,
      white: this.state.white.selected,
      blue: this.state.blue.selected,
      brown: this.state.brown.selected,
    }

    await this.props.getCoins(purchasedCoins)
    this.props.nextTurn()
  }

  render() {
    let { red, green, white, blue, brown, yellow } = this.state
    console.log(this.state)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
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
        <button onClick={this.getCoins}>Get them!</button>
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
