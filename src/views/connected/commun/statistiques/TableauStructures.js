import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, statistiquesActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import Structure from './Components/tableaux/Structure';
import BlockDatePickers from './Components/commun/BlockDatePickers';
import { useLocation } from 'react-router-dom';
import { scrollTopWindow } from '../../../../utils/exportsUtils';

export default function TableauStructures() {
  
  const dispatch = useDispatch();
  const location = useLocation();

  const loading = useSelector(state => state.statistiques?.loading);
  const error = useSelector(state => state.statistiques?.error);
  const statistiquesStructures = useSelector(state => state.statistiques?.statistiquesStructures);
  
  const dateDebut = useSelector(state => state.filtresEtTris?.dateDebut);
  const dateFin = useSelector(state => state.filtresEtTris?.dateFin);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initStructure, setInitStructure] = useState(false);
  const [page, setPage] = useState(location.state?.currentPage);

  useEffect(() => {
    if (statistiquesStructures?.items) {
      const count = statistiquesStructures.items.limit ? Math.floor(statistiquesStructures.items.total / statistiquesStructures.items.limit) : 0;
      dispatch(paginationActions.setPageCount(statistiquesStructures.items.total % statistiquesStructures.items.limit === 0 ? count : count + 1));
    }
  }, [statistiquesStructures]);

  useEffect(() => {
    if (initStructure === true) {
      dispatch(statistiquesActions.getDatasStructures(dateDebut, dateFin, currentPage));
    }
  }, [dateDebut, dateFin, currentPage]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initStructure === false && page !== undefined) {
        dispatch(statistiquesActions.getDatasStructures(dateDebut, dateFin, page));
        setInitStructure(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [error, page]);

  return (
    <div className="statistiques">
      <Spinner loading={loading} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h3 className="titre">Statistiques des structures</h3>
          </div>
          {error &&
            <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
          }
          {!loading && !error &&
          <>
            <div className="fr-col-12">
              <b>
                <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin}/>
              </b>
            </div>
            <div className="fr-col-12">
              <div className="fr-table">
                <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Siret</th>
                      <th>Nom de la structure</th>
                      <th>Code postal</th>
                      <th>CRA enregistr&eacute;s</th>
                      <th>Personnes accompagn&eacute;es</th>
                      <th>Afficher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statistiquesStructures?.items?.data.map((structure, idx) => {
                      return (<Structure key={idx} structure={structure} />);
                    })
                    }
                  </tbody>
                </table>
              </div>
              <Pagination />
            </div>
          </>
          }
        </div>
      </div>
    </div>
  );
}
