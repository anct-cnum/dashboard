import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { filtresConventionsActions, paginationActions } from '../../../../actions';
import HistoriqueConventionnement from './HistoriqueConventionnement';

export function TableauHistoriqueConventionnement({ conventions, loading, error, ordreNom, ordre }) {
  const dispatch = useDispatch();

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresConventionsActions.changeOrdre(e.currentTarget?.id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: '34rem' }}>Structure</th>
          <th style={{ width: '22rem' }}>
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
          <th style={{ width: '25rem' }}>Nb. de postes accord&eacute;s</th>
          <th style={{ width: '13rem' }}>Avis pr&eacute;fet</th>
          <th style={{ width: '24.5rem' }}>Type de demande</th>
          <th style={{ width: '8rem' }}></th>
        </tr>
      </thead>
      <tbody>
        {!error && !loading && conventions?.items?.data?.map((convention, idx) => {
          return (
            <tr key={idx}>
              <HistoriqueConventionnement structure={convention} typeConvention="conventionnement" />
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

TableauHistoriqueConventionnement.propTypes = {
  conventions: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  ordreNom: PropTypes.string,
  ordre: PropTypes.bool,
};

export default TableauHistoriqueConventionnement;
