import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, statistiquesActions, structureActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import FiltresEtTrisStructures from './FiltresEtTrisStructures';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';
import TableStructures from '../../../../components/structures/TableStructures';

export default function TableauStructures() {

  const dispatch = useDispatch();
  const location = useLocation();

  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);
  const ordre = useSelector(state => state.filtresStructures?.ordre);
  const ordreNom = useSelector(state => state.filtresStructures?.ordreNom);
  const loading = useSelector(state => state.structure?.loading);
  const error = useSelector(state => state.structure?.error);
  const structures = useSelector(state => state.structure);
  const filtreParNomConseiller = useSelector(state => state.filtresStructures?.nomConseiller);
  const filtreRegion = useSelector(state => state.filtresStructures?.region);
  const filterDepartement = useSelector(state => state.filtresStructures?.departement);
  const filtreStatut = useSelector(state => state.filtresStructures?.statut);
  const filtreType = useSelector(state => state.filtresStructures?.type);
  const [initConseiller, setInitConseiller] = useState(false);
  const [page, setPage] = useState(location.state?.currentPage);

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
  }, [error, page]);

  return (
    <div className="structures">
      <Spinner loading={loading} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <FiltresEtTrisStructures />
            <div className="fr-container--fluid">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12">
                  <div className="fr-table fr-col-12">
                    <TableStructures
                      structures={structures}
                      loading={loading}
                      ordreNom={ordreNom}
                      ordre={ordre}
                      error={error}
                    />
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
