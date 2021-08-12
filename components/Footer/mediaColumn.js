import React from 'react'
import { Instagram } from '@styled-icons/boxicons-logos/Instagram'
import { Youtube } from '@styled-icons/boxicons-logos/Youtube'
import { Twitter } from '@styled-icons/boxicons-logos/Twitter'
import { Grid } from '@material-ui/core'
import { Facebook } from '@styled-icons/boxicons-logos/Facebook'
import { useRouter } from 'next/router'

const MediaColumn = ({ menu }) => {
  const router = useRouter()

  return (
    <div style={{ textTransform: 'uppercase', margin: '1em 0 2em 5em' }}>
      <h5>SEGUINOS</h5>
      <div
        style={{
          marginLeft: '-1em',
        }}
      >
        <div
          style={{
            marginBottom: '1em',
          }}
        >
          <Grid
            container
            style={{ cursor: 'pointer' }}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {menu.map((item, i) => (
              <Grid key={i} onClick={() => window.open(item.url, '_blank')}>
                {item.label === 'Facebook' && <Facebook width="3em" height="3em" />}
                {item.label === 'Instagram' && <Instagram width="3em" height="3em" />}
                {item.label === 'Youtube' && <Youtube width="3em" height="3em" />}
                {item.label === 'Twitter' && <Twitter width="3em" height="3em" />}
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default MediaColumn
