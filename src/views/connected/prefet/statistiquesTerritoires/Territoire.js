import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import departementsRegionRaw from '../../../../datas/departements-region.json';
import departementsRegionTomRaw from '../../../../datas/departements-region-tom.json';
import codeRegionsRaw from '../../../../datas/code_region.json';
import { useSelector } from 'react-redux';

function Territoire({ territoire, filtreTerritoire }) {
  const departementsRegionArray = Array.from(departementsRegionRaw);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const departementsRegionTomArray = Array.from(departementsRegionTomRaw);
  const codeRegionsArray = Array.from(codeRegionsRaw);
  const departementsRegionList = departementsRegionArray.concat(departementsRegionTomArray);
  const totalPersonnesUniquesAccompagnees = territoire?.personnesAccompagnees - territoire?.personnesRecurrentes;
  const codeTerritoire = filtreTerritoire !== 'codeDepartement' ? territoire?.codeRegion : territoire?.codeDepartement;
  const maille = filtreTerritoire !== 'codeDepartement' ? 'region' : 'departement';

  const getNom = () => {
    if (maille === 'region') {
      return codeRegionsArray.find(region => region.code === territoire?.codeRegion)?.nom;
    }
    return departementsRegionList.find(departement => departement.num_dep === territoire?.codeDepartement)?.dep_name;
  };

  return (
    <>
      <tr>
        <td>{territoire?.codeDepartement ? territoire?.codeDepartement : territoire?.codeRegion}</td>
        <td style={{ width: '16rem' }}>{getNom()}</td>
        <td style={{ width: '10rem' }}>{territoire?.CRAEnregistres ?? 0}</td>
        <td style={{ width: '16rem' }}>{totalPersonnesUniquesAccompagnees ?? 0}</td>
        <td style={{ width: '10rem' }}>{territoire?.nombreConseillersCoselec ?? 0}</td>
        <td style={{ width: '13rem' }}>{territoire?.conseillersRecruter ?? 0}</td>
        <td>
          <Link
            className="fr-btn fr-icon-eye-line"
            to={`/statistiques-territoire/${maille}/${codeTerritoire}`}
            state={{ 'origin': `/${roleActivated}/statistiques-territoires`, territoire }}
          >
          </Link>
        </td>
      </tr>
    </>
  );
}

Territoire.propTypes = {
  territoire: PropTypes.object,
  filtreTerritoire: PropTypes.string
};

export default Territoire;
