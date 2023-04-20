import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, exportsActions, paginationActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import { downloadFile, scrollTopWindow } from '../../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';
import { contratActions } from '../../../../actions/contratActions';
import BlockDatePickers from '../../../../components/datePicker/BlockDatePickers';
import HistoriqueContrat from './HistoriqueContrat';

export default function TableauHistoriqueContrat() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage);

  const loading = useSelector(state => state.contrat?.loading);
  const loadingExport = useSelector(state => state.exports?.loading);
  const error = useSelector(state => state.contrat?.error);
  const contrats = useSelector(state => state.contrat);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initContrat, setInitContrat] = useState(false);
  const [statutContrat, setStatutContrat] = useState('toutes');
  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);
  const exportHistoriqueContratFileBlob = useSelector(state => state.exports);
  const exportHistoriqueContratError = useSelector(state => state.exports?.error);

  const has = value => value !== null && value !== undefined;

  useEffect(() => {
    if (contrats?.items && contrats?.items?.total > 0) {
      const count = Math.floor(contrats.items.total / contrats.items.limit);
      dispatch(paginationActions.setPageCount(contrats.items.total % contrats.items.limit === 0 ? count : count + 1));
    }
  }, [contrats]);

  useEffect(() => {
    if (initContrat === true) {
      dispatch(contratActions.getAllHistorique(currentPage, statutContrat, dateDebut, dateFin));
    }
  }, [currentPage, statutContrat, dateDebut, dateFin]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initContrat === false && page !== undefined) {
        dispatch(contratActions.getAllHistorique(page, statutContrat, dateDebut, dateFin));
        setInitContrat(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les contrats n\'ont pas pu être chargés !',
        status: null, description: null
      }));
    }
  }, [error, page]);

  useEffect(() => {
    if (has(exportHistoriqueContratFileBlob?.blob) && exportHistoriqueContratError === false) {
      downloadFile(exportHistoriqueContratFileBlob);
      dispatch(exportsActions.resetFile());
    } else {
      scrollTopWindow();
    }
  }, [exportHistoriqueContratFileBlob, exportHistoriqueContratError]);

  const exportHistoriqueContrat = () => {
    dispatch(exportsActions.exportDonneesHistoriqueContrat(statutContrat, dateDebut, dateFin));
  };

  return (
    <div className="contrats">
      <Spinner loading={loading || loadingExport} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="fr-col fr-col-lg-12 fr-col-md-8">
              <h1 className="fr-h1 title">Historique des demandes de contrats trait&eacute;es</h1>
              <span>Retrouvez ici toutes les demandes de recrutements, renouvellements et ruptures de contrat d&eacute;j&agrave; trait&eacute;es.</span>
            </div>
            <div className="fr-container--fluid fr-mt-4w">
              <ul className="tabs fr-tags-group">
                <button onClick={() => setStatutContrat('toutes')} className="fr-tag" aria-pressed={statutContrat === 'toutes'}>
                  Afficher toutes les demandes ({contrats?.items?.totalParContrat?.total})
                </button>
                <button onClick={() => setStatutContrat('finalisee')} className="fr-tag" aria-pressed={statutContrat === 'finalisee'}>
                  Recrutements ({contrats?.items?.totalParContrat?.recrutement})
                </button>
                <button onClick={() => setStatutContrat('renouvellee')} className="fr-tag" aria-pressed={statutContrat === 'renouvellee'}>
                  Renouvellements de contrat ({contrats?.items?.totalParContrat?.renouvellementDeContrat})
                </button>
                <button onClick={() => setStatutContrat('finalisee_rupture')} className="fr-tag" aria-pressed={statutContrat === 'finalisee_rupture'}>
                  Rupture de contrat ({contrats?.items?.totalParContrat?.ruptureDeContrat})
                </button>
              </ul>
              <div className="fr-container--fluid fr-mt-4w">
                <div className="fr-grid-row fr-grid-row--end">
                  <div className="fr-col-12 fr-col-md-8 fr-grid-row">
                    <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin}/>
                  </div>
                  <div className="fr-ml-auto">
                    <button className="fr-btn fr-btn--secondary fr-icon-download-line fr-btn--icon-left" onClick={exportHistoriqueContrat}>
                      Exporter les donn&eacute;es
                    </button>
                  </div>
                </div>
              </div>
              <div className="fr-grid-row fr-grid-row--center fr-mt-1w">
                <div className="fr-col-12">
                  <div className="fr-table">
                    <table className={contrats?.items?.data?.length < 2 ? 'no-result-table' : ''}>
                      <thead>
                        <tr>
                          <th style={{ width: '8rem' }}>ID structure</th>
                          <th style={{ width: '17rem' }}>Nom de la structure</th>
                          <th style={{ width: '13rem' }}>Nom du candidat</th>
                          <th style={{ width: '11rem' }}>Date de la demande</th>
                          <th style={{ width: '11rem' }}>Type de la demande</th>
                          <th style={{ width: '12rem' }}>Type de contrat</th>
                          <th style={{ width: '12rem' }}>Début de contrat</th>
                          <th style={{ width: '12rem' }}>Fin de contrat</th>
                          <th style={{ width: '3.1rem' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && contrats?.items?.data?.map((contrat, idx) => {
                          return (<HistoriqueContrat key={idx} contrat={contrat} />);
                        })
                        }
                        {(!contrats?.items || contrats?.items?.total === 0) &&
                          <tr>
                            <td colSpan="12" style={{ width: '60rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span className="not-found pair">Aucun contrat trouv&eacute;</span>
                              </div>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                {contrats?.items?.data?.length > 0 &&
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
