import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import ReactDOMServer from 'react-dom/server';
import { useSelector } from 'react-redux';

function Structure({ structure }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <tr>
        <td>{structure?.idPG}</td>
        <td colSpan="12" style={{ width: '28rem' }}>{structure?.nom}</td>
        <td>{structure?.contact?.nom}</td>
        <td>{structure?.contact?.prenom}</td>
        <td colSpan="12" style={{ width: '20rem' }}>{structure?.contact?.email}</td>
        <td>{structure?.contact?.telephone}</td>
        <td>
          <button title="D&eacute;tail" className="fr-btn fr-icon-eye-line" onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)}/>
        </td>
        <td>
          <button
            data-html={true} data-tip={ReactDOMServer.renderToString(
              <div>
              Cette fonctionnalit&eacute; est en cours de conception et sera prochainement livr&eacute;e.
              </div>
            )}
            style={{ opacity: '30%', cursor: 'not-allowed' }}
            className="fr-btn fr-icon-edit-box-line"/>
          <ReactTooltip html={true} arrowColor="white"/>
        </td>
        <td>
          <button
            data-html={true} data-tip={ReactDOMServer.renderToString(
              <div>
              Cette fonctionnalit&eacute; est en cours de conception et sera prochainement livr&eacute;e.
              </div>
            )}
            style={{ opacity: '30%', cursor: 'not-allowed' }}
            className="fr-btn fr-icon-edit-box-line"/>
          <ReactTooltip html={true} arrowColor="white"/>
        </td>
      </tr>
    </>
  );
}

Structure.propTypes = {
  structure: PropTypes.object,
};

export default Structure;
