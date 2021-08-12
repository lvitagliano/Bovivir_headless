const AddresBox = props => {
  const { title, data } = props
  const multiLabelsContainerStyle = {
    margin: '1em 0 5px',
    display: 'flex',
    justifyContent: 'space-between',
  }

  const labelsContainerStyle = { margin: '1em 0 5px' }

  const boxStyle = {
    width: '50%',
  }

  const labelStyle = {
    fontWeight: 'bold',
    fontSize: 'smaller',
    opacity: 0.7,
  }

  const dataStyle = {
    fontSize: 'medium',
  }

  const boxInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem',
  }

  return (
    <div style={boxStyle}>
      <h5 style={{ paddingLeft: '15px' }}>{title}</h5>
      {data ? (
        <div style={boxInfoStyle}>
          <div style={multiLabelsContainerStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Nombre: </label>
              <br />
              <b style={dataStyle}>{data.firstname}</b>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Apellido: </label>
              <br />
              <b style={dataStyle}>{data.lastname}</b>
            </div>
          </div>
          <div style={labelsContainerStyle}>
            <label style={labelStyle}>Dirección: </label>
            <br />

            <b style={dataStyle}>{data.street?.join(' ')}</b>
          </div>
          <div style={labelsContainerStyle}>
            <label style={labelStyle}>Localidad: </label>
            <br />

            <b style={dataStyle}>{data.city}</b>
          </div>
          <div style={labelsContainerStyle}>
            <label style={labelStyle}>Provincia: </label>
            <br />

            <b style={dataStyle}>{data.region?.region}</b>
          </div>
          <div style={multiLabelsContainerStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>C.P.: </label>
              <br />

              <b style={dataStyle}>{data.postcode}</b>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Teléfono: </label>
              <br />

              <b style={dataStyle}>{data.telephone}</b>
            </div>
          </div>
        </div>
      ) : (
        <div>No hay dirección por defecto</div>
      )}
    </div>
  )
}

export default function DefaultAddress({ defaultShipping, defaultBilling }) {
  return (
    <>
      <h4>Direcciones por defecto</h4>
      <div style={{ display: 'flex' }}>
        <AddresBox title="Dirección de facturación por defecto" data={defaultBilling} />
        <div style={{ width: '1px', backgroundColor: '#00000026' }} />
        <AddresBox title="Dirección de entrega por defecto" data={defaultShipping} />
      </div>
    </>
  )
}
