import React, { useState } from 'react'
import { filterOrderByStatus, getOrders, setAddOrUpdate } from '../Redux/Actions/actions';
import {useDispatch, useSelector} from 'react-redux'

const OrdersTable = ({setIsOpen}) => {
  
  const { orders, loadOrders } = useSelector((state) => state.shopping);
  const dispatch = useDispatch();
  
  if(loadOrders) dispatch(getOrders());

  const handleOrderChange = (e) => {
    let filter = e.target.value
    filter === "Todos" ? dispatch(getOrders()) : 
    dispatch(filterOrderByStatus(filter))
  }

  const handleClick = (order) => {
    dispatch(setAddOrUpdate(order))
    setIsOpen(prev => !prev);
  };
  
  return (
    <table>
    <thead>
      <tr>
        <th className="panel-table--th">Pedido #</th>
        <th className="panel-table--th">Total</th>
        <th className="panel-table--th">
          <label>Estado:</label>
          <select name="estados" id="estados" onChange={handleOrderChange}>
            <option value="Todos">Todos</option>
            <option value="Created">Created</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </th>
        <th className="panel-table--th">Options</th>
      </tr>
    </thead>
    <tbody>
        {orders?.map((order) => (
          <tr key={order.id}>
            <td className="panel-table--td">{order.id}</td>
            <td className="panel-table--td">{order.total}</td>
            <td className="panel-table--td">{order.status}</td>
            <td className="panel-table--td">
              <button className="panel-table--td_buttons" onClick={() => handleClick(order)}>Editar</button>
            </td>
          </tr>
        ))}
        {orders?.length === 0 && (
          <tr>
            <td colSpan="4" className="panel-table--td opacity">
              No hay categorias
            </td>
          </tr>
        )}
    </tbody>
  </table>
  )
}

export default OrdersTable