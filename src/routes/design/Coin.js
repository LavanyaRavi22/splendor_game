import styled from 'styled-components'

const Newcoin = ({ color, total }) => {
  let primaryColor
  let secondaryColor

  if (color === 'red') {
    primaryColor = '#FF2400'
    secondaryColor = 'b22222'
  }

  return (
    <OuterCoin style={{ backgroundColor: { primaryColor }, borderColor: { secondaryColor } }}>
      <InnerCoin style={{ backgroundColor: { secondaryColor }, borderColor: { primaryColor } }}>
        {total}
      </InnerCoin>
    </OuterCoin>
  )
}

export default Newcoin

const OuterCoin = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InnerCoin = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`
