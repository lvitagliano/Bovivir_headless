import styled from 'styled-components'

const DivImage = styled.img.attrs(props => ({
  src: props.image,
}))`
  height: 10em;
  width: 10em;
  object-fit: cover;
`
const Divs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3em;
`
const Li = styled.li`
 list-style:none;
 font-size:20px;
 text-align: -webkit-center;
`

const Ul = styled.ul`
 display: flex;
  flex-direction: column;
  align-items: center;
  margin-right:30px;
`


export { Divs, DivImage, Li, Ul }