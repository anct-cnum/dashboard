import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import labelsCorrespondance from '../data/labelsCorrespondance.json';
import { setCategoriesStatistiques, setStatistiquesGraphique, setStatistiquesTitre, setStatistiquesDonnees, setStatistiquesLegende,
  setStatistiquesAxeY, setStatistiquesAxeX, setStatistiquesOptionsTrace } from '../utils/functionsGraphique';

function ElementHighcharts({ donneesStats, variablesGraphique, listeAutres }) {

  const isReoriente = variablesGraphique.titre.optionTitre === 'Usager.&egrave;res r&eacute;orient&eacute;.es';
  const { typeGraphique, largeurGraphique, hauteurGraphique,
    margeGaucheGraphique, margeDroiteGraphique, optionResponsive, couleursGraphique } = variablesGraphique.graphique;
  const { optionTitre, margeTitre, placementTitre } = variablesGraphique.titre;

  const categoriesStatistiques = setCategoriesStatistiques(donneesStats, typeGraphique, labelsCorrespondance);
  const chartStatistiques = setStatistiquesGraphique(typeGraphique, largeurGraphique, hauteurGraphique, margeGaucheGraphique, margeDroiteGraphique);
  const titreStatistiques = setStatistiquesTitre(optionTitre, margeTitre, placementTitre);
  const seriesStatistiques = setStatistiquesDonnees(donneesStats, typeGraphique, couleursGraphique, labelsCorrespondance);
  const legendStatistiques = setStatistiquesLegende(typeGraphique, isReoriente, optionResponsive);
  const yAxisStatistiques = setStatistiquesAxeY(typeGraphique);
  const xAxisStatistiques = setStatistiquesAxeX(typeGraphique, optionResponsive, categoriesStatistiques);
  const plotOptionsStatistiques = setStatistiquesOptionsTrace(typeGraphique, optionResponsive, isReoriente);


  const optionsStatistiques = {
    credits: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    chart: chartStatistiques,
    title: titreStatistiques,
    series: seriesStatistiques,
    legend: legendStatistiques,
    yAxis: yAxisStatistiques,
    xAxis: xAxisStatistiques,
    plotOptions: plotOptionsStatistiques,
    exporting: {
      chartOptions: {
        chart: {
          backgroundColor: '#FFFFFF'
        }
      }
    }
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={optionsStatistiques} />
      {listeAutres &&
        <div className="lieux-autres">
          <div className="fr-mt-list">Autres <span>(écrits manuellement)</span></div>
          <ul>
            {listeAutres?.map((autres, idx) => {
              return (<li key={idx}>{autres}</li>);
            })}
          </ul>
        </div>
      }
    </>
  );
}

ElementHighcharts.propTypes = {
  donneesStats: PropTypes.array,
  variablesGraphique: PropTypes.object,
  listeAutres: PropTypes.array,
};

export default ElementHighcharts;
