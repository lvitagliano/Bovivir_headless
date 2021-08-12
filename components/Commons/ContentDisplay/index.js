import React, { useState, useEffect } from 'react'
import { Container, ArticleContainer, ButtonContainer, TextContainer } from './styles'
import Article from './Article'
import { Title2, Text2, Title1 } from '../../Home/utils/commonStyles'
import Button from '../../Commons/Button'
import useWindowWidth from '../../utils/hooks/useWindowWidth'
import { useRouter } from 'next/router'
import Spinner from '../Spinner'
import { ContainerLgCustom } from '../../Commons/ContainerLg'

const ContentDisplay = ({ data, max, loading, queesclub, hiddenFooterButtons, ...props }) => {
  const { width } = useWindowWidth(0)
  const [count, setCount] = useState(max)
  const router = useRouter()
  const { title, description, articles } = props
  useEffect(() => {
    if (width < 600) {
      setCount(2)
    } else {
      setCount(max)
    }
  }, [width])

  const handleClick = (link = '') => {
    if (link) {
      router.push(link, '', { shallow: true })
    }
  }

  return (
    <Container bcolor="#edeae1">
      <ContainerLgCustom flexDirection={'column'}>
        {loading ? (
          <Spinner size={100} />
        ) : (
          <>
            {queesclub ? (
              <Title1 style={{ textAlign: 'center' }} margin="0" color="#333">
                {title}
              </Title1>
            ) : (
              <Title2 data-testid="_title" text={title} alignment="center" color="#333" />
            )}
            <TextContainer>
              <Text2 alignment="center">{data?.descriptiondisplay || description}</Text2>
            </TextContainer>
            <ArticleContainer>
              {data?.itemsdisplay.map((article, i) => {
                if (i < count)
                  return (
                    <Article
                      key={`art_${i}`}
                      article={article?.cf_home_contentDisplay_item}
                      queesclub={queesclub && queesclub}
                    />
                  )
              }) ||
                articles.map((article, i) => {
                  if (i < count)
                    return (
                      <Article
                        key={`art_${i}`}
                        article={article}
                        queesclub={queesclub && queesclub}
                      />
                    )
                })}
            </ArticleContainer>
            {!hiddenFooterButtons && (
              <ButtonContainer>
                {queesclub ? (
                  <a href="/beneficios" style={{ textDecoration: 'none' }}>
                    <Button
                      data-testid="_btn1"
                      text={data?.button1display.text1display || 'ver más beneficios'}
                    />
                  </a>
                ) : (
                  <>
                    <a href="/notas" style={{ textDecoration: 'none' }}>
                      <Button
                        data-testid="_btn1"
                        text={data?.button1display.text1display || 'IR AL BLOG'}
                      />
                    </a>
                    <a href="/maridajes" style={{ textDecoration: 'none' }}>
                      <Button
                        data-testid="_btn2"
                        text={data?.button2display.text1display || 'VER MAS MÁRIDAJES'}
                      />
                    </a>
                  </>
                )}
              </ButtonContainer>
            )}
          </>
        )}
      </ContainerLgCustom>
    </Container>
  )
}

ContentDisplay.defaultProps = {
  articles: [],
  max: 3,
}

export default ContentDisplay
