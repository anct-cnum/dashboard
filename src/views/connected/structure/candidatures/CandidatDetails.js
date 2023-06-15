import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, conseillerActions } from '../../../../actions';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import ButtonsAction from './ButtonsAction';
import PopinInteressee from '../popins/popinInteressee';
import PopinRecrutee from '../popins/popinRecrutee';
import PopinNouvelleRupture from '../popins/popinNouvelleRupture';
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
  const errorUpdateStatus = useSelector(state => state.conseiller?.errorUpdateStatus);
  const errorUpdateDate = useSelector(state => state.conseiller?.errorUpdateDate);
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const downloading = useSelector(state => state.conseiller?.downloading);
  let dateRecrutementUpdated = useSelector(state => state.conseiller?.dateRecrutementUpdated);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const loading = useSelector(state => state?.conseiller?.loading);
  const [displayModal, setDisplayModal] = useState(true);

  useEffect(() => {
    if (!errorConseiller) {
      if (conseiller?._id !== id) {
        dispatch(conseillerActions.getCandidatStructure(id));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le candidat n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorConseiller]);

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
      {(errorUpdateStatus !== undefined && errorUpdateStatus !== false) &&
        <div className="fr-alert fr-alert--info fr-mt-3w">
          <p>{errorUpdateStatus}</p>
        </div>
      }
      {(errorUpdateDate !== undefined && errorUpdateDate !== false) &&
        <div className="fr-alert fr-alert--info fr-mt-3w">
          <p>{errorUpdateDate}</p>
        </div>
      }
      {dateRecrutementUpdated === true && conseiller?.miseEnRelation?.dateRecrutement !== null &&
        <p className="fr-alert fr-alert--success fr-mt-3w">
          La date de recrutement au {dayjs(conseiller?.miseEnRelation?.dateRecrutement).format('DD/MM/YYYY')} a bien &eacute;t&eacute; enregistr&eacute;e
        </p>
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
            <PopinRecrutee setDisplayModal={setDisplayModal} urlDossierConventionnement={conseiller?.urlDossierConventionnement} />
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
            statut={conseiller?.miseEnRelation?.statut}
            miseEnRelationId={conseiller?.miseEnRelation?._id}
            updateStatut={updateStatut}
            dateRupture={conseiller?.miseEnRelation?.dateRupture}
            motifRupture={conseiller?.miseEnRelation?.motifRupture} />
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
