import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, conventionActions } from '../../../actions';
import { formatNomContactStructure } from '../../../utils/formatagesUtils';
import Spinner from '../../../components/Spinner';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import ReconventionnementDetails from './reconventionnement/ReconventionnementDetails';
import ConventionnementDetails from './conventionnement/ConventionnementDetails';

function ConventionDetails() {
  const dispatch = useDispatch();
  const { idStructure } = useParams();
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const convention = useSelector(state => state.convention?.convention);
  const loading = useSelector(state => state.convention?.loading);
  const errorConvention = useSelector(state => state.convention?.error);

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

  return (
    <div>
      <Spinner loading={loading} />
      <button
        onClick={() => window.close()}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </button>
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
      <div>
        <div className="fr-card">
          <div className="fr-card__body fr-p-0">
            <div className="fr-container  fr-mt-3w">
              <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--bottom">
                <div className="fr-col-3">
                  <div className="fr-mb-3w">
                    <strong>Contact de la structure</strong><br />
                    <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                      {convention ? formatNomContactStructure(convention) : ''}
                    </span>
                  </div>
                </div>
                <div className="fr-col-3">
                  <div className="fr-mb-3w">
                    <strong>Fonction</strong><br />
                    <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>{convention?.contact?.fonction ?? '-'}</span>
                  </div>
                </div>
                <div className="fr-col-3">
                  <div className="fr-mb-3w">
                    <strong>T&eacute;l&eacute;phone</strong><br />
                    <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                      {convention?.contact?.telephone ?? '-'}
                    </span>
                  </div>
                </div>
                <div className="fr-col-3">
                  <div className="fr-mb-3w">
                    <strong>Email</strong><br />
                    <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>{convention?.contact?.email ?? '-'}</span>
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
        {convention?.conventionnement?.statut?.match(/\bRECONVENTIONNEMENT\B/) &&
          <ReconventionnementDetails reconventionnement={convention} />
        }
        {convention?.conventionnement?.statut?.match(/\bCONVENTIONNEMENT\B/) &&
          <ConventionnementDetails conventionnement={convention} />
        }
      </div>
    </div>
  );
}

export default ConventionDetails;