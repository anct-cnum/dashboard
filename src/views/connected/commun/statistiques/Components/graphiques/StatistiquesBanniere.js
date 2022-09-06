import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { statistiquesActions } from '../../../../../../actions';

function StatistiquesBanniere({ dateDebut, dateFin, id, typeStats, codePostal }) {

  const dispatch = useDispatch();

  const downloadError = useSelector(state => state.statistiques?.downloadError);
  const blob = useSelector(state => state.statistiques?.blob);
  const typeTerritoire = useSelector(state => state.filtresEtTris?.territoire);
  const territoire = useSelector(state => state.statistiques?.territoire);


  const linkTo = { pathname: '/statistiques-' + typeStats + 's' };

  function getTypeStatistique(type) {
    let typeTarget = '';
    switch (type) {
      case 'nationales':
        typeTarget = type;
        break;
      case 'structure':
        typeTarget = type;
        break;
      default:
        typeTarget = typeTerritoire;
        break;
    }
    return typeTarget;
  }

  function save(extension) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const type = getTypeStatistique(typeStats);
    if (extension === 'pdf') {
      dispatch(statistiquesActions.getStatistiquesPDF(dateDebut, dateFin, type, id, codePostal));
    } else if (extension === 'csv') {
      const conseillerIds = territoire?.conseillerIds ?? undefined;
      dispatch(statistiquesActions.getStatistiquesCSV(dateDebut, dateFin, type, id, conseillerIds, codePostal));
    }
  }
  
  useEffect(() => {
    if (blob !== null && blob !== undefined && (downloadError === undefined || downloadError === false)) {
      dispatch(statistiquesActions.resetStatistiquesPDFFile());
    }
  }, [blob, downloadError]);

  return (
    <div className="fr-col-11 no-print">
      <div className="fr-container-fluid">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-xs-6 fr-col-sm-6 fr-col-md-5 fr-col-lg-4 fr-mt-5w centrerTexte">
            <div className="fr-mb-2v">Exporter cette page</div>
            <button className="statistiques-btn" onClick={() => {
              save('pdf');
            }}>Format PDF</button>
            &ensp;
            <button className="statistiques-btn" onClick={() => {
              save('csv');
            }}>Format CSV</button>
          </div>
        </div>
        {typeStats !== 'nationales' &&
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-xs-6 fr-col-sm-6 fr-col-md-7 fr-col-lg-8 afficher-etapes">
              <ul className="fr-footer__bottom-list liste-action">
                <li className="fr-footer__bottom-item">
                  <Link className="fr-footer__bottom-link fr-pr-sm-1w" style={{ boxShadow: 'none', color: '#8585F6', fontSize: '16px' }}
                    to={linkTo}>
                    <span style={{ paddingLeft: '8px' }}>Page pr&eacute;c&eacute;dente</span>
                  </Link>
                </li>
              </ul>
              <div className="fr-m-5w"></div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

StatistiquesBanniere.propTypes = {
  dateDebut: PropTypes.instanceOf(Date),
  dateFin: PropTypes.instanceOf(Date),
  codePostal: PropTypes.string,
  typeStats: PropTypes.string,
  id: PropTypes.string,
};

export default StatistiquesBanniere;
