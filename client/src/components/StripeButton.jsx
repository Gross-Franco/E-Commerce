import React, {useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart } from '../Redux/Actions/actions';

//the test card to use on stripe is # 4242424242424242 expiration date needs to be in the future las number any 3

const StripeButton = (subtotal) =>{
    //set up products, below is just example, at the moment we can only take 1 product at a time for the back end to function properly, so the price in the state needs to be final

    const { user } = useSelector((state) => state.session);
    const dispatch = useDispatch()

    const product= {
        id: subtotal.products.map((product) =>{
            return product.id
        }),
        quantity: subtotal.products.map((product) =>{
            return product.quantity
        }),
        name: subtotal.products.map((product) =>{
            return product.name
        }).toString(),
        price: Math.floor(subtotal.subTotal),
        description: 'All cart items',
        userid: user? user.id: null
    };
    //the token is automatically created by stripe we just need to call it
    const makePayment = token =>{
        const body = {
            token,
            product
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        return fetch(`http://localhost:3001/checkout/payments`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }).then(response =>{
            const {status} = response;
            if(status === 200) {
                dispatch(deleteCart())
                subtotal.setOpenModal(false)
            }
            console.log(subtotal)
            console.log("RESPONSE", response)
            console.log("STATUS", status)
        })
        .catch(err => console.log(err))
    }
    return(
        //right now is the default button, but if you add a button component inside you can change its appearce and keep the functionality
        <StripeCheckout stripeKey={process.env.REACT_APP_STRIPE_PK_KEY} 
        token={makePayment} 
        amount={product.price * 100}
        shippingAddress
        >
            <Button  variant="primary" width='500px'>Compra ahora</Button>

        </StripeCheckout>
    )


}

export default StripeButton;