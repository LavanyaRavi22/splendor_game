import React from 'react'
import { Modal, Button } from 'antd'
import styled from 'styled-components'

class ReservedCardModal extends React.Component {
  render() {
    let player = this.props.player
    return (
      <Modal
        visible={this.props.showCards}
        title={null}
        closable={false}
        bodyStyle={{ height: '400px', overflow: 'scroll' }}
        footer={[
          <Button key="submit" type="primary" onClick={this.props.handleOk}>
            OK
          </Button>,
        ]}>
        {player.reservedCards.length > 0 &&
          player.reservedCards.map((card, index) => {
            let coin = []
            for (var key in card.cost) {
              coin.push(
                <ReservedCoin style={{ backgroundColor: key }}>{card.cost[key]}</ReservedCoin>,
              )
            }
            return (
              <ReservedCard style={{ backgroundColor: card.color }}>
                <p>{card.value}</p>
                <CoinList>
                  {coin.map(c => {
                    return c
                  })}
                </CoinList>
                {/* <button
                  onClick={async () => {
                    await this.props.getReservedCard(card, index)
                    this.props.nextTurn()
                  }}>
                  Buy
                </button> */}
              </ReservedCard>
            )
          })}
      </Modal>
    )
  }
}

export default ReservedCardModal

const ReservedCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 160px;
  height: 110px;
  border: 2px solid black;
  margin: 5px;
  padding: 5px;
  background-color: #fcfbfb;
`
const ReservedCoin = styled.div`
  width: 35px;
  height: 35px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  margin-bottom: 10px;
`

const CoinList = styled.div`
  width: 150px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-flow: wrap;
`
