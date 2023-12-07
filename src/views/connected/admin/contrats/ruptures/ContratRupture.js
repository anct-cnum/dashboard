import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function ContratRupture({ contrat }) {

  return (
    <tr>
      <td>{contrat?.structureObj?.idPG}</td>
      <td style={{ maxWidth: '12rem', overflowWrap: 'break-word' }}>{contrat?.structureObj?.nom}</td>
      <td style={{ maxWidth: '12rem', overflowWrap: 'break-word' }} className="uppercase-letter">
        <span className="fr-text--bold">{contrat?.conseillerObj?.nom}&nbsp;</span>
        <span className="fr-text--bold">{contrat?.conseillerObj?.prenom}</span><br />
        <span>ID {contrat?.conseillerObj?.idPG}</span>
      </td>
      <td>{contrat?.emetteurRupture?.date ? dayjs(contrat.emetteurRupture.date).format('DD/MM/YYYY') : 'Non renseignée'}</td>
      <td>Rupture de contrat</td>
      <td>
        {contrat?.dossierIncompletRupture === true && <>En attente de pi&egrave;ces</>}
        {contrat?.dossierIncompletRupture === false && <>Nouvelle demande</>}
        {contrat?.dossierIncompletRupture === undefined && <>Complet</>}
      </td>
      <td>
        <button
          className="fr-btn"
          title="D&eacute;tail"
          onClick={() => window.open(`/admin/demandes/contrat/conseiller/${contrat?.conseillerObj?._id}/${contrat?._id}`)}>
          Voir la demande
        </button>
      </td>
    </tr>
  );
}

ContratRupture.propTypes = {
  contrat: PropTypes.object,
};

export default ContratRupture;
