import React from 'react';
import propType from 'prop-types';

const RolesCards = ({ roles, reseau, user, roleActivated, structure }) => {

  const displayRole = (role, idx) => {
    switch (role) {
      case 'structure':
        return <div key={idx}>
          <hr className="fr-mt-4w fr-mb-2w" style={{ borderWidth: '0.5px' }} />
          <div className="fr-grid-row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="fr-col-4">
              <div>
                <span className="fr-text--md fr-text--bold">Gestionnaire de structure</span><br/>
                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>{reseau}</span>
              </div>
            </div>
            <div className="fr-col-4 fr fr-grid-row--end" style={{ textAlign: 'right' }}>
              <button className="fr-btn fr-btn--tertiary-no-outline"
                onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)}
              >
                <i className="ri-home-4-line fr-mr-1w"></i>G&eacute;rer ma structure
              </button>
            </div>
          </div>
        </div>
        ;
      case 'grandReseau':
        return <div key={idx}>
          <hr className="fr-mt-4w fr-mb-2w" style={{ borderWidth: '0.5px' }} />
          <div className="fr-grid-row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="fr-col-4">
              <div>
                <span className="fr-text--md fr-text--bold">Gestionnaire Grand r&eacute;seau</span><br/>
                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>{reseau}</span>
              </div>
            </div>
            <div className="fr-col-4 fr fr-grid-row--end" style={{ textAlign: 'right' }}>
              <button className="fr-btn fr-btn--tertiary-no-outline"
                onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)}
              >
                <i className="ri-home-4-line fr-mr-1w"></i>G&eacute;rer ma structure
              </button>
            </div>
          </div>
        </div>;
      case 'prefet':
        return <div key={idx}>
          <hr className="fr-mt-4w fr-mb-1w" style={{ borderWidth: '0.5px' }} />
          <div className="fr-grid-row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="fr-col-4">
              <div>
                <span className="fr-text--md fr-text--bold">Pr&eacute;fet</span><br/>
                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                  {user?.departement ? 'dép ' + user?.departement : 'région ' + user?.region}
                </span>
              </div>
            </div>
          </div>
        </div>;
      default:
        return;
    }
  };
  
  return (
    <>
      <div className="fr-card fr-col-8 fr-mt-2w fr-p-3w">
        <div className="fr-card__body fr-p-0">
          <div>
            <h4>Mes r&ocirc;les</h4>
            {roles && roles?.map((role, idx) => (
              displayRole(role, idx)
            )) }
          </div>
        </div>
      </div>
    </>
  );
};

RolesCards.propTypes = {
  roles: propType.array,
  reseau: propType.string,
  user: propType.object,
  roleActivated: propType.string,
  structure: propType.object,
};

export default RolesCards;

