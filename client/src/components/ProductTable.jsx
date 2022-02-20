import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/actions";

const ProductTable = () => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

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
          <tr key={product.id}>
            <td className="panel-table--td">{product.name}</td>
            <td className="panel-table--td">${product.price}</td>
            <td className="panel-table--td">1</td>
            <td className="panel-table--td"> . . . </td>
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
