import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, Modal } from 'antd'
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
    showCoinModal: false,
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
        showCoinModal: false,
      }
    } else return null
  }

  selectCoin = selectedCoin => {
    let totalSelected = 0
    let doubleCoin
    console.log(selectedCoin)

    for (var key in this.state) {
      if (key !== 'currentPlayer' && key !== 'turnDone' && key !== 'showCoinModal') {
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

    this.setState({
      showCoinModal: false,
    })
  }

  cancel = () => {
    this.setState({
      showCoinModal: false,
    })
  }

  setShowModal = () => {
    this.setState({
      showCoinModal: true,
    })
  }

  render() {
    let render = []

    for (let key in this.state) {
      if (
        key !== 'currentPlayer' &&
        key !== 'turnDone' &&
        key !== 'yellow' &&
        key !== 'showCoinModal'
      )
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

    return (
      <React.Fragment>
        <CoinList>
          {render}
          <Button onClick={this.setShowModal}>Get them!</Button>
        </CoinList>
        <Modal
          visible={this.state.showCoinModal}
          title={null}
          closable={false}
          footer={[
            <Button key="submit" onClick={this.cancel}>
              No
            </Button>,
            <Button key="submit" type="primary" onClick={this.getCoins}>
              Yes
            </Button>,
          ]}>
          <p>Do you want to get the coins?</p>
        </Modal>
      </React.Fragment>
    )
  }
}

export default CoinSection

const CoinList = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;

  .ant-btn {
    margin: 5px 20px;
  }
`

const AllCoin = styled.div`
  display: flex;
  width: 250px;
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
    secondaryColor = 'black'
    fontColor = 'white'
  }

  return (
    <OuterCoin
      style={{ backgroundColor: primaryColor, borderColor: secondaryColor, color: fontColor }}
      onClick={click}>
      {/* <InnerCoin
        style={{ backgroundColor: primaryColor, borderColor: secondaryColor, color: fontColor }}
        onClick={click}> */}
      {total}
      {/* </InnerCoin> */}
    </OuterCoin>
  )
}

// export default Newcoin

const OuterCoin = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  margin-left: 25px;
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
