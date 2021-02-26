import React from 'react';
import {Container,RowContainer,List,SocialNetwork,Wording} from "./styles";
import {Facebook} from "@styled-icons/boxicons-logos/Facebook";
import {Instagram} from "@styled-icons/boxicons-logos/Instagram";
import {Youtube} from "@styled-icons/boxicons-logos/Youtube";
import {Twitter} from "@styled-icons/boxicons-logos/Twitter";


const footerData = [
  [
        "Bonvivir",
        "Nosotros",
        "Blog",
        "Test:descubrí tu selección",
        "Singular",
        "Eventos",
        "Bonvivir en los medios"
  ],
  [
        "Club",
        "Que es el club",
        "Selecciones",
        "Experiencia",
        "Bodegas",
        "Máridages",
        "Ranking de Vinos",
  ],
  [
        "Tienda",
        "Categoria 1",
        "Categoria 2",
        "Categoria 3",
        "Seguimiento de Pedidos",
  ],
  [
        "Ayuda",
        "Contactos",
        "Preguntas Frecuentes",
        "Mas Gestiones",
        "Términos y condiciones",
        "Eventos",
        "Politicas de privacidad",
  ]
]

const index = ({data}) => {
  data = footerData;
  return (
    <div> 
      <Container>
        <RowContainer>
          {data.map((ul, index) => (
            <List key={index}>
              {ul.map((li, indexI) => 
                <li key={indexI}>{li}</li>  
              )}
            </List>
          ))}
          <List>
            <li>Seguinos</li>
            <li>
              <SocialNetwork>
                <Facebook/>
                <Instagram/>
                <Youtube/>
                <Twitter/>
              </SocialNetwork>
            </li>
          </List>
        </RowContainer>
        <Wording>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi suscipit eros eu neque tincidunt, commodo tristique sapien tempor. Ut vitae pretium nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque non urna efficitur, lacinia magna vel, volutpat libero. Phasellus consequat, eros et aliquam tincidunt, nulla ante pulvinar orci, at pretium quam dui ut purus. Nunc mollis eros id leo laoreet, a congue urna elementum. Nam lacinia cursus placerat. Integer tempor tortor augue, in venenatis quam maximus ac. 
        </Wording>
      </Container>
    </div>
  );
};

index.defaultTypes = {
  data:[]
};

export default index;