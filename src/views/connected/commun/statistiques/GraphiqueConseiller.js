import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { alerteEtSpinnerActions, statistiquesActions, conseillerActions } from '../../../../actions';

import Spinner from '../../../../components/Spinner';
import BlockDatePickers from '../../../../components/datePicker/BlockDatePickers';
import LeftPage from './Components/graphiques/LeftPage';
import RightPage from './Components/graphiques/RightPage';
import BottomPage from './Components/graphiques/BottomPage';
import StatistiquesBanniere from './Components/graphiques/StatistiquesBanniere';
import ElementCodePostal from './Components/graphiques/ElementCodePostal';

export default function GraphiqueConseiller() {

  const dispatch = useDispatch();
  const location = useLocation();
  const { idConseiller } = useParams();

  const [conseiller, setConseiller] = useState(location?.state?.conseiller);

  const loadingConseiller = useSelector(state => state.conseiller?.loading);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const requestConseiller = useSelector(state => state.conseiller?.conseiller);

  const statistiquesLoading = useSelector(state => state.statistiques?.loading);
  const statistiquesError = useSelector(state => state.statistiques?.error);
  const donneesStatistiques = useSelector(state => state.statistiques?.statsData);
  const codeCommuneStats = useSelector(state => state.statistiques?.codeCommuneStats);
  const villeStats = useSelector(state => state.statistiques?.villeStats);
  const codePostal = useSelector(state => state.statistiques?.codePostalStats);

  const loadingExport = useSelector(state => state.exports?.loading);

  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);

  useEffect(() => {
    if (!errorConseiller) {
      if (!conseiller) {
        dispatch(conseillerActions.getCandidat(idConseiller));
        dispatch(statistiquesActions.getCodesPostauxCrasConseiller(idConseiller));
      } else {
        dispatch(statistiquesActions.getCodesPostauxCrasConseiller(idConseiller));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le conseiller n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorConseiller]);

  useEffect(() => {
    if (!conseiller) {
      setConseiller(requestConseiller);
    }
  }, [requestConseiller]);

  useEffect(() => {
    if (!statistiquesError) {
      if (idConseiller && !!conseiller) {
        dispatch(statistiquesActions.getStatistiquesConseiller(dateDebut, dateFin, idConseiller, codePostal, codeCommuneStats));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [dateDebut, dateFin, statistiquesError, conseiller, codePostal, codeCommuneStats]);

  const formatNomStatistiques = () => {
    const formatNom = conseiller?.nom?.charAt(0).toUpperCase() + conseiller?.nom?.slice(1);
    const formatPrenom = conseiller?.prenom?.charAt(0).toUpperCase() + conseiller?.prenom?.slice(1);
    if (formatNom && formatPrenom) {
      return `${formatNom} ${formatPrenom}`;
    }
    return '';
  };

  return (
    <div className="statistiques">
      <Spinner loading={statistiquesLoading || loadingExport || loadingConseiller} />
      <div className="structure fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h1 className={`titre ${conseiller?.nom?.length > 50 ? 'titre-long' : ''}`} >Statistiques - {formatNomStatistiques()}</h1>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4 fr-mb-6w print-graphique">
            <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin}/>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-3 fr-mb-6w print-graphique">
            {conseiller !== undefined &&
              <ElementCodePostal />
            }
          </div>
          <div className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-4">
            <hr className="fr-hr fr-mt-3v"/>
          </div>
        </div>
        {statistiquesLoading &&
          <h2 className="loadingStatsTexte">La page est en cours de chargement, veuillez patienter</h2>
        }
        {(!donneesStatistiques && !statistiquesLoading) &&
          <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
        }
        { donneesStatistiques &&
          <div className="fr-grid-row">
            <LeftPage donneesStats={donneesStatistiques}/>
            <RightPage donneesStats={donneesStatistiques}/>
            <BottomPage donneesStats={donneesStatistiques}/>
            <StatistiquesBanniere
              dateDebut={dateDebut}
              dateFin={dateFin}
              typeStats="conseiller"
              id={idConseiller}
              codePostal={codePostal}
              ville={villeStats}
              codeCommune={codeCommuneStats}
              nom={conseiller.nom}
              prenom={conseiller.prenom}
            />
          </div>
        }
      </div>
    </div>
  );
}
