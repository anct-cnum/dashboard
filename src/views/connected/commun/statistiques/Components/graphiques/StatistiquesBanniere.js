import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { downloadFile, scrollTopWindow } from '../../../../../../utils/exportsUtils';
import { alerteEtSpinnerActions, exportsActions } from '../../../../../../actions';

function StatistiquesBanniere({ dateDebut, dateFin, id, typeStats, codePostal }) {

  const dispatch = useDispatch();
  const location = useLocation();
  const exports = useSelector(state => state.exports);
  const error = useSelector(state => state.exports?.error);
  const typeTerritoire = useSelector(state => state.filtresEtTris?.territoire);
  const territoire = useSelector(state => state.statistiques?.territoire);
  const currentPage = useSelector(state => state.pagination?.currentPage);

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
    scrollTopWindow();
    const type = getTypeStatistique(typeStats);
    if (extension === 'pdf') {
      window.print();
    } else if (extension === 'csv') {
      const conseillerIds = territoire?.conseillerIds ?? undefined;
      dispatch(exportsActions.exportStatistiquesCSV(dateDebut, dateFin, type, id, conseillerIds, codePostal));
    }
  }
  
  useEffect(() => {
    if (error) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'L\'export n\'a pas pu être réalisé correctement !',
        status: null, description: null
      }));
    }
  }, [error]);

  useEffect(() => {
    if (exports?.blob !== null && exports?.blob !== undefined && (error === undefined || error === false)) {
      downloadFile(exports);
      dispatch(exportsActions.resetFile());
    }
  }, [exports]);
  
  return (
    <div className="fr-col-11 no-print">
      <div className="fr-container-fluid">
        <div className={`${typeStats !== 'nationales' ? 'fr-grid-row' : 'fr-grid-row--center'}`}>
          {typeStats !== 'nationales' &&
            <div className="fr-col-12 fr-col-md-3 fr-mt-6w">
              <Link to={location.state?.origin} state={{ currentPage }}>
                <i className="fr-fi-arrow-left-line"/> Page pr&eacute;c&eacute;dente
              </Link>
            </div>
          }
          <div className={`centrerTexte ${typeStats !== 'nationales' ? 'fr-col-12 fr-col-md-6' : 'fr-col-12'}`}>
            <div className="fr-mb-2v ">Exporter cette page</div>
            <button className="statistiques-btn" onClick={() => {
              save('pdf');
            }}>Format PDF</button>
            &ensp;
            <button className="statistiques-btn" onClick={() => {
              save('csv');
            }}>Format CSV</button>
          </div>
        </div>
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
