import dayjs from 'dayjs';
import React from 'react';
import { useDispatch } from 'react-redux';
import { conseillerActions } from '../../../../actions';
import PropTypes from 'prop-types';
import iconeTelechargement from '../../../../assets/icons/icone-telecharger.svg';
import logoPix from '../../../../assets/icons/logo-pix.svg';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { useNavigate } from 'react-router-dom';

function ConseillerNonMisEnRelation({ conseiller, search }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const preSelectionnerCandidat = () => {
    dispatch(conseillerActions.preSelectionner(conseiller._id));
    scrollTopWindow();
    navigate('/structure/candidats/interessee');
  };

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(conseiller?._id, conseiller));
  };

  return (
    <tr className="conseiller">
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
      <td className="td-preselection">
        {conseiller?.miseEnRelation?.statut === 'finalisee' ?
          <button className="fr-btn fr-mx-1w fr-icon-success-line fr-btn--icon-left"
            style={{ background: '#383838', opacity: '0.33', color: 'white' }} disabled>
            Pr&eacute; s&eacute;lectionner
          </button> :
          <button className="fr-btn fr-mx-1w fr-icon-success-line fr-btn--icon-left"
            style={{ boxShadow: 'none' }}
            onClick={preSelectionnerCandidat}>
            Pr&eacute; s&eacute;lectionner
          </button>
        }
      </td>
    </tr>
  );
}

ConseillerNonMisEnRelation.propTypes = {
  conseiller: PropTypes.object,
  search: PropTypes.bool,
};

export default ConseillerNonMisEnRelation;
