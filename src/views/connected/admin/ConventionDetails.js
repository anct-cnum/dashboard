import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, conventionActions } from '../../../actions';
import { formatNomContactStructure, formatNumeroTelephone } from '../../../utils/formatagesUtils';
import Spinner from '../../../components/Spinner';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import ReconventionnementDetails from './reconventionnement/ReconventionnementDetails';
import ConventionnementDetails from './conventionnement/ConventionnementDetails';
import AvenantAjoutPosteDetails from './avenantAjoutPoste/AvenantAjoutPosteDetails';
import AvenantRenduPosteDetails from './avenantRenduPoste/AvenantRenduPosteDetails';

function ConventionDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { idStructure } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const typeConvention = queryParams.get('type');
  const idDemandeCoselec = queryParams.get('demande');
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const convention = useSelector(state => state.convention?.convention);
  const loading = useSelector(state => state.convention?.loading);
  const loadingStructure = useSelector(state => state.structure?.loading);
  const errorConvention = useSelector(state => state.convention?.error);
  const currentPage = useSelector(state => state.pagination?.currentPage);

  useEffect(() => {
    if (!errorConvention) {
      scrollTopWindow();
      if (convention?._id !== idStructure) {
        dispatch(conventionActions.get(idStructure));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: errorConvention ?? 'Le dossier n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorConvention]);

  const checkIfAvenantCorrect = convention => {
    if (typeConvention === 'avenant-ajout-poste' || typeConvention === 'avenant-rendu-poste') {
      return convention?.demandesCoselec?.some(demande => demande.id === idDemandeCoselec);
    }
    return true;
  };

  useEffect(() => {
    if (convention !== undefined) {
      if (!checkIfAvenantCorrect(convention)) {
        dispatch(alerteEtSpinnerActions.getMessageAlerte({
          type: 'error',
          message: 'L\'avenant n\'a pas pu être chargé !',
          status: null, description: null
        }));
      }
    }
  }, [convention]);

  return (
    <div className="conventionDetails">
      <Spinner loading={loading || loadingStructure} />
      <Link
        to={location?.state?.origin}
        state={{ currentPage, typeConvention: location?.state?.typeConvention ?? 'toutes' }}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </Link>
      <div className="fr-col-12 fr-pt-6w">
        <h1 className="fr-h1 fr-mb-1w" style={{ color: '#000091' }}>{convention?.nom ?? '-'}</h1>
      </div>
      <div className="fr-col-12 fr-mb-4w">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <span className="fr-text--xl fr-text--bold" style={{ marginBottom: '0' }}>ID - {convention?.idPG ?? ''}</span>
          <button className="fr-btn fr-icon-eye-line fr-btn--icon-left fr-ml-auto"
            onClick={() => window.open(`/${roleActivated}/structure/${convention?._id}`)}>
            D&eacute;tails structure
          </button>
        </div>
      </div>
      <div className="color-text color-title-subpart">
        <div className="fr-card">
          <div className="fr-card__body fr-p-0">
            <div className="fr-container fr-mt-3w">
              <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--bottom">
                <div className="fr-col-12 fr-col-lg-3">
                  <div className="fr-mb-3w">
                    <strong>Contact de la structure</strong><br />
                    <span className="fr-text--regular fr-text--md">
                      {convention ? formatNomContactStructure(convention) : ''}
                    </span>
                  </div>
                </div>
                <div className="fr-col-12 fr-col-md-3">
                  <div className="fr-mb-3w">
                    <strong>Fonction</strong><br />
                    <span className="fr-text--regular fr-text--md" title={convention?.contact?.fonction ?? ''}>
                      {convention?.contact?.fonction ?
                        <>
                          {convention?.contact?.fonction?.length > 28 ?
                            `${convention?.contact?.fonction.substring(0, 28)}...` : convention?.contact?.fonction
                          }
                        </> : '-'
                      }
                    </span>
                  </div>
                </div>
                <div className="fr-col-12 fr-col-md-3">
                  <div className="fr-mb-3w">
                    <strong>T&eacute;l&eacute;phone</strong><br />
                    <span className="fr-text--regular fr-text--md">
                      {formatNumeroTelephone(convention?.contact?.telephone)}
                    </span>
                  </div>
                </div>
                <div className="fr-col-12 fr-col-md-3">
                  <div className="fr-mb-3w">
                    <strong>Email</strong><br />
                    <span className="fr-text--regular fr-text--md" title={convention?.contact?.email ?? ''}>
                      {convention?.contact?.email ?
                        <>
                          {convention?.contact?.email?.length > 30 ?
                            `${convention?.contact?.email.substring(0, 30)}...` : convention?.contact?.email
                          }
                        </> : '-'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-7w fr-mb-2w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }} />
          </div>
        </div>
        {typeConvention === 'reconventionnement' &&
          <ReconventionnementDetails reconventionnement={convention} />
        }
        {typeConvention === 'conventionnement' &&
          <ConventionnementDetails structure={convention} />
        }
        {typeConvention === 'avenant-ajout-poste' && checkIfAvenantCorrect(convention) &&
          <AvenantAjoutPosteDetails avenant={convention} idDemandeCoselec={idDemandeCoselec} />
        }
        {typeConvention === 'avenant-rendu-poste' && checkIfAvenantCorrect(convention) &&
          <AvenantRenduPosteDetails avenant={convention} idDemandeCoselec={idDemandeCoselec} />
        }
      </div>
    </div>
  );
}

export default ConventionDetails;
