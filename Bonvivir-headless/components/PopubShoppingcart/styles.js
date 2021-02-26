import styled from "styled-components";

const ShoppingcartContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    outline: 1px solid #cacaca;
`
const ShoppingcartContainerChild = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
`
const ShoppingcartIconButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 30px;
    width: 30%;
`
const PriceBold = styled.span`
    font-weight: bold;
    font-size: 1.2em;
`
const ButtonProcedToChekout = styled.button`
    margin: 0 20px 15px 20px; 
    height: 50px;
    border: none;
    border-radius: 3px;
    background: #0069c2;
    color: #fff;
    font-size: 1.3em;
`
const ButtonIcon = styled.button`
    border: none;
    background: transparent;
`

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    width: 45%;
`

export {
    ShoppingcartContainer,
    ShoppingcartContainerChild,
    ShoppingcartIconButton,
    PriceBold,
    ButtonProcedToChekout,
    FlexContainer,
    ButtonIcon
}