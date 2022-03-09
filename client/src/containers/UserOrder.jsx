import React from "react";
import { IoMdClose } from "react-icons/io";

const UserOrder = ({order, setOpenModal}) => {

    console.log(order)

    return (
        <div className="order-detail--container">
           <div className="order-detail--header">
                <p className="order-detail--header-title">
                    Tu orden #{order.id}
                </p>
                <IoMdClose onClick={() => setOpenModal(false)} className="order-detail--header-icon"/>
            </div>
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