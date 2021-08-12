import React from 'react'
import {
  TableContainer,
  TableContainerColumn,
  TableTitleColumn,
  TableParagraphRow,
} from './styles'

/////////////////////////
import Dialog from '@material-ui/core/Dialog'

export default function BoughtDetails({ handler }) {
  return (
    <Dialog
      className="boughtDetails"
      maxWidth={false}
      open={handler.open}
      onClose={() => handler.setOpen(false)}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '78vh',
          width: '80vw',
          alignItems: 'center',
          padding: '1rem',
        }}
      >
        <h1>Descripcion</h1>
        <TableContainer>
          <TableContainerColumn width="100%">
            <div>
              <TableTitleColumn>Producto</TableTitleColumn>
            </div>
            <div>
              <TableParagraphRow>Alta Vista Edition Speciale 2018</TableParagraphRow>
            </div>
          </TableContainerColumn>

          <TableContainerColumn width="100%">
            <div>
              <TableTitleColumn>SKU</TableTitleColumn>
            </div>
            <div>
              <TableParagraphRow>BTI000060383</TableParagraphRow>
            </div>
          </TableContainerColumn>
          <TableContainerColumn width="100%">
            <div>
              <TableTitleColumn>Precio</TableTitleColumn>
            </div>
            <div>
              <TableParagraphRow style={{ fontWeight: 'bold' }}>$3,600.00</TableParagraphRow>
            </div>
          </TableContainerColumn>
          <TableContainerColumn width="100%">
            <div>
              <TableTitleColumn>Cantidad</TableTitleColumn>
            </div>
            <div>
              <TableParagraphRow>ordered: 1</TableParagraphRow>
            </div>
            <div>
              <TableParagraphRow>Subtotal</TableParagraphRow>
            </div>
            <div>
              <TableParagraphRow>Gastos de envío</TableParagraphRow>
            </div>
            <div>
              <TableParagraphRow>Otros Cargos</TableParagraphRow>
            </div>
            <div>
              <TableParagraphRow
                fontWeight="bold"
                style={{
                  fontSize: '0.9em',
                  fontWeight: 'bold',
                }}
              >
                Total
              </TableParagraphRow>
            </div>
          </TableContainerColumn>

          <TableContainerColumn width="100%">
            <div>
              <TableTitleColumn>Sub total</TableTitleColumn>
            </div>
            <div>
              <TableParagraphRow style={{ color: '#333', fontWeight: 'bold' }}>
                $3,600.00
              </TableParagraphRow>
            </div>
            <div>
              <TableParagraphRow style={{ color: '#333' }}>$3,600.00</TableParagraphRow>
            </div>
            <div>
              <TableParagraphRow>$220.00</TableParagraphRow>
            </div>
            <div>
              <TableParagraphRow>$0.00</TableParagraphRow>
            </div>
            <div>
              <TableParagraphRow
                style={{
                  fontSize: '0.9em',
                  fontWeight: 'bold',
                }}
              >
                $3,820.00
              </TableParagraphRow>
            </div>
          </TableContainerColumn>
        </TableContainer>
      </div>
    </Dialog>
  )
}
