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
import { Link } from "react-router-dom";


const Product = ({ product, section }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Link to={`/productDetail/${product.id}`} style={{ textDecoration: 'none'}}>

        <CardMedia className={classes.media} image={product.image} title={product.name} />
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
      </Link>
    </Card>
  );
};

export default Product;
