import React from 'react';
import PropTypes from 'prop-types';
import ElementHighcharts from './ElementHighcharts';
import { getStyle } from '../utils/functionsStyle';
import largeurEcran from '../utils/functionsLargeurEcran';
import { getGraphiqueBar, getGraphiqueEvolution } from '../utils/functionsGraphique';
import dayjs from 'dayjs';
import { get4lastMonths, sortByMonthAndYear } from '../utils/functionsSort';

function RightPage({ donneesStats }) {

  const tabColorTheme = getStyle('theme');
  const tabColorAge = getStyle('age');
  const largeur = largeurEcran();

  const { statsThemes, statsEvolutions } = donneesStats;

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
    return monthToPrint[0].includes(mois.mois) &&
      monthToPrint[1][monthToPrint[0].findIndex(mois2 => mois.mois === mois2)].toString() === mois.annee ? mois : '';
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

  const graphiqueEvolution = getGraphiqueEvolution(tabColorAge, '&Eacute;volution des comptes rendus d&rsquo;activit&eacute;', largeur);

  const barGraphique = getGraphiqueBar(tabColorTheme, 'Th&egrave;mes des accompagnements', largeur);

  return (
    <>
      <div className="fr-col-12 fr-col-md-9">
        <div className="fr-container fr-ml-md-19v">
          <div className="fr-grid-row">
            <div className="fr-col-12 fr-col-md-10">
              <div className="fr-mb-5w hr-md-hide"><hr/></div>
              <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphique}/>
            </div>
            <div className="fr-col-12 fr-col-md-10 hide-graphique-lg">
              <div className="fr-mr-md-1w fr-mb-6w fr-mt-17v"><hr/></div>
            </div>
            <div className="fr-col-12 fr-col-md-10">
              <div className="fr-mb-5w hr-md-hide"><hr/></div>
              <ElementHighcharts donneesStats={statsEvolutionsFiltered} variablesGraphique={graphiqueEvolution}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

RightPage.propTypes = {
  donneesStats: PropTypes.object
};

export default RightPage;
