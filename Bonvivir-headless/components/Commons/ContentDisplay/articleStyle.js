import styled from "styled-components";

const Container = styled.div`
    display:flex;
    flex-direction: ${props => props.flexDirection};
    align-items: center;
    justify-content: center;
`

const DivImage = styled.img.attrs(props => ({src: props.image}))`
  display:flex;
  flex-direction: column;
  height: 300px;
  width: 300px;
  object-fit: cover;
  margin: 10px 0px;
`

const Link = styled.a`
  text-transform: uppercase;
  color: ${ props => props.theme.colors.primary};
  text-decoration: underline;
  font-weight:700;
  &:hover {
    color: ${ props => props.theme.colors.secondary};
  }
`

const DescContainer = styled.div`
  text-align:center;
  max-width:25em;
`

  export { 
    Container,
    DivImage,
    Link,
    DescContainer
  }