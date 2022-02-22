import React, { useState, useEffect }from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Cart, Nav } from "../components";
import { Login, Dropdowns } from "./";
import useStyles from "../helpers/stylesNavBar";
import { getCookie } from "./Utilitis/getCookie";

const NavBar = () => {
  const [load, LoadSet] = useState(getCookie("email") !== "");
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    
    LoadSet(getCookie("Email") === "");
   
  });
  const classes = useStyles();
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };
  return (
    <>
      <AppBar
        className={isScroll ? "nav-bar--scroll" : ""}
        color="inherit"
        style={{ zIndex: 1000 }}
        onScroll={handleScroll}
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
