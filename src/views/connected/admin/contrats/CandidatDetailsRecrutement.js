import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, conseillerActions } from '../../../../actions';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';
import Spinner from '../../../../components/Spinner';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import CardsRecrutement from './cards/CardsRecrutement';
import InformationCandidat from '../../../../components/InformationCandidat';

function CandidatDetailsRecrutement() {
  const dispatch = useDispatch();
  const { idCandidat, idMiseEnRelation } = useParams();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const loading = useSelector(state => state.conseiller?.loading);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const downloading = useSelector(state => state.conseiller?.downloading);
  const downloadError = useSelector(state => state.conseiller?.downloadError);

  useEffect(() => {
    if (!errorConseiller) {
      scrollTopWindow();
      if (conseiller?._id !== idCandidat) {
        dispatch(conseillerActions.getCandidatRecrutement(idCandidat, idMiseEnRelation));
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
    if (downloadError !== undefined && downloadError !== false) {
      scrollTopWindow();
    }
  }, [downloadError]);

  return (
    <div className="fr-container candidatDetails">
      <Spinner loading={loading || downloading} />
      <button
        onClick={() => window.close()}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </button>
      {(downloadError !== undefined && downloadError !== false) &&
      <div className="fr-alert fr-alert--error">
        <p>Le CV n&rsquo;a pas pu &ecirc;tre r&eacute;cup&eacute;r&eacute; !</p>
      </div>
      }
      <div className="fr-col-12 fr-pt-6w">
        <h1 className="fr-h1 fr-mb-2v" style={{ color: '#000091' }}>{conseiller ? formatNomConseiller(conseiller) : ''}</h1>
      </div>
      <div className="fr-col-12">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <h5 className="fr-h5 fr-mb-3v">ID - {conseiller?.idPG ?? ''}</h5>
        </div>
      </div>
      <CardsRecrutement miseEnRelation={conseiller?.miseEnRelation} conseiller={conseiller} />
      <InformationCandidat conseiller={conseiller} />
    </div>
  );
}

export default CandidatDetailsRecrutement;
