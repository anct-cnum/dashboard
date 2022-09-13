import dayjs from 'dayjs';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { conseillerActions } from '../../../actions';

function Candidat({ miseEnRelation, currentPage, currentFilter, search }) {

  const dispatch = useDispatch();

  const statutLabel = [{
    key: 'nouvelle',
    label: 'Nouvelle candidature'
  }, {
    key: 'nonInteressee',
    label: 'Candidature non retenue'
  }, {
    key: 'interessee',
    label: 'Candidature pré sélectionnée'
  }, {
    key: 'recrutee',
    label: 'Candidature validée'
  }, {
    key: 'finalisee',
    label: 'Candidat recruté'
  },
  {
    key: 'nouvelle_rupture',
    label: 'Rupture notifiée'
  },
  {
    key: 'finalisee_non_disponible',
    label: 'Candidat déjà recruté'
  },
  {
    key: 'non_disponible',
    label: 'Candidature annulée'
  }
  ];

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(miseEnRelation.conseillerObj?._id, miseEnRelation.conseillerObj));
  };

  return (
    <tr className="conseiller">
      <td>{miseEnRelation.conseillerObj.prenom}</td>
      <td>{miseEnRelation.conseillerObj.nom}</td>
      { search && <td>{miseEnRelation.conseillerObj.email}</td>}
      <td>{statutLabel.find(item => item.key === miseEnRelation.statut).label}</td>
      <td>{dayjs(miseEnRelation.conseillerObj.createdAt).format('DD/MM/YYYY')}</td>
      <td>{miseEnRelation.conseillerObj.codePostal}</td>
      { !search && <td>
        { miseEnRelation.conseillerObj?.pix?.partage &&
          <div className="tooltip">
            <img src="/logos/logo-pix.svg" alt="logo Pix" style={{ height: '36px' }}/>
            <span className="tooltiptext">A partagé ses résultats Pix</span>
          </div>
        }
      </td> }
      <td>
        {miseEnRelation.conseillerObj?.cv?.file && miseEnRelation.statut !== 'finalisee_non_disponible' &&
          <button className="downloadCVBtn" onClick={downloadCV}>
            <img src="/logos/icone-telecharger.svg" alt="Télécharger le CV" style={{ height: '26px' }}/>
          </button>
        }
        {!miseEnRelation.conseillerObj?.cv?.file &&
          <></>
        }
      </td>
      <td>
        { miseEnRelation.statut !== 'finalisee_non_disponible' ?
          <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left" style={{ boxShadow: 'none' }} to={{
            pathname: `/structure/candidat/${miseEnRelation.conseillerObj._id}`
          }}
          state={{
            miseEnRelation: miseEnRelation,
            currentPage: currentPage,
            currentFilter: currentFilter
          }}>
              Détails
          </Link> :
          <button className="fr-btn fr-icon-eye-line fr-btn--icon-left" style={{ background: '#383838', opacity: '0.33', color: 'white' }} disabled>
              Détails
          </button>
        }
      </td>
    </tr>
  );
}

Candidat.propTypes = {
  miseEnRelation: PropTypes.object,
  currentPage: PropTypes.number,
  currentFilter: PropTypes.string,
  search: PropTypes.bool
};

export default Candidat;
