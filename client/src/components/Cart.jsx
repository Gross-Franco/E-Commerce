import React from "react";
import { IconButton, Badge } from "@mui/material";
import { FiShoppingCart } from "react-icons/fi";

const Cart = () => {
  return (
    <IconButton aria-label="Show cart items" color="inherit">
      <Badge badgeContent={4} color="primary">
        <FiShoppingCart />
      </Badge>
    </IconButton>
  );
};

export default Cart;
