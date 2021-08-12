import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

export default function RemoveDialog({ open, setOpen, textos, action }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
      <DialogTitle>{textos.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{textos.text}</DialogContentText>
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
