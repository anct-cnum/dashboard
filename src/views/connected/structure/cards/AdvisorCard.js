/* eslint-disable no-nested-ternary */
import React from 'react';
import propTypes from 'prop-types';
import { formatNomConseiller, formatTypeDeContrat, validTypeDeContratWithoutEndDate } from '../../../../utils/formatagesUtils';
import dayjs from 'dayjs';
import { calcNbJoursAvantDateFinContrat, isContractExpiring } from '../../../../utils/calculateUtils';
import { useSelector, useDispatch } from 'react-redux';
import pinCoordo from '../../../../assets/icons/icone-coordinateur.svg';
import { conseillerActions } from '../../../../actions/conseillerActions';

const AdvisorCard = ({ conseiller }) => {
  const dispatch = useDispatch();
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const displayBadge = statut => {
    switch (statut) {
      case 'finalisee':
        return (!conseiller.dateFinDeContrat || calcNbJoursAvantDateFinContrat(conseiller.dateFinDeContrat) > 0) ?
          isContractExpiring(conseiller.dateFinDeContrat) ?
            <p className="fr-badge fr-badge--sm fr-badge--new">Arrive &agrave; &eacute;ch&eacute;ance</p> :
            <p className="fr-badge fr-badge--sm fr-badge--success">En activit&eacute;</p> :
          <p className="fr-badge fr-badge--sm fr-badge--warning">Contrat termin&eacute;</p>;
      case 'nouvelle_rupture':
        return <p className="fr-badge fr-badge--sm fr-badge--info">Rupture en cours</p>;
      case 'renouvellement_initiee':
        return <p className="fr-badge fr-badge--sm fr-badge--success">En activit&eacute;</p>;
      case 'finalisee_rupture':
        return <p className="fr-badge fr-badge--sm fr-badge--warning">Contrat termin&eacute;</p>;
      case 'recrutee':
        return <p className="fr-badge fr-badge--sm fr-badge--new">Recrutement en cours</p>;
      default:
        return;
    }
  };

  const resendInvitationEspaceCoop = conseillerId => {
    dispatch(conseillerActions.resendInvitConseiller(conseillerId));
  };

  return (
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row responsive__wide-card" style={{ alignItems: 'center' }}>
            <div className="fr-col-2 card__text">
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
            <div className="type-contrat card__text">
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
            <div className="debut-contrat card__text">
              <div>
                <strong className="fr-text--md">
                  D&eacute;but de contrat
                </strong>
                <br />
                {conseiller?.dateDebutDeContrat ?
                  <span className="fr-text--regular fr-text--md">
                    {dayjs(conseiller?.dateDebutDeContrat).format('DD/MM/YYYY')}
                  </span> :
                  <span className="fr-text--regular fr-text--md" title="En attente de pi&egrave;ces justificatives">
                    En attente de pi...
                  </span>
                }
              </div>
            </div>
            <div className="fin-contrat card__text">
              <div>
                <strong className="fr-text--md">
                  Fin de contrat
                </strong>
                <br />
                {validTypeDeContratWithoutEndDate(conseiller?.typeDeContrat) &&
                  <span className="fr-text--regular fr-text--md">-</span>
                }
                {(!validTypeDeContratWithoutEndDate(conseiller?.typeDeContrat) && !conseiller?.dateFinDeContrat) &&
                  <span className="fr-text--regular fr-text--md" title="En attente de pi&egrave;ces justificatives">
                    En attente de pi...
                  </span>
                }
                {conseiller?.dateFinDeContrat &&
                  <span className="fr-text--regular fr-text--md">
                    {dayjs(conseiller?.dateFinDeContrat).format('DD/MM/YYYY')}
                  </span>
                }
              </div>
            </div>
            <div className="coordinateur card__text">
              {conseiller?.estCoordinateur &&
              <>
                <div
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <img className="pin-coordo" src={pinCoordo} alt="ic&ocirc;ne Conseiller num&eacute;rique coordinateur" />
                  <span style={{ color: '#000091' }}>Coordinateur</span>
                </div>
              </>
              }
            </div>
            <div className="badge-statut-advisor-card card__text">{displayBadge(conseiller?.statut)}</div>
            <div className="btn-actions-conseiller">
              {conseiller?.emailCN?.address && !conseiller?.mattermost?.id &&
                <>
                  <button
                    className="fr-btn fr-mr-1w fr-icon-mail-line card__button"
                    title="Inviter &agrave; rejoindre l&rsquo;espace Coop"
                    onClick={() => {
                      resendInvitationEspaceCoop(conseiller?._id);
                    }}
                  />
                </>
              }
              {conseiller?.statut === 'recrutee' ?
                <>
                  {(conseiller?.statutConseiller === 'RECRUTE' || conseiller?.statutConseiller === 'RUPTURE') ?
                    <button
                      className="fr-btn fr-icon-eye-line fr-mr-1w card__button"
                      title="D&eacute;tail"
                      onClick={() => window.open(`/${roleActivated}/candidature/conseiller/${conseiller?.miseEnrelationId}`)}
                    /> : <button
                      className="fr-btn fr-icon-eye-line fr-mr-1w card__button"
                      title="D&eacute;tail"
                      onClick={() => window.open(`/${roleActivated}/candidature/candidat/${conseiller?.miseEnrelationId}`)}
                    />
                  }
                </> :
                <button
                  className="fr-btn fr-icon-eye-line fr-mr-1w card__button"
                  title="D&eacute;tail"
                  onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}
                />
              }
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
};

export default AdvisorCard;
