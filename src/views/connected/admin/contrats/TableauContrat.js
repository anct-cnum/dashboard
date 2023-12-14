import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, contratActions, filtresConventionsActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { useLocation, useNavigate } from 'react-router-dom';
import Contrat from './Contrat';
import FiltresEtTrisContrat from './FiltresEtTrisContrat';
import FiltresEtTrisContratRupture from './ruptures/FiltresEtTrisContratRupture';
import TableauRuptures from './ruptures/TableauRuptures';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';

export default function TableauContrat() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(location.state?.currentPage);
  const [annulationRecrutement, setAnnulationRecrutement] = useState(location.state?.conseillerRefusRecrutement || null);
  const loading = useSelector(state => state.contrat?.loading);
  const error = useSelector(state => state.contrat?.error);
  const contrats = useSelector(state => state.contrat);
  const ordre = useSelector(state => state.filtresConventions?.ordre);
  const ordreNom = useSelector(state => state.filtresConventions?.ordreNom);
  const filtreSearchBar = useSelector(state => state.filtresConventions?.nom);
  const filtreDepartement = useSelector(state => state.filtresConventions?.departement);
  const filtreRegion = useSelector(state => state.filtresConventions?.region);
  const filtreStatutDossierRupture = useSelector(state => state.filtresConventions?.statutDossierRupture);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initContrat, setInitContrat] = useState(false);
  const [statutContrat, setStatutContrat] = useState(location.state?.statutContrat || 'toutes');

  useEffect(() => {
    if (contrats?.items && contrats?.items?.total > 0) {
      const count = Math.floor(contrats.items.total / contrats.items.limit);
      dispatch(paginationActions.setPageCount(contrats.items.total % contrats.items.limit === 0 ? count : count + 1));
    }
  }, [contrats]);

  useEffect(() => {
    if (initContrat === true) {
      dispatch(contratActions.getAll(
        currentPage,
        statutContrat,
        filtreSearchBar,
        filtreDepartement,
        filtreRegion,
        filtreStatutDossierRupture,
        ordreNom,
        ordre ? -1 : 1
      ));
    }
  }, [currentPage, statutContrat, filtreSearchBar, filtreDepartement, filtreStatutDossierRupture, filtreRegion, ordre, ordreNom]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      dispatch(filtresConventionsActions.resetFiltre());
      setPage(1);
    }
    if (!error) {
      if (initContrat === false && page !== undefined) {
        dispatch(contratActions.getAll(
          page,
          statutContrat,
          filtreSearchBar,
          filtreDepartement,
          filtreRegion,
          filtreStatutDossierRupture,
          ordreNom,
          ordre ? -1 : 1
        ));
        navigate(location.pathname, { replace: true });
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

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresConventionsActions.changeOrdre(e.currentTarget?.id));
  };

  useEffect(() => {
    if (annulationRecrutement) {
      setTimeout(() => {
        setAnnulationRecrutement(null);
      }, 5000);
    }
  }, [annulationRecrutement]);

  return (
    <div className="conventions">
      <Spinner loading={loading} />
      {annulationRecrutement &&
        <div className="fr-alert fr-alert--success" style={{ marginBottom: '2rem' }} >
          <p className="fr-alert__title">
            La demande de recrutement de {formatNomConseiller(annulationRecrutement)} a &eacute;t&eacute; annul&eacute;e
          </p>
        </div>
      }
      <div className="fr-grid-row">
        <div className="fr-col-12">
          <h1 className="fr-h1 title">Demandes de contrats</h1>
          <span>Retrouvez ici toutes les demandes de recrutements, renouvellements et ruptures de contrat &agrave; valider.</span>
          <div className="fr-mt-4w">
            <ul className="tabs fr-tags-group">
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setStatutContrat('toutes');
              }} className="fr-tag" aria-pressed={statutContrat === 'toutes'}>
                Afficher toutes les demandes ({contrats?.items?.totalParContrat?.total})
              </button>
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setStatutContrat('recrutee');
              }} className="fr-tag" aria-pressed={statutContrat === 'recrutee'}>
                Recrutements ({contrats?.items?.totalParContrat?.recrutement})
              </button>
              <button onClick={() => setStatutContrat('renouvellement_initiee')} className="fr-tag" aria-pressed={statutContrat === 'renouvellement_initiee'}>
                Renouvellements de contrat ({contrats?.items?.totalParContrat?.renouvellementDeContrat})
              </button>
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setStatutContrat('nouvelle_rupture');
              }} className="fr-tag" aria-pressed={statutContrat === 'nouvelle_rupture'}>
                Rupture de contrat ({contrats?.items?.totalParContrat?.ruptureDeContrat})
              </button>
            </ul>
            <div className="fr-col-12 fr-mt-3w">
              {statutContrat === 'nouvelle_rupture' ?
                <FiltresEtTrisContratRupture /> : <FiltresEtTrisContrat />
              }
            </div>
            <div className="fr-grid-row fr-grid-row--center fr-mt-1w">
              <div className="fr-col-12">
                <div className="fr-table">
                  {statutContrat === 'nouvelle_rupture' ?
                    <TableauRuptures
                      contrats={contrats}
                      loading={loading}
                      error={error}
                      ordreNom={ordreNom}
                      ordre={ordre}
                    /> :
                    <table className={contrats?.items?.data?.length < 2 ? 'no-result-table' : ''}>
                      <thead>
                        <tr>
                          <th style={{ width: '8rem' }}>ID structure</th>
                          <th style={{ width: `${statutContrat === 'toutes' ? '18rem' : '20rem'}` }}>Nom de la structure</th>
                          <th style={{ width: '13rem' }}>Nom du candidat</th>
                          <th style={{ width: '13rem' }}>
                            <button id="dateDemande" className="filtre-btn" onClick={ordreColonne}>
                              <span>Date de la demande
                                {(ordreNom !== 'dateDemande' || ordreNom === 'dateDemande' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                {(ordreNom === 'dateDemande' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th style={{ width: '11rem' }}>Type de la demande</th>
                          <th style={{ width: '12.5rem' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && contrats?.items?.data?.map((contrat, idx) => {
                          return (<Contrat key={idx} contrat={contrat} statutContrat={statutContrat} />);
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
                  }
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
  );
}
