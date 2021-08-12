import React, { useEffect } from 'react'
import {
  Container,
  ButtonsContainer,
  BannerContainer,
  Banner,
  BlogContainer,
  BlogCart,
  BlogCartParagraph,
  BlogCartImg,
} from './style'
import Button from '../Commons/Button'
import { getAllPosts } from '../../store/actions/postsAction'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Commons/Spinner'

const BlogBonvivir = () => {
  const dispatch = useDispatch()
  const { posts, loading: postsLoading } = useSelector(state => state.posts.allPosts)

  useEffect(() => {
    posts.length === 0 && dispatch(getAllPosts())
  }, [])

  const firstBlog = posts[0] || {}

  return (
    <>
      <Container>
        <h1 style={{ fontSize: '3em' }}>Blog Bonvivir</h1>
        <ButtonsContainer>
          <button style={{ padding: '5px' }}>Tendencias</button>
          <button style={{ padding: '5px' }}>Regiones vitivinicolas</button>
          <button style={{ padding: '5px' }}>Noticias del mundo del vino</button>
          <button style={{ padding: '5px' }}>Tips para winelovers</button>
          <button style={{ padding: '5px' }}>ABC del vino</button>
          <button style={{ padding: '5px' }}>Vinos Bonvivir</button>
          <button style={{ padding: '5px' }}>Vinos Singulares</button>
        </ButtonsContainer>
        {postsLoading ? (
          <Spinner />
        ) : (
          <>
            <BannerContainer>
              <Banner
                width="70%"
                style={{ background: `url(${firstBlog?.featuredImage?.node?.guid})` }}
              ></Banner>
              <Banner
                width="30%"
                style={{
                  padding: '0 20px 0 20px',
                  background: '#772057',
                }}
              >
                <h1 style={{ color: '#fff' }}>{firstBlog?.title || ''}</h1>
                <p style={{ color: '#fff' }}>"(Ver que var trae esta info en customPosts)"</p>
                <Button text="ver mas" variant="secondary" outline="1px solid #fff" />
              </Banner>
            </BannerContainer>
            <BlogContainer>
              {posts.map(
                (post, i) =>
                  i !== 0 && (
                    <a
                      key={i}
                      href={post.uri}
                      style={{ textDecoration: 'none', cursor: 'pointer', color: '#333' }}
                    >
                      <BlogCart>
                        <BlogCartImg
                          style={{
                            // outline: '1px solid blue',
                            width: '100%',
                            height: '15em',
                            background: `url(${post.featuredImage?.node?.guid})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                          }}
                        ></BlogCartImg>
                        <BlogCartParagraph>{post.title}</BlogCartParagraph>
                      </BlogCart>
                    </a>
                  )
              )}
            </BlogContainer>
          </>
        )}
      </Container>
    </>
  )
}

export default BlogBonvivir
