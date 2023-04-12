import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ElementHighcharts from './ElementHighcharts';
import { getStyle } from '../utils/functionsStyle';
import { getGraphiqueStacked, getGraphiquePie, getGraphiqueColumn } from '../utils/functionsGraphique';
import largeurEcran from '../utils/functionsLargeurEcran';
import labelsCorrespondance from '../../../../../../datas/labelsCorrespondance.json';
import { statistiquesActions } from '../../../../../../actions';
require('dayjs/locale/fr');

function BottomPage({ donneesStats, typeStats }) {

  const dispatch = useDispatch();

  const listeAutres = useSelector(states => states.statistiques?.listeAutresReorientations);

  const tabColorAge = getStyle('age');
  const tabColorStatut = getStyle('statut');
  const tabColorReorientation = getStyle('reorientation');
  const tabColorDuree = getStyle('duree');
  const tabColorLieux = getStyle('lieux');
  const tabColorTemps = getStyle('temps');
  const largeur = largeurEcran();

  const { statsUsagers, statsAges, statsReorientations, statsDurees, statsLieux, statsTempsAccompagnement } = donneesStats;
  //Formatage des stats temps d'accompagnement pour affichage en heures et minutes
  statsTempsAccompagnement.map(stats => {
    if (stats?.valeur > 0) {
      const hours = Math.floor(stats?.minutes / 60);
      const remainingMinutes = stats?.minutes % 60;
      if (remainingMinutes === 0 || typeStats !== 'conseiller' || typeStats !== 'structure') {
        stats.temps = `${hours}h`;
        return stats;
      }
      stats.temps = `${hours}h${remainingMinutes}min`;
      return stats;
    }
    return stats;
  });
  const statsTempsAccompagnementAteliers = statsTempsAccompagnement.filter(stats => stats.nom !== 'total');
  const statsTempsAccompagnementTotal = statsTempsAccompagnement.find(stats => stats.nom === 'total');

  // Formatage nom type d'atelier
  const capitalized = word => word.charAt(0).toUpperCase() + word.slice(1);

  //Tri liste des réorientations autres
  useEffect(() => {
    if (statsReorientations?.length > 0) {
      let listeAutres = [];
      let listDelete = [];
      let donneesAutre = {
        nom: 'Autres&#0;',
        valeur: 0
      };
      statsReorientations.forEach((donnees, i) => {
        if (labelsCorrespondance.find(label => label.nom === donnees.nom)?.correspondance === undefined) {
          donneesAutre.valeur += donnees.valeur;
          listeAutres.push(donnees.nom);
          listDelete.push(i);
        }
      });
  
      if (!statsReorientations.find(stats => stats?.nom === 'Autres&#0;')) {
        statsReorientations.push(donneesAutre);
        listDelete.forEach(i => {
          delete statsReorientations[i];
        });
        dispatch(statistiquesActions.updateListeAutresReorientations(listeAutres));
      }
    }
  }, [statsReorientations]);

  const legendTempAccompagnement = {
    labelFormatter: function() {
      if (this.y > 0) {
        const tempsAccompagnement = statsTempsAccompagnementAteliers.find(stats => stats?.nom === this.name);
        return `${capitalized(this.name)}: ${tempsAccompagnement?.temps}`;
      }
      return `${this.name}: 0h`;
    },
    title: {
      text: `Total : ${statsTempsAccompagnementTotal?.valeur > 0 ? statsTempsAccompagnementTotal?.temps : '0h'}`,
      style: {
        fontFamily: 'Marianne',
        fontWeight: 'bold',
        fontSize: '14px',
        marginLeft: '20px',
      }
    },
  };

  const graphiqueAge = getGraphiqueStacked(tabColorAge, 'Tranches d&rsquo;&acirc;ge des usagers', largeur);
  const graphiqueStatut = getGraphiqueStacked(tabColorStatut, 'Statut des usagers', largeur);
  const graphiqueReorientations = getGraphiquePie(tabColorReorientation, 'Usager.&egrave;res r&eacute;orient&eacute;.es', largeur, true);
  const pieGraphique = getGraphiquePie(tabColorLieux, 'Canaux d\'accompagnements', largeur, false);
  const pieGraphiqueTemps = getGraphiquePie(tabColorTemps, 'Temps d\'accompagnements', largeur, false, legendTempAccompagnement);
  const columnGraphique = getGraphiqueColumn(tabColorDuree, 'Dur&eacute;e des accompagnements');

  return (
    <>
      <div className="fr-col-12 fr-col-md-5">
        <div className="print-blank"></div>
        <div className="fr-mt-md-3w fr-mt-6w fr-mb-5w"><hr/></div>
        <ElementHighcharts donneesStats={statsAges} variablesGraphique={graphiqueAge}/>
      </div>

      <div className="fr-col-12 fr-col-md-5 fr-col-offset-md-1">
        <div className="fr-mt-md-3w fr-mt-6w fr-mb-5w"><hr/></div>
        <ElementHighcharts donneesStats={statsUsagers} variablesGraphique={graphiqueStatut}/>
        <div className="print-blank"></div>
      </div>
      <div className="fr-col-12 fr-col-md-5 fr-col-lg-3 print-graphique">
        <div className="fr-mt-6w fr-mb-5w"><hr/></div>
        <ElementHighcharts donneesStats={statsTempsAccompagnementAteliers} variablesGraphique={pieGraphiqueTemps}/>
      </div>
      <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-5 fr-col-lg-3 print-graphique">
        <div className="fr-mt-6w fr-mb-5w"><hr/></div>
        <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphique}/>
      </div>

      <div className="fr-col-12 fr-col-md-5 fr-col-lg-3 fr-col-offset-lg-1 print-graphique">
        <div className="fr-mt-6w fr-mb-5w"><hr/></div>
        <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphique}/>
        <div className="print-blank"></div>
      </div>
      <div className="fr-col-lg-11 hide-graphique-lg">
        <div className="fr-mt-6w"><hr/></div>
      </div>
      {statsReorientations?.length > 0 &&
      <div className="fr-col-12 col-offset-md-1 fr-col-md-5 fr-col-lg-11 fr-mt-6w" >
        <div className="print-blank-firefox print-blank-other"></div>
        <div className="fr-mb-5w hide-graphique-xs"><hr className="fr-hr"/></div>
        <ElementHighcharts donneesStats={statsReorientations} variablesGraphique={graphiqueReorientations} listeAutres={listeAutres}/>
      </div>
      }
      {statsReorientations?.length === 0 &&
        <div className="fr-m-no-reorientation"></div>
      }
    </>
  );
}

BottomPage.propTypes = {
  donneesStats: PropTypes.object,
  typeStats: PropTypes.string,
};
export default BottomPage;
