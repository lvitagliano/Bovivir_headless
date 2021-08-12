import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 0 30px 0;
`
const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 25em;
  margin: 0 0 30px 0;
`
const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${props => props.width};
  height: 25em;
`
const BlogContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 340px);
  grid-auto-flow: dense;
  grid-column-gap: 30px;
  column-gap: 30px;
  row-gap: 30px;
  justify-content: center;
  padding-bottom: 4em;
  margin-bottom: 30px;
  width: 100%;

  padding: 10px;
`
const BlogCart = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
`
const BlogCartImg = styled.div`
  width: 100%;
  height: 15em;
`
const BlogCartParagraph = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  margin: 10px 0 0 0;
`
export {
  Container,
  ButtonsContainer,
  BannerContainer,
  Banner,
  BlogContainer,
  BlogCart,
  BlogCartImg,
  BlogCartParagraph,
}
