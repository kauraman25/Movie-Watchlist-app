import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from './component/Login';
import Home from './component/Home';
import Details from './component/Details';
import WatchList from './component/WatchList';
import { createContext, useEffect, useState } from "react";

export const AuthUser = createContext();

const Approuter = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [username, setUsername] = useState('');
  
  useEffect(()=> {
    const storelogindata = localStorage.getItem('loggedin') === 'true';
    const storeusername = localStorage.getItem('username');
    if(storelogindata && storeusername) {
      setLoggedin(true);
      setUsername(storeusername);
    }
  }, [])
  const login = (username, password) => {
    if(password === '123'){
      setLoggedin(true);
      setUsername(username);
      localStorage.setItem('loggedin', 'true');
      localStorage.setItem('username',username);
    }
  }
  
  const logout = () => {
    setLoggedin(false);
    setUsername('');
    localStorage.removeItem('loggedin');
    localStorage.removeItem('username');
  }

  return (
    <BrowserRouter>
      <AuthUser.Provider value={{username, login, logout, loggedin}}>
        <Routes>
          <Route path='/' element={loggedin ? <Navigate to='/home' /> : <Login />} />
          <Route path='/home' element={loggedin ? <Home /> : <Navigate to='/' />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/watchlist' element={<WatchList />} />
        </Routes>
      </AuthUser.Provider>
    </BrowserRouter>
  );
}

export default Approuter;
