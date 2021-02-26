import React, { useState, useEffect } from 'react'
import { Container, ArticleContainer, ButtonContainer, TextContainer } from './styles'
import Article from './Article'
import { Title2, Text2 } from '../../Home/utils/commonStyles'
import Button from '../../Commons/Button'
import useWindowWidth from '../../utils/hooks/useWindowWidth'
import { useRouter } from 'next/router'

const ContentDisplay = ({ data, max, ...props }) => {
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
    <Container flexDirection={'column'}  bcolor="#edeae1">
      <Title2
        data-testid="_title"
        text={data?.titledisplay || title}
        alignment="center"
        color="#333"
      />
      <TextContainer>
        <Text2 alignment="center">{data?.descriptiondisplay || description}</Text2>
      </TextContainer>
      <ArticleContainer>
        {data?.itemsdisplay.map((article, i) => {
          if (i < count)
            return <Article key={`art_${i}`} article={article?.cf_home_contentDisplay_item} />
        }) ||
          articles.map((article, i) => {
            if (i < count) return <Article key={`art_${i}`} article={article} />
          })}
      </ArticleContainer>
      <ButtonContainer>
        <Button data-testid="_btn1" text={data?.button1display.text1display || 'IR AL BLOG'} />
        <Button
          data-testid="_btn2"
          text={data?.button2display.text1display || 'VER MAS MÁRIDAJES'}
        />
      </ButtonContainer>
    </Container>
  )
}

ContentDisplay.defaultProps = {
  articles: [],
  max: 3,
}

export default ContentDisplay
