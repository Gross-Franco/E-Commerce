import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import useStyles from "../helpers/stylesProduct";

const Product = ({ product }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image="https://picsum.photos/200" title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body2">{product.price}</Typography>
        </div>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
        <CardActions className={classes.cardActions}>
          <IconButton aria-label="Add to cart">
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Product;
