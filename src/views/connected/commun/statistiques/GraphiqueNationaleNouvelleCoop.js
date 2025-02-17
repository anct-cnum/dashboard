import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatistiquesGenerales from './Components/nouvelleCoop/StatistiquesGenerales';
import StatistiquesActivites from './Components/nouvelleCoop/StatistiquesActivites';
import StatistiquesBeneficiaires from './Components/nouvelleCoop/StatistiquesBeneficiaires';
import IconInSquare from './Components/nouvelleCoop/components/IconInSquare';
import '../../../../assets/sass/nouvelleCoop.scss';
import { alerteEtSpinnerActions, statistiquesActions } from '../../../../actions';

export default function GraphiqueNationaleNouvelleCoop() {
  const dispatch = useDispatch();
  const dateDebut = useSelector(state => state.datePicker?.dateDebutCoop);
  const dateFin = useSelector(state => state.datePicker?.dateFin);
  const error = useSelector(state => state.statistiques?.error);
  const donneesStatistiques = useSelector(state => state.statistiques.statsData);

  useEffect(() => {
    if (!error) {
      dispatch(statistiquesActions.getStatistiquesNationaleNouvelleCoop(dateDebut, dateFin));
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [dateDebut, dateFin, error]);

  return (
    <div
      className="fr-container fr-my-10w fr-border-radius--8 fr-border fr-pt-8v fr-px-8v fr-pb-10v fr-mb-6v">
      <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-my-6v">
        <IconInSquare iconId="fr-icon-line-chart-line" size="medium" />
        <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france">Statistiques</h1>
      </div>
      {donneesStatistiques?.data &&
        <div className="contentContainer contentContainer--794">
          <section className="fr-mb-6w">
            <StatistiquesGenerales
              totalCounts={donneesStatistiques.data.attributes.totaux}
              accompagnementsParMois={donneesStatistiques.data.attributes.accompagnements_par_mois}
              accompagnementsParJour={donneesStatistiques.data.attributes.accompagnements_par_jour}
              wording="nationales"
            />
          </section>
          <section className="fr-mb-6w">
            <StatistiquesActivites
              totalCounts={donneesStatistiques.data.attributes.totaux}
              activites={donneesStatistiques.data.attributes.activites}
              wording="nationales"
            />
          </section>
          <section className="fr-mb-6w">
            <StatistiquesBeneficiaires
              beneficiaires={donneesStatistiques.data.attributes.beneficiaires}
              wording="nationales"
            />
          </section>
        </div>}
    </ div>
  );
}
