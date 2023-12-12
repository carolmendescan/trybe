// import React from 'react';
import React, { useContext } from 'react';
import { InfoApiContext } from './context/InfoApiContext';
import './App.css';
import logo from './images/logoStarwars.png';
import Table from './components/Table';
import Form from './components/Form';

function App() {
  const { isLoading, errors } = useContext(InfoApiContext);
  return (
    <div>
      <div className="logo-starwars-title">
        <img src={ logo } alt="logo Star Wars" />
      </div>
      <Form />
      <div>
        {
          isLoading ? <h2>Carregando...</h2> : (
            errors || <Table />)
        }
      </div>

    </div>
  );
}

export default App;
