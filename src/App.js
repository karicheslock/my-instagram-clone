import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useInRouterContext } from 'react-router-dom';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import * as ROUTES from './constants/routes';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Login from './pages/login';
import SignUp from './pages/signup';
import NotFound from './pages/not-found';


function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
          <Routes>
            <Route exact path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
