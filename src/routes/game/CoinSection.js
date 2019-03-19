import React, { Component } from 'react'
import styled from 'styled-components'
// import Newcoin from '../design/Coin'

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
        totalSelected += this.state[key].selected
        if (
          (this.state[key].selected === 1 && selectedCoin === key) ||
          this.state[key].selected === 2
        )
          doubleCoin = key
      }
    }

    if (doubleCoin && totalSelected > 1) {
      alert(`You can only select 2 coins of same color or three of different colors`)
    } else if (totalSelected < 3) {
      console.log(this.state[selectedCoin])
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
    let render = []

    let { red, green, white, blue, brown, yellow } = this.state
    console.log(this.state)
    for (let key in this.state) {
      if (key !== 'currentPlayer' && key !== 'turnDone' && key !== 'yellow')
        render.push(
          <AllCoin>
            <Newcoin total={this.state[key].total} color={key} click={() => this.selectCoin(key)} />
            {this.state[key].selected !== 0 && (
              <Newcoin
                total={this.state[key].selected}
                color={key}
                click={() => this.removeCoin(key)}
              />
            )}
          </AllCoin>,
        )
    }

    console.log(render)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
        {/* <AllCoin>
          <Coin style={{ backgroundColor: '#FF2400' }} onClick={() => this.selectCoin('red')}>
            {red.total}
          </Coin>
          {red.selected !== 0 && (
            <Coin style={{ backgroundColor: 'red' }} onClick={() => this.removeCoin('red')}>
              {red.selected}
            </Coin>
          )}
        </AllCoin>
        <AllCoin>
          <Newcoin total={red.total} color="red" click={() => this.selectCoin('red')} />
          {red.selected !== 0 && (
            <Newcoin total={red.selected} color="red" click={() => this.removeCoin('red')} />
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
          <Coin style={{ backgroundColor: '#0080FF' }} onClick={() => this.selectCoin('blue')}>
            {blue.total}
          </Coin>
          {blue.selected !== 0 && (
            <Coin style={{ backgroundColor: 'blue' }} onClick={() => this.removeCoin('blue')}>
              {blue.selected}
            </Coin>
          )}
        </AllCoin>
        <AllCoin>
          <Coin style={{ backgroundColor: '#50C878' }} onClick={() => this.selectCoin('green')}>
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
        </AllCoin> */}
        {render}
        <button onClick={this.getCoins}>Get them!</button>
      </div>
    )
  }
}

export default CoinSection

const Coin = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #b22222;
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
const Newcoin = ({ color, total, click }) => {
  let primaryColor
  let secondaryColor
  let fontColor

  if (color === 'red') {
    primaryColor = '#FF2400'
    secondaryColor = '#b22222'
    fontColor = 'white'
  } else if (color === 'white') {
    primaryColor = 'white'
    secondaryColor = 'black'
    fontColor = 'black'
  } else if (color === 'blue') {
    primaryColor = '#0080FF'
    secondaryColor = '#0E4C92'
    fontColor = 'white'
  } else if (color === 'green') {
    primaryColor = '#3BB143'
    secondaryColor = '#0B6623'
    fontColor = 'white'
  } else if (color === 'brown') {
    primaryColor = 'black'
    secondaryColor = 'white'
    fontColor = 'white'
  }

  console.log(primaryColor)
  console.log(secondaryColor)

  return (
    <OuterCoin
      style={{ backgroundColor: primaryColor, borderColor: secondaryColor, color: fontColor }}
      onClick={click}>
      <InnerCoin
        style={{ backgroundColor: primaryColor, borderColor: secondaryColor, color: fontColor }}
        onClick={click}>
        {total}
      </InnerCoin>
    </OuterCoin>
  )
}

// export default Newcoin

const OuterCoin = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 20px;
`

const InnerCoin = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`
