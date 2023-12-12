import React from 'react';
import Title from './Title';
import planets from '../data/planets';
import PlanetCard from './PlanetCard';

class SolarSystem extends React.Component {
  render() {
    return (
      <div data-testid="solar-system">
        <Title headline="Planetas" />
        <hr className="hr-planets" />
        <div className="solarsis">
          {planets.map(({ name, image, width }) => (
            <PlanetCard
              key={ name }
              planetName={ name }
              planetImage={ image }
              planetWidth={ width }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default SolarSystem;
