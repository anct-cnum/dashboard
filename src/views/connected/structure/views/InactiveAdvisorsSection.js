import React from 'react';

const InactiveAdvisorsSection = () => {
  return (
    <section className="fr-accordion fr-mt-4w">
      <h3 className="fr-accordion__title">
        <button className="fr-accordion__btn fr-text--bold" aria-expanded="false" aria-controls="accordion-106">
          Vos anciens conseillers -
        </button>
      </h3>
      <div className="fr-collapse" id="accordion-106">
        Aucun conseiller inactif associ&eacute; &agrave; la structure
      </div>
    </section>
  );
};

export default InactiveAdvisorsSection;
