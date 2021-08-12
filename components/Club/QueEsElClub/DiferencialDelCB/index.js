import React, { useEffect } from 'react'
import {
  BannerContainer,
  TableContainer,
  Beneficio,
  ClubBonvivir,
  OtrosClubesDeVino,
  Vinotecas,
  Supermercados,
  TableTitle,
  Tablecontent,
  TableIcon,
} from './style'
import { Title2, Text2 } from '../../../Home/utils/commonStyles'

export default function DiferencialDelCB({ data, ...props }) {
  return (
    <BannerContainer height="90em" background={data.background}>
      <Title2 text={data.title} color="#333" />
      {data.subtitle ? <Text2 alignment="center">{data.subtitle}</Text2> : null}

      <TableContainer>
        <Beneficio>
          <TableTitle justifyContent="flex-start" style={{ padding: '0 0 0 30px' }}>
            Beneficio
          </TableTitle>
          <Tablecontent style={{ padding: '16px 20px 16px 30px' }}>
            Etiquetas elegidas a través de catas a ciegas
          </Tablecontent>
          <Tablecontent style={{ padding: '16px 20px 16px 30px' }}>
            Envío 100% BONIFICADO a todo el país
          </Tablecontent>
          <Tablecontent style={{ padding: '17px 20px 17px 30px' }}>
            Incluye fichas con notas de catas y sugerencias de maridaje
          </Tablecontent>
          <Tablecontent style={{ padding: '17px 20px 17px 30px' }}>
            Acceso a contenido exclusivo y catas vituales para que disfrutes mejor cada etiqueta
          </Tablecontent>
          <Tablecontent style={{ padding: '17px 20px 17px 30px' }}>
            Descuentos adicionales en tienda online de otros vinos y productos
          </Tablecontent>
          <Tablecontent style={{ padding: '17px 20px 17px 30px' }}>
            Etiquetas de bodegas reconocidas y premiadas nacional e internacionalmente
          </Tablecontent>
          <Tablecontent style={{ padding: '17px 20px 17px 30px' }}>
            Etiquetas de bodegas boutique y medianos productores
          </Tablecontent>
          <Tablecontent style={{ padding: '16px 20px 16px 30px' }}>
            Variedad de cepas, terroirs y regiones
          </Tablecontent>
          <Tablecontent style={{ padding: '18px 20px 18px 30px' }}>
            Posibilidad de describir vinos singulares, únicos de partidas limitadas
          </Tablecontent>
          <Tablecontent style={{ padding: '16px 20px 16px 30px' }}>
            Ahorro significativo con respecto al valor unitiario de botella en el mercado
          </Tablecontent>
          <Tablecontent style={{ padding: '17px 20px 17px 30px' }}>
            Beneficios en catas y eventos del mundo del vino y de la gastronomia
          </Tablecontent>
          <Tablecontent style={{ padding: '18px 20px 18px 30px' }}>
            Acceso a preventas exclusivas de colecciones de vinos tematicas: espumantes, vinos de
            autor, rosés, etc.
          </Tablecontent>
          <Tablecontent style={{ padding: '18px 20px 18px 30px' }}>
            Asesoramiento telefónico, via email y redes sociales permanente
          </Tablecontent>
        </Beneficio>

        <ClubBonvivir>
          <TableTitle color="#fff" style={{ padding: '0 20px', borderBottom: '1px solid #843568' }}>
            Club Bonvivir
          </TableTitle>
          <TableIcon style={{ borderBottom: '1px solid #843568' }}>
            <img src="/images/checkwhite.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ borderBottom: '1px solid #843568' }}>
            <img src="/images/checkwhite.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '20px 0', borderBottom: '1px solid #843568' }}>
            <img src="/images/checkwhite.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '20px 0', borderBottom: '1px solid #843568' }}>
            <img src="/images/checkwhite.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '20px 0', borderBottom: '1px solid #843568' }}>
            <img src="/images/checkwhite.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '20px 0', borderBottom: '1px solid #843568' }}>
            <img src="/images/checkwhite.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '20px 0', borderBottom: '1px solid #843568' }}>
            <img src="/images/checkwhite.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ borderBottom: '1px solid #843568' }}>
            <img src="/images/checkwhite.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '20px 0', borderBottom: '1px solid #843568' }}>
            <img src="/images/checkwhite.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '20px 0', borderBottom: '1px solid #843568' }}>
            <img src="/images/checkwhite.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '20px 0', borderBottom: '1px solid #843568' }}>
            <img src="/images/checkwhite.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '30px 0', borderBottom: '1px solid #843568' }}>
            <img src="/images/checkwhite.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '20px 0', borderBottom: '1px solid #843568' }}>
            <img src="/images/checkwhite.PNG" alt="" />
          </TableIcon>
        </ClubBonvivir>

        <OtrosClubesDeVino>
          <TableTitle>Otros clubes de vino</TableTitle>
          <TableIcon style={{ padding: '25px 0' }}> </TableIcon>
          <TableIcon style={{ padding: '25px 0' }}> </TableIcon>
          <TableIcon style={{ padding: '22px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '21px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '22px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '21px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '12px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '21px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '45px 0' }}></TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
        </OtrosClubesDeVino>
        <Vinotecas>
          <TableTitle>Vinotecas</TableTitle>
          <TableIcon style={{ padding: '25px 0' }}></TableIcon>
          <TableIcon style={{ padding: '25px 0' }}></TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '22px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '21px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '12px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '45px 0' }}></TableIcon>
          <TableIcon style={{ padding: '21px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
        </Vinotecas>
        <Supermercados>
          <TableTitle>Supermercados y venta online</TableTitle>
          <TableIcon style={{ padding: '25px 0' }}></TableIcon>
          <TableIcon style={{ padding: '25px 0' }}></TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '22px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '21px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '12px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '22px 0' }}>
            <img src="/images/checkpurple.PNG" alt="" />
          </TableIcon>
          <TableIcon style={{ padding: '35px 0' }}></TableIcon>
          <TableIcon style={{ padding: '45px 0' }}></TableIcon>
          <TableIcon style={{ padding: '34px 0' }}></TableIcon>
        </Supermercados>
      </TableContainer>
    </BannerContainer>
  )
}
