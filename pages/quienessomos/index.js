import React from 'react'
import QuienesSomosBanner from '../../components/QuienesSomos/QuienesSomosBanner'
import SeleccionDeVinos from '../../components/QuienesSomos/SeleccionDeVinos'
import ClubBonvivirBotellas from '../../components/QuienesSomos/ClubBonvivirBotellas'
import Comunidad from '../../components/QuienesSomos/Comunidad'

const Quienessomos = () => {
    return(
        <>
            <QuienesSomosBanner/>
            <SeleccionDeVinos/>
            <ClubBonvivirBotellas/>
            <Comunidad/>
        </>
    )
}

export default Quienessomos