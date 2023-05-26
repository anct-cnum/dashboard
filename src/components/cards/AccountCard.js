import React from 'react';
import propType from 'prop-types';

const AccountCard = ({ email }) => {
  return (
    <>
      <div className="fr-card fr-col-8 fr-mt-2w fr-p-3w">
        <div className="fr-card__body fr-p-0">
          <div>
            <h4>Mon compte</h4>
            <hr style={{ borderWidth: '0.5px' }}/>
            <div className="fr-grid-row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="fr-col-4">
                <div>
                  <span className="fr-text--md fr-text--bold">Adresse e-mail</span><br/>
                  <span className="fr-text--regular fr-text--md info__color">{email}</span>
                </div>
              </div>
              <div className="fr-col-offset-1"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

AccountCard.propTypes = {
  email: propType.string,
};

export default AccountCard;

