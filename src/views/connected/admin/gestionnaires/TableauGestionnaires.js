import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, filtresGestionnairesActions, paginationActions, statistiquesActions, gestionnaireActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import Gestionnaire from './Gestionnaire';
import FiltresEtTrisGestionnaires from '../../commun/admin/FiltresEtTrisGestionnaires';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';

export default function TableauGestionnaires() {

  const dispatch = useDispatch();
  const location = useLocation();

  const ordre = useSelector(state => state.filtresGestionnaires?.ordre);
  const ordreNom = useSelector(state => state.filtresGestionnaires?.ordreNom);
  const loading = useSelector(state => state.gestionnaire?.loading);
  const error = useSelector(state => state.gestionnaire?.error);
  const gestionnaires = useSelector(state => state.gestionnaire);
  const filtreParNomConseiller = useSelector(state => state.filtresGestionnaires?.nomConseiller);
  const filtreRole = useSelector(state => state.filtresGestionnaires?.searchRole);
  const [initConseiller, setInitConseiller] = useState(false);
  const [page, setPage] = useState(location.state?.currentPage);

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresGestionnairesActions.changeOrdre(e.currentTarget?.id));
  };

  useEffect(() => {
    if (gestionnaires?.items) {
      const count = Math.floor(gestionnaires.items.total / gestionnaires.items.limit);
      dispatch(paginationActions.setPageCount(gestionnaires.items.total % gestionnaires.items.limit === 0 ? count : count + 1));
    }
  }, [gestionnaires]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initConseiller === false && page !== undefined) {
        dispatch(statistiquesActions.resetFiltre());
        dispatch(gestionnaireActions.getAll(page, filtreParNomConseiller, filtreRole, ordreNom, ordre ? 1 : -1));
        setInitConseiller(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les gestionnaires n\'ont pas pu être chargés !',
        status: null, description: null
      }));
    }
  }, [error, page]);

  return (
    <div className="gestionnaires">
      <Spinner loading={loading} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <FiltresEtTrisGestionnaires />
            <div className="fr-container--fluid fr-mt-2w">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12">
                  <div className="fr-table fr-col-12">
                    <table>
                      <thead>
                        <tr>
                          <th>R&ocirc;le</th>
                          <th>Email</th>
                          <th>
                            <button id="nom-gestionnaire" className="filtre-btn" onClick={ordreColonne}>
                              <span>Nom du gestionnaire
                                {(ordreNom !== 'nom-gestionnaire' || ordreNom === 'nom-gestionnaire' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                {(ordreNom === 'nom-gestionnaire' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>Nom</th>
                          <th>Pr&eacute;nom</th>
                          <th>Date d&rsquo;invitation</th>
                          <th>Actif = (compte cr&eacute;&eacute;)</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && gestionnaires?.items?.data?.map((gestionnaire, idx) => {
                          return (<Gestionnaire key={idx} gestionnaire={gestionnaire} />);
                        })
                        }
                        {(!gestionnaires?.items || gestionnaires?.items?.total === 0) &&
                          <tr>
                            <td colSpan="12" style={{ width: '75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span className="not-found pair">Aucun gestionnaire trouv&eacute;</span>
                              </div>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                {gestionnaires?.items?.total !== 0 &&
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
