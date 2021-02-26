import {CupImg, Bowl, Inner, CupContainer, Fill, Wave} from './styles'
import theme from "../../Styles/themes/main";
import {ThemeProvider} from "styled-components";

const Cup = ({size, desktopAnimation, step}) => {
  const offset = (size==='sm' ? 20:0);
  const img = "/images/copita.png"

  return (

    <ThemeProvider theme={theme}>
      <CupContainer>
        <CupImg src={img}/>
        <Bowl>
          <Inner>
            <Fill style={{transform: `translate(0, ${desktopAnimation[step] + offset }px)` }}>
              <Wave>
               <path d='M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4 c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9 c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z' />
              </Wave> 
            </Fill>
          </Inner>
        </Bowl>
      </CupContainer>
    </ThemeProvider>
  );
}

Cup.defaultProps = {
  step: 0
};

export default Cup;
