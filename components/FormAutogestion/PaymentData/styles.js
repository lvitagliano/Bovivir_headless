import styled from 'styled-components'

const CreditCardDiv = styled.div.attrs(props => ({
  }))`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 300px;
    padding: 5%;
  `
const CreditCardImg = styled.img.attrs(props => ({
  src: props.src,
  alt: props.alt
}))`
    width: 65px;
    height: 45px;
    border-radius: 5px;
`

export{
    CreditCardDiv,
    CreditCardImg
}