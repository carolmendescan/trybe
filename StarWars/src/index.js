import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FilterProvider } from './context/FilterContext';
import { InfoApiProvider } from './context/InfoApiContext';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <InfoApiProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </InfoApiProvider>,
  );
