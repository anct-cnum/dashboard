import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, filtresStructuresActions, paginationActions, statistiquesActions, structureActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import Structure from './Structure';
import FiltresEtTrisStructures from '../../commun/structures/FiltresEtTrisStructures';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';

export default function TableauStructures() {

  const dispatch = useDispatch();
  const location = useLocation();

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
  const filtreComs = useSelector(state => state.filtresStructures?.coms);
  const filtreStatut = useSelector(state => state.filtresStructures?.statut);
  const filtreType = useSelector(state => state.filtresStructures?.type);
  const [initConseiller, setInitConseiller] = useState(false);
  const [page, setPage] = useState(location.state?.currentPage);

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
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initConseiller === false && page !== undefined) {
        dispatch(statistiquesActions.resetFiltre());
        dispatch(structureActions.getAll(page, dateDebut, dateFin, filtreParNomConseiller, filterDepartement, filtreType, filtreRegion,
          filtreStatut, filtreComs, ordreNom, ordre ? 1 : -1));
        setInitConseiller(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les structures n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [error, page]);

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
                          <th colSpan={structures?.items?.total > 0 ? '12' : ''}>
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
                          <th>Pr&eacute;nom</th>
                          <th colSpan={structures?.items?.total > 0 ? '12' : ''}>Email</th>
                          <th>T&eacute;l&eacute;phone</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && structures?.items?.data?.map((structure, idx) => {
                          return (<Structure key={idx} structure={structure} />);
                        })
                        }
                        {(!structures?.items || structures?.items?.total === 0) &&
                          <tr>
                            <td colSpan="12" style={{ width: '75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span className="not-found pair">Aucune structure trouv&eacute;e</span>
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
