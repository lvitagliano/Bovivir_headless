import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Iframe from 'react-iframe'
import { useSelector } from 'react-redux'
import { withRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignsubcategories: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(10, 0, 0, 0),
  },
}))

function Wordpress({ router }) {
  let iFrameID = 0

  function resizeIframe() {
    iFrameID = window.parent.document.getElementById('idIframe')?.contentWindow?.document?.body?.scrollHeight
    WithIframe(iFrameID)
  }

  useEffect(() => {
    resizeIframe()
  }, [iFrameID])

  const wordpress = useSelector(state => state.wordpress)
  if (router.asPath !== '/wordpress') {
    wordpress.wordpressUrl = wordpress.wpRoot + router.asPath
  }

  const WPIframe = () => (
    <Iframe
      id="idIframe"
      url={wordpress.wordpressUrl}
      height="100%"
      scrolling="no"
      width="100%"
      display="block"
      position="relative"
      allowFullScreen={true}
      allow="fullscreen"
      frameBorder={0}
      src={wordpress.wordpressUrl}
    />
  )

  const WithIframe = sizes => {
    return (
      <div style={{ width: '100%', height: '265vh' }}>
        <WPIframe />
      </div>
    )
  }

  return WithIframe()
}

export default withRouter(Wordpress)
