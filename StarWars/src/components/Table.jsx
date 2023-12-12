import React, { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

export default function Table() {
  const { newArray } = useContext(FilterContext);

  return (
    <table className="table">
      <thead className="thead-table">
        <tr>
          <th>NAME</th>
          <th>ROTATION-PERIOD</th>
          <th>ORBITAL-PERIOD</th>
          <th>DIAMETER</th>
          <th>CLIMATE</th>
          <th>GRAVITY</th>
          <th>TERRAIN</th>
          <th>SURFACE-WATER</th>
          <th>POPULATION</th>
          <th>FILMS</th>
          <th>CREATED</th>
          <th>EDITED</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {newArray && newArray.map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films.map((movie) => <div key={ movie }>{movie}</div>)}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
