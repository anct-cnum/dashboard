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

function CandidatNonMisEnRelation({ conseiller, search, currentFilter }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const dispatch = useDispatch();

  const statutLabel = [{
    key: 'nouvelle',
    label: 'Nouvelle candidature',
    badge: 'new'
  }, {
    key: 'nonInteressee',
    label: 'Candidature non retenue',
    badge: 'error'
  }, {
    key: 'interessee',
    label: 'Candidat pré-sélectionné',
    badge: 'info'
  }, {
    key: 'recrutee',
    label: 'Candidature validée',
    badge: 'success'
  }, {
    key: 'finalisee',
    label: 'Candidat recruté',
    badge: 'success'
  },
  {
    key: 'nouvelle_rupture',
    label: 'Rupture notifiée',
    badge: 'info'
  },
  {
    key: 'finalisee_non_disponible',
    label: 'Candidat déjà recruté',
    badge: 'warning'
  },
  {
    key: 'finalisee_rupture',
    label: 'Candidat en rupture',
    badge: 'info'
  },
  {
    key: 'non_disponible',
    label: 'Candidature annulée',
    badge: 'error'
  }
  ];

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(conseiller?._id, conseiller));
  };

  const displayBadge = statut => {
    const s = statutLabel.find(item => item.key === statut);
    return s ? <div className={`fr-badge fr-badge--${s?.badge}`}>{s?.label}</div> : '';
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
      {search &&
        <td>{conseiller.email}</td>
      }
      <td>{dayjs(conseiller.createdAt).format('DD/MM/YYYY')}</td>
      <td>{conseiller.codePostal}</td>
      <td style={{ display: 'flex', justifyContent: 'center' }}>
        { (conseiller?.statut === 'RECRUTE' || conseiller?.statut === 'RUPTURE') &&
        <>
          <div data-tooltip-content="A &eacute;j&agrave; une exp&eacute;rience de conseiller-&egrave;re num&eacute;rique. Cliquez sur D&eacute;tails">
            <img src={pinCNFS} alt="logo CNFS" style={{ height: '36px' }}/>
          </div>
          <ReactTooltip html={true} className="infobulle"/>
        </>
        }
      </td>
      <td>
        {conseiller?.cv?.file &&
        <button className="downloadCVBtn" onClick={downloadCV}>
          <img src={iconeTelechargement} alt="Télécharger le CV" style={{ height: '26px' }}/>
        </button>
        }
        {!conseiller?.cv?.file &&
          <></>
        }
      </td>
      {!search &&
        <td>
          {conseiller?.pix?.partage &&
            <div className="tooltip">
              <img src={logoPix} alt="logo Pix" style={{ height: '36px' }}/>
              <span className="tooltiptext">A partag&eacute; ses r&eacute;sultats Pix</span>
            </div>
          }
        </td>
      }
      <td>{displayBadge(conseiller?.miseEnRelation?.statut)}</td>
      <td className="td-preselection">
        {conseiller?.miseEnRelation?.statut === 'finalisee' ?
          <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left fr-ml-1w" to={{
            pathname: `/structure/preselection/conseiller/${conseiller._id}`
          }}
          state={{ 'origin': `/${roleActivated}/candidats/${currentFilter === undefined ? 'toutes' : currentFilter}` }}>
              Détails
          </Link> :
          <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left fr-ml-1w" to={{
            pathname: `/structure/preselection/candidat/${conseiller._id}`
          }}
          state={{ 'origin': `/${roleActivated}/candidats/${currentFilter === undefined ? 'toutes' : currentFilter}` }}>
              Détails
          </Link>
        }
      </td>
    </tr>
  );
}

CandidatNonMisEnRelation.propTypes = {
  conseiller: PropTypes.object,
  search: PropTypes.bool,
  currentFilter: PropTypes.string,
};

export default CandidatNonMisEnRelation;
