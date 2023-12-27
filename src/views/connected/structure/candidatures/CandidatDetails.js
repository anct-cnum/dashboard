import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, conseillerActions } from '../../../../actions';
import PropTypes from 'prop-types';
import ButtonsAction from './ButtonsAction';
import PopinInteressee from '../popins/PopinInteressee';
import PopinRecrutee from '../popins/PopinRecrutee';
import PopinNouvelleRupture from '../popins/PopinNouvelleRupture';
import Spinner from '../../../../components/Spinner';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { displayBadgeStatutCandidat, formatNomConseiller, pluralize } from '../../../../utils/formatagesUtils';
import InformationCandidat from '../../../../components/InformationCandidat';

function CandidatDetails() {

  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const errorContrat = useSelector(state => state.contrat?.error);
  const loadingContrat = useSelector(state => state.contrat?.loading);
  const errorUpdateStatus = useSelector(state => state.conseiller?.errorUpdateStatus);
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const downloading = useSelector(state => state.conseiller?.downloading);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const loading = useSelector(state => state?.conseiller?.loading);
  const [displayModal, setDisplayModal] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!errorConseiller) {
      if (conseiller?._id !== id || reload) {
        dispatch(conseillerActions.getCandidatStructure(id));
        setReload(false);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le candidat n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorConseiller, reload]);

  const updateStatut = statut => {
    dispatch(conseillerActions.updateStatus(conseiller.miseEnRelation?._id, statut));
    scrollTopWindow();
  };

  useEffect(() => {
    if ((errorUpdateStatus !== undefined && errorUpdateStatus !== false) ||
      (downloadError !== undefined && downloadError !== false)) {
      scrollTopWindow();

    }
  }, [errorUpdateStatus, downloadError]);

  return (
    <div className="fr-container candidatDetails">
      <Spinner loading={loading || downloading || loadingContrat} />
      {location?.state?.origin ?
        <Link
          to={location?.state?.origin} state={{ currentPage }}
          className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
          Retour &agrave; la liste
        </Link> :
        <button
          onClick={() => window.close()}
          className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
          Retour &agrave; la liste
        </button>
      }
      {(downloadError !== undefined && downloadError !== false) &&
        <div className="fr-alert fr-alert--error fr-mt-3w">
          <p>Le CV n&rsquo;a pas pu &ecirc;tre r&eacute;cup&eacute;r&eacute; !</p>
        </div>
      }
      {(errorUpdateStatus !== undefined && errorUpdateStatus !== false) &&
        <div className="fr-alert fr-alert--error fr-mt-3w">
          <p>{errorUpdateStatus}</p>
        </div>
      }
      {(errorContrat !== undefined && errorContrat !== false) &&
        <div className="fr-alert fr-alert--error fr-mt-3w">
          <p>{errorContrat}</p>
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
        <h1 className="fr-h1" style={{ color: '#000091', marginBottom: '0.3rem' }}>
          {conseiller ? formatNomConseiller(conseiller) : ''}
        </h1>
      </div>
      {displayModal &&
        <>
          {conseiller?.miseEnRelation?.statut === 'interessee' &&
            <PopinInteressee setDisplayModal={setDisplayModal} />
          }
          {conseiller?.miseEnRelation?.statut === 'recrutee' &&
            <PopinRecrutee setDisplayModal={setDisplayModal} urlDossierDS={conseiller?.urlDossierDS} />
          }
          {conseiller?.miseEnRelation?.statut === 'nouvelle_rupture' &&
            <PopinNouvelleRupture setDisplayModal={setDisplayModal} />
          }
        </>
      }
      <div className="fr-col-12">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <h5 className="fr-h5 fr-mb-1v fr-col-12">ID - {conseiller?.idPG ?? ''}</h5>
          {conseiller?.miseEnRelation?.statut &&
            <>
              {displayBadgeStatutCandidat(conseiller?.miseEnRelation?.statut)}
            </>
          }
          <ButtonsAction
            miseEnRelation={conseiller?.miseEnRelation}
            updateStatut={updateStatut}
            setDisplayModal={setDisplayModal}
            setReload={setReload}
          />
        </div>
      </div>
      <InformationCandidat conseiller={conseiller} />
    </div>
  );
}

CandidatDetails.propTypes = {
  location: PropTypes.object
};

export default CandidatDetails;
