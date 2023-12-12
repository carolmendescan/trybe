import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route path="/Game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
