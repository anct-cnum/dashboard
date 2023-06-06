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
import Tabs from '../../../datas/statut-candidat.json';

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
        ordre: filtersAndSorts?.ordre ? 1 : -1,
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
          page: page,
          filter,
          ordreNom: filtersAndSorts?.ordreNom,
          ordre: filtersAndSorts?.ordre ? 1 : -1,
          persoFilters: filtersAndSorts
        }));
        dispatch(statsActions.getMisesEnRelationStats());
        setInitConseiller(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les candidats n\'ont pas pu être chargés !',
        status: null, description: null
      }));
    }
  }, [error, page]);

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
        {Tabs.map((tab, idx) => <li key={idx}>
          <Link className={`fr-tag ${tab.filter === filter ? 'current' : ''}`}
            onClick={() => dispatch(paginationActions.setPage(1))}
            to={{
              pathname: `/structure/candidats/${tab.filter}`,
            }}>
            {tab.name}&nbsp;({ stats?.stats !== undefined && stats?.stats[tab.filter] !== undefined ? stats?.stats[tab.filter] : 0 })
          </Link>
        </li>)}
      </ul>
      <FiltersAndSorts />
      {conseillers && conseillers.loading && <span>Chargement...</span> }
      {!conseillers.loading && conseillers.items?.total === 0 &&
        <span>{`${filtersAndSorts.search === '' ? 'Aucun conseiller pour le moment.' : 'Aucun résultat de recherche'}`}</span>
      }
      <Spinner loading={conseillers.downloading || conseillers.loading}/>
      {!conseillers.loading && conseillers.items?.total > 0 &&
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12">
          <div className="fr-table">
            <table>
              <thead>
                <tr style={{ whiteSpace: 'nowrap' }}>
                  <th style={{ width: '15rem' }}>Candidat</th>
                  <th>Date de disponibilit&eacute;</th>
                  <th>CP</th>
                  <th>Formation CCP1</th>
                  <th style={{ width: '6rem' }}>R&eacute;sultats Pix</th>
                  <th>CV</th>
                  <th style={{ width: '20rem' }}>Statut</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!conseillers.error && !conseillers.loading && conseillers.items && conseillers.items.data.map((conseiller, idx) => {
                  return (
                    conseiller.conseillerObj ?
                      <Candidat key={idx} miseEnRelation={conseiller} currentPage={page} currentFilter={filter} search={filtersAndSorts.search !== ''} /> :
                      <CandidatNonMisEnRelation key={idx} conseiller={conseiller} search={filtersAndSorts.search !== ''} currentFilter={filter} />
                  );
                })
                }
              </tbody>
            </table>
          </div>
        </div>
        <Pagination />
      </div>
      }
    </div>
  );
}

Candidatures.propTypes = {
  location: PropTypes.object
};

export default Candidatures;
