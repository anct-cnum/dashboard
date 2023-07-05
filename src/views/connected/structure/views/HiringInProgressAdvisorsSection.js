import React from 'react';
import PropTypes from 'prop-types';
import { AdvisorCard } from '../cards';

const HiringInProgressAdvisorsSection = ({ conseillersEnCoursDeRecrutement }) => {
  return (
    <section className="fr-accordion fr-mt-4w">
      <h3 className="fr-accordion__title">
        <button className="fr-accordion__btn fr-text--bold" aria-expanded="false" aria-controls="en-cours-de-recrutement">
          <h6>
            Vos conseillers en cours de recrutement ({conseillersEnCoursDeRecrutement?.length})
          </h6>
        </button>
      </h3>
      <div className="fr-collapse" id="en-cours-de-recrutement">
        {conseillersEnCoursDeRecrutement?.length > 0 ? (
          conseillersEnCoursDeRecrutement.map((conseiller, index) => (
            <AdvisorCard key={index} conseiller={conseiller} />
          ))
        ) : 'Aucun conseiller en cours de recrutement associé à la structure'
        }

      </div>
    </section>
  );
};

HiringInProgressAdvisorsSection.propTypes = {
  conseillersEnCoursDeRecrutement: PropTypes.array,
};

export default HiringInProgressAdvisorsSection;
