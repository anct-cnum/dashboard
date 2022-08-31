import React from 'react';
import PropTypes from 'prop-types';

export default function BlockAlerte({ type, titre, description }) {
  
  return (
    <div className="fr-container fr-my-6w">
      <div className="fr-grid-row">
        <div className="fr-col-12">
          <div className={'fr-alert fr-alert--' + type}>
            <p className="fr-alert__title">Erreur : {titre}</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>

  );
}

BlockAlerte.propTypes = {
  type: PropTypes.string,
  titre: PropTypes.string,
  description: PropTypes.string
};
