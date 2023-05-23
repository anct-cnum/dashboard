import dayjs from 'dayjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../../actions';
import PropTypes from 'prop-types';
import iconeTelechargement from '../../../../assets/icons/icone-telecharger.svg';
import logoPix from '../../../../assets/icons/logo-pix.svg';
import { Link } from 'react-router-dom';

function CandidatNonMisEnRelation({ conseiller, search, currentFilter }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const dispatch = useDispatch();

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(conseiller?._id, conseiller));
  };

  return (
    <tr className="conseiller">
      <td>{conseiller.idPG}</td>
      <td>{conseiller.prenom}</td>
      <td>{conseiller.nom}</td>
      {search &&
        <td>{conseiller.email}</td>
      }
      <td>{conseiller?.miseEnRelation?.statut === 'finalisee' ? <> D&eacute;j&agrave; recrut&eacute; </> : <> Non mis en relation </>}</td>
      <td>{dayjs(conseiller.createdAt).format('DD/MM/YYYY')}</td>
      <td>{conseiller.codePostal}</td>
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
      <td>
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
