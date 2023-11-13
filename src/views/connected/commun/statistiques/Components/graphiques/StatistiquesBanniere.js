import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { downloadFile, scrollTopWindow } from '../../../../../../utils/exportsUtils';
import { alerteEtSpinnerActions, exportsActions } from '../../../../../../actions';

// eslint-disable-next-line max-len
function StatistiquesBanniere({ dateDebut, dateFin, id, typeStats, codePostal, ville, codeCommune, nom, prenom, region, departement, structureIds }) {

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
      case 'conseiller':
        typeTarget = type;
        break;
      case 'grandReseau':
        typeTarget = type;
        break;
      default:
        typeTarget = typeTerritoire;
        break;
    }
    return typeTarget;
  }

  function getTitlePDF() {
    const datesPDF = '_' + dayjs(dateDebut).format('DD/MM/YYYY') + '_' + dayjs(dateFin).format('DD/MM/YYYY');
    let titlePDF = 'Statistiques';
    if (typeStats) {
      titlePDF += '_' + typeStats + datesPDF;
    } else if (typeTerritoire) {
      titlePDF += typeTerritoire === 'codeDepartement' ?
        '_' + territoire?.nomDepartement + datesPDF :
        '_' + territoire?.nomRegion + datesPDF;
    } else {
      titlePDF += '_' + datesPDF;
    }
    return titlePDF;
  }

  function save(extension) {
    scrollTopWindow();
    const type = getTypeStatistique(typeStats);
    if (extension === 'pdf') {
      document.title = getTitlePDF();
      window.print();
    } else if (extension === 'csv') {
      // eslint-disable-next-line max-len
      dispatch(exportsActions.exportStatistiquesCSV(dateDebut, dateFin, type, id, codePostal, ville, codeCommune, nom, prenom, region, departement, structureIds, typeStats));
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
          {(typeStats !== 'nationales' && location.state?.origin !== undefined) &&
            <div className="fr-col-12 fr-col-md-3 fr-mt-6w">
              <Link to={location.state?.origin} state={{ currentPage, origin: location?.pathname, origin_parent: location?.state?.origin_parent }}>
                <i className="fr-fi-arrow-left-line"/> Page pr&eacute;c&eacute;dente
              </Link>
            </div>
          }
          <div className={`centrerTexte ${(typeStats !== 'nationales' && location.state?.origin !== undefined) ? 'fr-col-12 fr-col-md-6' : 'fr-col-12'}`}>
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
  ville: PropTypes.string,
  codeCommune: PropTypes.string,
  region: PropTypes.string,
  departement: PropTypes.string,
  structure: PropTypes.string,
  conseiller: PropTypes.string,
  nom: PropTypes.string,
  prenom: PropTypes.string,
  typeStats: PropTypes.string,
  id: PropTypes.string,
  structureIds: PropTypes.array
};

export default StatistiquesBanniere;
