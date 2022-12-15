import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exportsActions, filtresConseillersActions, paginationActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import { downloadFile, scrollTopWindow } from '../../../../utils/exportsUtils';
import BlockDatePickers from '../statistiques/Components/commun/BlockDatePickers';
import codeRegions from '../../../../datas/code_region.json';

function FiltresEtTrisConseillers() {
  const dispatch = useDispatch();
  
  const dateDebut = useSelector(state => state.filtresConseillers?.dateDebut);
  const ordreNom = useSelector(state => state.filtresConseillers?.ordreNom);
  const filtreCoordinateur = useSelector(state => state.filtresConseillers?.coordinateur);
  const filtreRupture = useSelector(state => state.filtresConseillers?.rupture);
  const filtreParNomConseiller = useSelector(state => state.filtresConseillers?.nomConseiller);
  const filtreParNomStructure = useSelector(state => state.filtresConseillers?.nomStructure);
  const filtreRegion = useSelector(state => state.filtresConseillers?.region);
  const dateFin = useSelector(state => state.filtresConseillers?.dateFin);
  const ordre = useSelector(state => state.filtresConseillers?.ordre);

  const exportConseillerFileBlob = useSelector(state => state.exports);
  const exportConseillerFileError = useSelector(state => state.exports?.error);
  const loading = useSelector(state => state.exports?.loading);
  const [searchByStructure, setSearchByStructure] = useState(!!filtreParNomStructure);

  const has = value => value !== null && value !== undefined;

  const selectFiltreRegion = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresConseillersActions.changeFiltreRegion(e.target.value));
  };

  const exportDonneesConseiller = () => {
    dispatch(exportsActions.exportDonneesConseiller(dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreRegion,
      filtreParNomStructure, ordreNom, ordre ? 1 : -1));
  };

  const rechercheParNomOuNomStructure = e => {
    dispatch(paginationActions.setPage(1));
    const value = (e.key === 'Enter' ? e.target?.value : e.target?.previousSibling?.value) ?? '';
    if (searchByStructure === true) {
      dispatch(filtresConseillersActions.changeNomStructure(value));
    } else {
      dispatch(filtresConseillersActions.changeNomConseiller(value));
    }
  };

  useEffect(() => {
    if (has(exportConseillerFileBlob?.blob) && exportConseillerFileError === false) {
      downloadFile(exportConseillerFileBlob);
      dispatch(exportsActions.resetFile());
    }
  }, [exportConseillerFileBlob]);

  useEffect(() => {
    if (exportConseillerFileError !== false) {
      scrollTopWindow();
    }
  }, [exportConseillerFileError]);

  const handleChangeToggle = e => {
    setSearchByStructure(e.target?.checked);
  };

  return (
    <>
      <Spinner loading={loading} />
      <div className="fr-container--fluid">
        <div className="fr-grid-row">
          <h3 className="fr-h3">Liste des conseillers</h3>
          <div className="fr-ml-auto fr-col-12 fr-col-md-4 fr-mb-4w fr-mb-md-0">
            <div className="fr-search-bar fr-search-bar" id="search" role="search" >
              <input className="fr-input" defaultValue={(filtreParNomConseiller || filtreParNomStructure) ?? ''}
                placeholder="Rechercher par nom" type="search" id="search-input" name="search-input" />
              <button className="fr-btn" onClick={rechercheParNomOuNomStructure} title="Rechercher par nom">
                Rechercher
              </button>
            </div>
          </div>
        </div>
        <div className="fr-grid-row">
          <div className="fr-select-group" id="filtre-region">
            <select className="fr-select" onChange={selectFiltreRegion}>
              <option value={'tous'}>S&eacute;lectionner une r&eacute;gion</option>
              {codeRegions.map((region, idx) =>
                <>
                  {filtreRegion === region.code ?
                    <option key={idx} value={region.code} selected>{region.nom}</option> : <option key={idx} value={region.code}>{region.nom}</option>
                  }
                </>
              )}
            </select>
          </div>
          <div className="fr-toggle fr-ml-md-auto fr-toggle--label-left">
            <input
              checked={searchByStructure}
              type="checkbox"
              onChange={handleChangeToggle}
              className="fr-toggle__input"
              aria-describedby="toggle-698-hint-text"
              id="toggle-698"
            />
            <label className="fr-toggle__label" htmlFor="toggle-698" data-fr-checked-label="Structure" data-fr-unchecked-label="Conseiller">
              S&eacute;lectionner le type de recherche
            </label>
          </div>
        </div>
        <div className="fr-grid-row fr-grid-row--end">
          <div className="fr-col-12 fr-col-md-8 fr-mb-4w fr-mb-md-0 fr-grid-row">
            <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin}/>
          </div>
          <div className="fr-ml-auto">
            <button className="fr-btn fr-btn--secondary" onClick={exportDonneesConseiller}>Exporter les donn&eacute;es</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FiltresEtTrisConseillers;
