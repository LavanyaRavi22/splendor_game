import React, { Component } from 'react'
import styled from 'styled-components'

class PlayerSection extends Component {
  render() {
    console.log(this.props.player)
    let player = this.props.player
    return (
      <div>
        <p>Player Details</p>
        <p>{player.name}</p>
        <div style={{ display: 'flex' }}>
          <Coin style={{ backgroundColor: 'red' }}>{player.coins.red}</Coin>
          <Coin style={{ backgroundColor: 'green' }}>{player.coins.green}</Coin>
          <Coin style={{ backgroundColor: 'blue' }}>{player.coins.blue}</Coin>
          <Coin style={{ backgroundColor: 'white' }}>{player.coins.white}</Coin>
          <Coin style={{ backgroundColor: 'brown' }}>{player.coins.brown}</Coin>
        </div>
      </div>
    )
  }
}

export default PlayerSection

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