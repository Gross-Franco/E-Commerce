import React from 'react';
import { AppBar, Toolbar, MenuItem, Menu, Typography } from '@mui/material';
import { Cart, Nav } from '../components';
import { Login } from './';
import useStyles from '../helpers/stylesNavBar';

const NavBar = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar className={classes.appBar} color="inherit" style={ { zIndex: 1000 } }>
                <Toolbar>
                    <Nav />
                    <div className={classes.grow} />
                    <div className={classes.button}> 
                        <Login />
                        <Cart />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
};

export default NavBar;