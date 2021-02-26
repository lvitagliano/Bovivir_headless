import { deleteCustomerAddress } from '../../services/Client/GraphQl/m2/GQLAPI'
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
  { id: 'firstname', label: 'Nombre', minWidth: 100 },
  { id: 'lastname', label: 'Apellido', minWidth: 100 },
  { id: 'street', label: 'Calle', minWidth: 100 },
  { id: 'city', label: 'Ciudad', minWidth: 100 },
  { id: 'region', label: 'Provincia', minWidth: 100 },
  { id: 'postcode', label: 'CP', minWidth: 100 },
  { id: 'telephone', label: 'Telefono', minWidth: 100 },
  { id: 'actions', label: '', minWidth: 100 },
]

export default function TableAllAddress({ rows }) {
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
      <h4>Todas mis direcciones</h4>
      <hr />
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
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column, i) => {
                      const value = row[column.id]?.region || row[column.id]

                      return i === columns.length - 1 ? (
                        <TableCell key={column.id}>
                          <IconButton
                            onClick={() => console.log('CLICK EN EDITAR: ', row.id)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          |
                          {rows.length >= 2 ? (
                            <IconButton onClick={() => deleteCustomerAddress(row.id)} size="small">
                              <DeleteIcon />
                            </IconButton>
                          ) : null}
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
          count={rows.length}
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
