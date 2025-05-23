import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import BlockDatePickers from '../datePicker/BlockDatePickers';
import ElementCodePostal from '../../views/connected/commun/statistiques/Components/graphiques/ElementCodePostal';
import StatistiquesBanniere from '../../views/connected/commun/statistiques/Components/graphiques/StatistiquesBanniere';
import BottomPage from '../../views/connected/commun/statistiques/Components/graphiques/BottomPage';
import RightPage from '../../views/connected/commun/statistiques/Components/graphiques/RightPage';
import LeftPage from '../../views/connected/commun/statistiques/Components/graphiques/LeftPage';
import { useDispatch, useSelector } from 'react-redux';
import SelectOptions from '../SelectOptions';
import { statistiquesActions } from '../../actions';
import { datePickerActions } from '../../actions/datePickerActions';

function StatsConseiller({ conseiller, idConseiller, statistiquesLoading }) {
  const dispatch = useDispatch();
  const codeCommuneStats = useSelector(state => state.statistiques?.codeCommuneStats);
  const donneesStatistiques = useSelector(state => state.statistiques?.statsData);
  const villeStats = useSelector(state => state.statistiques?.villeStats);
  const codePostal = useSelector(state => state.statistiques?.codePostalStats);
  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);
  const dateFinMax = useSelector(state => state.datePicker?.dateFinMax);
  const listeStructures = useSelector(state => state.statistiques?.listeStructures);
  const idStructure = useSelector(state => state.statistiques?.structureStats);

  const formatNomStatistiques = () => {
    const formatNom = conseiller?.nom?.charAt(0)?.toUpperCase() + conseiller?.nom?.slice(1);
    const formatPrenom = conseiller?.prenom?.charAt(0)?.toUpperCase() + conseiller?.prenom?.slice(1);
    if (formatNom && formatPrenom) {
      return `${formatNom} ${formatPrenom}`;
    }
    return '';
  };

  const selectFiltreStructure = e => {
    dispatch(statistiquesActions.changeStructureStats(e.target?.value));
  };

  useEffect(() => {
    dispatch(datePickerActions.changeDateFin(dateFinMax));
  }, []);

  return (
    <div className="structure fr-container fr-my-10w">
      <div className="fr-grid-row">
        <div className="fr-col-12">
          <h1 className={`titre ${conseiller?.nom?.length > 50 ? 'titre-long' : ''}`} >Statistiques - {formatNomStatistiques()}</h1>
        </div>
        <div className="fr-col-12 fr-col-md-6 fr-col-lg-4 fr-mb-6w print-graphique">
          <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin} dateFinMax={dateFinMax} />
        </div>
        <div className="fr-col-12 fr-col-md-6 fr-col-lg-3 fr-mb-6w print-graphique">
          {conseiller !== undefined &&
            <ElementCodePostal />
          }
        </div>
        <div className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-4">
          {listeStructures?.length > 1 ?
            <select className="fr-select filtre-structure" onChange={selectFiltreStructure}>
              <SelectOptions
                options={listeStructures}
                valueName="structureId"
                labelName="nom"
                subLabelName="codePostal"
                title="Toutes les structures"
                defaultValue={'tous'}
              />
            </select> : <hr className="fr-hr fr-mt-3v" />
          }
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
            structureId={idStructure}
            nom={conseiller?.nom}
            prenom={conseiller?.prenom}
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
