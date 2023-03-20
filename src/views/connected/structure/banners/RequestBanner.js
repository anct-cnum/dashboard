import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const RequestBanner = ({ setOpenModal, openModal }) => {
  const navigate = useNavigate();
  return (
    <div
      className="fr-notice fr-notice--info"
      style={{ position: 'absolute', top: '173px', left: '0%', right: '0%' }}
    >
      <div className="fr-container">
        <div className="fr-notice__body fr-grid-row fr-grid-row--middle fr-py-1w">
          <div>
            <p className="fr-notice__title">Vous arrivez à la fin de votre conventionnement?</p>
            <p className="fr-text--md">
              Vous pouvez dès à présent faire votre demande de reconventionnement
            </p>
          </div>
          <div className="fr-ml-auto fr-pt-2w">
            <ul className="fr-btns-group fr-btns-group--inline-md">
              <li>
                <button
                  className="fr-btn fr-btn--secondary"
                  data-fr-opened="false"
                  aria-controls="fr-modal-2"
                  onClick={() => setOpenModal(!openModal)}
                >
                  Je ne suis pas int&eacute;ress&eacute;
                </button>
              </li>
              <li>
                <button
                  className="fr-btn"
                  onClick={() => navigate('/structure/demande-de-reconventionnement')}
                >
                  Faire ma demande
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

RequestBanner.propTypes = {
  setOpenModal: PropTypes.func,
  openModal: PropTypes.bool,
};

export default RequestBanner;
