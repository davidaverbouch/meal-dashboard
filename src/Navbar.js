import React, { useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import './Navbar.css';

function Navbar(props) {
    // const [isOnline, setIsOnline] = useState(null);
    useEffect(() => {
        console.log("ouverture de la navbar - componentDidMount")
        return () => {
            console.log("fermeture de la navbar - componentWillUnmount")
        };
    });

    const openLinkedinInBlankPage = () => {
        window.open('https://www.linkedin.com/in/david-averbouch-9280a419/', '_blank');
    }

    return (
        <AppBar position="fixed" className="NavbarWrapper">
            <Toolbar className="Navbar_toolbar">
                <div className="leftArea">
                    <span className="burgerIconWrapper">
                        <IconButton aria-label="menu" onClick={props.burgerMenuToggle}>{!props.burgerMenuState ? <MenuIcon style={{ color: "white" }} /> : <MenuOpenIcon style={{ color: "white" }} />}</IconButton>
                    </span>
                    <span className="titleWrapper">Smood Meal API Explorer</span>
                </div>
                <div className="centralArea"></div>
                <div className="rightArea">
                    <span className="linkedinIconWrapper">
                        <IconButton aria-label="LinkedIn" onClick={openLinkedinInBlankPage}><LinkedInIcon style={{ color: "white" }} /></IconButton>
                    </span>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;