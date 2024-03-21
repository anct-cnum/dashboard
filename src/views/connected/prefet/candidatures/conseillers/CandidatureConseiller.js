import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { pluralize } from '../../../../../utils/formatagesUtils';

function CandidatureConseiller({ structure, statutDemande }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const formatAvisPrefet = avisPrefet => {
    switch (avisPrefet) {
      case 'POSITIF':
        return <p className="fr-badge fr-badge--success">favorable</p>;
      case 'NÉGATIF':
        return <p className="fr-badge fr-badge--error">d&eacute;favorable</p>;
      default:
        return '';
    }
  };

  return (
    <>
      <td className="uppercase-letter">
        <span className="fr-text--bold">{structure?.nom}</span><br />
        <span>ID {structure?.idPG}</span>
      </td>
      <td>{structure?.codePostal}</td>
      <td>{structure?.createdAt ? dayjs(structure.createdAt).format('DD/MM/YYYY') : 'Non renseignée'}</td>
      <td>{pluralize(
        'poste',
        'poste',
        'postes',
        structure?.nombreConseillersSouhaites ? structure?.nombreConseillersSouhaites : 0,
        true
      )}
      {structure?.prefet?.idStructureTransfert &&
          <>
            &nbsp;(Transfert)
          </>
      }
      </td>
      <td>{formatAvisPrefet(structure?.prefet?.avisPrefet)}</td>
      {structure?.statut === 'CREEE' || structure?.statut === 'EXAMEN_COMPLEMENTAIRE_COSELEC' ?
        <td>
          <Link className={`fr-btn ${structure?.prefet?.avisPrefet ? 'fr-btn--secondary' : ''}`}
            to={`/${roleActivated}/demandes/conseiller/${structure?._id}`}
            state={{ 'origin': `/${roleActivated}/demandes/conseillers`, statutDemande }}>
            {structure?.prefet?.avisPrefet ? 'Modifier mon avis' : 'Donner mon avis'}
          </Link>
        </td> :
        <td style={{ textAlign: 'end' }}>
          <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left" to={`/${roleActivated}/demandes/conseiller/${structure?._id}`}
            state={{ 'origin': `/${roleActivated}/demandes/conseillers`, statutDemande }}>
            Details
          </Link>
        </td>
      }
    </>
  );
}

CandidatureConseiller.propTypes = {
  structure: PropTypes.object,
  statutDemande: PropTypes.string
};

export default CandidatureConseiller;
