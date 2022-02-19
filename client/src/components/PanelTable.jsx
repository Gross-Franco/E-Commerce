import React from "react";
import { OrdersTable, ProductTable, CategoriesTable } from "../components";

const PanelTable = ({ option }) => {
    // const data = useSelector(state => state.data);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getData(option));
    // }, [dispatch, option]);
    if(option === "Productos") return <ProductTable />

    if(option === "Categorias") return <CategoriesTable />
    return (
      <OrdersTable />
  );
};

export default PanelTable;
