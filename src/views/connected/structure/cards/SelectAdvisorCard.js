import React from 'react';
import propTypes from 'prop-types';
import { formatNomConseiller, formatTypeDeContrat } from '../../../../utils/formatagesUtils';
import dayjs from 'dayjs';

const SelectAdvisorCard = ({ miseEnRelation, roleActivated, handleSelectAdvisor, checkedItems }) => {
  return (
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row responsive__wide-card" style={{ alignItems: 'center' }}>
            <div style={{ marginRight: '20px' }}>
              <div className="fr-radio-group fr-radio-group--md">
                <input
                  type="checkbox"
                  id="checkbox"
                  name="checkbox"
                  checked={
                    checkedItems?.map(item => item?.miseEnRelationId)?.includes(miseEnRelation?.miseEnRelationId) ||
                    (miseEnRelation?.typeDeContrat === 'cdi')
                  }
                  disabled={miseEnRelation?.typeDeContrat === 'cdi'}
                  value={JSON.stringify(miseEnRelation)}
                  onChange={handleSelectAdvisor}
                />
              </div>
            </div>
            <div className="fr-col-3 card__text">
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
                <span className="fr-text--regular fr-text--md">{formatTypeDeContrat(miseEnRelation)}</span>
              </div>
            </div>
            <div className="fr-col-2 card__text">
              <div>
                <strong className="fr-text--md">
                  Début de contrat
                </strong>
                <br />
                {miseEnRelation?.dateDebutDeContrat ?
                  <span className="fr-text--regular fr-text--md">
                    {dayjs(miseEnRelation?.dateDebutDeContrat).format('DD/MM/YYYY')}
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
                {miseEnRelation?.dateFinDeContrat ?
                  <span className="fr-text--regular fr-text--md">
                    {dayjs(miseEnRelation?.dateFinDeContrat).format('DD/MM/YYYY')}
                  </span> : <span>-</span>
                }
              </div>
            </div>
            <div className="badge-statut-renouvellement card__text">
              <p className="fr-badge fr-badge--success">En activit&eacute;</p>
            </div>
            <div className="btn-actions-conseiller">
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
  nom: propTypes.string,
  prenom: propTypes.string,
  statut: propTypes.string,
  id: propTypes.string,
  roleActivated: propTypes.string,
  miseEnRelation: propTypes.object,
  handleSelectAdvisor: propTypes.func,
  checkedItems: propTypes.array,
};

export default SelectAdvisorCard;
