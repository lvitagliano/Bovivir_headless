import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

export default function RemoveDialog({ open, setOpen, name, action }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <DialogContentText>Esta seguro que desea eliminar este producto?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={action}>ELIMINAR</Button>
        <Button onClick={() => setOpen(false)} color="primary">
          CANCELAR
        </Button>
      </DialogActions>
    </Dialog>
  )
}
