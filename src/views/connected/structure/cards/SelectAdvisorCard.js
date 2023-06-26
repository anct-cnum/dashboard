import React from 'react';
import propTypes from 'prop-types';
import { formatNomConseiller, formatTypeDeContrat, validTypeDeContratWithoutEndDate } from '../../../../utils/formatagesUtils';
import dayjs from 'dayjs';
import { calcNbJoursAvantDateFinContrat } from '../../../../utils/calculateUtils';

const SelectAdvisorCard = ({ miseEnRelation, roleActivated, handleSelectAdvisor, checkedItems }) => {
  return (
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row responsive__wide-card" style={{ alignItems: 'center' }}>
            <div style={{ marginBottom: '1.5rem', flex: '0 0 4.5%' }} className="fr-fieldset__content fr-col-1">
              <div className="fr-checkbox-group fr-checkbox-group--md">
                <input
                  type="checkbox"
                  id={`checkbox-${miseEnRelation?.miseEnRelationId}`}
                  name={`checkbox-${miseEnRelation?.miseEnRelationId}`}
                  checked={
                    checkedItems?.map(item => item?.miseEnRelationId)?.includes(miseEnRelation?.miseEnRelationId) ||
                    (validTypeDeContratWithoutEndDate(miseEnRelation?.typeDeContrat))
                  }
                  disabled={validTypeDeContratWithoutEndDate(miseEnRelation?.typeDeContrat)}
                  value={JSON.stringify(miseEnRelation)}
                  onChange={handleSelectAdvisor}
                />
                <label className="fr-label" htmlFor={`checkbox-${miseEnRelation?.miseEnRelationId}`} />
              </div>
            </div>
            <div style={{ flex: '0 0 22%' }} className="fr-col-3 card__text">
              <div>
                <strong className="fr-text--md fr-text--bold">
                  {miseEnRelation?.conseiller ? formatNomConseiller(miseEnRelation?.conseiller) : ''}
                </strong>
                <br />
                <span className="fr-text--regular fr-text--md">
                  ID - {miseEnRelation?.conseiller?.idPG}
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
                  title={miseEnRelation?.typeDeContrat ? formatTypeDeContrat(miseEnRelation?.typeDeContrat) : ''}
                >
                  {miseEnRelation?.typeDeContrat ?
                    <>
                      {miseEnRelation?.typeDeContrat?.length > 15 ?
                        `${formatTypeDeContrat(miseEnRelation?.typeDeContrat)?.substring(0, 15)}...` :
                        formatTypeDeContrat(miseEnRelation?.typeDeContrat)
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
                {miseEnRelation?.dateDebutDeContrat ?
                  <span className="fr-text--regular fr-text--md">
                    {dayjs(miseEnRelation?.dateDebutDeContrat).format('DD/MM/YYYY')}
                  </span> :
                  <span className="fr-text--regular fr-text--md" title="En attente de pi&egrave;ces justificatives">
                    En attente de pi&egrave;...
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
                {validTypeDeContratWithoutEndDate(miseEnRelation?.typeDeContrat) &&
                  <span className="fr-text--regular fr-text--md">-</span>
                }
                {(!validTypeDeContratWithoutEndDate(miseEnRelation?.typeDeContrat) && !miseEnRelation?.dateFinDeContrat) &&
                  <span className="fr-text--regular fr-text--md" title="En attente de pi&egrave;ces justificatives">
                    En attente de pi&egrave;ces...
                  </span>
                }
                {(miseEnRelation?.dateFinDeContrat && !validTypeDeContratWithoutEndDate(miseEnRelation?.typeDeContrat)) &&
                  <span className="fr-text--regular fr-text--md">
                    {dayjs(miseEnRelation?.dateFinDeContrat).format('DD/MM/YYYY')}
                  </span>
                }
              </div>
            </div>
            <div className="badge-statut-renouvellement card__text">
              {validTypeDeContratWithoutEndDate(miseEnRelation.typeDeContrat) || calcNbJoursAvantDateFinContrat(miseEnRelation?.dateFinDeContrat) > 0 ?
                <p className="fr-badge fr-badge--success">En activit&eacute;</p> :
                <p className="fr-badge fr-badge--warning">Contrat termin&eacute;</p>
              }
            </div>
            <div className="btn-actions-conseiller fr-ml-auto">
              <button
                className="fr-btn fr-icon-eye-line fr-mr-2w card__button"
                title="D&eacute;tail"
                onClick={() => window.open(`/${roleActivated}/conseiller/${miseEnRelation?.conseiller?._id}`)}
              />
              <button
                className="fr-btn fr-icon-line-chart-line card__button"
                title="Statistiques"
                onClick={() => window.open(`/statistiques-conseiller/${miseEnRelation?.conseiller?._id}`)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SelectAdvisorCard.propTypes = {
  roleActivated: propTypes.string,
  miseEnRelation: propTypes.object,
  handleSelectAdvisor: propTypes.func,
  checkedItems: propTypes.array,
};

export default SelectAdvisorCard;
