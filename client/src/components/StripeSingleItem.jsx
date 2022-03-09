import React, {useEffect, useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

//the test card to use on stripe is # 4242424242424242 expiration date needs to be in the future las number any 3

const StripeSingleItem = () =>{
    //set up products, below is just example, at the moment we can only take 1 product at a time for the back end to function properly, so the price in the state needs to be final

    const { productDetail } = useSelector((state) => state.products);
    // console.log("PRODUCT IN PAGE", productDetail)

    const productId = productDetail.id
    const productPrice = productDetail.price
    const productName = productDetail.name
    // console.log("PRODUCTID", productId)

    const[product, setProduct] = useState({
        id: productId,
        quantity: 1,
        name: productName,
        price: Math.floor(productPrice),
        description: 'All cart items'
    });

    useEffect(() =>{
        setProduct({
            id: productId,
            quantity: 1,
            name: productName,
            price: Math.floor(productPrice),
            description: 'All cart items'
        })
    }, [productDetail])
    // console.log("PRODUCT IN STRIPE", product)
    //the token is automatically created by stripe we just need to call it
    const makePayment = token =>{
        const body = {
            token,
            product
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        return fetch(`http://localhost:3001/checkout/detail/payments1item`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }).then(response =>{
            // console.log(subtotal)
            console.log("RESPONSE", response)
            const {status} = response;
            console.log("STATUS", status)
        })
        .catch(err => console.log(err))
    }
    // console.log(process.env.REACT_APP_STRIPE_PK_KEY)
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

export default StripeSingleItem;