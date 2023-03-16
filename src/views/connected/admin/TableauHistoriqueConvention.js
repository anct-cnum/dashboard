import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, exportsActions, paginationActions, reconventionnementActions } from '../../../actions';
import Spinner from '../../../components/Spinner';
import Pagination from '../../../components/Pagination';
import { downloadFile, scrollTopWindow } from '../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';
import Reconventionnement from './reconventionnement/Reconventionnement';
import Conventionnement from './conventionnement/Conventionnement';
import BlockDatePickers from '../commun/statistiques/Components/commun/BlockDatePickers';
import { StatutConventionnement } from '../../../utils/enumUtils';

export default function TableauHistoriqueConvention() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage);

  const loading = useSelector(state => state.reconventionnement?.loading);
  const loadingExport = useSelector(state => state.exports?.loading);
  const exportHistoriqueDossiersConventionFileBlob = useSelector(state => state.exports);
  const exportHistoriqueDossiersConventionFileError = useSelector(state => state.exports?.error);
  const error = useSelector(state => state.reconventionnement?.error);
  const reconventionnements = useSelector(state => state.reconventionnement);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initConseiller, setInitConseiller] = useState(false);
  const [typeConvention, setTypeConvention] = useState('toutes');
  const dateDebut = useSelector(state => state.filtresHistoriqueConvention?.dateDebut);
  const dateFin = useSelector(state => state.filtresHistoriqueConvention?.dateFin);

  const has = value => value !== null && value !== undefined;

  useEffect(() => {
    if (reconventionnements?.items && reconventionnements?.items.limit !== 0) {
      const count = Math.floor(reconventionnements.items.total / reconventionnements.items.limit);
      dispatch(paginationActions.setPageCount(reconventionnements.items.total % reconventionnements.items.limit === 0 ? count : count + 1));
    }
  }, [reconventionnements]);

  useEffect(() => {
    if (initConseiller === true) {
      if (typeConvention === 'avenantAjoutPoste' || typeConvention === 'avenantRenduPoste') {
        dispatch(reconventionnementActions.reset());
      } else {
        dispatch(reconventionnementActions.getAllHistorique(currentPage, typeConvention, dateDebut, dateFin));
      }
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
        dispatch(reconventionnementActions.getAllHistorique(page, typeConvention, dateDebut, dateFin));
        setInitConseiller(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les dossiers de reconventionnement n\'ont pas pu être chargés !',
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
                <button onClick={() => setTypeConvention('toutes')} className="fr-tag" aria-pressed={typeConvention === 'toutes'}>
                  Afficher toutes les demandes ({reconventionnements?.items?.totalParConvention?.total})
                </button>
                <button onClick={() => setTypeConvention('conventionnement')} className="fr-tag" aria-pressed={typeConvention === 'conventionnement'}>
                  Conventionnement initial ({reconventionnements?.items?.totalParConvention?.conventionnement})
                </button>
                <button onClick={() => setTypeConvention('reconventionnement')} className="fr-tag" aria-pressed={typeConvention === 'reconventionnement'}>
                  Reconventionnement ({reconventionnements?.items?.totalParConvention?.reconventionnement})
                </button>
                <button onClick={() => setTypeConvention('avenantAjoutPoste')} className="fr-tag" aria-pressed={typeConvention === 'avenantAjoutPoste'}>
                  Avenant · ajout de poste ({reconventionnements?.items?.totalParConvention?.avenantAjoutPoste})
                </button>
                <button onClick={() => setTypeConvention('avenantRenduPoste')} className="fr-tag" aria-pressed={typeConvention === 'avenantRenduPoste'}>
                  Avenant · poste rendu ({reconventionnements?.items?.totalParConvention?.avenantRenduPoste})
                </button>
              </ul>
              <div className="fr-container--fluid fr-mt-4w">
                <div className="fr-grid-row fr-grid-row--end">
                  <div className="fr-col-12 fr-col-md-8 fr-grid-row">
                    <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin}/>
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
                          <th style={{ width: '5rem' }}>Id</th>
                          <th style={{ width: '15rem' }}>Nom de la structure</th>
                          <th>Date de la demande</th>
                          <th>Date de fin du prochain contrat</th>
                          <th>Nombre de postes</th>
                          <th style={{ width: '12rem' }}>Type de la demande</th>
                          <th style={{ width: '12rem' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && reconventionnements?.items?.data?.map((convention, idx) =>
                          <tr key={idx}>
                            {convention?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ &&
                              <Reconventionnement reconventionnement={convention} />
                            }
                            {convention?.conventionnement?.statut === StatutConventionnement.CONVENTIONNEMENT_VALIDÉ &&
                              <Conventionnement conventionnement={convention} />
                            }
                          </tr>
                        )
                        }
                        {(!reconventionnements?.items || reconventionnements?.items?.data?.length === 0) &&
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
                {reconventionnements?.items?.data.length > 0 &&
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
