import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from '../components/CartItem'
import { getCartItems } from '../Redux/Actions/actions'

const Cart = () => {

    const dispatch = useDispatch()
    const {cartItems, loadCart, session} = useSelector(state => state.shopping)

    if(loadCart) dispatch(getCartItems(session.id))

    const handleCompra = (items) => {
        // dispatch(createOrder(items)) // falta la action de createOrder en redux
    }

    return (
        <div>
            <h1>Cart</h1>
                {
                    cartItems?.map(item => <CartItem key={item.id} item={item} session={session}/>)
                }

            <button onClick={() => handleCompra(cartItems)}>COMPRAR</button>
        </div>
    )
}

export default Cart