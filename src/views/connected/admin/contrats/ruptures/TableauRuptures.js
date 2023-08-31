import React from 'react';
import { useDispatch } from 'react-redux';
import { filtresStructuresActions, paginationActions } from '../../../../../actions';
import PropTypes from 'prop-types';
import ContratRupture from './ContratRupture';

export function TableauRuptures({ contrats, loading, error, ordreNom, ordre }) {
  const dispatch = useDispatch();

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeOrdre(e.currentTarget?.id));
  };

  return (
    <table className={contrats?.items?.data?.length < 2 ? 'no-result-table' : ''}>
      <thead>
        <tr>
          <th style={{ width: '8rem' }}>ID structure</th>
          <th style={{ width: '19rem' }}>Nom de la structure</th>
          <th style={{ width: '13rem' }}>Nom du candidat</th>
          <th style={{ width: '13rem' }}>
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
          <th style={{ width: '11rem' }}>Type de la demande</th>
          <th style={{ width: '11rem' }}>Statut du dossier</th>
          <th style={{ width: '15rem' }}></th>
        </tr>
      </thead>
      <tbody>
        {!error && !loading && contrats?.items?.data?.map((contrat, idx) => {
          return (<ContratRupture key={idx} contrat={contrat} />);
        })
        }
        {(!contrats?.items || contrats?.items?.total === 0) &&
          <tr>
            <td colSpan="12" style={{ width: '60rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span className="not-found pair">Aucun contrat trouv&eacute;</span>
              </div>
            </td>
          </tr>
        }
      </tbody>
    </table>
  );
}

TableauRuptures.propTypes = {
  contrats: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  ordreNom: PropTypes.string,
  ordre: PropTypes.number,
};

export default TableauRuptures;
