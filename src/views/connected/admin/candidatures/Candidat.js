import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { conseillerActions } from '../../../../actions';
import logoPix from '../../../../assets/icons/logo-pix.svg';
import iconeTelechargement from '../../../../assets/icons/icone-telecharger.svg';
import pinCNFS from '../../../../assets/icons/pin-cnfs.svg';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';

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
        <td style={{ display: 'flex', justifyContent: 'center' }}>
          {(candidat?.statut === 'TERMINE' || candidat?.statut === 'RUPTURE') &&
          <>
            <div
              data-tooltip-content="Cette personne a une exp&eacute;rience de conseiller-&egrave;re num&eacute;rique"
              data-tooltip-float="true"
              data-tooltip-id={`tooltip-cnfs-candidat${candidat?.idPG}`}
            >
              <img src={pinCNFS} alt="logo Conseiller num&eacute;rique" style={{ height: '36px' }} />
            </div>
            <Tooltip variant="light" className="infobulle" id={`tooltip-cnfs-candidat${candidat?.idPG}`} />
          </>
          }
        </td>
        <td>
          { candidat?.pix?.partage &&
            <>
              <div
                data-tooltip-id={`pix-${candidat?.idPG}`}
                data-tooltip-float="true"
                data-tooltip-content="A partag&eacute; ses r&eacute;sultats Pix">
                <img src={logoPix} alt="logo Pix" style={{ height: '36px' }}/>
              </div>
              <Tooltip variant="light" id={`pix-${candidat?.idPG}`} className="infobulle"/>
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
            to={`/${roleActivated}/candidat/${candidat?._id}`}
            state={{ 'origin': `/${roleActivated}/liste-candidatures` }}
            className="fr-btn fr-icon-eye-line"
            title="D&eacute;tail">
            D&eacute;tail
          </Link>
        </td>
      </tr>
    </>
  );
}

Candidat.propTypes = {
  candidat: PropTypes.object,
};

export default Candidat;
