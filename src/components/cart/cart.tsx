import React from "react";
// import {  Theme, createStyles } from "@material-ui/core/styles";
import { Drawer, Divider, List, makeStyles, Container, Typography} from "@material-ui/core";
import { ProductList } from "../mockProducts/productsAPI";
import CardFactory from "../cardFactory/cardFactory";

import CloseIcon from '@material-ui/icons/Close';
import {cartProduct} from "../cardFactory/cardFactory";
import { Product } from "../../interfaces&types/interfaces";

const useStyles = makeStyles({
    list: {
        width: "100%",
    },
});


interface Props {
    isOpen: boolean;
    toggleDrawer: (anchor: string, open: boolean) => void
    cartList: string;
}

export default function Cart(props: Props) {
    const classes = useStyles();
    // const [state, setState] = React.useState({
    //     right: false,
    //     cartList: [],
    // })

    
    const newCartList = props.cartList
    const list = () => (
        <div
            className={classes.list}
            role="presentation"
        >   
            <List>
                <Typography variant="h4">
					Cart
				</Typography> 
            </List>
            <List>
                <Container style={{width: "100%"}}>
                    {newCartList.map((product: Product) => (
                        <CardFactory product={product} view="cart" />
                    ))}
                    {/* {newCartList != undefined &&
                            {newCartList.map(product => (
                                <CardFactory product={product} view="cart" />
                            ))}} */}
                    
                    {/* {cartList.length === 0 &&
                        <Typography variant="h4">
					        Your cart is empty
				        </Typography> 
                    } */}
                       
                </Container>
            </List>
            <Divider style={{display: "flex"}} />
            <List>
                <Typography variant="h4">
					Total: 10000
				</Typography> 
            </List>
            <Divider />
            <List>
                <Typography variant="h4">
					Button
				</Typography> 
            </List>
        </div>
    );
    return (
        <div>
            <React.Fragment>
                
                <Drawer
                     anchor='right'
                     open={props.isOpen}>
                     <CloseIcon style={{ height: "2rem", fontSize: 'large'}} onClick={() => props.toggleDrawer('right', false)} />
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    )
}