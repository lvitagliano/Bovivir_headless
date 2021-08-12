import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import RemoveDialog from './RemoveDialog'
import {
  Paper,
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { TableCellSort } from './styles'

const useStyles = makeStyles({
  root: {
    '&:hover': {
      color: '#00000090',
    },
    fontWeight: '600',
    cursor: 'pointer',
    userSelect: 'none',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
})

const Table = props => {
  const {
    title,
    columns,
    data,
    enableActions,
    removeDialogConfig,
    disableRowsDelete,
    onDeleteClick,
    onUpdateClick,
    onChangePageClick,
    onChangeRowsPerPageClick,
    headerStyle,
    stickyHeader,
    customActions,
    initialIdSort,
    initialDirSort,
  } = props

  const classes = useStyles()

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState({ open: false })
  const [sortConfig, setSortConfig] = useState({
    key: initialIdSort ? initialIdSort : columns.length !== 0 ? columns[0].id : '',
    direction: initialDirSort ? initialDirSort : 'asc',
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    onChangePageClick && onChangePageClick(event, newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
    onChangeRowsPerPageClick && onChangeRowsPerPageClick(event)
  }

  const onSort = sortKey => {
    if (sortConfig.key === sortKey) {
      setSortConfig({ ...sortConfig, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })
    } else {
      setSortConfig({ ...sortConfig, key: sortKey })
    }
  }

  const compareByAsc = (a, b, key) => {
    if (a[key] < b[key]) return -1
    if (a[key] > b[key]) return 1
  }

  const compareByDesc = (a, b, key) => {
    if (a[key] < b[key]) return 1
    if (a[key] > b[key]) return -1
  }

  const buildRowLabel = (value, type) => {
    switch (type) {
      case 'date':
        return new Date(value).toLocaleDateString()

      case 'dateTime':
        return new Date(value).toLocaleDateString()

      case 'currency':
        return new Intl.NumberFormat('es-AR', {
          currency: 'ARS',
          style: 'currency',
        }).format(value)

      case 'status':
        if (value === 'pending') return 'Pendiente de entrega'

      default:
        return value
    }
  }

  return (
    <>
      <RemoveDialog
        open={openDialogConfirmDelete.open}
        setOpen={() => setOpenDialogConfirmDelete({ open: false })}
        textos={{
          title: removeDialogConfig?.title,
          text: removeDialogConfig?.text,
        }}
        action={e =>
          onDeleteClick(e, openDialogConfirmDelete.id).then(
            setOpenDialogConfirmDelete({ open: false })
          )
        }
      />
      <h4>{title}</h4>
      <hr />
      <Paper>
        <TableContainer>
          <MaterialTable stickyHeader={stickyHeader} aria-label="sticky table">
            <TableHead style={headerStyle}>
              <TableRow>
                {columns.map(column => (
                  <TableCellSort
                    className={classes.root}
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      display: column.display,
                    }}
                    onClick={() => onSort(column.id)}
                    directionSort={sortConfig.direction}
                  >
                    {column.label}
                  </TableCellSort>
                ))}
                {enableActions && (
                  <TableCell
                    style={{
                      cursor: 'default',
                      userSelect: 'none',
                      fontWeight: '600',
                      paddingTop: '5px',
                      paddingBottom: '5px',
                    }}
                  >
                    {enableActions}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length === 0 ? (
                <TableRow>
                  <TableCell style={{ textAlign: 'center' }} colSpan={columns.length}>
                    No hay datos para mostrar
                  </TableCell>
                </TableRow>
              ) : (
                data
                  ?.sort((a, b) =>
                    sortConfig.direction === 'desc'
                      ? compareByDesc(a, b, sortConfig.key)
                      : compareByAsc(a, b, sortConfig.key)
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, indexRow) => {
                    return (
                      <TableRow key={indexRow}>
                        {columns.map((column, indexColumn) => {
                          return (
                            column.label &&
                            !column.hidden && (
                              <TableCell key={indexColumn}>
                                {buildRowLabel(row[column.id], column.type)}
                              </TableCell>
                            )
                          )
                        })}
                        {enableActions && (
                          <TableCell key={indexRow}>
                            {onUpdateClick && (
                              <IconButton onClick={e => onUpdateClick(e, row.id)} size="small">
                                <EditIcon />
                              </IconButton>
                            )}
                            {disableRowsDelete && !disableRowsDelete.includes(row) && (
                              <>
                                <IconButton
                                  onClick={e =>
                                    setOpenDialogConfirmDelete({ open: true, id: row.id })
                                  }
                                  size="small"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            )}
                            {customActions &&
                              customActions.map((customAction, index) => {
                                return (
                                  <div
                                    key={index}
                                    onClick={e =>
                                      customAction.onClick && customAction.onClick(e, row)
                                    }
                                  >
                                    {customAction.component}
                                  </div>
                                )
                              })}
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  })
              )}
            </TableBody>
          </MaterialTable>
        </TableContainer>
        {data?.length !== 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={data?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage={'Filas por página'}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        )}
      </Paper>
    </>
  )
}

export default Table
