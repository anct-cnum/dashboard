import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Structure({ structure }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <tr>
        <td colSpan="12" style={{ width: '28rem' }}>{structure?.nom}</td>
        <td>{structure?.contact?.nom}</td>
        <td>{structure?.contact?.prenom}</td>
        <td colSpan="12" style={{ width: '20rem' }}>{structure?.contact?.email}</td>
        <td>{structure?.contact?.telephone}</td>
        <td>
          <button title="D&eacute;tail" className="fr-btn fr-icon-eye-line" onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)}/>
        </td>
      </tr>
    </>
  );
}

Structure.propTypes = {
  structure: PropTypes.object,
};

export default Structure;
