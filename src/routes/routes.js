import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import RepositoryPage from '../pages//RepositoryPage/RepositoryPage';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={LandingPage} exact />
        <Route path='/:repositoryName' component={RepositoryPage} exact />
      </Switch>
    </BrowserRouter>
  );
}
