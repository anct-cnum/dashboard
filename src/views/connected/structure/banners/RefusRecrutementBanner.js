import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { structureActions } from '../../../../actions';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';

const RefusRecrutementBanner = ({ conseiller, structure }) => {
  const dispatch = useDispatch();
  function closeBanner() {
    dispatch(structureActions.closeBanner('recrutement', structure?._id, conseiller?.conseillerObj?._id));
  }

  return (
    <div className="fr-notice fr-py-4w banner success background">
      <div className="fr-container success responsive__banner">
        <div className="responsive__banner">
          <div>
            <p className="fr-notice__title title__color" style={{ width: '70rem' }}>
              <span className="fr-icon-checkbox-fill icon__color" aria-hidden="true"></span>
              <span className="fr-ml-2w">
                {`Le recrutement de ${formatNomConseiller(conseiller?.conseillerObj)} a été refusé. Pour plus d'informations, contactez`}
                &nbsp;<a href="mailto:conseiller-numerique@anct.gouv.fr"
                  title="conseiller-numerique@anct.gouv.fr">conseiller-numerique@anct.gouv.fr</a></span>
            </p>
          </div>
          <div className="banner__button_progress_contrat">
            <button className="fr-icon-close-line" onClick={() => closeBanner()}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

RefusRecrutementBanner.propTypes = {
  conseiller: PropTypes.object,
  structure: PropTypes.object
};

export default RefusRecrutementBanner;
