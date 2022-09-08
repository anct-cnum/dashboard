import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';
import { useParams, useNavigate } from 'react-router-dom';

function ConfirmationEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user);

  useEffect(() => {
    dispatch(userActions.verifyToken(token));
  }, []);

  useEffect(() => {
    if (user?.tokenVerified === true) {
      dispatch(userActions.confirmeUserEmail(token));
      setTimeout(() => {
        navigate('/login');
      }, 6000);
    }
  }, [user?.tokenVerified]);

  return (
    <div className="fr-container fr-my-10w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-grid-row fr-grid-row--center fr-mt-3w">
          <div style={{ textAlign: 'center' }}>
            {user?.tokenVerified === true &&
              <div className="fr-alert fr-alert--success">
                <p className="fr-alert__title">La confirmation de votre e-mail a &eacute;t&eacute; effectu&eacute;e avec succ&egrave;s</p>
                <p>Nous allons vous rediriger sur la page de connexion...</p>
              </div>
            }
            {user?.tokenVerified === false &&
              <div className="fr-alert fr-alert--error">
                <p className="fr-alert__title">La confirmation de votre e-mail a &eacute;chou&eacute;</p>
                <p>Veuillez r&eacute;essayer plus tard</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationEmail;
