import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, conseillerActions } from '../../../../actions';
import PropTypes from 'prop-types';
import Spinner from '../../../../components/Spinner';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { formatNomConseiller, pluralize } from '../../../../utils/formatagesUtils';
import InformationCandidat from '../commun/InformationCandidat';

function PreselectionCandidatDetails() {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const errorUpdateStatus = useSelector(state => state.conseiller?.errorUpdateStatus);
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const downloading = useSelector(state => state.conseiller?.downloading);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const loading = useSelector(state => state?.conseiller?.loading);

  useEffect(() => {
    if (!errorConseiller) {
      if (conseiller?._id !== id) {
        dispatch(conseillerActions.getCandidat(id));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le candidat n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorConseiller]);

  useEffect(() => {
    if ((errorUpdateStatus !== undefined && errorUpdateStatus !== false) ||
      (downloadError !== undefined && downloadError !== false)) {
      scrollTopWindow();

    }
  }, [errorUpdateStatus, downloadError]);

  const preSelectionnerCandidat = () => {
    dispatch(conseillerActions.preSelectionner(conseiller._id));
    scrollTopWindow();
    navigate('/structure/candidats/interessee');
  };

  return (
    <div className="fr-container candidatDetails">
      <Spinner loading={loading || downloading} />
      <Link
        to={location?.state?.origin ?? '/structure/candidats/nouvelle'} state={{ currentPage }}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </Link>
      {(downloadError !== undefined && downloadError !== false) &&
      <div className="fr-alert fr-alert--error fr-mt-3w">
        <p>Le CV n&rsquo;a pas pu &ecirc;tre r&eacute;cup&eacute;r&eacute; !</p>
      </div>
      }
      { (errorUpdateStatus !== undefined && errorUpdateStatus !== false) &&
      <div className="fr-alert fr-alert--info fr-mt-3w">
        <p>{errorUpdateStatus}</p>
      </div>
      }
      <div className="fr-col-12 fr-pt-6w">
        {conseiller?.coselec?.nombreConseillersCoselec &&
      <div className="fr-mb-3w">
        <span className="fr-text--lg fr-text--bold">
          {conseiller.coselec.nombreConseillersCoselec}&nbsp;
          {pluralize(
            'conseiller validé',
            'conseiller validé',
            'conseillers validés',
            conseiller.coselec.nombreConseillersCoselec
          )}
          &nbsp;par l&rsquo;Agence nationale de la coh&eacute;sion des territoires
        </span>
      </div>
        }
        <h1 className="fr-h1" style={{ color: '#000091', marginBottom: '0.8rem' }}>{conseiller ? formatNomConseiller(conseiller) : ''}</h1>
      </div>
      <div className="fr-col-12">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <h5 className="fr-h5" style={{ marginBottom: '0.5rem' }}>ID - {conseiller?.idPG ?? ''}</h5>
        </div>
      </div>
      <div className="fr-col-12 fr-grid-row" style={{ alignItems: 'baseline' }}>
        <button onClick={preSelectionnerCandidat}
          className="fr-btn fr-ml-md-auto"
          title="Pr&eacute;selectionner ce candidat">
          Préselectionner ce candidat
        </button>
      </div>
      <InformationCandidat conseiller={conseiller} />
    </div>
  );
}

PreselectionCandidatDetails.propTypes = {
  location: PropTypes.object
};

export default PreselectionCandidatDetails;
