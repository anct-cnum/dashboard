import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';
import PropTypes from 'prop-types';
import Header from '../common/Header';
import { useHistory } from 'react-router-dom';

function EmailConfirmer({ match }) {
  let history = useHistory();
  const token = match.params.token;
  const dispatch = useDispatch();
  const tokenVerified = useSelector(state => state.createAccount.tokenVerified);
  const role = useSelector(state => state?.user?.userConnected?.role);
  useEffect(() => {
    dispatch(userActions.verifyToken(token));

  }, []);
  setTimeout(() => {
    if (tokenVerified === true) {
      dispatch(userActions.confirmeUserEmail(token));
    }
    setTimeout(() => {
      history.push(`/login?role=${role}`);
    }, 7000);
  }, 0);

  return (
    <div>
      <Header/>
      <div className="">
        <div className="fr-grid-row fr-grid-row--center fr-mt-3w">
          <div style={{ width: '50%', textAlign: 'center' }}>
            {tokenVerified === true &&
                  <div>
                    <p className="fr-label flashBag" style={{ fontSize: '16px' }}>
                  La confirmation de votre e-mail a été effectuée avec succès
                  &nbsp;
                      <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                    </p>
                    <h3>Nous allons vous rediriger sur la page de connexion...</h3>
                  </div>
            }
            {tokenVerified === false &&
                  <p className="fr-label flashBag labelError" style={{ fontSize: '16px' }}>
                  La confirmation de votre e-mail a échoué, <br/>
                  veuillez réessayer plus tard
                  </p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
EmailConfirmer.propTypes = {
  match: PropTypes.object
};

export default EmailConfirmer;
