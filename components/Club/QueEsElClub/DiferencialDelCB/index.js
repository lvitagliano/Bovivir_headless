import React, {useEffect} from 'react'
import {BannerContainer} from "./style"
import {Title2,Text2} from '../../../Home/utils/commonStyles';

export default function DiferencialDelCB({data, ...props}){

    return(
        <BannerContainer height={data.height} background={data.background}>
            <Title2 text={data.title} color="#333"/>
            {data.subtitle ? <Text2 alignment='center'>{data.subtitle}</Text2> : null }
        </BannerContainer>
    )
}