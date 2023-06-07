import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, exportsActions, paginationActions, conventionActions } from '../../../actions';
import Spinner from '../../../components/Spinner';
import Pagination from '../../../components/Pagination';
import { downloadFile, scrollTopWindow } from '../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';
import BlockDatePickers from '../../../components/datePicker/BlockDatePickers';
import { StatutConventionnement } from '../../../utils/enumUtils';
import HistoriqueReconventionnement from './reconventionnement/HistoriqueReconventionnement';
import HistoriqueConventionnement from './conventionnement/HistoriqueConventionnement';
import HistoriqueAvenantAjoutPoste from './avenantAjoutPoste/HistoriqueAvenantAjoutPoste';
import HistoriqueAvenantRenduPoste from './avenantRenduPoste/HistoriqueAvenantRenduPoste';

export default function TableauHistoriqueConvention() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage);

  const loading = useSelector(state => state.convention?.loading);
  const loadingExport = useSelector(state => state.exports?.loading);
  const exportHistoriqueDossiersConventionFileBlob = useSelector(state => state.exports);
  const exportHistoriqueDossiersConventionFileError = useSelector(state => state.exports?.error);
  const error = useSelector(state => state.convention?.error);
  const conventions = useSelector(state => state.convention);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initConseiller, setInitConseiller] = useState(false);
  const [typeConvention, setTypeConvention] = useState('toutes');
  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);

  const has = value => value !== null && value !== undefined;

  useEffect(() => {
    if (conventions?.items && conventions?.items.limit !== 0) {
      const count = Math.floor(conventions.items.total / conventions.items.limit);
      dispatch(paginationActions.setPageCount(conventions.items.total % conventions.items.limit === 0 ? count : count + 1));
    }
  }, [conventions]);

  useEffect(() => {
    if (initConseiller === true) {
      dispatch(conventionActions.getAllHistorique(currentPage, typeConvention, dateDebut, dateFin));
    }
  }, [currentPage, typeConvention, dateDebut, dateFin]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initConseiller === false && page !== undefined) {
        dispatch(conventionActions.getAllHistorique(page, typeConvention, dateDebut, dateFin));
        setInitConseiller(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les dossiers n\'ont pas pu être chargés !',
        status: null, description: null
      }));
    }
  }, [error, page]);

  useEffect(() => {
    if (has(exportHistoriqueDossiersConventionFileBlob?.blob) && exportHistoriqueDossiersConventionFileError === false) {
      downloadFile(exportHistoriqueDossiersConventionFileBlob);
      dispatch(exportsActions.resetFile());
    } else {
      scrollTopWindow();
    }
  }, [exportHistoriqueDossiersConventionFileBlob, exportHistoriqueDossiersConventionFileError]);

  const exportHistoriqueConvention = () => {
    dispatch(exportsActions.exportDonneesHistoriqueDossiersConvention(typeConvention, dateDebut, dateFin));
  };

  const checkIfAvenantAjoutPoste = convention =>
    convention?.demandesCoselec?.filter(demande => demande.statut !== 'en_cours' && demande.type === 'ajout').length > 0;

  const checkIfAvenantRenduPoste = convention =>
    convention?.demandesCoselec?.filter(demande => demande.statut !== 'en_cours' && demande.type === 'rendu').length > 0;

  return (
    <div>
      <Spinner loading={loading || loadingExport} />
      <div className="">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="fr-col fr-col-lg-12 fr-col-md-8">
              <h1 style={{ color: '#000091' }} className="fr-h1">Historique des demandes de conventions trait&eacute;es</h1>
              <span>Retrouvez ici toutes les demandes de conventionnements, reconventionnements et avenants d&eacute;j&agrave; trait&eacute;es.</span>
            </div>

            <div className="fr-mt-4w">
              <ul className="tabs fr-tags-group">
                <button onClick={() => {
                  dispatch(paginationActions.setPage(1));
                  setTypeConvention('toutes');
                }} className="fr-tag" aria-pressed={typeConvention === 'toutes'}>
                  Afficher toutes les demandes ({conventions?.items?.totalParConvention?.total})
                </button>
                <button onClick={() => {
                  dispatch(paginationActions.setPage(1));
                  setTypeConvention('conventionnement');
                }} className="fr-tag" aria-pressed={typeConvention === 'conventionnement'}>
                  Conventionnement initial ({conventions?.items?.totalParConvention?.conventionnement})
                </button>
                <button onClick={() => {
                  dispatch(paginationActions.setPage(1));
                  setTypeConvention('reconventionnement');
                }} className="fr-tag" aria-pressed={typeConvention === 'reconventionnement'}>
                  Reconventionnement ({conventions?.items?.totalParConvention?.reconventionnement})
                </button>
                <button onClick={() => {
                  dispatch(paginationActions.setPage(1));
                  setTypeConvention('avenantAjoutPoste');
                }} className="fr-tag" aria-pressed={typeConvention === 'avenantAjoutPoste'}>
                  Avenant · ajout de poste ({conventions?.items?.totalParConvention?.avenantAjoutPoste})
                </button>
                <button onClick={() => {
                  dispatch(paginationActions.setPage(1));
                  setTypeConvention('avenantRenduPoste');
                }} className="fr-tag" aria-pressed={typeConvention === 'avenantRenduPoste'}>
                  Avenant · poste rendu ({conventions?.items?.totalParConvention?.avenantRenduPoste})
                </button>
              </ul>
              <div className="fr-container--fluid fr-mt-4w">
                <div className="fr-grid-row fr-grid-row--end">
                  <div className="fr-col-12 fr-col-md-8 fr-grid-row">
                    <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin} />
                  </div>
                  <div className="fr-ml-auto">
                    <button className="fr-btn fr-btn--secondary fr-icon-download-line fr-btn--icon-left" onClick={exportHistoriqueConvention}>
                      Exporter les donn&eacute;es
                    </button>
                  </div>
                </div>
              </div>
              <div className="fr-grid-row fr-grid-row--center fr-mt-1w">
                <div className="fr-col-12">
                  <div className="fr-table">
                    <table>
                      <thead>
                        <tr>
                          <th style={{ width: '9rem' }}>ID Structure</th>
                          <th style={{ width: '30rem' }}>Nom de la structure</th>
                          <th style={{ width: '13rem' }}>Date de la demande</th>
                          <th style={{ width: '12rem' }}>Nombre de postes</th>
                          <th style={{ width: '15rem' }}>Type de demande</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && conventions?.items?.data?.map((convention, idx) =>
                          <>
                            {((typeConvention === 'toutes' || 'avenantAjoutPoste') && checkIfAvenantAjoutPoste(convention)) &&
                              <>
                                {convention?.demandesCoselec?.filter(demande => demande.statut !== 'en_cours' && demande.type === 'ajout').map((demande, idx) =>
                                  <tr key={`avenantAjoutPoste-${idx}`}>
                                    <HistoriqueAvenantAjoutPoste avenant={demande} structure={convention} />
                                  </tr>
                                )}
                              </>
                            }
                            {((typeConvention === 'toutes' || 'avenantRenduPoste') && checkIfAvenantRenduPoste(convention)) &&
                              <>
                                {convention?.demandesCoselec?.filter(demande => demande.statut !== 'en_cours' && demande.type === 'rendu').map((demande, idx) =>
                                  <tr key={`avenantRenduPoste-${idx}`}>
                                    <HistoriqueAvenantRenduPoste avenant={demande} structure={convention} />
                                  </tr>
                                )}
                              </>
                            }
                            {(typeConvention === 'toutes' || typeConvention.includes('tionnement')) &&
                              <tr key={`conventionnement-${idx}`}>
                                {convention?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ &&
                                  <HistoriqueReconventionnement reconventionnement={convention} />
                                }
                                {convention?.conventionnement?.statut === StatutConventionnement.CONVENTIONNEMENT_VALIDÉ &&
                                  <HistoriqueConventionnement conventionnement={convention} />
                                }
                              </tr>
                            }
                          </>
                        )
                        }
                        {(!conventions?.items || conventions?.items?.data?.length === 0) &&
                          <tr>
                            <td colSpan="12" style={{ width: '60rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span className="not-found pair">Aucune demande de convention trouv&eacute;e</span>
                              </div>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                {conventions?.items?.data.length > 0 &&
                  <Pagination />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
