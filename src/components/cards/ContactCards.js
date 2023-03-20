import React, { useState } from 'react';
import propType from 'prop-types';
import EmailForm from '../../views/connected/admin/structures/EmailForm';

const ContactCard = ({ structureId, email }) => {
  const [displayEmailForm, setDisplayFormEmail] = useState(false);
  return (
    <>
      <div className="fr-card fr-col-8 fr-mt-2w fr-p-3w">
        <div className="fr-card__body fr-p-0">
          <div>
            <h4>Coordonn&eacute;es</h4>
            <hr style={{ borderWidth: '0.5px' }}/>
            <div className="fr-grid-row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="fr-col-4">
                <div>
                  <span className="fr-text--md fr-text--bold">Adresse e-mail</span><br/>
                  <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>{email}</span>
                </div>
              </div>
              <div className="fr-col-offset-1"></div>
              
              
              {displayEmailForm === true ?
                <div>
                  <EmailForm setDisplayFormEmail={setDisplayFormEmail} structureId={structureId} structureEmail={email} />
                </div> :
                <div className="fr-col-2 fr fr-grid-row--end">
                  <button className="fr-btn fr-btn--tertiary-no-outline" onClick={() => setDisplayFormEmail(true)}>
                    <i className="ri-edit-line fr-mr-1w"></i>Modifier
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ContactCard.propTypes = {
  setDisplayFormEmail: propType.func.isRequired,
  structureId: propType.string.isRequired,
  structureEmail: propType.string.isRequired,
  email: propType.string.isRequired,
};

export default ContactCard;

