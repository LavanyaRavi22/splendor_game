import React from 'react'
import { Modal, Button } from 'antd'
import styled from 'styled-components'

class PlayerWon extends React.Component {
  newGame = () => {
    this.props.routeProps.history.push('/')
  }

  render() {
    let player = this.props.player
    return (
      <Modal
        visible={this.props.playerWon}
        title={null}
        closable={false}
        bodyStyle={{ maxHeight: '400px', overflow: 'scroll' }}
        footer={[
          <Button key="submit" type="primary" onClick={this.newGame}>
            New Game
          </Button>,
        ]}>
        <Winner>
          <p
            style={{
              fontSize: '50px',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 'bold',
            }}>
            {player.name} Won!
          </p>
          <p style={{ fontSize: '30px', fontWeight: '300' }}>
            {player.points}
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 'bold' }}>
              points
            </span>
          </p>
        </Winner>
        {this.props.otherPlayers && (
          <p
            style={{
              fontSize: '25px',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 'bold',
              margin: '0',
            }}>
            Other players:
          </p>
        )}
        {this.props.otherPlayers &&
          this.props.otherPlayers.map(player => {
            return (
              <OtherPlayer>
                <p
                  style={{
                    fontSize: '20px',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 'bold',
                    margin: '0',
                    padding: '10px',
                  }}>
                  {player.name}
                </p>
                <span>{player.points}</span>
              </OtherPlayer>
            )
          })}
      </Modal>
    )
  }
}

export default PlayerWon

const Winner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0;
  }
`

const OtherPlayer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`
