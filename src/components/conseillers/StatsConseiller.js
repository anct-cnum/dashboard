import React from 'react';
import PropTypes from 'prop-types';
import BlockDatePickers from '../datePicker/BlockDatePickers';
import ElementCodePostal from '../../views/connected/commun/statistiques/Components/graphiques/ElementCodePostal';
import StatistiquesBanniere from '../../views/connected/commun/statistiques/Components/graphiques/StatistiquesBanniere';
import BottomPage from '../../views/connected/commun/statistiques/Components/graphiques/BottomPage';
import RightPage from '../../views/connected/commun/statistiques/Components/graphiques/RightPage';
import LeftPage from '../../views/connected/commun/statistiques/Components/graphiques/LeftPage';
import { useSelector } from 'react-redux';

function StatsConseiller({ conseiller, idConseiller, statistiquesLoading }) {
  const codeCommuneStats = useSelector(state => state.statistiques?.codeCommuneStats);
  const donneesStatistiques = useSelector(state => state.statistiques?.statsData);
  const villeStats = useSelector(state => state.statistiques?.villeStats);
  const codePostal = useSelector(state => state.statistiques?.codePostalStats);
  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);

  const formatNomStatistiques = () => {
    const formatNom = conseiller?.nom?.charAt(0)?.toUpperCase() + conseiller?.nom?.slice(1);
    const formatPrenom = conseiller?.prenom?.charAt(0)?.toUpperCase() + conseiller?.prenom?.slice(1);
    if (formatNom && formatPrenom) {
      return `${formatNom} ${formatPrenom}`;
    }
    return '';
  };

  return (
    <div className="structure fr-container fr-my-10w">
      <div className="fr-grid-row">
        <div className="fr-col-12">
          <h1 className={`titre ${conseiller?.nom?.length > 50 ? 'titre-long' : ''}`} >Statistiques - {formatNomStatistiques()}</h1>
        </div>
        <div className="fr-col-12 fr-col-md-6 fr-col-lg-4 fr-mb-6w print-graphique">
          <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin} />
        </div>
        <div className="fr-col-12 fr-col-md-6 fr-col-lg-3 fr-mb-6w print-graphique">
          {conseiller !== undefined &&
            <ElementCodePostal />
          }
        </div>
        <div className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-4">
          <hr className="fr-hr fr-mt-3v" />
        </div>
      </div>
      {statistiquesLoading &&
        <h2 className="loadingStatsTexte">La page est en cours de chargement, veuillez patienter</h2>
      }
      {(!donneesStatistiques && !statistiquesLoading) &&
        <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
      }
      {donneesStatistiques &&
        <div className="fr-grid-row">
          <LeftPage donneesStats={donneesStatistiques} />
          <RightPage donneesStats={donneesStatistiques} />
          <BottomPage donneesStats={donneesStatistiques} />
          <StatistiquesBanniere
            dateDebut={dateDebut}
            dateFin={dateFin}
            typeStats="conseiller"
            id={idConseiller}
            codePostal={codePostal}
            ville={villeStats}
            codeCommune={codeCommuneStats}
            nom={conseiller.nom}
            prenom={conseiller.prenom}
          />
        </div>
      }
    </div>
  );
}

StatsConseiller.propTypes = {
  conseiller: PropTypes.object,
  idConseiller: PropTypes.string,
  statistiquesLoading: PropTypes.bool,
};

export default StatsConseiller;
