import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ContratRupture({ contrat }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

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
        <Link
          className="fr-btn"
          state={{ 'origin': `/${roleActivated}/demandes/contrats`, 'statutContrat': 'nouvelle_rupture' }}
          to={`/admin/demandes/contrat/conseiller/${contrat?.conseillerObj?._id}/${contrat?._id}`}
        >
          Voir la demande
        </Link>
      </td>
    </tr>
  );
}

ContratRupture.propTypes = {
  contrat: PropTypes.object,
};

export default ContratRupture;
