import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Conventionnement from './Conventionnement';
import { filtresConventionsActions, paginationActions } from '../../../../actions';
import AvenantAjoutPoste from '../avenantAjoutPoste/AvenantAjoutPoste';

export function TableauConventionnement({ conventions, loading, error, ordreNom, ordre, typeConvention }) {
  const dispatch = useDispatch();

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresConventionsActions.changeOrdre(e.currentTarget?.id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: '28rem' }}>Structure</th>
          <th style={{ width: '27rem' }}>
            <button id="dateDemande" className="filtre-btn" onClick={ordreColonne}>
              <span>Date de la demande
                {(ordreNom !== 'dateDemande' || ordreNom === 'dateDemande' && ordre) &&
                  <i className="ri-arrow-down-s-line chevron icone"></i>
                }
                {(ordreNom === 'dateDemande' && !ordre) &&
                  <i className="ri-arrow-up-s-line chevron icone"></i>
                }
              </span>
            </button>
          </th>
          <th style={{ width: '23rem' }}>Nombre de postes</th>
          <th style={{ width: '26rem' }}>Type de demande</th>
          <th style={{ width: '10rem' }}>Avis pr&eacute;fet</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {!error && !loading && conventions?.items?.data?.map((convention, idx) => {
          return (
            <tr key={idx}>
              {convention?.typeConvention === 'conventionnement' &&
                <Conventionnement structure={convention} typeConvention={typeConvention} />
              }
              {convention?.typeConvention === 'avenantAjoutPoste' &&
                <AvenantAjoutPoste avenant={convention} typeConvention={typeConvention} />
              }
            </tr>
          );
        })
        }
        {(!conventions?.items || conventions?.items?.data?.length === 0) &&
          <tr>
            <td colSpan="12" style={{ width: '60rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span className="not-found pair">Aucune demande de convention trouv&eacute;</span>
              </div>
            </td>
          </tr>
        }
      </tbody>
    </table>
  );
}

TableauConventionnement.propTypes = {
  conventions: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  ordreNom: PropTypes.string,
  ordre: PropTypes.bool,
  typeConvention: PropTypes.string,
};

export default TableauConventionnement;
