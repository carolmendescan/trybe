import React from 'react';
import PropTypes from 'prop-types';

class PlanetCard extends React.Component {
  render() {
    const { planetName } = this.props;
    const { planetImage, planetWidth } = this.props;
    return (
      <div data-testid="planet-card">
        <img
          src={ `${planetImage}` }
          alt={ `Planeta ${planetName}` }
          style={ { width: planetWidth } }
        />
        <p data-testid="planet-name" className="planetaNome">
          { planetName }
        </p>
      </div>
    );
  }
}

PlanetCard.propTypes = {
  planetName: PropTypes.string.isRequired,
  planetImage: PropTypes.string.isRequired,
  planetWidth: PropTypes.string.isRequired,
};

export default PlanetCard;
