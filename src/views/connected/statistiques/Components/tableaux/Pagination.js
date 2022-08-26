import React from 'react';

import PropTypes from 'prop-types';

function Pagination({ pageCount, current, navigate }) {

  let previousPage = current - 1;
  let nextPage = current + 1;
  let lastPage = pageCount;
  let isFirstPage = current === 1;
  let isLastPage = current === lastPage;
  let showPrevious = current > 2;

  const onClick = (e, page) => {
    e.preventDefault();
    navigate(page);
  };

  if (pageCount <= 1) {
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
            <a className="fr-pagination__link number" aria-current="page" onClick={e => onClick(e, 1)} role="link" aria-label="Page 1" title="Page 1"
              href="/#">1</a>
            }
            {!isFirstPage &&
            <a className="fr-pagination__link number" onClick={e => onClick(e, 1)} aria-disabled="false" role="link" aria-label="Page 1" title="Page 1"
              href="/#">1</a>
            }
          </li>
          {
            (pageCount > 5 && current > 3) &&
            <li>
              <a className="fr-pagination__link fr-displayed-lg">...</a>
            </li>
          }
          {showPrevious &&
            <li>
              <a className="fr-pagination__link number" href="/#"
                onClick={e => onClick(e, previousPage)}>{previousPage}
              </a>
            </li>
          }
          {
            (!isFirstPage && !isLastPage) &&
            <li>
              <a className="fr-pagination__link number" href="/#" aria-current="page" onClick={e => onClick(e, current)}>{current}
              </a>
            </li>
          }
          {
            (nextPage < lastPage) &&
            <li>
              <a href="/#" className="fr-pagination__link number" onClick={e => onClick(e, nextPage)}>{nextPage}</a>
            </li>
          }
          {
            (current < pageCount - 2) &&
            <li>
              <a href="/#" className="fr-pagination__link fr-displayed-lg">...</a>
            </li>
          }
          <li>
            {isLastPage &&
            <a className="fr-pagination__link number" aria-current="page">{lastPage}</a>
            }
            {!isLastPage &&
            <a href="/#" className="fr-pagination__link number" onClick={e => onClick(e, lastPage)}>{lastPage}</a>
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
              title="Page suivante" href="/#" onClick={e => onClick(e, lastPage)}>
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

Pagination.propTypes = {
  pageCount: PropTypes.number,
  current: PropTypes.number,
  navigate: PropTypes.func
};

export default Pagination;
