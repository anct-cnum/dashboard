import dayjs from 'dayjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../../actions';
import PropTypes from 'prop-types';
import iconeTelechargement from '../../../../assets/icons/icone-telecharger.svg';
import pinCNFS from '../../../../assets/icons/pin-cnfs.svg';
import logoPix from '../../../../assets/icons/logo-pix.svg';
import { Link } from 'react-router-dom';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';
import ReactTooltip from 'react-tooltip';

function CandidatNonMisEnRelation({ conseiller, currentFilter }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const dispatch = useDispatch();

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(conseiller?._id, conseiller));
  };

  return (
    <tr className="conseiller">
      <td>
        <strong className="fr-text--md fr-text--bold">
          {conseiller ? formatNomConseiller(conseiller) : ''}
        </strong>
        <br />
        <span className="fr-text--regular fr-text--md">
          ID - {conseiller.idPG ?? ''}
        </span>
      </td>
      <td>{dayjs(conseiller.createdAt).format('DD/MM/YYYY')}</td>
      <td>{conseiller.codePostal}</td>
      <td style={{ display: 'flex', justifyContent: 'center' }}>
        {(conseiller?.statut === 'RECRUTE' || conseiller?.statut === 'RUPTURE') &&
          <>
            <div
              data-tip={`
              <span>Cette personne a d&eacute;j&agrave; une exp&eacute;rience</span>
              <br />
              <span>de conseiller-&egrave;re num&eacute;rique. Cliquez sur D&eacute;tails</span>
              `}
              data-for={`tooltip-cnfs-candidat-non-mise-en-relation${conseiller?.idPG}`}
            >
              <img src={pinCNFS} alt="logo CNFS" style={{ height: '36px' }} />
            </div>
            <ReactTooltip type="light" html={true} id={`tooltip-cnfs-candidat-non-mise-en-relation${conseiller?.idPG}`} className="infobulle" />
          </>
        }
      </td>
      <td>
        {conseiller?.pix?.partage &&
          <>
            <div
              data-tip="A partag&eacute; ses r&eacute;sultats Pix"
              data-for={`tooltip-pix-candidat-non-mise-en-relation${conseiller?.idPG}`}
            >
              <img src={logoPix} alt="logo Pix" style={{ height: '36px' }} />
            </div>
            <ReactTooltip type="light" html={true} id={`tooltip-pix-candidat-non-mise-en-relation${conseiller?.idPG}`} className="infobulle" />
          </>
        }
      </td>
      <td>
        {conseiller?.cv?.file &&
          <button className="downloadCVBtn" onClick={downloadCV}>
            <img src={iconeTelechargement} alt="Télécharger le CV" style={{ height: '26px' }} />
          </button>
        }
        {!conseiller?.cv?.file &&
          <></>
        }
      </td>
      <td>
        <p className="fr-badge fr-badge--new">nouvelle candidature</p>
      </td>
      <td className="td-preselection">
        {(conseiller?.statut === 'RECRUTE' || conseiller?.statut === 'RUPTURE') ?
          <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left fr-ml-1w" to={{
            pathname: `/structure/preselection/conseiller/${conseiller._id}`
          }}
          state={{ 'origin': `/${roleActivated}/candidats/${currentFilter === undefined ? 'toutes' : currentFilter}` }}>
            D&eacute;tails
          </Link> :
          <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left fr-ml-1w" to={{
            pathname: `/structure/preselection/candidat/${conseiller._id}`
          }}
          state={{ 'origin': `/${roleActivated}/candidats/${currentFilter === undefined ? 'toutes' : currentFilter}` }}>
            D&eacute;tails
          </Link>
        }
      </td>
    </tr>
  );
}

CandidatNonMisEnRelation.propTypes = {
  conseiller: PropTypes.object,
  currentFilter: PropTypes.string,
};

export default CandidatNonMisEnRelation;
