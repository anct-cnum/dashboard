import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import ReactDOMServer from 'react-dom/server';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <td>
          <div className="btn-actions-conseillers">
            <button
              className="fr-btn fr-icon-eye-line fr-mr-2w"
              title="D&eacute;tail"
              onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)}/>
            <Link
              className="fr-btn fr-icon-line-chart-line"
              title="Statistiques"
              to={`/statistiques-structure/${structure?._id}`}
              state={{ 'origin': `/${roleActivated}/liste-structures`, structure }}
            />
          </div>
        </td>
      </tr>
    </>
  );
}

Structure.propTypes = {
  structure: PropTypes.object,
};

export default Structure;
