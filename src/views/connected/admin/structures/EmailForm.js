import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { structureActions } from '../../../../actions';

function EmailForm({ setDisplayFormEmail, structureId, structureEmail }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(structureEmail);
  const valideEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const handleForm = e => {
    const { value } = e.target;
    setEmail(value.replace(/\s/g, ''));
  };
  const ChangeEmail = () => {
    if (structureId) {
      dispatch(structureActions.updateStructureEmail(email.toLocaleLowerCase(), structureId));
      setDisplayFormEmail(false);
    }
  };

  return (
    <div style={{ width: '320px' }}>
      <div className="fr-my-3w">
        <input className="fr-input" type="text" id="text-input-text" value={email} name="email" onChange={handleForm} />
      </div>
      <button onClick={() => setDisplayFormEmail(false)} className="fr-btn fr-btn--secondary">Annuler</button>
      <button className="fr-btn" onClick={ChangeEmail}
        disabled={(!valideEmail.test(email) || email === structureEmail) ? 'disabled' : ''}
        style={{ float: 'right' }}>
        Valider
      </button>
    </div>
  );
}
EmailForm.propTypes = {
  setDisplayFormEmail: PropTypes.func,
  structureId: PropTypes.string,
  structureEmail: PropTypes.string
};
export default EmailForm;
