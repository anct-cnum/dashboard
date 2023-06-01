import React from 'react';
import propTypes from 'prop-types';
import { formatNomConseiller, formatTypeDeContrat } from '../../../../utils/formatagesUtils';
import dayjs from 'dayjs';

const AdvisorCard = ({ conseiller, roleActivated }) => {
  const displayBadge = statut => {
    switch (statut) {
      case 'finalisee':
        return <p className="fr-badge fr-badge--success">En activit&eacute;</p>;
      case 'nouvelle_rupture':
        return <p className="fr-badge fr-badge--info">Rupture en cours</p>;
      case 'renouvellement_initiee':
        return <p className="fr-badge fr-badge--success">En activit&eacute;</p>;
      default:
        return;
    }
  };

  return (
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row responsive__wide-card" style={{ alignItems: 'center' }}>
            <div className="fr-col-3 card__text">
              <div>
                <strong className="fr-text--md fr-text--bold">
                  {conseiller ? formatNomConseiller(conseiller) : ''}
                </strong>
                <br />
                <span className="fr-text--regular fr-text--md">
                  ID - {conseiller?.idPG ?? ''}
                </span>
              </div>
            </div>
            <div className="fr-col-2 card__text">
              <div>
                <strong className="fr-text--md">
                  Type de contrat
                </strong>
                <br />
                <span
                  className="fr-text--regular fr-text--md"
                  title={conseiller?.typeDeContrat ? formatTypeDeContrat(conseiller?.typeDeContrat) : ''}
                >
                  {conseiller?.typeDeContrat ?
                    <>
                      {formatTypeDeContrat(conseiller?.typeDeContrat)?.length > 15 ?
                        `${formatTypeDeContrat(conseiller?.typeDeContrat)?.substring(0, 15)}...` :
                        formatTypeDeContrat(conseiller?.typeDeContrat)
                      }
                    </> : '-'
                  }
                </span>
              </div>
            </div>
            <div className="fr-col-2 card__text">
              <div>
                <strong className="fr-text--md">
                  D&eacute;but de contrat
                </strong>
                <br />
                {conseiller?.dateDebutDeContrat ?
                  <span className="fr-text--regular fr-text--md">
                    {dayjs(conseiller?.dateDebutDeContrat).format('DD/MM/YYYY')}
                  </span> : <span>-</span>
                }
              </div>
            </div>
            <div className="fin-contrat card__text">
              <div>
                <strong className="fr-text--md">
                  Fin de contrat
                </strong>
                <br />
                {conseiller?.dateFinDeContrat ?
                  <span className="fr-text--regular fr-text--md">
                    {dayjs(conseiller?.dateFinDeContrat).format('DD/MM/YYYY')}
                  </span> : <span>-</span>
                }
              </div>
            </div>
            <div className="badge-statut card__text">{displayBadge(conseiller?.statut)}</div>
            <div className="btn-actions-conseiller">
              <button
                className="fr-btn fr-icon-eye-line fr-mr-2w card__button"
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
