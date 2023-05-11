import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { conseillerActions } from '../../../../actions';
import logoPix from '../../../../assets/icons/logo-pix.svg';
import iconeTelechargement from '../../../../assets/icons/icone-telecharger.svg';
import ReactTooltip from 'react-tooltip';

function Candidat({ candidat }) {
  const dispatch = useDispatch();
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(candidat?._id, candidat));
  };
  return (
    <>
      <tr>
        <td>{candidat?.idPG}</td>
        <td>{candidat?.prenom}</td>
        <td>{candidat?.nom}</td>
        <td>{dayjs(candidat?.createdAt).format('DD/MM/YYYY')}</td>
        <td>{candidat?.codePostal}</td>
        <td>
          { candidat?.pix?.partage &&
            <>
              <div data-tip="A partag&eacute; ses r&eacute;sultats Pix">
                <img src={logoPix} alt="logo Pix" style={{ height: '36px' }}/>
              </div>
              <ReactTooltip html={true} className="infobulle"/>
            </>
          }
        </td>
        <td>
          {candidat?.cv?.file &&
        <button className="downloadCVBtn" onClick={downloadCV}>
          <img src={iconeTelechargement} alt="T&eacute;l&eacute;charger le CV" style={{ height: '26px' }}/>
        </button>
          }
        </td>
        <td>
          <Link
            className="fr-btn fr-icon-eye-line"
            title="Détails"
            to={`/${roleActivated}/candidat/${candidat?._id}`}
            state={{ 'origin': `/${roleActivated}/liste-candidatures` }}>D&eacute;tails</Link>
        </td>
      </tr>
    </>
  );
}

Candidat.propTypes = {
  candidat: PropTypes.object,
};

export default Candidat;
