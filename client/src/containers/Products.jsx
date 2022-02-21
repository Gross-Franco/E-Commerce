import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { Product } from "../components";
import { getProductsPublic } from "../Redux/Actions/actions";

const Products = () => {

  const {products} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if(products.length === 0) dispatch(getProductsPublic());
  }, [])

  return (
    <main>
      <div>
        <Grid container justify="center" spacing={4}>
          {products?.map(product=><Grid item key={product.SKU} xs={12} sm={6} md={4} lg={3}>
              <Product
                product={product}
                section="catalogo"
              />
          </Grid>)}
          
        </Grid>
      </div>
    </main>
  );
};

export default Products;
