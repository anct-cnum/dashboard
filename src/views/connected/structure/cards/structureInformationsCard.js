import React from 'react';
import propType from 'prop-types';

const StructureInformationsCard = ({ structure }) => (
  <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
    <div className="fr-card__body fr-p-0">
      <div>
        <div className="fr-grid-row responsive__card" style={{ alignItems: 'center' }}>
          <div className="fr-col-3">
            <div className="card__text">
              <span className="fr-text--md fr-text--bold">Contact de la structure</span>
              <br />
              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                {structure?.contact?.prenom ?? ''} {structure?.contact?.nom ?? '-'}
              </span>
            </div>
          </div>
          <div className="fr-col-3 card__text">
            <div>
              <span className="fr-text--md fr-text--bold" style={{ fontWeight: '500' }}>
                  Fonction
              </span>
              <br />
              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                {structure?.contact?.fonction?.split(',')[0]}
              </span>
            </div>
          </div>
          <div className="fr-col-2 card__text">
            <div>
              <span className="fr-text--md fr-text--bold" style={{ fontWeight: '500' }}>
                  Téléphone
              </span>
              <br />
              {structure?.contact?.telephone}
            </div>
          </div>
          <div className="fr-col-2.5 card__text">
            <div>
              <span className="fr-text--md fr-text--bold" style={{ fontWeight: '500' }}>
                  Email
              </span>
              <br />
              {structure?.contact?.email}
            </div>
          </div>
          <div className="fr-col-1 card__text">
            <button className="fr-btn fr-btn--tertiary-no-outline">
              <i className="ri-edit-line fr-mr-1w"></i>Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

StructureInformationsCard.propTypes = {
  structure: propType.object,
};

export default StructureInformationsCard;
