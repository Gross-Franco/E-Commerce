import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCartItem, editCartItemQty } from '../Redux/Actions/actions'


const CartItem = ({item, session}) => {

    const dispatch = useDispatch()

    const handleEditQuantity = (session, product, e) => {
        dispatch(editCartItemQty({sessionId:session, productId:product, quantity:e.target.value}))
    }

    const handleDeleteItem = (session, product) => {
        dispatch(deleteCartItem(session, product))
    }

    return (
      <div>
        <button onClick={() => handleDeleteItem(session.id, item.product.id)}>X</button>
        <h1>{item.product.name}</h1>
        <h3>Price per unit: ${item.product.price}</h3>
        <input name="quantity" type="number" max={item.product.inventory} value={item.quantity} onChange={(e)=>handleEditQuantity(session.id, item.product.id, e)}/>
        <h3>Total: {item.product.price * item.quantity}</h3>
      </div>
  )
}

export default CartItem