import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser, promoteUser } from "../Redux/Actions/actions";

const UsersTable = () => {
  const { users, loadUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  if(loadUsers) dispatch(getUsers());

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
  };

  const handlePromote = (id) => {
    dispatch(promoteUser(id))
  };

  // const handlePasswordReset = () => {
  //   dispatch(pr)
  // }

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
        {users?.map((user) => (
          <tr key={user.id}>
            <td className="panel-table--td">{user.username}</td>
            <td className="panel-table--td">{user.email}</td>
            <td className="panel-table--td"><input type="checkbox" checked={user.isAdmin} disabled/></td>
            <td className="panel-table--td"> 
              {
              !user.isAdmin &&
                <button className="panel-table--td_buttons" onClick={() => handlePromote(user.id)} >Promover</button>
              }
              {
              !user.isAdmin &&
                <button className="panel-table--td_buttons" onClick={() => handleDelete(user.id)} >Eliminar</button>
              }
              {/* {
              !user.isAdmin &&
                <button className="panel-table--td_buttons" onClick={() => handlePasswordReset(user.id)} >Reset password</button>
              } */}
            </td>
          </tr>
        ))}
        {users?.length === 0 && (
          <tr>
            <td colSpan="4" className="panel-table--td opacity">
              No hay usuarios
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UsersTable;
