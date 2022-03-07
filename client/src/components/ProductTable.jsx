import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, setAddOrUpdate } from "../Redux/Actions/actions";

const ProductTable = ({ setIsOpen }) => {
  const { products, loadProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  if(loadProducts) dispatch(getProducts());
  
  const handleClick = (product) => {
    dispatch(setAddOrUpdate(product))
    setIsOpen(prev => !prev);
  };
   console.log(products)
  return (
    <table>
      <thead className="panel-table--head">
        <tr>
          <th className="panel-table--th">Producto</th>
          <th className="panel-table--th">Precio</th>
          <th className="panel-table--th">Cantidad</th>
          <th className="panel-table--th">Opcion</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr key={product.id + product.name}>
            <td className="panel-table--td">{product.name}</td>
            <td className="panel-table--td">${product.price}</td>
            <td className="panel-table--td">{product.quantity}</td>
            <td className="panel-table--td">
              <button className="panel-table--td_buttons" onClick={() => handleClick(product)}>Editar</button>
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
