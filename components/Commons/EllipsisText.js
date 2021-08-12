import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

const useStylesBootstrap = makeStyles(theme => ({
  arrow: {
    color: theme.palette.common.white,
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))

function LightTooltip(props) {
  const classes = useStylesBootstrap()

  return <Tooltip style={{ margin: '0' }} arrow placement="top" classes={classes} {...props} />
}

const EllipsisText = ({ mytext, maxlimit }) => {
  if (mytext.length > maxlimit) {
    return (
      <LightTooltip title={mytext}>
        <p>{mytext.substring(0, maxlimit - 3) + '...'}</p>
      </LightTooltip>
    )
  } else {
    return <p style={{ margin: '0' }}>{mytext}</p>
  }
}

export default EllipsisText
