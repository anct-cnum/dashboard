import React from 'react';
import propTypes from 'prop-types';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';

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
                  checked={checkedItems
                  ?.map(item => item.miseEnRelationId)
                  ?.includes(miseEnRelation?.miseEnRelationId)}
                  value={JSON.stringify(miseEnRelation)}
                  onChange={handleSelectAdvisor}
                />
              </div>
            </div>
            <div className="fr-col-2 card__text">
              <div>
                <span className="fr-text--md fr-text--bold">
                  {miseEnRelation?.conseiller ? formatNomConseiller(miseEnRelation?.conseiller) : ''}
                </span>
                <br />
                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                  ID - {miseEnRelation?.conseiller?.idPG}
                </span>
              </div>
            </div>
            <div className="fr-col-2 card__text">
              <div>
                <span className="fr-text--md" style={{ fontWeight: '500' }}>
                  Type de contrat
                </span>
                <br />
                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                  -
                </span>
              </div>
            </div>
            <div className="fr-col-2 card__text">
              <div>
                <span className="fr-text--md" style={{ fontWeight: '500' }}>
                  Début de contrat
                </span>
                <br />
                -
              </div>
            </div>
            <div className="fr-col-2 card__text">
              <div>
                <span className="fr-text--md" style={{ fontWeight: '500' }}>
                  Fin de contrat
                </span>
                <br />
                -
              </div>
            </div>
            <div className="fr-col-2 card__text">
              <p className="fr-badge fr-badge--success">En activit&eacute;</p>
            </div>
            <div className="fr-col-1.5" style={{ textAlign: 'end' }}>
              <button
                className="fr-btn fr-icon-eye-line fr-mx-3w card__button"
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
