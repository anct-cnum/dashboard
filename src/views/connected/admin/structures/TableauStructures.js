import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, filtresStructuresActions, paginationActions, structureActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import Structure from './Structure';
import FiltresEtTrisStructures from '../../commun/structures/FiltresEtTrisStructures';

export default function TableauStructures() {

  const dispatch = useDispatch();

  const dateDebut = useSelector(state => state.filtresStructures?.dateDebut);
  const dateFin = useSelector(state => state.filtresStructures?.dateFin);
  const ordre = useSelector(state => state.filtresStructures?.ordre);
  const ordreNom = useSelector(state => state.filtresStructures?.ordreNom);
  const loading = useSelector(state => state.structure?.loading);
  const error = useSelector(state => state.structure?.error);
  const structures = useSelector(state => state.structure);
  const filtreParNomConseiller = useSelector(state => state.filtresStructures?.nomConseiller);
  const filtreRegion = useSelector(state => state.filtresStructures?.region);
  const filterDepartement = useSelector(state => state.filtresStructures?.departement);
  const filtreType = useSelector(state => state.filtresStructures?.type);
  const filtreStatut = useSelector(state => state.filtresStructures?.statut);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initConseiller, setInitConseiller] = useState(false);

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeOrdre(e.currentTarget?.id));
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
        dispatch(structureActions.getAll(currentPage, dateDebut, dateFin, filtreParNomConseiller, filterDepartement, filtreType, filtreRegion,
          filtreStatut, ordreNom, ordre ? 1 : -1));
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
            <FiltresEtTrisStructures />
            <div className="fr-container--fluid fr-mt-2w">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12">
                  <div className="fr-table fr-col-12">
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
                          <th>Nom</th>
                          <th>Prénom</th>
                          <th>Email</th>
                          <th>T&eacute;l&eacute;phone</th>
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
