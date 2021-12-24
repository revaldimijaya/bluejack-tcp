import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import react, { useEffect, useState } from "react"

library.add(fab, faSignOutAlt)

function setUser(user) {
  sessionStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
  const userString = sessionStorage.getItem('user');
  const user = JSON.parse(userString);
  return user
}

function App() {
  const user = getUser();

  if(!user) {
    return <LoginPage setUser={setUser} />
  }

  console.log(user)

  return (
    <Router>
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
