import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, filtresEtTrisStatsActions, paginationActions, conseillerActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import Structure from './Structure';

export default function TableauStructures() {

  const dispatch = useDispatch();

  const dateDebut = useSelector(state => state.filtresEtTris?.dateDebut);
  const dateFin = useSelector(state => state.filtresEtTris?.dateFin);
  const ordre = useSelector(state => state.filtresEtTris?.ordre);
  const ordreNom = useSelector(state => state.filtresEtTris?.ordreNom);
  const loading = useSelector(state => state.structure?.loading);
  const error = useSelector(state => state.structure?.error);
  const structures = useSelector(state => state.structure);
  const filtreParNomConseiller = useSelector(state => state.filtresEtTris?.nomConseiller);
  const filtreParNomStructure = useSelector(state => state.filtresEtTris?.nomStructure);
  const filtreRegion = useSelector(state => state.filtresEtTris?.region);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initConseiller, setInitConseiller] = useState(false);

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresEtTrisStatsActions.changeOrdre(e.currentTarget?.id));
  };

  useEffect(() => {
    if (structures?.items) {
      const count = Math.floor(structures.items.total / structures.items.limit);
      dispatch(paginationActions.setPageCount(structures.items.total % structures.items.limit === 0 ? count : count + 1));
    }
  }, [structures]);

  useEffect(() => {
    if (!error) {
      if (initConseiller === false) {
        dispatch(paginationActions.setPage(1));
        dispatch(conseillerActions.getAll(currentPage, dateDebut, dateFin, filtreParNomConseiller, filtreRegion,
          filtreParNomStructure, ordreNom, ordre ? 1 : -1));
        setInitConseiller(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les structures n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [error]);

  return (
    <div className="conseillers">
      <Spinner loading={loading} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            {/* <FiltresEtTrisConseillers /> */}
            <div className="fr-container--fluid fr-mt-2w">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12">
                  <div className="fr-table">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            <button id="idPG" className="filtre-btn" onClick={ordreColonne}>
                              <span>Id
                                {(ordreNom !== 'idPG' || ordreNom === 'idPG' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                {(ordreNom === 'idPG' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>
                            <button id="nom-structure" className="filtre-btn" onClick={ordreColonne}>
                              <span>Nom de la structure
                                {(ordreNom !== 'nom-structure' || ordreNom === 'nom-structure' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                {(ordreNom === 'nom-structure' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>
                            <button id="nom" className="filtre-btn" onClick={ordreColonne}>
                              <span>Nom
                                {(ordreNom !== 'nom' || ordreNom === 'nom' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                {(ordreNom === 'nom' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>
                            <button id="prenom" className="filtre-btn" onClick={ordreColonne}>
                              <span>Pr&eacute;nom
                                {(ordreNom !== 'prenom' || ordreNom === 'prenom' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                {(ordreNom === 'prenom' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>Email</th>
                          <th>T&eacute;l&eacute;phone</th>
                          <th>CRA saisis</th>
                          <th>D&eacute;tails</th>
                          <th>Instruction</th>
                          <th>Subvention</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && structures?.items?.data?.map((structure, idx) => {
                          return (<Structure key={idx} structure={structure} currentPage={currentPage} />);
                        })
                        }
                        {(!structures?.items || structures?.items?.total === 0) &&
                          <tr>
                            <td colSpan="12" style={{ width: '75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span className="not-found pair">Aucune structure trouv&eacute;</span>
                              </div>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                {structures?.items?.total !== 0 &&
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
