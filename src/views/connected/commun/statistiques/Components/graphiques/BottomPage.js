import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ElementHighcharts from './ElementHighcharts';
import { getStyle } from '../utils/functionsStyle';
import { getGraphiqueStacked, getGraphiquePie, getGraphiqueColumn } from '../utils/functionsGraphique';
import largeurEcran from '../utils/functionsLargeurEcran';
import labelsCorrespondance from '../../../../../../datas/labelsCorrespondance.json';
import { statistiquesActions } from '../../../../../../actions';
import ReactTooltip from 'react-tooltip';

require('dayjs/locale/fr');

function BottomPage({ donneesStats }) {

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
  const statsTempsAccompagnementAteliers = statsTempsAccompagnement.filter(stats => stats.nom !== 'total');
  const statsTempsAccompagnementTotal = statsTempsAccompagnement.find(stats => stats.nom === 'total');

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

  const formatNameCraActiviter = activiter => {
    switch (activiter) {
      case 'collectif':
        return 'Collectifs&nbsp;&nbsp;';
      case 'individuel':
        return 'Individuels';
      case 'ponctuel':
        return 'Ponctuels&nbsp;&nbsp;';
      default:
        return activiter;
    }
  };

  const formatSpaceBetweenValeurActiviter = valeur => {
    if (valeur < 10) {
      return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    }
    if (valeur < 100 && valeur > 10) {
      return '&nbsp;&nbsp;&nbsp;&nbsp;';
    }
    return '&nbsp;&nbsp;&nbsp;';
  };

  const legendTempAccompagnement = {
    labelFormatter: function() {
      const activiter = formatNameCraActiviter(this.name);
      const tempsAccompagnement = statsTempsAccompagnementAteliers.find(stats => stats?.nom === this.name);
      const spaceValeur = formatSpaceBetweenValeurActiviter(parseInt(tempsAccompagnement?.valeur));
      return activiter + spaceValeur + tempsAccompagnement?.valeur + '%&nbsp;&nbsp;&nbsp;<b>' + tempsAccompagnement?.temps + '</b>';
    },
    title: {
      text: '<span>&nbsp;Au total <b>' + statsTempsAccompagnementTotal?.temps + ' </b><br/> dont : <br/></span>',
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
        <div data-tip={`
          <span>Comment calculons nous la donn&eacute;e&nbsp;?</span>
          <ul>
            <li>30min ou moins = 30min</li>
            <li>30min &agrave; 1h = 1h</li>
            <li>Au del&agrave; d&rsquo;1h nous prenons le temps exact renseign&eacute;</li>
          </ul>
          `}>
          <ElementHighcharts donneesStats={statsTempsAccompagnementAteliers} variablesGraphique={pieGraphiqueTemps}/>
        </div>
        <ReactTooltip html={true} className="infobulle tooltip-temps"/>
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
};
export default BottomPage;
