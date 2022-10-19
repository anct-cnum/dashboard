import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions } from '../actions';

function Pagination() {
  const dispatch = useDispatch();
  const pagination = useSelector(state => state.pagination);

  let previousPage = pagination.currentPage - 1;
  let nextPage = pagination.currentPage + 1;
  let lastPage = pagination.pageCount;
  let isFirstPage = pagination.currentPage === 1;
  let isLastPage = pagination.currentPage === lastPage;
  let showPrevious = pagination.currentPage > 2;

  const onClick = (e, page) => {
    e.preventDefault();
    dispatch(paginationActions.setPage(page));
  };

  if (pagination.pageCount <= 1) {
    return (<ul className="pagination" />);
  }

  return (
    <div className="fr-container">
      <nav className="fr-pagination fr-grid-row fr-grid-row--center" aria-label="Pagination" role="navigation">
        <ul className="fr-pagination__list fr-col-8">
          <li>
            {isFirstPage &&
            <a className="fr-pagination__link fr-pagination__link--first" aria-disabled="true"
              aria-label="Premi&egrave;re page" role="link" title="Premi&egrave;re page">
                Premi&egrave;re page
            </a>
            }
            {!isFirstPage &&
            <a className="fr-pagination__link fr-pagination__link--first" href="/#" onClick={e => onClick(e, 1)}
              aria-label="Premi&egrave;re page" role="link" title="Premi&egrave;re page">
                Premi&egrave;re page
            </a>
            }
          </li>
          <li>
            {isFirstPage &&
              <a className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label" aria-disabled="true"
                aria-label="Page pr&eacute;c&eacute;dente" title="Page pr&eacute;c&eacute;dente">
                Page pr&eacute;c&eacute;dente
              </a>
            }
            {!isFirstPage &&
              <a className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label" href="#" aria-disabled="false"
                onClick={e => onClick(e, previousPage)} aria-label="Page pr&eacute;c&eacute;dente" title="Page pr&eacute;c&eacute;dente">
                Page pr&eacute;c&eacute;dente
              </a>
            }
          </li>
          <li>
            {isFirstPage &&
            <a className="fr-pagination__link" aria-current="page" onClick={e => onClick(e, 1)} role="link" aria-label="Page 1" title="Page 1"
              href="/#">1</a>
            }
            {!isFirstPage &&
            <a className="fr-pagination__link" onClick={e => onClick(e, 1)} aria-disabled="false" role="link" aria-label="Page 1" title="Page 1"
              href="/#">1</a>
            }
          </li>
          {
            (pagination.pageCount > 5 && pagination.currentPage > 3) &&
            <li>
              <a className="fr-pagination__link fr-displayed-lg">...</a>
            </li>
          }
          {showPrevious &&
            <li>
              <a className="fr-pagination__link" href="/#"
                onClick={e => onClick(e, previousPage)}>{previousPage}
              </a>
            </li>
          }
          {
            (!isFirstPage && !isLastPage) &&
            <li>
              <a className="fr-pagination__link" href="/#" aria-current="page" onClick={e => onClick(e, pagination.currentPage)}>{pagination.currentPage}
              </a>
            </li>
          }
          {
            (nextPage < lastPage) &&
            <li>
              <a href="/#" className="fr-pagination__link" onClick={e => onClick(e, nextPage)}>{nextPage}</a>
            </li>
          }
          {
            (pagination.currentPage < pagination.pageCount - 2) &&
            <li>
              <a href="/#" className="fr-pagination__link fr-displayed-lg">...</a>
            </li>
          }
          <li>
            {isLastPage &&
            <a className="fr-pagination__link" aria-current="page">{lastPage}</a>
            }
            {!isLastPage &&
            <a href="/#" className="fr-pagination__link" onClick={e => onClick(e, lastPage)}>{lastPage}</a>
            }
          </li>
          <li>
            {isLastPage &&
            <a className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label" aria-label="Page suivante" title="Page suivante">
              Page suivante
            </a>
            }
            {!isLastPage &&
            <a className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label" aria-label="Page suivante"
              title="Page suivante" href="/#" onClick={e => onClick(e, nextPage)}>
              Page suivante
            </a>
            }
          </li>
          <li>
            {isLastPage &&
              <a className="fr-pagination__link fr-pagination__link--last" aria-label="Derni&egrave;re page" title="Derni&egrave;re page">
                Derni&egrave;re page
              </a>
            }
            {!isLastPage &&
              <a className="fr-pagination__link fr-pagination__link--last" href="/#" onClick={e => onClick(e, lastPage)}
                aria-label="Derni&egrave;re page" title="Derni&egrave;re page">
                  Derni&egrave;re page
              </a>
            }
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
