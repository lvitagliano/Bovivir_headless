import styled from 'styled-components'

const Login = styled.button.attrs(props => ({}))`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  border: 1px solid black;
  width: 25px;
  height: 25px;
`

const Title = styled.p`
  font-weight:800;
  font-size:2em;
  text-align:center;
`

const ButtonWrapper = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: center;
`

export { 
    Login,
    Title,
    ButtonWrapper
}
