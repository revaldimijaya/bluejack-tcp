import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import VotePage from './pages/VotePage';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import react, { useEffect, useState } from "react"
import Cookies from 'universal-cookie';

library.add(fab, faSignOutAlt)

const cookies = new Cookies();

function setUser(user) {
  let expires = new Date()
  expires.setTime(expires.getTime() + (100 * 1000))  
  cookies.set('user', user, { path: '/', expires: expires} )
  
}

function getUser() {
  const userString = cookies.get('user');
  console.log(userString);
  if(userString === undefined) return;
  return userString
}

function App() {
  // const user = getUser();

  // if(!user) {
  //   return <LoginPage setUser={setUser} />
  // }

  // console.log(user["User"]["UserName"])

  return (
    <Router>
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/vote">
          <VotePage />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
