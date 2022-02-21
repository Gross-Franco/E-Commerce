import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../Redux/Actions/actions";

const ProductTable = ({ setIsOpen }) => {
  const { products, loadProducts } = useSelector((state) => state);
  const dispatch = useDispatch();

  if(loadProducts) dispatch(getProducts());
  const handleClick = () => {
    setIsOpen(prev => !prev);

  };
  return (
    <table>
      <thead className="panel-table--head">
        <tr>
          <th className="panel-table--th">Producto</th>
          <th className="panel-table--th">Precio</th>
          <th className="panel-table--th">Cantidad</th>
          <th className="panel-table--th">Opciones</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr key={product.id + product.name}>
            <td className="panel-table--td">{product.name}</td>
            <td className="panel-table--td">${product.price}</td>
            <td className="panel-table--td">{product.quantity}</td>
            <td className="panel-table--td">
              <button onClick={handleClick}>Editar</button>
              <button>Eliminar</button> 
            </td>
          </tr>
        ))}
        {products?.length === 0 && (
          <tr>
            <td colSpan="4" className="panel-table--td opacity">
              No hay productos
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
