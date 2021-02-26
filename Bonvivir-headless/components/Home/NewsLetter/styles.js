import styled from "styled-components";

const BackgroundContainer = styled.div`
    background: #edeae1;
    padding: 40px 0;

    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
    flex-direction: column;
    margin:0 auto;
  }
`
const ContainerText = styled.div`
    margin-right: 30px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 768px) {
        margin:0 0 30px 15px;
    }
`   
const ContainerEmail = styled.div`
    width: 35%;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 768px) {
        margin:0 0 30px 15px;
        width: 90%;
    }
`
const ContainerEmailInput = styled.div`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 10px 0;
`
const EmailInput = styled.input`
    height: 40px;
    width: 100%;
    border: none;
`
export {
    BackgroundContainer,
    ContainerEmail,
    ContainerEmailInput,
    EmailInput,
    ContainerText
}