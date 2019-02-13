import React, { Component } from 'react'

class PlayerList extends Component {
  state = {
    numberOfPlayers: null,
    playerDetails: false,
    player_1: ' ',
    player_2: ' ',
    player_3: ' ',
    player_4: ' ',
    start: false,
  }

  getPlayerDetails = () => {
    this.setState({
      playerDetails: true,
    })
  }

  getNumberOfPlayers = e => {
    if (e.target.value > 4 && e.target.value < 0) {
      alert('Maximum players: 4')
      this.setState({ numberOfPlayers: 0 }, () => console.log('In here'))
    } else
      this.setState({ numberOfPlayers: e.target.value }, () => {
        //console.log(this.state.numberOfPlayers);
        this.getPlayerDetails()
      })
  }

  setPlayerName = (e, player) => {
    e.preventDefault()
    const update = this.state

    update['player_' + player] = e.target.value

    this.setState(update, () => {
      //console.log(this.state)
    })
  }

  startGame = e => {
    e.preventDefault()

    let count = 0
    for (var i = 1; i <= this.state.numberOfPlayers; i++) {
      if (this.state['player_' + i] === ' ') count++
    }

    if (count) alert("Enter all player's name")
    else {
      this.setState({
        start: true,
      })
      this.props.history.push('/play')
    }
  }

  render() {
    let players = []

    for (let i = 1; i <= this.state.numberOfPlayers; i++) {
      players.push(
        <div key={i}>
          <label key={i}> Player {i} </label>
          <input
            type="text"
            placeholder="Name"
            value={this.state['player_' + i]}
            onChange={e => this.setPlayerName(e, i)}
          />
        </div>,
      )
    }

    if (this.state.numberOfPlayers)
      players.push(
        <button key="go" onClick={this.startGame}>
          Go
        </button>,
      )

    return (
      <div>
        <input
          type="number"
          value={this.state.numberOfPlayers}
          onChange={this.getNumberOfPlayers}
        />

        <div>{this.state && this.state.playerDetails && players}</div>
      </div>
    )
  }
}

export default PlayerList
