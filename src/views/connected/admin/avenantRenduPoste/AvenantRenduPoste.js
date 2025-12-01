import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import iconeCoordinateur from '../../../../assets/icons/icone-coordinateur.svg';

function AvenantRenduPoste({ avenant, typeConvention }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <td className="uppercase-letter">
        <span className="fr-text--bold">{avenant?.nom}</span><br />
        <span>ID {avenant?.idPG}</span>
      </td>
      <td>
        {avenant?.emetteurAvenant?.date ?
          <span>{dayjs(avenant.emetteurAvenant.date).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{avenant?.nombreDePostesRendus ?? '-'}</td>
      <td>Avenant · poste rendu {avenant?.estPosteCoordinateur &&
        <img alt="ic&ocirc;ne Conseiller num&eacute;rique coordinateur" src={iconeCoordinateur} className="fr-ml-2w fr-mb-n1w" />
      }</td>
      <td style={{ textAlign: 'end' }}>
        <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left" to={{
          pathname: `/${roleActivated}/demandes/convention/${avenant?.idStructure}`,
          search: `?type=avenant-rendu-poste&demande=${avenant?.id}`,
        }}
        state={{ 'origin': `/${roleActivated}/demandes/conventions`, typeConvention }}>
          D&eacute;tails
        </Link>
      </td>
    </>
  );
}

AvenantRenduPoste.propTypes = {
  avenant: PropTypes.object,
  typeConvention: PropTypes.string,
};

export default AvenantRenduPoste;
