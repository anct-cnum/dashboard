import React from 'react';
import PropTypes from 'prop-types';
import ElementHighcharts from './ElementHighcharts';
import { getStyle } from '../utils/functionsStyle';
import largeurEcran from '../utils/functionsLargeurEcran';
import { getGraphiqueBar, getGraphiquePie, getGraphiqueColumn } from '../utils/functionsGraphique';

function RightPage({ donneesStats }) {

  const tabColorTheme = getStyle('theme');
  const tabColorDuree = getStyle('duree');
  const tabColorLieux = getStyle('lieux');
  const largeur = largeurEcran();

  const { statsThemes, statsDurees, statsLieux } = donneesStats;

  const barGraphique = getGraphiqueBar(tabColorTheme, 'Th&egrave;mes des accompagnements', largeur);

  const pieGraphique = getGraphiquePie(tabColorLieux, 'Canaux d\'accompagnements', largeur, false);

  const columnGraphique = getGraphiqueColumn(tabColorDuree, 'Dur&eacute;e des accompagnements');

  return (
    <>
      <div className="fr-col-12 fr-col-md-9">
        <div className="fr-container fr-ml-md-19v">
          <div className="fr-grid-row ">
            <div className="fr-col-12 fr-col-md-10">
              <div className="fr-mb-5w hr-md-hide"><hr/></div>
              <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphique}/>
            </div>
            <div className="fr-col-12 fr-col-md-10 hide-graphique-lg">
              <div className="fr-my-6w fr-mr-md-1w"><hr/></div>
            </div>
            <div className="fr-col-12 fr-col-md-5 hide-graphique-lg">
              <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphique}/>
            </div>
            <div className="fr-col-12 fr-col-md-5 hide-graphique-lg">
              <div className="fr-ml-md-11v">
                <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphique}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-col-12 fr-col-md-11 hide-graphique-xs">
        <div className="fr-mb-6w fr-mr-md-1w"><hr/></div>
      </div>
      <div className="fr-col-12 fr-col-md-5 hide-graphique-xs print-graphique">
        <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphique}/>
      </div>
      <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-5 hide-graphique-xs print-graphique">
        <div className="fr-mt-6w fr-mb-5w hr-md-hide"><hr/></div>
        <div className="duree">
          <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphique}/>
        </div>
      </div>
    </>
  );
}

RightPage.propTypes = {
  donneesStats: PropTypes.object
};

export default RightPage;
