import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, conseillerActions } from '../../../../actions';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';
import Spinner from '../../../../components/Spinner';
import FormSuppressionCandidat from './FormSuppressionCandidat';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import InformationCandidat from '../../../../components/InformationCandidat';

function CandidatDetails() {
  const dispatch = useDispatch();
  const { idCandidat } = useParams();
  const navigate = useNavigate();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const loading = useSelector(state => state.conseiller?.loading);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const downloading = useSelector(state => state.conseiller?.downloading);
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const successDeleteCandidat = useSelector(state => state.conseiller?.successDeleteCandidat);
  const successSendMail = useSelector(state => state.conseiller?.successResendInvitCandidatConseiller);
  const errorCandidat = useSelector(state => state.conseiller?.errorCandidat);
  const [confirmSuppressionCandidat, setConfirmSuppressionCandidat] = useState(false);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  useEffect(() => {
    if (!errorConseiller) {
      scrollTopWindow();
      if (conseiller?._id !== idCandidat) {
        dispatch(conseillerActions.getCandidat(idCandidat));
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

  useEffect(() => {
    if (successDeleteCandidat) {
      navigate(`/${roleActivated}/liste-candidatures`);
    }
  }, [successDeleteCandidat]);

  const resendInvitCandidat = () => {
    window.scrollTo(0, 0);
    dispatch(conseillerActions.resendInvitCandidat(idCandidat));
  };

  return (
    <div className="fr-container candidatDetails">
      <Spinner loading={loading || downloading} />
      <Link
        to={location?.state?.origin ?? '/admin/liste-candidatures'} state={{ currentPage }}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </Link>
      {(downloadError !== undefined && downloadError !== false) &&
        <div className="fr-alert fr-alert--error">
          <p>Le CV n&rsquo;a pas pu &ecirc;tre r&eacute;cup&eacute;r&eacute; !</p>
        </div>
      }
      {successSendMail &&
        <div className="fr-alert fr-alert--success" style={{ marginBottom: '2rem' }} >
          <p className="fr-alert__title">
            {successSendMail}
          </p>
        </div>
      }
      {errorCandidat &&
        <div className="fr-alert fr-alert--error" style={{ marginBottom: '2rem' }}>
          <p className="fr-alert__title">
            {errorCandidat}
          </p>
        </div>
      }
      <div className="fr-col-12 fr-pt-6w">
        <h1 className="fr-h1 fr-mb-2v" style={{ color: '#000091' }}>{conseiller ? formatNomConseiller(conseiller) : ''}</h1>
      </div>
      <div className="fr-col-12 fr-mb-4w">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <h5 className="fr-h5 text-id">ID - {conseiller?.idPG ?? ''}</h5>
          <button className="fr-btn btn-actions fr-btn--secondary" title="Supprimer la candidature" onClick={() => {
            setConfirmSuppressionCandidat(true);
            scrollTopWindow();
          }}>
            Supprimer la candidature
          </button>
          <button className="fr-btn fr-ml-md-2w fr-mt-2w fr-mt-md-0" title="Renvoyer l&rsquo;email d&rsquo;invitation" onClick={resendInvitCandidat}>
            Renvoyer l&rsquo;email d&rsquo;invitation
          </button>
        </div>
        {confirmSuppressionCandidat &&
          <FormSuppressionCandidat setConfirmSuppressionCandidat={setConfirmSuppressionCandidat} />
        }
      </div>
      <InformationCandidat conseiller={conseiller} />
    </div>
  );
}

export default CandidatDetails;
