import React from "react";
import { Grid } from "@mui/material";
import p from "../helpers/mockProducts";
import { Product } from "../components";

const Products = () => {
  const { products } = p;
  return (
    <main>
      <div>
        <Grid container justify="center" spacing={4}>
          {products.map((product) => (
            <Grid item key={product.SKU} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </main>
  );
};

export default Products;
