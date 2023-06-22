import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, contratActions, filtresConventionsActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';
import Contrat from './Contrat';

export default function TableauContrat() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage);

  const loading = useSelector(state => state.contrat?.loading);
  const error = useSelector(state => state.contrat?.error);
  const contrats = useSelector(state => state.contrat);
  const ordre = useSelector(state => state.filtresConventions?.ordre);
  const ordreNom = useSelector(state => state.filtresConventions?.ordreNom);
  const filtreParNomConseiller = useSelector(state => state.filtresConventions?.nom);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initContrat, setInitContrat] = useState(false);
  const [statutContrat, setStatutContrat] = useState('toutes');

  useEffect(() => {
    if (contrats?.items && contrats?.items?.total > 0) {
      const count = Math.floor(contrats.items.total / contrats.items.limit);
      dispatch(paginationActions.setPageCount(contrats.items.total % contrats.items.limit === 0 ? count : count + 1));
    }
  }, [contrats]);

  useEffect(() => {
    if (initContrat === true) {
      dispatch(contratActions.getAll(currentPage, statutContrat, filtreParNomConseiller, ordreNom, ordre ? -1 : 1));
    }
  }, [currentPage, statutContrat, filtreParNomConseiller, ordre, ordreNom]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initContrat === false && page !== undefined) {
        dispatch(filtresConventionsActions.resetFiltre());
        dispatch(contratActions.getAll(page, statutContrat, filtreParNomConseiller, ordreNom, ordre ? -1 : 1));
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

  const rechercheParNomConseiller = e => {
    dispatch(paginationActions.setPage(1));
    const value = (e.key === 'Enter' ? e.target?.value : e.target?.previousSibling?.value) ?? '';
    dispatch(filtresConventionsActions.changeNom(value));
  };

  const rechercheParNomConseillerToucheEnter = e => {
    if (e.key === 'Enter') {
      rechercheParNomConseiller(e);
    }
  };

  return (
    <div className="conventions">
      <Spinner loading={loading} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="fr-col fr-col-lg-12 fr-col-md-8">
              <h1 className="fr-h1 title">Demandes de contrats</h1>
              <span>Retrouvez ici toutes les demandes de recrutements, renouvellements et ruptures de contrat &agrave; valider.</span>
            </div>
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
              <div className="fr-col-12 fr-mb-2w fr-mt-3w">
                <div className="fr-search-bar fr-search-bar" id="search" role="search" >
                  <input onKeyDown={rechercheParNomConseillerToucheEnter} className="fr-input" defaultValue={''}
                    placeholder="Rechercher par nom, par id ou par email" type="search" id="search-input" name="search-input" />
                  <button className="fr-btn" onClick={rechercheParNomConseiller} title="Rechercher par nom, par id ou par email">
                    Rechercher
                  </button>
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
                          return (<Contrat key={idx} contrat={contrat} />);
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
