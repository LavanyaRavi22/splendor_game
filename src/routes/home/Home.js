import React, { Component } from 'react'
import PlayerList from './PlayerList'
import styled from 'styled-components'

class Home extends Component {
  render() {
    return (
      <div style={{ paddingTop: '10%' }}>
        <Title>
          <Splendor>SPLENDOR</Splendor>
          <SubTitle>With Superheroes</SubTitle>
        </Title>
        <PlayerList {...this.props} />
      </div>
    )
  }
}

export default Home

const Splendor = styled.p`
  font-family: 'Lilita One', cursive;
  font-size: 50px;
  margin: 0;
`

const Title = styled.div`
  margin: 0 auto;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SubTitle = styled.p`
  font-family: 'Pacifico', cursive;
  font-size: 20px;
`
