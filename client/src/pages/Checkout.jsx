import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import StripeButton from "../components/StripeButton";


// This values are the props in the UI
const amount = "10";
const currency = "USD";
const style = {"layout":"vertical"};
const items = [
    //unit amount is the price
    {id: 1, unit_amount: 5, name: 'primero', quantity: 1, description: "primer ejemplo"},
    {id: 2, unit_amount: 5, name: 'segundo', quantity: 2, description: "segundo ejemplo"},
]

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    //still cant sent the order to the back end, for the time being we can replicate the transaction just need to set the amount to the correct value
    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                    item: items.map(item =>{
                                        return{
                                            unit_amount: item.unit_amount,
                                            name: item.name,
                                            quantity: item.quantity,
                                            description: item.description
                                        }
                                    })
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            console.log(orderId)
                            return orderId;
                        });
                }}
                onApprove={async (data, actions) => {
                    const order = actions.order.capture();
                    console.log(order)
                }}
            />
        </>
    );
}


//changed to stripe since paypal was causing errors
export default function Checkout() {
	return (
		<StripeButton />

	);
}
