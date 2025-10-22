import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { alerteEtSpinnerActions, statistiquesActions } from '../../../../actions';
import { filtresCoopActions } from '../../../../actions/filtresCoopActions';
import dataDefaultCoop from '../.././../../datas/data-default-coop.json';
import Spinner from '../../../../components/Spinner';
import '../../../../assets/sass/nouvelleCoop.scss';
import StatistiquesGenerales from './Components/nouvelleCoop/StatistiquesGenerales';
import StatistiquesActivites from './Components/nouvelleCoop/StatistiquesActivites';
import StatistiquesBeneficiaires from './Components/nouvelleCoop/StatistiquesBeneficiaires';
import IconInSquare from './Components/nouvelleCoop/components/IconInSquare';
import Filters from './Components/nouvelleCoop/Filters';
import FilterTags from './Components/nouvelleCoop/Filters/FilterTags';
import { validateActivitesFilters } from './Components/utils/functionsSearchParams';
import departementsRegions from '../../../../datas/departements-region.json';

export default function GraphiqueNationaleNouvelleCoop() {
  const dispatch = useDispatch();
  const location = useLocation();
  const donneesStatistiquesOne = useSelector(state => state.statistiques.statsCoop);
  const error = useSelector(state => state.statistiques?.error);
  const loading = useSelector(state => state.statistiques?.loading);
  const filtreDateDebut = useSelector(state => state.filtresCoop?.dateDebutCoop);
  const minDateCoop = useSelector(state => state.filtresCoop.minDateCoop);
  const maxDateCoop = useSelector(state => state.filtresCoop.maxDateCoop);
  const filtreDateFin = useSelector(state => state.filtresCoop?.dateFin);
  const filtreMediateurs = useSelector(state => state.filtresCoop?.mediateurs);
  const filtreTypes = useSelector(state => state.filtresCoop?.types);
  const filterDepartements = useSelector(state => state.filtresCoop?.departements);
  const conseillersOptions = useSelector(state => state.filtresCoop?.conseillersOptions);
  const [dateDebut, setDateDebut] = useState(filtreDateDebut);
  const [dateFin, setDateFin] = useState(filtreDateFin);
  const [mediateurs, setMediateurs] = useState([]);
  const [types, setTypes] = useState([]);
  const [departements, setDepartements] = useState([]);

  const donneesStatistiques = donneesStatistiquesOne?.data ? donneesStatistiquesOne : dataDefaultCoop;
  const initialMediateursOptions = donneesStatistiques.initialMediateursOptions.concat(conseillersOptions);
  const [mediateursCache, setMediateursCache] = useState(initialMediateursOptions);
  const isActiveSearch = donneesStatistiques.isActiveSearchMediateur;
  const departementsOptions = departementsRegions
  .map(departement => ({ value: departement.num_dep, label: `${departement.num_dep} · ${departement.dep_name}` }));

  const queryParams = Object.fromEntries(new URLSearchParams(location.search.toString()));
  const searchParams = validateActivitesFilters(queryParams);

  const changeQuery = {
    du: 'changeDateDebut',
    au: 'changeDateFin',
    types: 'changeTypes',
    mediateurs: 'changeMediateurs',
    departements: 'changeDepartements',
  };
  const filtresDefault = {
    du: filtreDateDebut,
    au: filtreDateFin,
    types: [],
    mediateurs: [],
    departements: [],
  };

  useEffect(() => {
    if (isActiveSearch) {
      const mediateursCacheSansDoublon =
      [...new Map([...mediateursCache, ...initialMediateursOptions].map(item => [item.value?.mediateurId, item])).values()];
      setMediateursCache(mediateursCacheSansDoublon);
    }
  }, [conseillersOptions]);

  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      for (const key of Object.keys(searchParams)) {
        dispatch(filtresCoopActions[changeQuery[key]](searchParams[key]));
        setDateDebut(searchParams[key] ?? dateDebut);
        setDateFin(searchParams[key] ?? dateFin);
        setTypes(searchParams[key] ?? types);
        setMediateurs(searchParams[key] ?? mediateurs);
        setDepartements(searchParams[key] ?? departements);
      }
    } else {
      for (const key of Object.keys(filtresDefault)) {
        dispatch(filtresCoopActions[changeQuery[key]](filtresDefault[key]));
      }
      setDateDebut(filtreDateDebut);
      setDateFin(filtreDateFin);
      setTypes([]);
      setMediateurs([]);
      setDepartements([]);
    }
  }, [location.search.toString()]);

  useEffect(() => {
    setDateDebut(filtreDateDebut);
    setDateFin(filtreDateFin);
    setTypes(filtreTypes.join(','));
    setMediateurs(filtreMediateurs.join(','));
    setDepartements(filterDepartements.join(','));
  }, [filtreDateDebut, filtreDateFin, filtreTypes, filtreMediateurs, filterDepartements]);

  useEffect(() => {
    if (!error && new Date(dateDebut) >= new Date('2020-11-17') && dateFin) {
      dispatch(statistiquesActions.getStatistiquesNationaleNouvelleCoop(dateDebut, dateFin, types, mediateurs, departements));
    }
    if (error) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [dateDebut, dateFin, types, mediateurs, departements, error]);

  return (
    <div className="fr-container">
      <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-my-6v">
        <IconInSquare iconId="fr-icon-line-chart-line" size="medium" />
        <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france">Statistiques</h1>
      </div>
      <Spinner loading={loading} />
      <Filters
        className="fr-mt-0-5v fr-mb-5v"
        defaultFilters={{ du: filtreDateDebut, au: filtreDateFin, ...validateActivitesFilters(queryParams) }}
        minDate={minDateCoop}
        maxDate={maxDateCoop}
        initialMediateursOptions={isActiveSearch ? mediateursCache : initialMediateursOptions}
        isActiveSearch={isActiveSearch}
        departementsOptions={departementsOptions}
      />
      <FilterTags
        filters={{
          du: filtreDateDebut, au: filtreDateFin, ...validateActivitesFilters(queryParams)
        }}
        departementsOptions={departementsOptions}
        mediateursOptions={isActiveSearch ? mediateursCache : initialMediateursOptions}
        setMediateursCache={setMediateursCache}
        isActiveSearch={isActiveSearch}
        beneficiairesOptions={[]}
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
