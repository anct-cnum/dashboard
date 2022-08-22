import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { statistiquesPrefetActions } from '../../../../actions';

function StatistiquesBanniere({ dateDebut, dateFin, idStructure, codePostal = null }) {

  const dispatch = useDispatch();
  const errorPDF = useSelector(state => state.statistiquesPrefet?.errorPDF);
  const blob = useSelector(state => state.statistiquesPrefet?.blob);

  function savePDF() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const type = 'structure';
    dispatch(statistiquesPrefetActions.getStatistiquesPDF(dateDebut, dateFin, type, idStructure, codePostal));

  }

  function saveCSV() {
    const type = 'structure';
    dispatch(statistiquesPrefetActions.getStatistiquesCSV(dateDebut, dateFin, type, idStructure, codePostal));
  }

  useEffect(() => {
    if (blob !== null && blob !== undefined && (errorPDF === undefined || errorPDF === false)) {
      dispatch(statistiquesPrefetActions.resetStatistiquesPDFFile());
    }
  }, [blob, errorPDF]);

  return (
    <>
      <div className="fr-col-12">
        <hr className="fr-mt-n15w fr-mr-10w"/>
      </div>
      <div className="fr-col-12">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-4 fr-mt-5w centrerTexte">
            <div className="fr-mb-2v">Exporter cette page</div>
            <button className="statistiques_nationales-btn" onClick={savePDF}>Format PDF</button>
            &ensp;
            <button className="statistiques_nationales-btn" onClick={saveCSV}>Format CSV</button>
          </div>
        </div>
      </div>
    </>
  );
}

StatistiquesBanniere.propTypes = {
  dateDebut: PropTypes.instanceOf(Date),
  dateFin: PropTypes.instanceOf(Date),
  idTerritoire: PropTypes.string,
  codePostal: PropTypes.string,
  idStructure: PropTypes.string,
};

export default StatistiquesBanniere;
