import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Candidat from './candidatures/Candidat';
import CandidatNonMisEnRelation from './candidatures/CandidatNonMisEnRelation';
import { conseillerActions, statsActions, searchActions, alerteEtSpinnerActions } from '../../../actions';
import Pagination from '../../../components/PaginationCandidatures';
import Spinner from '../../../components/Spinner';
import FiltersAndSorts from './candidatures/FiltersAndSorts';
import {
  Link,
  useParams,
  useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBox from '../../../components/SearchBox';
import { scrollTopWindow } from '../../../utils/exportsUtils';

function Candidatures() {
  const dispatch = useDispatch();

  const { search } = useSelector(state => state.search);
  const conseillers = useSelector(state => state.conseiller);
  const stats = useSelector(state => state.stats);
  const location = useLocation();

  let [page, setPage] = useState(1);
  let savePage = null;
  const { currentPage } = location.state || {};
  if (currentPage) {
    savePage = currentPage;
  }

  const [pageCount, setPageCount] = useState(0);
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  let { filter } = useParams();
  const filtersAndSorts = useSelector(state => state.filtresCandidatures);

  const navigate = page => {
    setPage(page);
    dispatch(conseillerActions.getAllCandidats({
      misesEnRelation: true,
      search,
      page: conseillers.items ? (page - 1) * conseillers.items.limit : 0,
      filter: filter,
      sortData: filtersAndSorts?.order,
      persoFilters: filtersAndSorts
    }));
  };

  useEffect(() => {
    if (conseillers.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1);
    }
  }, [conseillers]);

  const update = () => {
    if (savePage !== null) {
      navigate(savePage);
    } else {
      dispatch(conseillerActions.getAllCandidats({
        misesEnRelation: true,
        search,
        page: page - 1,
        filter,
        sortData: filtersAndSorts?.order,
        persoFilters: filtersAndSorts
      }));
    }
  };

  useEffect(() => {
    dispatch(statsActions.getMisesEnRelationStats());
  }, []);

  useEffect(() => {
    update();
  }, [filter, filtersAndSorts, search]);

  useEffect(() => {
    dispatch(searchActions.updateSearch(''));
  }, [filter]);

  const tabs = [
    {
      name: 'Nouvelles candidatures',
      filter: 'nouvelle'
    },
    {
      name: 'Candidatures pré sélectionnées',
      filter: 'interessee'
    },
    {
      name: 'Candidatures non retenues',
      filter: 'nonInteressee'
    },
    {
      name: 'Candidatures validées',
      filter: 'recrutee'
    },
    {
      name: 'Candidats recrutés',
      filter: 'finalisee'
    },
    {
      name: 'Ruptures notifiées',
      filter: 'nouvelle_rupture'
    },
    {
      name: 'Candidats en rupture',
      filter: 'finalisee_rupture'
    },
    {
      name: 'Afficher toutes les candidatures',
      filter: 'toutes'
    }
  ];

  const constructor = () => {
    if (constructorHasRun) {
      return;
    }
    setConstructorHasRun(true);
  };
  constructor();

  useEffect(() => {
    if (conseillers.downloadError && conseillers.downloadError !== false) {
      scrollTopWindow();
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le CV n\'a pas pu être récupéré !',
        status: null, description: null
      }));
    }
  }, [conseillers.downloadError]);

  return (
    <div className="conseillers">
      <ul className="tabs fr-tags-group">
        {tabs.map((tab, idx) => <li key={idx}>
          <Link className={`fr-tag ${tab.filter === filter ? 'current' : ''}`}
            to={{
              pathname: `/structure/candidats/${tab.filter}`,
            }}
            state={{
              currentPage: 1
            }}>
            {tab.name}&nbsp;({ stats?.stats !== undefined && stats?.stats[tab.filter] !== undefined ? stats?.stats[tab.filter] : 0 })
          </Link>
        </li>)}
      </ul>

      { location?.pathname.startsWith('/structure/candidats') &&
        <SearchBox />
      }

      <FiltersAndSorts resetPage={setPage} />

      { conseillers && conseillers.loading && <span>Chargement...</span> }

      { !conseillers.loading && conseillers.items && conseillers.items.data.length === 0 &&
        <span>{`${search === '' ? 'Aucun conseiller pour le moment.' : 'Aucun résultat de recherche'}`}</span>
      }

      { !conseillers.loading && conseillers.items && conseillers.items.data.length > 0 &&
        <h2>
          {`${search !== '' ? 'Résultats de recherche' : ''}`}
        </h2>
      }

      <Spinner loading={conseillers.downloading || conseillers.loading}/>

      { !conseillers.loading && conseillers.items && conseillers.items.data.length > 0 &&
        <div className="fr-table fr-table--layout-fixed" style={{ overflow: 'auto' }}>
          <table className="table-conseillers">
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                { search !== '' && <th style={{ minWidth: '200px' }}>Email</th>}
                <th>Statut</th>
                <th>Date de candidature</th>
                <th>Code postal</th>
                { search === '' && <th>Résultat Pix</th> }
                <th>Curriculum Vit&aelig;</th>
                <th style={{ minWidth: search !== '' ? '200px' : '' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              { !conseillers.error && !conseillers.loading && conseillers.items && conseillers.items.data.map((conseiller, idx) => {
                return (
                  conseiller.conseillerObj ?
                    <Candidat key={idx} miseEnRelation={conseiller} currentPage={page} currentFilter={filter} search={search !== ''} /> :
                    <CandidatNonMisEnRelation key={idx} conseiller={conseiller} search={search !== ''} update={update} />
                );
              })
              }
            </tbody>
          </table>
        </div>
      }

      { search !== '' && conseillers?.items?.data?.length > 100 &&
        <p className="fr-mt-2w">Seuls les 100 premiers résultats sont affichés</p>
      }

      {search.length === 0 &&
        <Pagination current={page} pageCount={pageCount} navigate={navigate} />
      }

    </div>
  );
}

Candidatures.propTypes = {
  location: PropTypes.object
};

export default Candidatures;
