import React from 'react'
import { Container, DivImage, Link, DescContainer } from './articleStyle'
import { SubTitle, Text2 } from '../../Home/utils/commonStyles'
import Button from '../Button'

const Article = ({ article, queesclub }) => {
  return (
    <Container flexDirection={'column'}>
      <DivImage image={article?.image?.sourceUrl || `/${article.image}`} />
      <SubTitle
        data-testid="subtitle"
        style={{ textAlign: 'center' }}
        textTransform={!queesclub && 'uppercase'}
      >
        {article.title}
      </SubTitle>
      {article.description && (
        <DescContainer style={{ margin: '10px' }}>
          <Text2>{article.description}</Text2>
        </DescContainer>
      )}
      {queesclub ? (
        <a href={article.link.href} style={{ textDecoration: 'none' }}>
          <Button text={article.link.label} variant="primary" />
        </a>
      ) : (
        <Link
          data-testid="link"
          href={article.link.href}
          style={{ marginBottom: '1rem', marginTop: '1rem' }}
        >
          {article.link.label}
        </Link>
      )}
    </Container>
  )
}

export default Article
