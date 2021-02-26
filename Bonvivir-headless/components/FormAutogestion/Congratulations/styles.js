import styled from 'styled-components'

const ContainerCongratulation = styled.div`
    background: #ccc;

    display: flex;
    justify-content: center;
    padding: 30px 0;
`
const InfoContainer = styled.div`
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 5px 0px;
    border-radius: 5px;
    width: 40%;
    padding: 30px 0;

    display: flex;
    flex-direction: column;
    align-items: center;
`
const Line = styled.div`
    width: 100px;
    height: 1px;
    background: black;
    background: #707070;
    margin: 20px;
`
const Title1 = styled.h1`
    font-size: 35px;
    color: #762057;
    margin: 10px 0;
`
const Subtitle1 = styled.h2`
    font-size: 20px;
    color: #762057;
    margin: 0 0 20px 0;
`
const Text1 = styled.p`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    width: 55%;
    margin: 0;
`
const Subtitle2 = styled(Subtitle1)`
    color: #000;
`

export {
    ContainerCongratulation,
    InfoContainer,
    Line,
    Title1,
    Subtitle1,
    Text1,
    Subtitle2
}