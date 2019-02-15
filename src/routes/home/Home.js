import React, { Component } from 'react'
import PlayerList from './PlayerList'

class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <p>Splendor</p>
          <p>With Superheroes</p>
        </div>
        <PlayerList {...this.props} setPlayerDetails={this.props.setPlayerDetails} />
      </div>
    )
  }
}

export default Home
