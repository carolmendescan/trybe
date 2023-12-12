import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div className="mobile-width">
      <Header />
      <Switch>
        <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
