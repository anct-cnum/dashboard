import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Candidat from './candidatures/Candidat';
import CandidatNonMisEnRelation from './candidatures/CandidatNonMisEnRelation';
import { conseillerActions, statsActions, alerteEtSpinnerActions, paginationActions } from '../../../actions';
import Spinner from '../../../components/Spinner';
import FiltersAndSorts from './candidatures/FiltersAndSorts';
import {
  Link,
  useParams,
  useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import Pagination from '../../../components/Pagination';
import { pluralize } from '../../../utils/formatagesUtils';

function Candidatures() {
  const dispatch = useDispatch();

  const conseillers = useSelector(state => state.conseiller);
  const error = useSelector(state => state.conseiller?.error);
  const message = useSelector(state => state.conseiller?.message);

  const stats = useSelector(state => state.stats);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initConseiller, setInitConseiller] = useState(false);
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage);

  let { filter } = useParams();
  const filtersAndSorts = useSelector(state => state.filtresCandidatures);

  useEffect(() => {
    if (conseillers?.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      dispatch(paginationActions.setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1));
    }
  }, [conseillers]);

  useEffect(() => {
    if (initConseiller === true) {
      dispatch(conseillerActions.getAllCandidats({
        misesEnRelation: true,
        search: filtersAndSorts.search,
        page: currentPage,
        filter,
        ordreNom: filtersAndSorts?.ordreNom,
        persoFilters: filtersAndSorts
      }));
    }
  }, [currentPage, filter, filtersAndSorts, filtersAndSorts.search]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initConseiller === false && page !== undefined) {
        dispatch(conseillerActions.getAllCandidats({
          misesEnRelation: true,
          search: filtersAndSorts.search,
          page: currentPage,
          filter,
          ordreNom: filtersAndSorts?.ordreNom,
          persoFilters: filtersAndSorts
        }));
        dispatch(statsActions.getMisesEnRelationStats());
        setInitConseiller(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les candidats n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [error, page]);

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
      {message &&
        <div className="fr-alert fr-alert--success" style={{ marginBottom: '2rem' }} >
          <p className="fr-alert__title">
            {message}
          </p>
        </div>
      }
      {conseillers.items?.coselec &&
      <div className="fr-mb-3w">
        <span className="fr-text--lg fr-text--bold">
          {conseillers.items?.coselec?.nombreConseillersCoselec}&nbsp;
          {pluralize(
            'conseiller validé',
            'conseiller validé',
            'conseillers validés',
            conseillers.items?.coselec?.nombreConseillersCoselec
          )}
        &nbsp;par l&rsquo;Agence nationale de la coh&eacute;sion des territoires
        </span>
      </div>
      }
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
      <FiltersAndSorts />

      { conseillers && conseillers.loading && <span>Chargement...</span> }

      { !conseillers.loading && conseillers.items && conseillers.items?.total === 0 &&
        <span>{`${filtersAndSorts.search === '' ? 'Aucun conseiller pour le moment.' : 'Aucun résultat de recherche'}`}</span>
      }

      { !conseillers.loading && conseillers.items && conseillers.items?.total > 0 &&
        <h2>
          {`${filtersAndSorts.search !== '' ? 'Résultats de recherche' : ''}`}
        </h2>
      }

      <Spinner loading={conseillers.downloading || conseillers.loading}/>

      {!conseillers.loading && conseillers.items && conseillers.items?.total > 0 &&
        <div className="fr-table fr-table--layout-fixed" style={{ overflow: 'auto' }}>
          <table className="table-conseillers">
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                {filtersAndSorts.search !== '' && <th style={{ width: '20rem' }}>Email</th>}
                <th style={{ width: filtersAndSorts.search !== '' ? '10rem' : '' }}>Statut</th>
                <th>Date de candidature</th>
                <th>Code postal</th>
                {filtersAndSorts.search === '' && <th>Résultat Pix</th> }
                <th>Curriculum Vit&aelig;</th>
                <th style={{ width: filtersAndSorts.search !== '' ? '14.2rem' : '' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {!conseillers.error && !conseillers.loading && conseillers.items && conseillers.items.data.map((conseiller, idx) => {
                return (
                  conseiller.conseillerObj ?
                    <Candidat key={idx} miseEnRelation={conseiller} currentPage={page} currentFilter={filter} search={filtersAndSorts.search !== ''} /> :
                    <CandidatNonMisEnRelation key={idx} conseiller={conseiller} search={filtersAndSorts.search !== ''} />
                );
              })
              }
            </tbody>
          </table>
        </div>
      }

      {conseillers?.items?.total !== 0 &&
        <Pagination />
      }

    </div>
  );
}

Candidatures.propTypes = {
  location: PropTypes.object
};

export default Candidatures;
