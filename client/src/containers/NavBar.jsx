import React, { useState, useEffect }from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Cart, Nav } from "../components";
import { Login, Dropdowns } from "./";
import useStyles from "../helpers/stylesNavBar";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { authLevel } = useSelector(state => state.session)
  const [load, LoadSet] = useState(authLevel < 2);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    
    LoadSet(() => authLevel < 2);
   
  }, [authLevel]);

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
