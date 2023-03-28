import React from 'react';
import propTypes from 'prop-types';

const SelectAdvisorCard = ({ conseiller, roleActivated, handleSelectAdvisor, checkedItems }) => {
  const displayBadge = statut => {
    switch (statut) {
      case 'finalisee':
        return <p className="fr-badge fr-badge--success">En activit&eacute;</p>;
      case 'finalisee_rupture':
        return <p className="fr-badge fr-badge--warning">Contrat termin&eacute;</p>;
      default:
        return;
    }
  };

  return (
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row" style={{ alignItems: 'center' }}>
            <div style={{ marginRight: '20px' }}>
              <div className="fr-radio-group fr-radio-group--md">
                <input
                  type="checkbox"
                  id="checkbox"
                  name="checkbox"
                  checked={checkedItems
                  .map(item => item.miseEnRelationId)
                  .includes(conseiller.miseEnRelationId)}
                  value={JSON.stringify(conseiller)}
                  onChange={handleSelectAdvisor}
                />
              </div>
            </div>
            <div className="fr-col-2">
              <div>
                <span className="fr-text--md fr-text--bold">
                  {conseiller?.prenom} {conseiller?.nom}
                </span>
                <br />
                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                  ID - {conseiller?.idPG}
                </span>
              </div>
            </div>
            <div className="fr-col-2">
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
            <div className="fr-col-2">
              <div>
                <span className="fr-text--md" style={{ fontWeight: '500' }}>
                  Début de contrat
                </span>
                <br />
                test
              </div>
            </div>
            <div className="fr-col-2">
              <div>
                <span className="fr-text--md" style={{ fontWeight: '500' }}>
                  Fin de contrat
                </span>
                <br />
                test
              </div>
            </div>
            <div className="fr-col-2">{displayBadge(conseiller?.statut)}</div>
            <div className="fr-col-1.5" style={{ textAlign: 'end' }}>
              <button
                className="fr-btn fr-icon-eye-line fr-mx-3w"
                title="D&eacute;tail"
                onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}
              />
              <button
                className="fr-btn fr-icon-line-chart-line"
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

SelectAdvisorCard.propTypes = {
  nom: propTypes.string,
  prenom: propTypes.string,
  statut: propTypes.string,
  id: propTypes.string,
  roleActivated: propTypes.string,
  conseiller: propTypes.object,
  handleSelectAdvisor: propTypes.func,
  checkedItems: propTypes.array,
};

export default SelectAdvisorCard;
