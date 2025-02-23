import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { alerteEtSpinnerActions, statistiquesActions } from '../../../../actions';
import { filtresCoopActions } from '../../../../actions/filtresCoopActions';
import dataDefaultCoop from '../.././../../datas/data-default-coop.json';
import Spinner from '../../../../components/Spinner';
import '../../../../assets/sass/nouvelleCoop.scss';
import StatistiquesGenerales from './Components/nouvelleCoop/StatistiquesGenerales';
import StatistiquesActivites from './Components/nouvelleCoop/StatistiquesActivites';
import StatistiquesBeneficiaires from './Components/nouvelleCoop/StatistiquesBeneficiaires';
import IconInSquare from './Components/nouvelleCoop/components/IconInSquare';
import ActivitesFilterTags from './Components/nouvelleCoop/ActivitesFilterTags';

export default function GraphiqueNationaleNouvelleCoop() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = {};
  const donneesStatistiquesOne = useSelector(state => state.statistiques.statsCoop);
  const error = useSelector(state => state.statistiques?.error);
  const loading = useSelector(state => state.statistiques?.loading);
  const dateDebut = useSelector(state => state.filtresCoop?.dateDebutCoop);
  const minDateCoop = useSelector(state => state.filtresCoop.minDateCoop);
  const maxDateCoop = useSelector(state => state.filtresCoop.maxDateCoop);
  const dateFin = useSelector(state => state.filtresCoop?.dateFin);
  const mediateur = useSelector(state => state.filtresCoop?.mediateur);
  const lieu = useSelector(state => state.filtresCoop?.lieu);
  const type = useSelector(state => state.filtresCoop?.type);
  const donneesStatistiques = donneesStatistiquesOne?.data ? donneesStatistiquesOne : dataDefaultCoop;

  const newSearchParams = new URLSearchParams(location.search.toString());
  const changeQuery = {
    du: 'changeDateDebut',
    au: 'changeDateFin',
    type: 'changeType',
    mediateurId: 'changeMediateur',
    lieu: 'changeLocalisation',
    commune: 'changeLocalisation',
    departement: 'changeLocalisation',
  };
  for (const key of newSearchParams.keys()) {
    const value = newSearchParams.get(key);
    const checkValidity = ['du', 'au'].includes(key) ? dayjs(value).isValid() : true;
    if (checkValidity) {
      searchParams[key] = value;
      dispatch(filtresCoopActions[changeQuery[key]](value));
    }
  }

  useEffect(() => {
    if (!error) {
      dispatch(statistiquesActions.getStatistiquesNationaleNouvelleCoop(dateDebut, dateFin, lieu, type, mediateur));
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [dateDebut, dateFin, lieu, type, mediateur, error]);

  const initialMediateursOptions = donneesStatistiques.initialMediateursOptions;
  const communesOptions = donneesStatistiques.communesOptions;
  const departementsOptions = donneesStatistiques.departementsOptions;
  const lieuxActiviteOptions = donneesStatistiques.lieuxActiviteOptions;

  return (
    <div className="fr-container">
      <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-my-6v">
        <IconInSquare iconId="fr-icon-line-chart-line" size="medium" />
        <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france">Statistiques</h1>
      </div>
      <Spinner loading={loading} />
      <ActivitesFilterTags
        className="fr-mt-0-5v"
        defaultFilters={{ du: dateDebut, au: dateFin, ...searchParams }}
        minDate={minDateCoop}
        maxDate={maxDateCoop}
        initialMediateursOptions={initialMediateursOptions}
        communesOptions={communesOptions}
        departementsOptions={departementsOptions}
        lieuxActiviteOptions={lieuxActiviteOptions}
        isCoordinateur={false}
        isMediateur
      />
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
      </div>
    </ div>
  );
}
