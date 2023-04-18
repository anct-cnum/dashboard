import React from 'react';
import propTypes from 'prop-types';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';

const AdvisorCard = ({ conseiller, roleActivated }) => {
  const displayBadge = statut => {
    switch (statut) {
      case 'finalisee':
        return <p className="fr-badge fr-badge--success">En activit&eacute;</p>;
      case 'nouvelle_rupture':
        return <p className="fr-badge fr-badge--info">Rupture en cours</p>;
      default:
        return;
    }
  };

  return (
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row responsive__wide-card" style={{ alignItems: 'center' }}>
            <div className="fr-col-2 card__text">
              <div>
                <span className="fr-text--md fr-text--bold">
                  {conseiller ? formatNomConseiller(conseiller) : ''}
                </span>
                <br />
                <span className="fr-text--regular fr-text--md info__color">
                    ID - {conseiller?.idPG}
                </span>
              </div>
            </div>
            <div className="fr-col-2 card__text">
              <div>
                <span className="fr-text--md" style={{ fontWeight: '500' }}>
                    Type de contrat
                </span>
                <br />
                <span className="fr-text--regular fr-text--md info__color">
                    -
                </span>
              </div>
            </div>
            <div className="fr-col-2 card__text">
              <div>
                <span className="fr-text--md" style={{ fontWeight: '500' }}>
                    D&eacute;but de contrat
                </span>
                <br />
                <span className="info__color">
                   -
                </span>
              </div>
            </div>
            <div className="fr-col-2 card__text">
              <div>
                <span className="fr-text--md" style={{ fontWeight: '500' }}>
                    Fin de contrat
                </span>
                <br />
                <span className="info__color">
                 -
                </span>
              </div>
            </div>
            <div className="fr-col-2 card__text">{displayBadge(conseiller?.statut)}</div>
            <div className="fr-col-2">
              <button
                className="fr-btn fr-icon-eye-line fr-mx-3w card__button"
                title="D&eacute;tail"
                onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}
              />
              <button
                className="fr-btn fr-icon-line-chart-line card__button"
                title="Statistiques"
                onClick={() => window.open(`/statistiques-conseiller/${conseiller?._id}`)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AdvisorCard.propTypes = {
  conseiller: propTypes.object,
  roleActivated: propTypes.string,
};

export default AdvisorCard;
