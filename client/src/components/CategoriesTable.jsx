import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../Redux/Actions/actions";

const CategoriesTable = () => {
  const { categories } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <table>
      <thead className="panel-table--head">
        <tr>
          <th className="panel-table--th">Categoria</th>
          <th className="panel-table--th">Slug</th>
          <th className="panel-table--th">Opciones</th>
        </tr>
      </thead>
      <tbody>
        {categories?.map((category) => (
          <tr key={category.id}>
            <td className="panel-table--td">{category.name}</td>
            <td className="panel-table--td">{category.description}</td>
            <td className="panel-table--td"> . . . </td>
          </tr>
        ))}
        {categories?.length === 0 && (
          <tr>
            <td colSpan="4" className="panel-table--td opacity">
              No hay categorias
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
