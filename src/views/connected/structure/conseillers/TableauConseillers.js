import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, conseillerActions, statistiquesActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import TableConseillers from '../../../../components/conseillers/TableConseillers';
import FiltresEtTrisConseillers from '../../../../components/conseillers/FiltresEtTrisConseillers';

export default function TableauConseillers() {

  const dispatch = useDispatch();

  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);
  const ordre = useSelector(state => state.filtresConseillers?.ordre);
  const ordreNom = useSelector(state => state.filtresConseillers?.ordreNom);
  const loading = useSelector(state => state.conseiller?.loading);
  const error = useSelector(state => state.conseiller?.error);
  const conseillers = useSelector(state => state.conseiller);
  const filtreCoordinateur = useSelector(state => state.filtresConseillers?.coordinateur);
  const filtreRupture = useSelector(state => state.filtresConseillers?.rupture);
  const filtreParNomConseiller = useSelector(state => state.filtresConseillers?.nomConseiller);
  const filtreParNomStructure = useSelector(state => state.filtresConseillers?.nomStructure);
  const filtreRegion = useSelector(state => state.filtresConseillers?.region);
  const filterDepartement = useSelector(state => state.filtresConseillers?.departement);
  const [initConseiller, setInitConseiller] = useState(false);

  useEffect(() => {
    if (conseillers?.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      dispatch(paginationActions.setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1));
    }
  }, [conseillers]);

  useEffect(() => {
    if (initConseiller === true) {
      dispatch(conseillerActions.getAllRecruterRoleStructure(dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreRegion,
        filterDepartement, filtreParNomStructure, ordreNom, ordre ? 1 : -1));
    }
    // eslint-disable-next-line max-len
  }, [dateDebut, dateFin, filtreCoordinateur, filtreRupture, filtreParNomConseiller, ordreNom, ordre, filtreRegion, filterDepartement, filtreParNomStructure]);

  useEffect(() => {
    scrollTopWindow();
    if (!error) {
      if (initConseiller === false) {
        dispatch(statistiquesActions.resetFiltre());
        dispatch(conseillerActions.getAllRecruterRoleStructure(dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreRegion,
          filterDepartement, filtreParNomStructure, ordreNom, ordre ? 1 : -1));
        setInitConseiller(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les conseillers n\'ont pas pu être chargées !',
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
            <FiltresEtTrisConseillers />
            <div className="fr-container--fluid">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12">
                  <div className="fr-table">
                    <TableConseillers
                      conseillers={conseillers}
                      filtreCoordinateur={filtreCoordinateur}
                      filtreRupture={filtreRupture}
                      error={error}
                      loading={loading}
                    />
                  </div>
                </div>
                {conseillers?.items?.total !== 0 &&
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
