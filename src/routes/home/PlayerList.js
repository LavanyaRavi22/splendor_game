import React, { Component } from 'react'
import { Button, Select, Input } from 'antd'
import styled from 'styled-components'

const Option = Select.Option

class PlayerList extends Component {
  state = {
    numberOfPlayers: 2,
    player_1: '',
    player_2: '',
    player_3: '',
    player_4: '',
    start: false,
  }

  getNumberOfPlayers = value => {
    this.setState({ numberOfPlayers: Number(value) })
  }

  setPlayerName = (e, player) => {
    e.preventDefault()
    const update = this.state

    update['player_' + player] = e.target.value

    this.setState(update)
  }

  startGame = e => {
    e.preventDefault()

    let count = 0
    for (var i = 1; i <= this.state.numberOfPlayers; i++) {
      if (this.state['player_' + i] === ' ') count++
    }

    if (count) alert("Enter all player's name")
    else {
      let { numberOfPlayers, player_1, player_2, player_3, player_4 } = this.state
      this.setState({
        start: true,
      })
      // this.props.setPlayerDetails(numberOfPlayers, player_1, player_2, player_3, player_4)
      this.props.history.push({
        pathname: '/play',
        state: { numberOfPlayers, player_1, player_2, player_3, player_4 },
      })
    }
  }

  render() {
    let players = []
    let button = []

    for (let i = 1; i <= this.state.numberOfPlayers; i++) {
      players.push(
        <Player key={i}>
          <label key={i}> Player {i} </label>
          <Input
            type="text"
            placeholder="Name"
            value={this.state['player_' + i]}
            onChange={e => this.setPlayerName(e, i)}
          />
        </Player>,
      )
    }

    if (this.state.numberOfPlayers)
      button.push(
        <Button key="go" onClick={this.startGame}>
          Go
        </Button>,
      )

    return (
      <Players>
        <Select value={String(this.state.numberOfPlayers)} onChange={this.getNumberOfPlayers}>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
        </Select>

        <List>
          <PlayerDiv>{players}</PlayerDiv>
          <Go>{button}</Go>
        </List>
      </Players>
    )
  }
}

export default PlayerList

const Players = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .ant-select {
    width: 15%;
    margin: 0 auto;
  }
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`
const PlayerDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Go = styled.div`
  margin: 0 auto;

  .ant-btn {
    width: 100px;
    margin-top: 20%;
    font-family: 'Cormorant Garamond', serif;
  }
`

const Player = styled.div`
  width: 250px;
  margin: 1%;

  label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
  }

  .ant-input {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
  }
`
