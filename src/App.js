import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace' ;
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import Update from './places/pages/UpdatePlaces';
import Auth from './user/pages/Authentication';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Map from './shared/components/UIElements/Map';

const App = () => {
  const {token, login, logout, userId} = useAuth();

  let routes;

  if( token) {
    routes = (
      <Switch>
      <Route path ='/' exact> 
      < Users />
    </Route>
    <Route path ='/:userId/places' exact>
      <UserPlaces />
    </Route>
    <Route path ='/places/new' exact> 
      < NewPlace />
    </Route>
    <Route path ='/places/:placeId'> 
      < Update />
    </Route>
   
    <Redirect to = '/' />
    </Switch>
    );
  }
  else {
    routes = (
      <Switch>
      <Route path ='/' exact> 
      < Users />
    </Route>
    <Route path ='/:userId/places' exact>
      <UserPlaces />
    </Route>
    <Route path ='/auth' exact> 
      < Auth />
    </Route>
    <Route path ='/map'> 
      < Map />
    </Route>
    <Redirect to = '/auth' />
    </Switch>
    );
  }
  
  
  return (
   <AuthContext.Provider 
   value = {{ isLoggedIn: !!token,
    token: token, 
   userId: userId, login: login, logout: logout }}> 
  <Router>
  <MainNavigation />
   <main>
    {routes}
    </main>
  </Router>
  </AuthContext.Provider>
  );
};

export default App;
