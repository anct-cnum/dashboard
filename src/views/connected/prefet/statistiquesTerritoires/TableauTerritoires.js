import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, exportsActions, filtresEtTrisStatsActions, statistiquesActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import Territoire from './Territoire';
import FiltresEtTrisTerritoires from '../../commun/statistiques/Components/tableaux/FiltresEtTrisTerritoires';

export default function TableauTerritoires() {

  const dispatch = useDispatch();

  const filtreTerritoire = useSelector(state => state.filtresEtTris?.territoire);
  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);
  const ordre = useSelector(state => state.filtresEtTris?.ordre);
  const ordreNom = useSelector(state => state.filtresEtTris?.ordreNom);
  const loading = useSelector(state => state.statistiques?.loading);
  const error = useSelector(state => state.statistiques?.error);
  const territoires = useSelector(state => state.statistiques?.statsTerritoires);
  const territoire = useSelector(state => state.filtresEtTris?.territoire);
  const [initTerritoire, setInitTerritoire] = useState(false);

  const ordreColonne = e => {
    dispatch(filtresEtTrisStatsActions.changeOrdre(e.target.dataset.id));
  };

  useEffect(() => {
    if (initTerritoire === true) {
      dispatch(statistiquesActions.getDatasTerritoiresPrefet(filtreTerritoire, dateDebut, dateFin, ordreNom, ordre ? 1 : -1));
    }
  }, [dateDebut, dateFin, ordre, ordreNom, filtreTerritoire]);

  useEffect(() => {
    scrollTopWindow();
    if (!error) {
      if (initTerritoire === false) {
        dispatch(statistiquesActions.getDatasTerritoiresPrefet(filtreTerritoire, dateDebut, dateFin, ordreNom, ordre ? 1 : -1));
        setInitTerritoire(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [error]);

  const exportDonneesTerritoire = () => {
    dispatch(exportsActions.exportDonneesTerritoirePrefet(territoire, dateDebut, dateFin, ordreNom, ordre ? 1 : -1));
  };

  return (
    <div className="statistiques">
      <Spinner loading={loading} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h1 className="fr-h1 title">Statistiques par territoire</h1>
          </div>
          <div className="fr-col-12">
            <div className="fr-container--fluid">
              <div className="fr-grid-row fr-grid-row--end">
                <FiltresEtTrisTerritoires />
                <div className="fr-ml-auto">
                  <button className="fr-btn fr-btn--secondary" onClick={exportDonneesTerritoire}>Exporter les donn&eacute;es</button>
                </div>
              </div>
            </div>
            <div className="fr-container--fluid fr-mt-2w">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12">
                  <div className="fr-table">
                    <table>
                      <thead>
                        <tr>
                          <th data-id="code">
                            <button data-id="code" className="filtre-btn" onClick={ordreColonne}>
                              <span>Code
                                {(ordreNom !== 'code' || ordreNom === 'code' && ordre) &&
                                  <i data-id="code" className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                {(ordreNom === 'code' && !ordre) &&
                                  <i data-id="code" className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>Nom</th>
                          <th>CRA</th>
                          <th>Personnes accompagn&eacute;es</th>
                          <th>Postes valid&eacute;s</th>
                          <th>Conseillers recrut&eacute;s</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && territoires?.map((territoire, idx) => {
                          return (<Territoire key={idx} territoire={territoire} filtreTerritoire={filtreTerritoire} />);
                        })
                        }
                        {(!territoires || territoires?.length === 0) &&
                          <tr>
                            <td colSpan="12" style={{ width: '75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span className="not-found pair">
                                  {filtreTerritoire === 'codeDepartement' ? `Aucun département ` : 'Aucune région '} trouv&eacute;
                                </span>
                              </div>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
