import React from 'react';
import PropTypes from 'prop-types';
import { AdvisorCard } from '../cards';

const InactiveAdvisorsSection = ({ anciensConseillers }) => {
  return (
    <section className="fr-accordion fr-mt-4w">
      <h3 className="fr-accordion__title">
        <button className="fr-accordion__btn fr-text--bold" aria-expanded="false" aria-controls="accordion-106">
          <h6>Vos anciens conseillers ({anciensConseillers?.length})</h6>
        </button>
      </h3>
      <div className="fr-collapse" id="accordion-106">
        {anciensConseillers?.length > 0 ? (
          anciensConseillers.map((conseiller, index) => (
            <AdvisorCard key={index} conseiller={conseiller} />
          ))
        ) : 'Aucun conseiller inactif associ&eacute; &agrave; la structure'
        }

      </div>
    </section>
  );
};

InactiveAdvisorsSection.propTypes = {
  anciensConseillers: PropTypes.array,
};

export default InactiveAdvisorsSection;
