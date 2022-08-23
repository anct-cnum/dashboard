import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import ElementHighcharts from './ElementHighcharts';
import { sortByMonthAndYear } from './utils/functionsSort';
import { getStyle } from './utils/functionsStyle';
import labelsCorrespondance from './data/labelsCorrespondance.json';
import { statistiquesActions } from '../../../../actions';
require('dayjs/locale/fr');

function BottomPage({ donneesStats }) {

  const dispatch = useDispatch();

  const tabColorAge = getStyle('age');
  const tabColorStatut = getStyle('statut');
  const tabColorReorientation = getStyle('reorientation');

  const get4lastMonths = (month, year) => {
    let monthToPrint = [month];
    let yearAssociated = [year];
    let lastInsertedMonth = month;
    let lastInsertedYear = year;
    for (let i = 0; i < 3; i++) {
      lastInsertedYear = lastInsertedMonth - 1 === -1 ? lastInsertedYear - 1 : lastInsertedYear;
      lastInsertedMonth = lastInsertedMonth - 1 === -1 ? 11 : lastInsertedMonth - 1; //11 = décembre dans Date
      monthToPrint.push(lastInsertedMonth);
      yearAssociated.push(lastInsertedYear.toString());
    }
    return [monthToPrint, yearAssociated];
  };

  const { statsEvolutions, statsUsagers, statsAges, statsReorientations } = donneesStats;

  //Map des stats evolutions pour ajouter les données nécessaires pour le graph (label mois année, valeur)
  let statsEvolutionsMapped = [];
  for (const [annee, moisListe] of Object.entries(statsEvolutions)) {
    let statsEvolutionsMapped2 = moisListe.map(mois => {
      mois.nom = dayjs().locale('fr').month(`${mois.mois}`).format('MMMM');
      mois.nom = mois.nom?.concat(' ', annee);
      mois.annee = annee;
      mois.valeur = mois.totalCras;
      return mois;
    });
    statsEvolutionsMapped.push(...statsEvolutionsMapped2);
  }

  //Filtrage pour ne garder que le mois en cours et les 3 précédents max
  let monthToPrint = get4lastMonths(new Date().getMonth(), new Date().getUTCFullYear());
  let statsEvolutionsFiltered = Object.values(statsEvolutionsMapped).filter(mois => {
    // eslint-disable-next-line max-len
    return monthToPrint[0].includes(mois.mois) && monthToPrint[1][monthToPrint[0].findIndex(mois2 => mois.mois === mois2)].toString() === mois.annee ? mois : '';
  });

  //Ajout des mois manquants (donc avec totalCras à 0)
  monthToPrint[0].forEach((value, index) => {
    if (statsEvolutionsFiltered.some(mois => mois.mois === value) === false) {
      let annee = monthToPrint[1][index];
      let nom = dayjs().locale('fr').month(`${value}`).format('MMMM');
      nom = nom?.concat(' ', annee);
      statsEvolutionsFiltered.push({ 'mois': value, 'valeur': 0, 'annee': annee.toString(), 'nom': nom });
    }
  });

  //Tri par mois/annee croissant
  statsEvolutionsFiltered.sort(sortByMonthAndYear);

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

  const graphiqueEvolution = {
    graphique: {
      typeGraphique: 'xy',
      largeurGraphique: 320,
      hauteurGraphique: 310,
      margeGaucheGraphique: 40,
      margeDroiteGraphique: 70,
      optionResponsive: false,
      couleursGraphique: tabColorAge
    },
    titre: {
      optionTitre: '&Eacute;volution des comptes rendus d&rsquo;activit&eacute;',
      margeTitre: 48,
    }
  };

  const graphiqueAge = {
    graphique: {
      typeGraphique: 'stacked',
      largeurGraphique: 300,
      hauteurGraphique: 300,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 0,
      optionResponsive: false,
      couleursGraphique: tabColorAge
    },
    titre: {
      optionTitre: 'Tranches d&rsquo;&acirc;ge des usagers',
      margeTitre: 34,
    }
  };

  const graphiqueStatut = {
    graphique: {
      typeGraphique: 'stacked',
      largeurGraphique: 300,
      hauteurGraphique: 300,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 0,
      optionResponsive: false,
      couleursGraphique: tabColorStatut
    },
    titre: {
      optionTitre: 'Statut des usagers',
      margeTitre: 34,
    }
  };

  const graphiqueReorientations = {
    graphique: {
      typeGraphique: 'pie',
      hauteurGraphique: 555,
      margeGaucheGraphique: -419,
      optionResponsive: false,
      couleursGraphique: tabColorReorientation
    },
    titre: {
      optionTitre: 'Usager.&egrave;res r&eacute;orient&eacute;.es',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  return (
    <>
      <div className="fr-col-12 fr-col-md-3">
        <div className="fr-mt-6w fr-mb-5w"><hr/></div>
        <ElementHighcharts donneesStats={statsEvolutionsFiltered} variablesGraphique={graphiqueEvolution}/>
      </div>

      <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-3">
        <div className="fr-mt-6w fr-mb-5w"><hr/></div>
        <ElementHighcharts donneesStats={statsAges} variablesGraphique={graphiqueAge}/>
      </div>

      <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-3">
        <div className="fr-mt-6w fr-mb-5w"><hr/></div>
        <ElementHighcharts donneesStats={statsUsagers} variablesGraphique={graphiqueStatut}/>
      </div>
      <div className="fr-col-12 fr-col-offset-md-4 fr-col-md-8 fr-mt-6w" >
        {statsReorientations?.length > 0 &&
          <ElementHighcharts donneesStats={statsReorientations} variablesGraphique={graphiqueReorientations} listeAutres={[]}/>
        }
        <div className="fr-m-no-reorientation"></div>
      </div>
    </>
  );
}

BottomPage.propTypes = {
  donneesStats: PropTypes.object,
  type: PropTypes.string,
};
export default BottomPage;
