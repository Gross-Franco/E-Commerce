import React from "react";

const UserOrder = ({order, setOpenModal}) => {

    console.log(order)

    return (
        <div>
            <button onClick={() => setOpenModal(false)}>Close</button>
            <ul>
                <li>Order</li>
                <li>Total: {order.total}</li>
                <li>Status: {order.status}</li>
                <li>Date: {new Date(order.createdAt).toLocaleDateString()}</li>
            </ul>
            <ul>
                <li>Payment</li>
                <li>Amount: {order.payment?.amount}</li>
                <li>Provider: {order.payment?.provider}</li>
                <li>Status: {order.payment?.status}</li>
            </ul>
            <ul>
                <li>Items</li>
                    {
                    order.orderItems?.map(item => (
                        <li>{item.quantity} of {item.product}</li>
                    ))
                    }
            </ul>
        </div>
    )
}

export default UserOrder;