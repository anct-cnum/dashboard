import React from 'react';
import PropTypes from 'prop-types';
import ElementHighcharts from './ElementHighcharts';

function RightPage({ donneesStats }) {

  const tabColorTheme = ['#cac5b0', '#abb8df', '#fdcf41', '#169b62', '#80d5c6', '#ff8d7e', '#714753', '#956052', '#ddb094', '#5770be', '#ffed33', '#be9b31'];
  const tabColorDuree = ['#abcdf5', '#abcdf5', '#abcdf5', '#abcdf5'];

  const { statsThemes, statsDurees } = donneesStats;

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
      <div className="fr-col-12 fr-col-md-5 fr-col-lg-7">
        <div className="fr-container-fluid">
          <div className="fr-grid-row ">
            <div className="fr-col-12">
              <ElementHighcharts donneesStats={statsThemes} variablesGraphique={barGraphique}/>
            </div>

            <div className="fr-col-12">
              <div className="fr-mb-6w" style={{ marginTop: '3.8rem' }}><hr/></div>
            </div>

            <div className="fr-col-12">
              <div className="fr-ml-md-6w">
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
