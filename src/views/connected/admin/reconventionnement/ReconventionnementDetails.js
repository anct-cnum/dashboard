import React from 'react';
import dayjs from 'dayjs';
import { formatNomConseiller, pluralize } from '../../../../utils/formatagesUtils';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ReconventionnementDetails({ reconventionnement }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const calcNbJoursAvantDateFinContrat = dateFinContrat => {
    const dateFin = dayjs(dateFinContrat);
    const dateAujourdhui = dayjs();
    const nbJours = dateFin.diff(dateAujourdhui, 'day');

    return nbJours;
  };

  return (
    <>
      <div className="fr-card fr-card--no-border" style={{ backgroundColor: '#E8EDFF' }}>
        <div className="fr-card__body">
          <div className="fr-card__content">
            <h3 className="fr-card__title fr-h3">
                Conventionnement phase 2
            </h3>
            <p className="fr-card__desc fr-text--lg fr-text--regular">
                Demande initi&eacute;e le {dayjs(reconventionnement?.dossierReconventionnement.dateDeCreation).format('DD/MM/YYYY')}
            </p>
            <p className="fr-card__desc fr-text--lg fr-text--bold" style={{ color: '#000091' }}>
              {pluralize(
                'Nombre de poste total demandé : ',
                'Nombre de poste total demandé : ',
                'Nombre de postes total demandés : ',
                reconventionnement?.dossierReconventionnement?.nbPostesAttribuees
              )}
              {reconventionnement?.dossierReconventionnement?.nbPostesAttribuees}
            </p>
            <div className="fr-card__desc fr-grid-row fr-mt-3w fr-col-12">
              <div className="fr-col-12">
                <hr style={{ borderWidth: '0.5px' }} />
              </div>
              <div className="fr-col-12">
                <span className="fr-h5">Les conseillers s&eacute;lectionn&eacute;s par la structure seront disponibles prochainement</span>
              </div>
              {/* <div className="fr-col-12">
                  <h6 className="fr-card__desc fr-h6">1 {pluralize(
                    'demande de renouvellement de poste',
                    'demande de renouvellement de poste',
                    'demandes de renouvellement de postes',
                    1
                  )}</h6>
                </div>
                <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
                  <div className="fr-card__body fr-p-0">
                    <div>
                      <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                        <div className="fr-col-3">
                          <div>
                            <span className="fr-text--md fr-text--bold">Philippe Dupont</span><br/>
                            <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>ID - 0001</span>
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div>
                            <span className="fr-text--md" style={{ fontWeight: '500' }}>Type de contrat</span><br/>
                            <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>CDD</span>
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div>
                            <span className="fr-text--md" style={{ fontWeight: '500' }}>Début de contrat</span><br/>
                            {conseiller?.dateDeNaissance ?
                              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                                {dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}
                              </span> : <span>-</span>
                            }
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div>
                            <span className="fr-text--md" style={{ fontWeight: '500' }}>Fin de contrat</span><br/>
                            {conseiller?.dateDeNaissance ?
                              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                                {dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}
                              </span> : <span>-</span>
                            }
                          </div>
                        </div>
                        <div className="fr-col-3" style={{ textAlign: 'end' }}>
                          <button
                            className="fr-btn fr-icon-eye-line fr-mr-2w"
                            title="D&eacute;tail"
                          />
                          <button
                            className="fr-btn fr-icon-line-chart-line"
                            title="D&eacute;tail"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
            </div>
            <div className="fr-card__start fr-mb-0" style={{ textAlign: 'end' }}>
              <p className="fr-badge fr-badge--new">Demande en attente de validation</p>
            </div>
          </div>
          <div className="fr-card__footer">
            <ul className="fr-btns-group fr-btns-group--icon-left fr-btns-group--inline-reverse fr-btns-group--inline-lg">
              <li>
                <button className="fr-btn" disabled>
                    Valider la demande
                </button>
              </li>
              <li className="fr-ml-auto">
                <div className="fr-grid-row" style={{ alignItems: 'baseline' }}>
                  {reconventionnement?.statut === 'en_instruction' ?
                    <p className="fr-badge fr-badge--success fr-mr-3w" style={{ height: '20%' }}>Dossier complet</p> :
                    <p className="fr-badge fr-badge--error fr-mr-3w" style={{ height: '20%' }}>Dossier incomplet</p>
                  }
                   
                  <a className="fr-btn fr-btn--secondary" href={reconventionnement?.url} target="_blank" rel="noopener noreferrer">
                      Voir le dossier D&eacute;marche Simplifi&eacute;e
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="fr-card fr-mt-6w">
        <div className="fr-card__body">
          <div className="fr-card__content">
            <h3 className="fr-card__title fr-h3">
                Conventionnement phase 1
            </h3>
            <p className="fr-card__desc fr-text--md"><strong>Date de d&eacute;but:</strong>&nbsp;
              {reconventionnement?.dateConventionnement ? dayjs(reconventionnement?.dateConventionnement).format('DD/MM/YYYY') : 'Non renseignée'}
            </p>
            <p className="fr-card__desc fr-text--xl" style={{ color: '#000091' }}><strong>{reconventionnement?.nombreConseillersCoselec} {pluralize(
              'poste de conseiller validé',
              'poste de conseiller validé',
              'postes de conseillers validés',
              reconventionnement?.nombreConseillersCoselec
            )}</strong> pour ce conventionnement</p>
            <div className="fr-card__desc fr-grid-row fr-mt-3w fr-col-12">
              <div className="fr-col-12">
                <hr style={{ borderWidth: '0.5px' }} />
              </div>
              <div className="fr-col-12">
                <h6 className="fr-card__desc fr-h6">Profils recrut&eacute;s</h6>
              </div>
              {reconventionnement?.conseillers?.map((conseiller, index) =>
                <div key={index} className="fr-card fr-col-12 fr-mt-3w fr-p-3w">
                  <div className="fr-card__body fr-p-0">
                    <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                      <div className="fr-col-3">
                        <div>
                          <span className="fr-text--md fr-text--bold">{conseiller ? formatNomConseiller(conseiller) : ''}</span><br />
                          <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>ID - {conseiller?.idPG}</span>
                        </div>
                      </div>
                      <div className="fr-col-2">
                        <div>
                          <span className="fr-text--md" style={{ fontWeight: '500' }}>Type de contrat</span><br />
                          <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>CDD</span>
                        </div>
                      </div>
                      <div className="fr-col-2">
                        <div>
                          <span className="fr-text--md" style={{ fontWeight: '500' }}>D&eacute;but de contrat</span><br />
                          {conseiller?.dateRecrutement ?
                            <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                              {dayjs(conseiller?.dateRecrutement).format('DD/MM/YYYY')}
                            </span> : <span>-</span>
                          }
                        </div>
                      </div>
                      <div className="fr-col-2" style={{ maxWidth: '14.7%' }}>
                        <div>
                          <span className="fr-text--md" style={{ fontWeight: '500' }}>Fin de contrat</span><br />
                          {conseiller?.dateRupture ?
                            <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                              {dayjs(conseiller?.dateRupture).format('DD/MM/YYYY')}
                            </span> : <span>-</span>
                          }
                        </div>
                      </div>
                      <div className="fr-col-2 fr-grid-row">
                        {conseiller.statutMiseEnrelation === 'finalisee' ?
                          <p className="fr-badge fr-badge--new fr-p-0-5w">Renouvellement</p> :
                          <p className="fr-badge fr-badge--info fr-p-0-5w">Non renouvelé</p>
                        }
                      </div>
                      <div style={{ flex: '0 0 10.2%', maxWidth: '10.2%', width: '10.2%', textAlign: 'end' }}>
                        <button
                          className="fr-btn fr-icon-eye-line fr-ml-auto fr-mr-2w"
                          onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}
                          title="D&eacute;tail"
                        />
                        <Link
                          className="fr-btn fr-icon-line-chart-line"
                          title="Statistiques"
                          to={`/statistiques-conseiller/${conseiller?._id}`}
                          state={{ 'origin': `/${roleActivated}/demandes/convention/${reconventionnement?._id}`, conseiller }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="fr-card__start fr-mb-0" style={{ textAlign: 'end' }}>
              <p className="fr-badge fr-badge--new">
                {calcNbJoursAvantDateFinContrat(reconventionnement?.dossierReconventionnement?.dateFinProchainContrat)}
                &nbsp;jours restants avant la fin du premier contrat
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ReconventionnementDetails.propTypes = {
  reconventionnement: PropTypes.object,
};

export default ReconventionnementDetails;
