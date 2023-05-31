import React from 'react';
import propType from 'prop-types';

const StructureInformationsCard = ({ structure }) => (
  <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
    <div className="fr-card__body fr-p-0">
      <div>
        <div className="fr-grid-row responsive__card" style={{ alignItems: 'center' }}>
          <div className="fr-col-md-6 fr-col-12">
            <div>
              <span className="fr-text--md fr-text--bold">Cra total cumul&eacute;s</span>
              <br />
              <span className="fr-text--regular fr-text--md info__color">
                {structure?.craCount}
              </span>
            </div>
          </div>
          <div className="fr-col-md-6 fr-col-12">
            <div>
              <span className="fr-text--md fr-text--bold" style={{ fontWeight: '500' }}>
                Personnes accompagn&eacute;es
              </span>
              <br />
              <span className="fr-text--regular fr-text--md info__color">
                {structure?.accompagnementCount ?? '-'}
              </span>
            </div>
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
