import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import styled from 'styled-components';

import Toolbar from '@material-ui/core/Toolbar';

import Navbar from './Navbar';
import Sidemenu from './Sidemenu';
import FooterBar from './Footerbar';
import MealslistContainer from './MealslistContainer';
import Contact from './Contact';
import Detail from './Detail';

import './App.css';

const DashboardContent = styled.div`
  padding: 2em 3em;
  display: flex;
  flex-direction: column;
`;

function App() {

  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const burgerMenuToggle = () => { setBurgerIsOpen(!burgerIsOpen); }

  // componentDidMount
  useEffect(() => {
    let burgerState = localStorage.getItem('mealDashboardBurgerIsOpen');
    if (burgerState !== undefined && (burgerState === "true") !== burgerIsOpen) burgerMenuToggle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // when burger menu state change, save in localStorage
  useEffect(() => { localStorage.setItem('mealDashboardBurgerIsOpen', burgerIsOpen); }, [burgerIsOpen])

  return (
    <div className="mealDashboard">
      <Router>
        <Navbar burgerMenuToggle={burgerMenuToggle} burgerMenuState={burgerIsOpen} />
        <Sidemenu isOpen={burgerIsOpen} />
        <Toolbar />
        <DashboardContent>
          <Switch>
            <Route path="/contact"><Contact /></Route>
            <Route path="/detail"><Detail /></Route>
            <Route path="/"><MealslistContainer /></Route>
          </Switch>
        </DashboardContent>
        <FooterBar />
      </Router>
    </div>
  );
}

export default App;
