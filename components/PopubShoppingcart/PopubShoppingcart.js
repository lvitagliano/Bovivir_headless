import React from 'react'
import {
    ShoppingcartContainer,
    ShoppingcartContainerChild,
    ShoppingcartIconButton,
    PriceBold,
    FlexContainer,
    ButtonIcon
} from "./styles"
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core'
import Link from 'react-storefront/link/Link'

const PopubShoppingcart = () => {
    return (
        <>
            <ShoppingcartContainer>
              <ShoppingcartContainerChild>
                <p>1 item in cart</p>
                <p>
                  Cart subtotal: <br/> 
                  <PriceBold>$1,650.00</PriceBold>
                </p>
              </ShoppingcartContainerChild>
              <Button variant="contained" color="primary" size="medium" style={{margin: '20px'}}>Ir al Checkout</Button>
            </ShoppingcartContainer>

            <ShoppingcartContainerChild style={{alignItems: 'flex-end'}}>
              <FlexContainer>
                <div  style={{display: 'flex', flexDirection: 'row'}}>
                  <a href="" style={{
                    textDecoration: 'none'
                    }}>
                      <img src=" " alt="festejos" />
                  </a>   
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <a href="" style={{
                    textDecoration: 'none'
                    }}> festejos
                  </a>
                  <p style={{fontWeight: 'bold'}}>$1,650.00</p>
                  <p>Qty: 1</p>
                </div>
              </FlexContainer>
              <ShoppingcartIconButton>
                <ButtonIcon><CreateIcon style={{color: '#82807f'}}/></ButtonIcon>
                <ButtonIcon><DeleteIcon style={{color: '#82807f'}}/></ButtonIcon>
              </ShoppingcartIconButton>
            </ShoppingcartContainerChild>

            <ShoppingcartContainer>
              <Link href="/cart">
                <a style={{textAlign:'center', padding: '20px', textDecoration: 'none'}}>View and Edit Cart</a>
              </Link>
            </ShoppingcartContainer>
        </>
    )
}

export default PopubShoppingcart