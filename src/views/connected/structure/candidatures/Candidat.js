import dayjs from 'dayjs';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../../actions';
import { displayBadgeStatutCandidat, formatNomConseiller } from '../../../../utils/formatagesUtils';
import iconeTelechargement from '../../../../assets/icons/icone-telecharger.svg';
import pinCNFS from '../../../../assets/icons/pin-cnfs.svg';
import logoPix from '../../../../assets/icons/logo-pix.svg';
import { Tooltip } from 'react-tooltip';

function Candidat({ miseEnRelation, currentFilter, search }) {

  const dispatch = useDispatch();
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(miseEnRelation.conseillerObj?._id, miseEnRelation.conseillerObj));
  };

  return (
    <tr className="conseiller">
      <td>
        <strong className="fr-text--md fr-text--bold">
          {miseEnRelation.conseillerObj ? formatNomConseiller(miseEnRelation.conseillerObj) : ''}
        </strong>
        <br />
        <span className="fr-text--regular fr-text--md">
          ID - {miseEnRelation.conseillerObj.idPG ?? ''}
        </span>
      </td>
      <td>{miseEnRelation.conseillerObj?.dateDisponibilite ? dayjs(miseEnRelation.conseillerObj.dateDisponibilite).format('DD/MM/YYYY') : 'Non renseignée'}</td>
      <td>{miseEnRelation.conseillerObj.codePostal}</td>
      <td style={{ display: 'flex', justifyContent: 'center' }}>
        {(miseEnRelation.conseillerObj?.statut === 'RECRUTE' || miseEnRelation.conseillerObj?.statut === 'RUPTURE') &&
          <>
            <div
              data-tooltip-content="Cette personne a une exp&eacute;rience de conseiller-&egrave;re num&eacute;rique"
              data-tooltip-float="true"
              data-tooltip-id={`tooltip-cnfs-candidat${miseEnRelation?.conseillerObj?.idPG}`}
            >
              <img src={pinCNFS} alt="logo CNFS" style={{ height: '36px' }} />
            </div>
            <Tooltip variant="light" className="infobulle" id={`tooltip-cnfs-candidat${miseEnRelation?.conseillerObj?.idPG}`} />
          </>
        }
      </td>
      <td>
        {miseEnRelation.conseillerObj?.pix?.partage &&
          <>
            <div
              data-tooltip-content="A partag&eacute; ses r&eacute;sultats Pix"
              data-tooltip-float="true"
              data-tooltip-id={`tooltip-pix-candidat${miseEnRelation?.conseillerObj?.idPG}`}>
              <img src={logoPix} alt="logo Pix" style={{ height: '36px' }} />
            </div>
            <Tooltip variant="light" id={`tooltip-pix-candidat${miseEnRelation?.conseillerObj?.idPG}`} className="infobulle" />
          </>
        }
      </td>
      <td>
        {miseEnRelation.conseillerObj?.cv?.file && miseEnRelation.statut !== 'finalisee_non_disponible' &&
          <button className="downloadCVBtn" onClick={downloadCV}>
            <img src={iconeTelechargement} alt="Télécharger le CV" style={{ height: '26px' }} />
          </button>
        }
        {!miseEnRelation.conseillerObj?.cv?.file &&
          <></>
        }
      </td>
      <td>{displayBadgeStatutCandidat(miseEnRelation.statut)}</td>
      <td>
        {miseEnRelation.statut !== 'finalisee_non_disponible' ?
          <>
            {(miseEnRelation.conseillerObj?.statut === 'RECRUTE' || miseEnRelation.conseillerObj?.statut === 'RUPTURE') ?
              <Link className={`fr-btn fr-icon-eye-line fr-btn--icon-left ${search !== '' ? 'fr-ml-1w' : ''}`} style={{ boxShadow: 'none' }} to={{
                pathname: `/structure/candidature/conseiller/${miseEnRelation._id}`
              }}
              state={{ 'origin': `/${roleActivated}/candidats/${currentFilter === undefined ? 'toutes' : currentFilter}` }}>
                D&eacute;tails
              </Link> :
              <Link className={`fr-btn fr-icon-eye-line fr-btn--icon-left ${search !== '' ? 'fr-ml-1w' : ''}`} style={{ boxShadow: 'none' }} to={{
                pathname: `/structure/candidature/candidat/${miseEnRelation._id}`
              }}
              state={{ 'origin': `/${roleActivated}/candidats/${currentFilter === undefined ? 'toutes' : currentFilter}` }}>
                D&eacute;tails
              </Link>
            }
          </> :
          <button className="fr-btn fr-icon-eye-line fr-btn--icon-left" style={{ background: '#383838', opacity: '0.33', color: 'white' }} disabled>
            D&eacute;tails
          </button>
        }
      </td>
    </tr>
  );
}

Candidat.propTypes = {
  miseEnRelation: PropTypes.object,
  currentFilter: PropTypes.string,
  search: PropTypes.bool
};

export default Candidat;
