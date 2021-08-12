import React from 'react'
import { Title4 } from '../../components/Home/utils/commonStyles'
import styled from 'styled-components'
import { getFrequentQuestions } from '../../services/Client/GraphQl/wp/GQLAPI'
import PorQueAsociarmeCB from '../../components/Banners/PorQueAsociarmeCB'
import Container from '@material-ui/core/Container'

const MainContainer = styled.div`
  padding: 20px 30px;

  p {
    margin-top: 30px;
  }
  h1 {
    text-align: start;
  }

  a {
    text-decoration: none;
    color: #762057;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  @media only screen and (min-width: 700px) {
    padding: 20px 0;
  }
`

function PreguntasFrecuentes({ title, content }) {
  return (
    <>
      <Container disableGutters="true">
        <MainContainer>
          <Title4 as="h1" color="#333">
            {title}
          </Title4>
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </MainContainer>
      </Container>
      <PorQueAsociarmeCB small showQuieroAsociarmeButton animate />
    </>
  )
}

PreguntasFrecuentes.getInitialProps = async () => {
  const { title, content } = await getFrequentQuestions()

  return {
    title,
    content,
  }
}

export default PreguntasFrecuentes
