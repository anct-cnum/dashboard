import React from 'react';
import PropTypes from 'prop-types';
import ElementHighcharts from './ElementHighcharts';
import { getStyle } from './utils/functionsStyle';

function RightPage({ donneesStats }) {

  const tabColorTheme = getStyle('theme');
  const tabColorDuree = getStyle('duree');
  const tabColorLieux = getStyle('lieux');

  const { statsThemes, statsDurees, statsLieux } = donneesStats;

  const barGraphique = {
    graphique: {
      typeGraphique: 'bar',
      largeurGraphique: null,
      hauteurGraphique: 500,
      margeGaucheGraphique: 236,
      margeDroiteGraphique: 125,
      optionResponsive: false,
      couleursGraphique: tabColorTheme
    },
    titre: {
      optionTitre: 'Th&egrave;mes des accompagnements',
      margeTitre: 38,
      placementTitre: 0
    }
  };

  const pieGraphique = {
    graphique: {
      typeGraphique: 'pie',
      largeurGraphique: 300,
      hauteurGraphique: 320,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 10,
      optionResponsive: false,
      couleursGraphique: tabColorLieux
    },
    titre: {
      optionTitre: 'Lieux des accompagnements',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  const columnGraphique = {
    graphique: {
      typeGraphique: 'column',
      largeurGraphique: 360,
      hauteurGraphique: 310,
      margeGaucheGraphique: 55,
      margeDroiteGraphique: 55,
      optionResponsive: false,
      couleursGraphique: tabColorDuree
    },
    titre: {
      optionTitre: 'Dur&eacute;e des accompagnements',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  return (
    <>
      <div className="fr-col-12 fr-col-md-9">
        <div className="fr-container fr-ml-md-19v">
          <div className="fr-grid-row ">
            <div className="fr-col-12 fr-col-md-10">
              <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphique}/>
            </div>
            <div className="fr-col-12 fr-col-md-10">
              <div className="fr-my-6w fr-mr-md-1w"><hr/></div>
            </div>
            <div className="fr-col-12 fr-col-md-5">
              <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphique}/>
            </div>
            <div className="fr-col-12 fr-col-md-5">
              <div className="fr-ml-md-11v">
                <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphique}/>
              </div>
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
