import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../Redux/Actions/actions";

const UsersTable = () => {
  const { categories, loadCategories } = useSelector((state) => state);
  const dispatch = useDispatch();

  
  if(loadCategories) dispatch(getCategories());

  return (
    <table>
      <thead className="panel-table--head">
        <tr>
          <th className="panel-table--th">Username</th>
          <th className="panel-table--th">Email</th>
          <th className="panel-table--th">Admin</th>
          <th className="panel-table--th">Opciones</th>
        </tr>
      </thead>
      <tbody>
        {categories?.map((category) => (
          <tr key={category.id}>
            <td className="panel-table--td">{category.name}</td>
            <td className="panel-table--td">{category.description}</td>
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

export default UsersTable;
