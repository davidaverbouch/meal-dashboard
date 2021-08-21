import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 10000
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));

const TitleSideBar = styled.div`
  font-size: 1em;
  text-align: center;
  margin: 1em;
  padding: 0.25em 1em;
  font-weight: bold;
  display: block;
`;

const RouteSideBar = styled.div`
  font-size: 1em;
  text-align: center;
  margin: 1em auto 0;
  text-decoration: underline;
  cursor: pointer;
  padding: 0 1em;
  display: block;
`;

export default function Sidemenu(props) {
    const classes = useStyles();

    return (
        <Drawer open={props.isOpen} className={classes.drawer} classes={{ paper: classes.drawerPaper, }} >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <TitleSideBar>Smood</TitleSideBar>
                <Divider />
                <RouteSideBar><Link to="/">Meal list</Link></RouteSideBar>
                <RouteSideBar><Link to="/contact">Contact</Link></RouteSideBar>
            </div>
        </Drawer>
    );
}
