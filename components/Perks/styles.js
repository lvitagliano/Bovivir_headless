import styled from 'styled-components'

const DivFlex = styled.div`
  display: flex;
`

const MemberPerksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #f7f7f7;
  padding-bottom: 2rem;
`

const MembersPerksTitle = styled.div`
  font-weight: bolder;
  font-size: 40px;
  margin-top: 2rem;
  margin-botton: 1rem;
`

const MemberPerksSubtitle = styled.div`
  font-size: 17px;
  opacity: 0.8;
`

export { MemberPerksContainer, MembersPerksTitle, MemberPerksSubtitle }
