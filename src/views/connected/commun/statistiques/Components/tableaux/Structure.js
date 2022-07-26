import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Structure({ structure }) {
  return (
    <tr>
      <td>{structure.idPG}</td>
      <td>{structure.siret !== null ? structure.siret : 'non renseigné' }</td>
      <td className="capitalizeFirstLetter">{structure.nom}</td>
      <td>{structure.codePostal}</td>
      <td>{structure.CRAEnregistres}</td>
      <td>{structure.personnesAccompagnees}</td>
      <td>
        <Link
          className="fr-btn details-btn fr-fi-eye-line fr-btn--icon-left"
          style={{ boxShadow: 'none' }}
          to={`/statistiques-structure/${structure?._id}`}
          state={{ 'origin': '/statistiques-structures', structure }}
        >
            D&eacute;tails
        </Link>
      </td>
    </tr>
  );
}

Structure.propTypes = {
  structure: PropTypes.object,
};

