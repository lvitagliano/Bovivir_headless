import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../../store/actions/postsAction'
import { getAllPairings } from '../../../store/actions/pairingsActions'
import ContentDisplay from '../../Commons/ContentDisplay'

const DisfrutaNuestroContenido = props => {
  const { contentDisplay } = props
  const dispatch = useDispatch()

  const { posts, loading: postsLoading } = useSelector(state => state.posts.allPosts)
  const { pairings, loading: pairingsLoading } = useSelector(state => state.pairings.allPairings)

  useEffect(() => {
    pairings.length === 0 && dispatch(getAllPairings())
    posts.length === 0 && dispatch(getAllPosts())
  }, [])

  const buildItemsContentDisplay = () => {
    const lastPost = posts[0]
    const beforeLastPost = posts[1]
    const lastPairing = pairings[0]
    return [
      {
        title: lastPost?.title,
        label: 'Bonvivir',
        description: '',
        link: { label: 'Ver mas', href: `${lastPost?.uri}` },
        image: { sourceUrl: lastPost?.featuredImage?.node?.guid },
      },
      {
        title: lastPairing?.title,
        label: 'Bonvivir',
        description: '',
        link: { label: 'Ver mas', href: `${lastPairing?.uri}` },
        image: { sourceUrl: lastPairing?.featuredImage?.node?.guid },
      },
      {
        title: beforeLastPost?.title,
        label: 'Bonvivir',
        description: '',
        link: { label: 'Ver mas', href: `${beforeLastPost?.uri}` },
        image: { sourceUrl: beforeLastPost?.featuredImage?.node?.guid },
      },
    ]
  }

  return (
    <ContentDisplay
      loading={pairingsLoading || postsLoading}
      title={contentDisplay?.titledisplay || ''}
      description={contentDisplay?.descriptiondisplay}
      articles={buildItemsContentDisplay()}
      max={3}
      bcolor="#EDEAE1"
    />
  )
}

export default DisfrutaNuestroContenido
