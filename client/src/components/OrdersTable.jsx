import React from 'react'

const OrdersTable = () => {
  return (
    <table>
    <thead>
      <tr>
        <th className="panel-table--th">Pedido #</th>
        <th className="panel-table--th">Fecha/Hora</th>
        <th className="panel-table--th">Estado</th>
        <th className="panel-table--th">Cantidad</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="panel-table--td">1</td>
        <td className="panel-table--td">19/2/2022, 10:40:14</td>
        <td className="panel-table--td">Pendiente</td>
        <td className="panel-table--td">1</td>
      </tr>
    </tbody>
  </table>
  )
}

export default OrdersTable