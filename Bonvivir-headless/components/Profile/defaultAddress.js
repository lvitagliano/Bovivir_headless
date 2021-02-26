export default function DefaultAddress({ defaultShipping, defaultBilling }) {
  return (
    <>
      <h4>Direcciones por defecto</h4>
      <hr />
      <div style={{ display: 'flex', marginLeft: '1em' }}>
        <div style={{ width: '50%' }}>
          <h5>Dirección de facturacion por defecto</h5>
          {defaultBilling ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: '5em',
                  margin: '1em 0',
                }}
              >
                <label>Nombre: </label>
                <b>{defaultBilling.firstname}</b>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: '5em',
                  margin: '1em 0',
                }}
              >
                <label>Apellido: </label>
                <b>{defaultBilling.lastname}</b>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: '5em',
                  margin: '1em 0',
                  textAlign: 'end',
                }}
              >
                <label>Dirección: </label>
                <b>{defaultBilling.street.join(' ')}</b>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: '5em',
                  margin: '1em 0',
                }}
              >
                <label>Localidad: </label>
                <b>{defaultBilling.city}</b>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: '5em',
                  margin: '1em 0',
                }}
              >
                <label>Provincia: </label>
                <b>{defaultBilling.region.region}</b>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: '5em',
                  margin: '1em 0',
                }}
              >
                <label>Codigo Postal: </label>
                <b>{defaultBilling.postcode}</b>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingRight: '5em',
                  margin: '1em 0',
                }}
              >
                <label>Teléfono: </label>
                <b>{defaultBilling.telephone}</b>
              </div>
            </div>
          ) : (
            <div>No hay direccion por defecto</div>
          )}
        </div>

        <div style={{ width: '50%' }}>
          <h5>Dirección de entrega por defecto</h5>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {defaultShipping ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingRight: '5em',
                    margin: '1em 0',
                  }}
                >
                  <label>Nombre: </label>
                  <b>{defaultShipping.firstname}</b>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingRight: '5em',
                    margin: '1em 0',
                  }}
                >
                  <label>Apellido: </label>
                  <b>{defaultShipping.lastname}</b>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingRight: '5em',
                    margin: '1em 0',
                    textAlign: 'end',
                  }}
                >
                  <label>Dirección: </label>
                  <b>{defaultShipping.street.join(' ')}</b>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingRight: '5em',
                    margin: '1em 0',
                  }}
                >
                  <label>Localidad: </label>
                  <b>{defaultShipping.city}</b>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingRight: '5em',
                    margin: '1em 0',
                  }}
                >
                  <label>Provincia: </label>
                  <b>{defaultShipping.region.region}</b>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingRight: '5em',
                    margin: '1em 0',
                  }}
                >
                  <label>Codigo Postal: </label>
                  <b>{defaultShipping.postcode}</b>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingRight: '5em',
                    margin: '1em 0',
                  }}
                >
                  <label>Teléfono: </label>
                  <b>{defaultShipping.telephone}</b>
                </div>
              </div>
            ) : (
              <div>No hay direccion por defecto</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
