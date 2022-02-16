import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const Cart = () => {

  return (
    <div className='cart-container'>
        <FiShoppingCart className='cart-icon'/>
        <div className='cart-count'>
            O
        </div>
    </div>
  )
}

export default Cart;