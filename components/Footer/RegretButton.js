import React from 'react';
import {RegretButtonContainer, RegretButtonContent} from "./styles";

const RegretButton = ({data}) => {
  return (
    <> 
      <RegretButtonContainer href={data.href}>
        <RegretButtonContent>{data.label}</RegretButtonContent>
      </RegretButtonContainer>
    </>
  );
};

export default RegretButton;