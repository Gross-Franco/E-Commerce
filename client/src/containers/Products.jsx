import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import p from "../helpers/mockProducts";
<<<<<<< HEAD
import { Product } from "../components";
import { getProductsPublic } from "../Redux/Actions/actions";

=======
import { getProducts } from "../Redux/Actions/actions";
import CardItemsHome from "./ItemsDisplayHome/CardItemsHome";
>>>>>>> fe3aa24a30d64ee5d053f2048829542ecd6c193c
const Products = () => {
  // const { products } = p;

  const {products} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if(products.length === 0) dispatch(getProductsPublic());
  }, [])

  return (
    <main>
      <div>
        <Grid container justify="center" spacing={4}>
          {products.map(product=><Grid item key={product.SKU} xs={12} sm={6} md={4} lg={3}>
              <CardItemsHome 
              name={product.name} 
              price={product.price} 
              id={product.id} 
              section={"catalogo"}
              description={product.description}/>
          </Grid>)}
          
        </Grid>
      </div>
    </main>
  );
};

export default Products;
