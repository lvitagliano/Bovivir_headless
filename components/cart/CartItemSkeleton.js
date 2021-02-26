import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Row from 'react-storefront/Row'
import { Hbox } from 'react-storefront/Box'
import { Skeleton } from '@material-ui/lab'

const styles = theme => ({
  root: {
    flex: 1,
    padding: theme.spacing(2, 5, 2, 2),
    marginBottom: theme.spacing(2),
    position: 'relative',
  },
  thumb: {
    marginRight: theme.spacing(2),
    width: 200,
    [theme.breakpoints.down('xs')]: {
      width: 100,
    },
  },
  label: {
    marginRight: theme.spacing(0.6),
  },
  remove: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
})
const useStyles = makeStyles(styles)

export default function CartItem() {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.root} elevation={0}>
        <Hbox alignItems="flex-start">
          <div className={classes.thumb}>
            <Skeleton variant="rect" width={200} height={200} />
          </div>
          <div className={classes.info}>
            <Skeleton variant="h1" width={500} />
            <Row>
              <Skeleton variant="h1" width={500} />
              <br />
              <Skeleton variant="h1" width={500} />
            </Row>
          </div>
        </Hbox>
      </Paper>
    </>
  )
}
