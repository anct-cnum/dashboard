import React from 'react';
import propTypes from 'prop-types';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';
import dayjs from 'dayjs';
import { calculateMonthsDifference } from '../../../../utils/calculateUtils';

const CompleteContractCard = ({ conseiller, roleActivated, handleOpenModalContrat }) => {
  const { dateDebutDeContrat, dateFinDeContrat, typeDeContrat } = conseiller;

  const months = calculateMonthsDifference(dateDebutDeContrat, dateFinDeContrat);

  const handleEditContract = conseiller => {
    handleOpenModalContrat(true, conseiller);
  };

  return (
    <>
      <div className="fr-col-12 fr-mt-2w fr-p-3w card-banner-top">
        <div className="fr-card__body fr-p-0">
          <div>
            <div className="fr-grid-row responsive__wide-card" style={{ alignItems: 'center' }}>
              <div className="fr-col-2 card__text">
                <div>
                  <span className="fr-text--md fr-text--bold">{conseiller ? formatNomConseiller(conseiller) : ''}</span>
                  <br />
                  <span className="fr-text--regular fr-text--md info__color">ID - {conseiller?.idPG}</span>
                </div>
              </div>
              <div className="fr-col-2 card__text">
                <div>
                  <span className="fr-text--md" style={{ fontWeight: '500' }}>
                    Type de contrat
                  </span>
                  <br />
                  <span className="fr-text--regular fr-text--md info__color">{conseiller?.originalMiseEnRelation?.typeDeContrat ?? '-'}</span>
                </div>
              </div>
              <div className="fr-col-2 card__text">
                <div>
                  <span className="fr-text--md" style={{ fontWeight: '500' }}>
                    D&eacute;but de contrat
                  </span>
                  <br />
                  <span className="info__color">{conseiller?.originalMiseEnRelation?.dateDebutDeContrat ?? '-'}</span>
                </div>
              </div>
              <div className="fr-col-2 card__text">
                <div>
                  <span className="fr-text--md" style={{ fontWeight: '500' }}>
                    Fin de contrat
                  </span>
                  <br />
                  <span className="info__color">{conseiller?.originalMiseEnRelation?.dateFinDeContrat ?? '-'}</span>
                </div>
              </div>
              <div className="fr-col-2 card__text">
                <p className="fr-badge fr-badge--success">En activit&eacute;</p>
              </div>
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
      {/* banniere */}
      <div className="fr-notice fr-py-2w banner warning background">
        <div className="fr-container warning responsive__banner">
          <span className="fr-icon-warning-fill icon__color" aria-hidden="true"></span>
          <div className="responsive__banner" style={{ paddingLeft: '20px' }}>
            <div className="banner__text">
              <p className="fr-notice__title title__color">Envoyer les pi&egrave;ces justificatives pour finaliser la demande de renouvellement</p>
              <p className="fr-text--sm">
                {`Demande d'un ${typeDeContrat?.toUpperCase()} de ${months} mois avec une date de début le ${dayjs(dateDebutDeContrat).format(
                  'DD/MM/YYYY'
                )}.`}
              </p>
            </div>
            <ul className="fr-btns-group fr-btns-group--inline-sm small__banner__button">
              <li>
                <button className="fr-btn" style={{ margin: 'auto' }}>
                  Compl&eacute;ter le dossier
                </button>
              </li>
              <li>
                <button
                  className="fr-btn  fr-icon-edit-line"
                  title="Label bouton"
                  style={{ margin: 'auto', marginLeft: '25px' }}
                  onClick={() => handleEditContract(conseiller)}
                ></button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

CompleteContractCard.propTypes = {
  conseiller: propTypes.object,
  roleActivated: propTypes.string,
  setOpenModalContrat: propTypes.func,
  handleOpenModalContrat: propTypes.func,
};

export default CompleteContractCard;
