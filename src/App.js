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
import axios from 'axios';

library.add(fab, faSignOutAlt)

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

function getUser() {
  var userString = localStorage.getItem('user')
  userString = JSON.parse(userString)
  return userString
}

function App() {
  const user = getUser();
 
  
  if(!user) {
    return <LoginPage setUser={setUser} />
  }

  const handleToken = async (token) => {
    const ax = await axios.get(`https://laboratory.binus.ac.id/lapi/api/Binusmaya/Me`, {
        headers:{
            authorization: `Bearer ${token}`
        }
    }).then(res => {
            console.log(res)
            return res;
    }).catch(err => {return null})
    return ax;
  }
  var result = handleToken(user["Token"]["token"])
  
  if(result){
    // console.log(result)
    // window.location.href = '/home'
  } else {
      localStorage.removeItem('user')
      window.location.href = '/login'
  }

  // var date = new Date(user["Token"]["expires"]);
  // var currDate = new Date();
  // var diff = currDate - date;
  // if(diff >= 0){
  //   console.log("masuk delete")
  //   localStorage.removeItem('user')
  //   return <LoginPage setUser={setUser} />
  // }
  

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
