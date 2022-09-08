import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { alerteEtSpinnerActions, statistiquesActions } from '../../../../actions';

import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import Structure from './Components/tableaux/Structure';

export default function TableauStructures() {
  
  const dispatch = useDispatch();

  const loading = useSelector(state => state.statistiques?.loading);
  const error = useSelector(state => state.statistiques?.error);
  const statistiquesStructures = useSelector(state => state.statistiques?.statistiquesStructures);
  
  const dateDebut = useSelector(state => state.filtresEtTris?.dateDebut);
  const dateFin = useSelector(state => state.filtresEtTris?.dateFin);
  const pagination = useSelector(state => state.pagination);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const navigate = page => {
    setPage(page);
    dispatch(statistiquesActions.getDatasStructures(dateDebut, dateFin, page));
  };

  const update = () => {
    if (pagination?.resetPage === false && location.currentPage !== undefined) {
      navigate(page);
    } else {
      dispatch(statistiquesActions.getDatasStructures(dateDebut, dateFin, page));
    }
  };

  useEffect(() => {
    if (!error) {
      if (statistiquesStructures?.items) {
        const count = statistiquesStructures.items.limit ? Math.floor(statistiquesStructures.items.total / statistiquesStructures.items.limit) : 0;
        setPageCount(statistiquesStructures.items.total % statistiquesStructures.items.limit === 0 ? count : count + 1);
      }
      if (!statistiquesStructures) {
        update();
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [statistiquesStructures, error]);

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
              <Pagination current={page} pageCount={pageCount} navigate={navigate} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}
