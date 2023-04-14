import React, { useState } from 'react';
import propType from 'prop-types';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import FormSuppressionGestionnaire from '../FormSuppressionGestionnaire';

const CollaborateurCard = ({ gestionnaire, setCollaborateurs }) => {
  const [confirmSuppressionGestionnaire, setConfirmSuppressionGestionnaire] = useState(false);
  const compteActif = gestionnaire => (!!gestionnaire?.sub);

  return (
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row" style={{ alignItems: 'center' }}>
            <div className="fr-col-2">
              <div>
                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                  {gestionnaire?.name}
                </span>
              </div>
            </div>
            <div className="fr-col-offset-7"></div>
            <div className="fr-col-2" style={{ textAlign: 'end' }}>
              {compteActif(gestionnaire) ? <p className="fr-badge fr-badge--info">Actif</p> : <p className="fr-badge fr-badge--warning">Inactif</p>}
            </div>
            <div className="fr-col-1" style={{ textAlign: 'end' }}>
              <button
                className="fr-btn fr-icon-delete-line fr-btn--tertiary-no-outline"
                title="Supprimez le gestionnaire"
                onClick={() => {
                  setConfirmSuppressionGestionnaire(true);
                  scrollTopWindow();
                }}
              />
              {confirmSuppressionGestionnaire &&
            <FormSuppressionGestionnaire setConfirmSuppressionGestionnaire={setConfirmSuppressionGestionnaire}
              setCollaborateurs={setCollaborateurs} idGestionnaire={gestionnaire?._id} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CollaborateurCard.propTypes = {
  gestionnaire: propType.object,
  setCollaborateurs: propType.func,
};

export default CollaborateurCard;