import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { pluralize } from '../../../../../../utils/formatagesUtils';

function AvenantRenduPoste({ avenant }) {

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
        -{pluralize(
          'poste',
          'poste',
          'postes',
          avenant?.nombreDePostesRendus,
          true
        )}
      </td>
    </>
  );
}

AvenantRenduPoste.propTypes = {
  avenant: PropTypes.object,
};

export default AvenantRenduPoste;
