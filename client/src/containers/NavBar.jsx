import React, { useState, useEffect }from "react";
import { AppBar, Toolbar, MenuItem, Menu, Typography } from "@mui/material";
import { Cart, Nav } from "../components";
import { Login, Dropdowns } from "./";
import useStyles from "../helpers/stylesNavBar";
import { getCookie } from "./Utilitis/getCookie";

const NavBar = () => {
  const [load, LoadSet] = useState(getCookie("email") !== "");

  useEffect(() => {
    
    LoadSet(getCookie("Email") === "");
   
  });
  const classes = useStyles();
  return (
    <>
      <AppBar
        className={classes.appBar}
        color="inherit"
        style={{ zIndex: 1000 }}
      >
        <Toolbar>
          <Nav />
          <div className={classes.grow} />
          <div className={classes.button}>
            {load ? <Login /> : <Dropdowns />}
            <Cart />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
