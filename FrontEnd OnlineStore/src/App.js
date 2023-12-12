import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import './App.css';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/ProductDetails/:id"
          render={ (props) => <ProductDetails { ...props } /> }
        />
        <Route exact path="/" component={ Search } />
        <Route exact path="/Cart" component={ Cart } />
      </Switch>
    </div>
  );
}

export default App;
