import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
} from '@material-ui/core'

const columns = [
  { id: 'id', label: '', display: 'none' },
  { id: 'order_number', label: 'Orden #', minWidth: 100 },
  { id: 'created_at', label: 'Fecha', minWidth: 100 },
  { id: 'grand_total', label: 'Monto', minWidth: 100 },
  { id: 'status', label: 'Estado', minWidth: 100 },
  { id: 'actions', label: '', minWidth: 100 },
]

export default function BoughtList({ title }) {
  const { customerBoughtList } = useSelector(state => state.m2)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      <h3 style={{ color: '#47484A' }}>{title}</h3>
      <br />
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth, display: column.display }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {customerBoughtList?.items
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column, i) => {
                        const value =
                          column.id === 'created_at'
                            ? new Date(row[column.id]).toLocaleDateString()
                            : column.id === 'grand_total'
                            ? new Intl.NumberFormat('es-AR', {
                                currency: 'ARS',
                                style: 'currency',
                              }).format(row[column.id])
                            : row[column.id]
                        return i === columns.length - 1 ? (
                          <TableCell key={column.id}>
                            <IconButton
                              onClick={() => console.log('CLICK EN EDITAR: ', row.id)}
                              size="small"
                            >
                              <EditIcon />
                            </IconButton>
                            |
                            <IconButton
                              onClick={() => console.log('CLICK EN DELETE: ', row.id)}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        ) : (
                          <TableCell key={column.id} style={{ display: column.display }}>
                            {value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={customerBoughtList?.items?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage={'Filas por página'}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>
    </>
  )
}
