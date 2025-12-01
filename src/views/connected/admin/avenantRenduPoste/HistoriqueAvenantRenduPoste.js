import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import iconeCoordinateur from '../../../../assets/icons/icone-coordinateur.svg';

function HistoriqueAvenantRenduPoste({ avenant, typeConvention }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const formatNombreDePostesRendus = nombreDePostesRendus => {
    if (nombreDePostesRendus) {
      return typeConvention === 'toutes' ? `-${nombreDePostesRendus}` : nombreDePostesRendus;
    }
    return '-';
  };

  return (
    <>
      <td className="uppercase-letter">
        <span className="fr-text--bold">{avenant?.nom}</span><br />
        <span>ID {avenant?.idPG}</span>
      </td>
      <td>
        {avenant?.dateDeLaDemande ?
          <span>{dayjs(avenant.dateDeLaDemande).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>
        {avenant?.dateDeCoselec ?
          <span>{dayjs(avenant.dateDeCoselec).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{formatNombreDePostesRendus(avenant?.nombreDePostesRendus)}</td>
      <td style={{ 'white-space': 'nowrap' }}>
        Avenant · poste rendu {avenant?.estPosteCoordinateur && <img alt="ic&ocirc;ne Conseiller num&eacute;rique coordinateur"
          src={iconeCoordinateur} className="fr-ml-1w fr-mb-n1w" />}
      </td>
      <td>
        <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left" to={{
          pathname: `/${roleActivated}/demandes/convention/${avenant?.idStructure}`,
          search: `?type=avenant-rendu-poste&demande=${avenant?.id}`,
        }}
        state={{ 'origin': `/${roleActivated}/historique/demandes/conventions`, typeConvention }}>
          D&eacute;tails
        </Link>
      </td>
    </>
  );
}

HistoriqueAvenantRenduPoste.propTypes = {
  avenant: PropTypes.object,
  typeConvention: PropTypes.string,
};

export default HistoriqueAvenantRenduPoste;
