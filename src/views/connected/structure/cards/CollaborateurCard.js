import React from 'react';
import propType from 'prop-types';

const CollaborateurCard = ({ user }) => (
  <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
    <div className="fr-card__body fr-p-0">
      <div>
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <div className="fr-col-2">
            <div>
              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                {user?.name}
              </span>
            </div>
          </div>
          <div className="fr-col-offset-7"></div>
          <div className="fr-col-2" style={{ textAlign: 'end' }}>
            <p className="fr-badge fr-badge--info">Actif</p>
          </div>
          <div className="fr-col-1" style={{ textAlign: 'end' }}>
            <button
              className="fr-btn fr-icon-delete-line fr-btn--tertiary-no-outline"
              title="Supprimer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

CollaborateurCard.propTypes = {
  user: propType.object
};

export default CollaborateurCard;
