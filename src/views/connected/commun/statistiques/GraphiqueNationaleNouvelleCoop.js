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
import ActivitesFilterTags from './Components/nouvelleCoop/ActivitesFilterTags';
import { validateActivitesFilters } from './Components/utils/functionsSearchParams';
import departements from '../../../../datas/departements-region.json';

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
  const filtreMediateur = useSelector(state => state.filtresCoop?.mediateur);
  const filtreType = useSelector(state => state.filtresCoop?.type);
  const filterDepartement = useSelector(state => state.filtresCoop?.departement);
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [mediateur, setMediateur] = useState('');
  const [type, setType] = useState('');
  const [departement, setDepartement] = useState('');
  const conseillersOptions = useSelector(state => state.filtresCoop?.conseillersOptions);
  const donneesStatistiques = donneesStatistiquesOne?.data ? donneesStatistiquesOne : dataDefaultCoop;
  const initialMediateursOptions = donneesStatistiques.initialMediateursOptions.concat(conseillersOptions);
  const isActiveSearch = donneesStatistiques.isActiveSearchMediateur;
  const queryParams = Object.fromEntries(new URLSearchParams(location.search));
  const searchParams = validateActivitesFilters(queryParams);
  const departementsOptions = departements.map(departement => ({ value: departement.num_dep, label: `${departement.num_dep} · ${departement.dep_name}` }));

  const changeQuery = {
    du: 'changeDateDebut',
    au: 'changeDateFin',
    type: 'changeType',
    mediateur: 'changeMediateur',
    departement: 'changeDepartement',
  };

  useEffect(() => {
    for (const key of Object.keys(searchParams)) {
      const value = searchParams[key];
      dispatch(filtresCoopActions[changeQuery[key]](value));

      if (key === 'du') {
        setDateDebut(value);
      }
      if (key === 'au') {
        setDateFin(value);
      }
      if (key === 'type') {
        setType(value);
      }
      if (key === 'mediateur') {
        setMediateur(value);
      }
      if (key === 'departement') {
        setDepartement(value);
      }
    }
  }, []);

  useEffect(() => {
    setDateDebut(filtreDateDebut);
    setDateFin(filtreDateFin);
    setType(filtreType);
    setMediateur(filtreMediateur);
    setDepartement(filterDepartement);
  }, [filtreDateDebut, filtreDateFin, filtreType, filtreMediateur, filterDepartement]);

  useEffect(() => {
    if (!error && dateDebut) {
      dispatch(statistiquesActions.getStatistiquesNationaleNouvelleCoop(dateDebut, dateFin, type, mediateur, departement));
    }
    if (error) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [dateDebut, dateFin, type, mediateur, departement, error]);

  return (
    <div className="fr-container">
      <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-my-6v">
        <IconInSquare iconId="fr-icon-line-chart-line" size="medium" />
        <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france">Statistiques</h1>
      </div>
      <Spinner loading={loading} />
      <ActivitesFilterTags
        className="fr-mt-0-5v"
        defaultFilters={{ du: filtreDateDebut, au: filtreDateFin, ...validateActivitesFilters(queryParams) }}
        minDate={minDateCoop}
        maxDate={maxDateCoop}
        initialMediateursOptions={initialMediateursOptions}
        isActiveSearch={isActiveSearch}
        departementsOptions={departementsOptions}
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
