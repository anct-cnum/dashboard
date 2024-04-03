import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { pluralize } from '../../../../../../utils/formatagesUtils';

function AvenantAjoutPoste({ avenant, statutDemande }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const formatAvisPrefet = avisPrefet => {
    switch (avisPrefet) {
      case 'favorable':
        return <p className="fr-badge fr-badge--success">favorable</p>;
      case 'défavorable':
        return <p className="fr-badge fr-badge--error">d&eacute;favorable</p>;
      default:
        return '';
    }
  };

  return (
    <>
      <td className="uppercase-letter">
        <span className="fr-text--bold">{avenant?.nom}</span><br />
        <span>ID {avenant?.idPG}</span>
      </td>
      <td>{avenant?.codePostal}</td>
      <td>
        {avenant?.emetteurAvenant?.date ?
          <span>{dayjs(avenant.emetteurAvenant.date).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>
        {pluralize(
          'poste',
          'poste',
          'postes',
          avenant?.nombreDePostesSouhaites,
          true
        )}
        {avenant?.idStructureTransfert &&
          <>
            &nbsp;(Transfert)
          </>
        }
      </td>
      <td style={{ paddingLeft: '0' }}>{formatAvisPrefet(avenant?.prefet?.avis)}</td>
      {avenant.statut === 'en_cours' ?
        <td style={{ textAlign: 'end', width: '32rem', paddingLeft: '0' }}>
          <Link className={`fr-btn ${avenant?.prefet?.avis ? 'fr-btn--secondary' : ''}`}
            to={{
              pathname: `/${roleActivated}/demandes/conseiller/${avenant?.idStructure}`,
              search: `?type=avenant-ajout-poste&demande=${avenant?.id}`,
            }}
            state={{ 'origin': `/${roleActivated}/demandes/conseillers`, statutDemande }}>
            {avenant?.prefet?.avis ? 'Modifier mon avis' : 'Donner mon avis'}
          </Link>
        </td> :
        <td style={{ textAlign: 'end' }}>
          <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left"
            to={{
              pathname: `/${roleActivated}/demandes/conseiller/${avenant?.idStructure}`,
              search: `?type=avenant-ajout-poste&demande=${avenant?.id}`,
            }}
            state={{ 'origin': `/${roleActivated}/demandes/conseillers`, statutDemande }}>
            D&eacute;tails
          </Link>
        </td>
      }
    </>
  );
}

AvenantAjoutPoste.propTypes = {
  avenant: PropTypes.object,
  statutDemande: PropTypes.string,
};

export default AvenantAjoutPoste;
