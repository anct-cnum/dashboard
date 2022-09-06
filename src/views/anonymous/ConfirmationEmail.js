import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';
import { useParams, useNavigate } from 'react-router-dom';

function EmailConfirmer() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user);

  useEffect(() => {
    dispatch(userActions.confirmeUserEmail(token));
  }, []);

  useEffect(() => {
    if (user?.tokenVerified === true) {
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    }
  }, [user?.tokenVerified]);

  return (
    <div className="fr-container fr-my-10w">
      <div className="fr-grid-row fr-grid-row--center" style={{ textAlign: 'center' }}>
        <div className="fr-grid-row fr-grid-row--center fr-mt-3w">
          <div style={{ textAlign: 'center' }}>
            {user?.tokenVerified === true &&
              <div>
                <p className="fr-label flashBag" style={{ fontSize: '16px' }}>
                  La confirmation de votre e-mail a été effectuée avec succès
                  &nbsp;
                  <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                </p>
                <h3>Nous allons vous rediriger sur la page de connexion...</h3>
              </div>
            }
            {user?.tokenVerified === false &&
              <p className="fr-label flashBag labelError" style={{ fontSize: '16px' }}>
                La confirmation de votre e-mail a échoué, <br />
                veuillez réessayer plus tard
              </p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirmer;
