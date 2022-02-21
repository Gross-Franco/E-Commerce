import React from "react";
import { OrdersTable, ProductTable, CategoriesTable } from "../components";

const PanelTable = ({ option, setIsOpen }) => {
    // const data = useSelector(state => state.data);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getData(option));
    // }, [dispatch, option]);
    if(option === "Productos") return <ProductTable setIsOpen={setIsOpen} />

    if(option === "Categorias") return <CategoriesTable setIsOpen={setIsOpen} />
    return (
      <OrdersTable />
  );
};

export default PanelTable;
