import React from 'react';
import PropTypes from 'prop-types';

class MissionCard extends React.Component {
  render() {
    const { name } = this.props;
    const { year } = this.props;
    const { country } = this.props;
    const { destination } = this.props;

    return (
      <div data-testid="mission-card" className="card">
        <p data-testid="mission-name" className="mission-name">
          { name }
        </p>
        <hr />
        <div className="info-mission">
          <p data-testid="mission-year" className="text-mission">
            { year }
          </p>
          <p data-testid="mission-country" className="text-mission">
            { country }
          </p>
          <p data-testid="mission-destination" className="text-mission">
            { destination }
          </p>
        </div>
      </div>
    );
  }
}

MissionCard.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
};

export default MissionCard;
