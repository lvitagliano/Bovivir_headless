import React from 'react'
import { Container, DivImage, Link, DescContainer } from './articleStyle'
import { SubTitle, Text2 } from '../../Home/utils/commonStyles'

const Article = ({ article }) => {
  return (
    <Container flexDirection={'column'}>
      <DivImage image={article?.image.sourceUrl || `/${article.image}`} />
      <SubTitle data-testid="subtitle">{article.title}</SubTitle>
      <DescContainer style={{margin: '10px'}}>
        <Text2>{article.description}</Text2>
      </DescContainer>
      <Link data-testid="link" href={article.link.href} style={{marginBottom: '10px'}}>
        {article.link.label}
      </Link>
    </Container>
  )
}

export default Article
