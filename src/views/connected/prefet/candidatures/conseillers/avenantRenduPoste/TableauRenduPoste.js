import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { filtresStructuresActions, paginationActions } from '../../../../../../actions';
import AvenantRenduPoste from './AvenantRenduPoste';

export function TableauRenduPoste({ structures, loading, error, ordreNom, ordre }) {
  const dispatch = useDispatch();

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeOrdre(e.currentTarget?.id));
  };

  return (
    <table className={structures?.items?.data?.length < 2 ? 'no-result-table' : ''}>
      <thead>
        <tr>
          <th style={{ width: '40rem' }}>Structure</th>
          <th style={{ width: '19rem' }}>
            <button id="codePostal" className="filtre-btn" onClick={ordreColonne}>
              <span>CP
                {(ordreNom !== 'codePostal' || ordreNom === 'codePostal' && ordre) &&
                  <i className="ri-arrow-down-s-line chevron icone"></i>
                }
                {(ordreNom === 'codePostal' && !ordre) &&
                  <i className="ri-arrow-up-s-line chevron icone"></i>
                }
              </span>
            </button>
          </th>
          <th style={{ width: '22rem' }}>
            <button id="createdAt" className="filtre-btn" onClick={ordreColonne}>
              <span>Date de la demande
                {(ordreNom !== 'createdAt' || ordreNom === 'createdAt' && ordre) &&
                  <i className="ri-arrow-down-s-line chevron icone"></i>
                }
                {(ordreNom === 'createdAt' && !ordre) &&
                  <i className="ri-arrow-up-s-line chevron icone"></i>
                }
              </span>
            </button>
          </th>
          <th style={{ width: '15rem' }}>Demande</th>
        </tr>
      </thead>
      <tbody>
        {!error && !loading && structures?.items?.data?.map((structure, idx) => {
          return (<AvenantRenduPoste key={idx} avenant={structure} />);
        })
        }
        {(!structures?.items || structures?.items?.total === 0) &&
          <tr>
            <td colSpan="12" style={{ width: '60rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span className="not-found pair">Aucune demande de rendu poste trouv&eacute;</span>
              </div>
            </td>
          </tr>
        }
      </tbody>
    </table>
  );
}

TableauRenduPoste.propTypes = {
  structures: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  ordreNom: PropTypes.string,
  ordre: PropTypes.bool,
};

export default TableauRenduPoste;
