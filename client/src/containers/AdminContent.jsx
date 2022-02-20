import React from "react";
import { Panel } from "../containers";

const AdminContent = ({ option, setIsOpen}) => {
  if(option) {
      return <Panel option={option} setIsOpen={setIsOpen} />
  }

  return <div className="admin--empty">En esta sección podrás administrar tu tienda!</div>;
};

export default AdminContent;
