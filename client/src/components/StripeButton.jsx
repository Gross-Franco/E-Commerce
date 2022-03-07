import React, {useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';

//the test card to use on stripe is # 4242424242424242 expiration date needs to be in the future las number any 3

const StripeButton = (subtotal) =>{
    //set up products, below is just example, at the moment we can only take 1 product at a time for the back end to function properly, so the price in the state needs to be final


    const[product, setProduct] = useState({
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
        description: 'All cart items'
    });
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
            console.log("RESPONSE", response)
            const {status} = response;
            console.log("STATUS", status)
        })
        .catch(err => console.log(err))
    }
    console.log(process.env.REACT_APP_STRIPE_PK_KEY)
    return(
        //right now is the default button, but if you add a button component inside you can change its appearce and keep the functionality
        <StripeCheckout stripeKey={process.env.REACT_APP_STRIPE_PK_KEY} 
        token={makePayment} 
        amount={product.price * 100}
        shippingAddress
        >


        </StripeCheckout>
    )


}

export default StripeButton;