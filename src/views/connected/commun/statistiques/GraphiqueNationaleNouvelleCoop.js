import React from 'react';
import StatistiquesGenerales from './Components/nouvelleCoop/StatistiquesGenerales';
import StatistiquesActivites from './Components/nouvelleCoop/StatistiquesActivites';
import StatistiquesBeneficiaires from './Components/nouvelleCoop/StatistiquesBeneficiaires';
import IconInSquare from './Components/nouvelleCoop/components/IconInSquare';
import '../../../../assets/sass/nouvelleCoop.scss';

export default function GraphiqueNationaleNouvelleCoop() {
  const result = {
    'data': {
      'type': 'statistiques',
      'id': 'statistiques',
      'attributes': {
        'accompagnements_par_jour':
          [
            {
              'label': '09/01',
              'count': 0
            },
            {
              'label': '10/01',
              'count': 0
            },
            {
              'label': '11/01',
              'count': 0
            },
            {
              'label': '12/01',
              'count': 0
            },
            {
              'label': '13/01',
              'count': 0
            },
            {
              'label': '14/01',
              'count': 0
            },
            {
              'label': '15/01',
              'count': 0
            },
            {
              'label': '16/01',
              'count': 0
            },
            {
              'label': '17/01',
              'count': 0
            },
            {
              'label': '18/01',
              'count': 0
            },
            {
              'label': '19/01',
              'count': 0
            },
            {
              'label': '20/01',
              'count': 0
            },
            {
              'label': '21/01',
              'count': 0
            },
            {
              'label': '22/01',
              'count': 0
            },
            {
              'label': '23/01',
              'count': 0
            },
            {
              'label': '24/01',
              'count': 0
            },
            {
              'label': '25/01',
              'count': 0
            },
            {
              'label': '26/01',
              'count': 0
            },
            {
              'label': '27/01',
              'count': 0
            },
            {
              'label': '28/01',
              'count': 0
            },
            {
              'label': '29/01',
              'count': 0
            },
            {
              'label': '30/01',
              'count': 0
            },
            {
              'label': '31/01',
              'count': 0
            },
            {
              'label': '01/02',
              'count': 0
            },
            {
              'label': '02/02',
              'count': 0
            },
            {
              'label': '03/02',
              'count': 0
            },
            {
              'label': '04/02',
              'count': 0
            },
            {
              'label': '05/02',
              'count': 0
            },
            {
              'label': '06/02',
              'count': 0
            },
            {
              'label': '07/02',
              'count': 6
            }
          ],
        'accompagnements_par_mois': [
          { count: 2, label: 'Oct.' },
          { count: 6, label: 'Nov.' },
          { count: 8, label: 'Déc.' },
          { count: 6, label: 'Jan.' },
          { count: 12, label: 'Fév.' },
          { count: 12, label: 'Mars' },
          { count: 14, label: 'Avr.' },
          { count: 9, label: 'Mai' },
          { count: 10, label: 'Juin' },
          { count: 4, label: 'Juil.' },
          { count: 2, label: 'Août' },
          { count: 7, label: 'Sep.' },
        ],
        'beneficiaires': {
          total: 28,
          genres: [
            {
              value: 'Masculin',
              label: 'Masculin',
              count: 3,
              proportion: 10.714
            },
            { value: 'Feminin', label: 'Féminin', count: 1, proportion: 3.571 },
            {
              value: 'NonCommunique',
              label: 'Non communiqué',
              count: 24,
              proportion: 85.714
            }
          ],
          trancheAges: [
            {
              value: 'SoixanteDixPlus',
              label: '70 ans et plus',
              count: 0,
              proportion: 0
            },
            {
              value: 'SoixanteSoixanteNeuf',
              label: '60 - 69 ans',
              count: 0,
              proportion: 0
            },
            {
              value: 'QuaranteCinquanteNeuf',
              label: '40 - 59 ans',
              count: 13,
              proportion: 46.429
            },
            {
              value: 'VingtCinqTrenteNeuf',
              label: '25 - 39 ans',
              count: 6,
              proportion: 21.429
            },
            {
              value: 'DixHuitVingtQuatre',
              label: '18 - 24 ans',
              count: 1,
              proportion: 3.571
            },
            {
              value: 'DouzeDixHuit',
              label: '12 - 17 ans',
              count: 0,
              proportion: 0
            },
            {
              value: 'MoinsDeDouze',
              label: 'Moins de 12 ans',
              count: 0,
              proportion: 0
            },
            {
              value: 'NonCommunique',
              label: 'Non communiqué',
              count: 8,
              proportion: 28.571
            }
          ],
          statutsSocial: [
            { value: 'Retraite', label: 'Retraité', count: 0, proportion: 0 },
            {
              value: 'SansEmploi',
              label: 'Sans emploi',
              count: 0,
              proportion: 0
            },
            {
              value: 'EnEmploi',
              label: 'En emploi',
              count: 19,
              proportion: 67.857
            },
            {
              value: 'Scolarise',
              label: 'Scolarisé',
              count: 4,
              proportion: 14.286
            },
            {
              value: 'NonCommunique',
              label: 'Non communiqué ou hétérogène',
              count: 5,
              proportion: 17.857
            }
          ]
        },
        'activites': {
          'total': 174140,
          'type_activites': [
            {
              'value': 'Individuel',
              'label': 'Accompagnement individuel',
              'count': 9,
              'proportion': 39.13
            },
            {
              'value': 'Demarche',
              'label': 'Aide aux démarches administratives',
              'count': 9,
              'proportion': 39.13
            },
            {
              'value': 'Collectif',
              'label': 'Atelier collectif',
              'count': 5,
              'proportion': 21.739
            }
          ],
          'durees': [
            {
              'value': 'Masculin',
              'label': 'Masculin',
              'count': 76493,
              'proportion': 26.576
            }
          ],
          'type_lieu': [
            {
              'value': 'Masculin',
              'label': 'Masculin',
              'count': 76493,
              'proportion': 26.576
            }
          ],
          'thematiques': [
            {
              'value': 'Masculin',
              'label': 'Masculin',
              'count': 76493,
              'proportion': 26.576
            }
          ],
          'thematiques_demarches': [
            {
              'value': 'Masculin',
              'label': 'Masculin',
              'count': 76493,
              'proportion': 26.576
            }
          ],
          'materiels': [
            {
              'value': 'Ordinateur',
              'label': 'Ordinateur',
              'count': 7,
              'proportion': 30.435
            },
            {
              'value': 'Telephone',
              'label': 'Téléphone',
              'count': 4,
              'proportion': 17.391
            },
            {
              'value': 'Tablette',
              'label': 'Tablette',
              'count': 6,
              'proportion': 26.087
            },
            {
              'value': 'Autre',
              'label': 'Autre',
              'count': 6,
              'proportion': 26.087
            },
            {
              'value': 'Aucun',
              'label': 'Pas de matériel',
              'count': 0,
              'proportion': 0
            }
          ]
        },
        'totaux': {
          'activites': {
            'total': 174140,
            'individuels': {
              'total': 95189,
              'proportion': 54.662
            },
            'collectifs': {
              'total': 27404,
              'proportion': 15.737,
              'participants': 178210
            },
            'demarches': {
              'total': 51547,
              'proportion': 29.601
            }
          },
          'accompagnements': {
            'total': 324949,
            'individuels': {
              'total': 95189,
              'proportion': 29.294
            },
            'collectifs': {
              'total': 178210,
              'proportion': 54.843
            },
            'demarches': {
              'total': 51547,
              'proportion': 15.863
            }
          },
          'beneficiaires': {
            'total': 287830,
            'nouveaux': 0,
            'suivis': 23405,
            'anonymes': 264425
          }
        }
      }
    },
    'links': {
      'self': {
        'href': 'http://localhost:3000/api/v1/statistiques'
      }
    },
    'meta': {}
  };

  const totalCounts = result.data.attributes.totaux;
  const accompagnementsParMois = result.data.attributes.accompagnements_par_mois;
  const accompagnementsParJour = result.data.attributes.accompagnements_par_jour;
  const activites = result.data.attributes.activites;
  const beneficiaires = result.data.attributes.beneficiaires;

  return (
    <div
      className="fr-container fr-my-10w fr-border-radius--8 fr-border  fr-pt-8v fr-px-8v fr-pb-10v fr-mb-6v">
      <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-my-6v">
        <IconInSquare iconId="fr-icon-line-chart-line" size="medium" />
        <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france">Statistiques</h1>
      </div>
      <div className="contentContainer contentContainer--794">
        <section className="fr-mb-6w">
          <StatistiquesGenerales
            totalCounts={totalCounts}
            accompagnementsParMois={accompagnementsParMois}
            accompagnementsParJour={accompagnementsParJour}
            wording="nationales"
          />
        </section>
        <section className="fr-mb-6w">
          <StatistiquesActivites wording="nationales" totalCounts={totalCounts} activites={activites} />
        </section>
        <section className="fr-mb-6w">
          <StatistiquesBeneficiaires
            beneficiaires={beneficiaires}
            wording="nationales"
          />
        </section>
      </div>
    </ div>
  );
}
