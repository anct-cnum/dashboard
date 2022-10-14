import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../actions';
import { valideInputEmail } from '../../../../utils/formatagesUtils';
import PropTypes from 'prop-types';


function MonCompte({ setFlashMessage, myEmail, setMyEmail }) {
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication.user);
  const [formCompte, setFormCompte] = useState(false);

  const handleFormMyEmail = event => setMyEmail(event.target.value.trim());

  const updateEmail = () => {
    if (valideInputEmail(myEmail)) {
      dispatch(userActions.updateUserEmail({ id: userAuth._id, newEmail: myEmail }));
      setFormCompte(false);
      setFlashMessage(true);
      setTimeout(() => {
        setFlashMessage(false);
      }, 10000);
    } else {
      dispatch(userActions.inputEmailNotValid(myEmail));
      setFlashMessage(true);
      setTimeout(() => {
        setFlashMessage(false);
      }, 10000);
    }
  };

  return (
    <div>
      <h2>
            Mon compte
      </h2>
      {formCompte === false &&
            <div className="">
              <p>Email : <strong>{userAuth?.name}</strong></p>
              <button className="fr-btn" onClick={() => setFormCompte(true)}>
                Modifier mon adresse e-mail &ensp;
                <span style={{ color: 'white' }} className="fr-fi-edit-line" aria-hidden="true" />
              </button>
            </div>
      }
      {formCompte === true &&
            <>
              <div className="fr-col-lg-9 fr-col-md-10 fr-col-12 fr-my-3w">
                <label className="fr-label">E-mail</label>
                <input className="fr-input" type="text" name="name" value={myEmail} onChange={handleFormMyEmail} />
              </div>
              <div className="fr-col-lg-9 fr-col-md-10 fr-col-12">
                <button onClick={() => setFormCompte(false)} className="fr-btn">Annuler </button>
                <button className="fr-btn fr-m-auto" style={{ float: 'right' }} onClick={updateEmail}>Valider</button>
              </div>
            </>
      }
    </div>
  );
}

MonCompte.propTypes = {
  setFlashMessage: PropTypes.func,
  myEmail: PropTypes.string,
  setMyEmail: PropTypes.func,
};

export default MonCompte;
