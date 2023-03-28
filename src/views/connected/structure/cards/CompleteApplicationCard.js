import React from 'react';
import propType from 'prop-types';

const CompleteApplicationCard = ({ url, structure }) => (
  <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
    <div className="fr-card__body fr-p-0">
      <div>
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <div className="fr-col-3">
            <div>
              <span className="fr-text--md fr-text--bold">ID de votre structure</span>
              <br />
              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                {structure?.idPG}
              </span>
            </div>
          </div>
          <div className="fr-col-3">
            <div>
              <span className="fr-text--md fr-text--bold" style={{ fontWeight: '500' }}>
                N° Siret de votre structure
              </span>
              <br />
              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                {structure?.siret}
              </span>
            </div>
          </div>
          <div className="fr-col-3">
            <p className="fr-badge fr-badge--warning">CONVENTIONNEMENT EN COURS</p>
          </div>
          <div className="fr-col-3" style={{ textAlign: 'end' }}>
            <button
              className="fr-btn fr-mx-3w"
              title="D&eacute;tail"
              onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
            >
              Compl&eacute;ter mon dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

CompleteApplicationCard.propTypes = {
  url: propType.string,
  structure: propType.object,
};

export default CompleteApplicationCard;
