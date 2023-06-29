/* eslint-disable max-len */
import { exportsService } from '../services/exportsService';
import dayjs from 'dayjs';
import { formatDate, formatFileName } from '../utils/formatagesUtils';

export const exportsActions = {
  exportFile,
  resetFile,
  exportDonneesTerritoire,
  resetExportDonneesTerritoire,
  exportStatistiquesCSV,
  exportDonneesConseiller,
  exportDonneesStructure,
  exportDonneesGestionnaires,
  exportDonneesHistoriqueDossiersConvention,
  exportDonneesHistoriqueContrat,
};

function exportFile(nameFile, collection = 'exports', hubName) {
  return dispatch => {
    dispatch(request());

    exportsService.getFile(nameFile, collection)
    .then(
      blob => dispatch(success(blob, nameFile, hubName)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'EXPORT_FILE_REQUEST' };
  }
  function success(blob, nameFile, hubName) {
    if (nameFile === 'ruptures') {
      nameFile = `demandes_${nameFile}_${dayjs(new Date()).format('DD-MM-YYYY')}`;
    }
    if (nameFile === 'cnfs-without-cra') {
      nameFile = 'export_cnfs_m2';
    }
    if (nameFile === 'cnfs-hub') {
      nameFile = `export-cnfs_${dayjs(new Date()).format('DD-MM-YYYY')}_${hubName}`;
    }
    if (nameFile === 'historique-ruptures') {
      nameFile = `${nameFile}_${dayjs(new Date()).format('DD-MM-YYYY')}`;
    }
    return { type: 'EXPORT_FILE_SUCCESS', blob, nameFile };
  }
  function failure(error) {
    return { type: 'EXPORT_FILE_FAILURE', error };
  }
}

function resetFile() {
  return { type: 'RESET_FILE' };
}

function exportDonneesTerritoire(territoire = 'departement', dateDebut, dateFin, nomOrdre = 'code', ordre = 1) {
  return async dispatch => {
    dispatch(request());
    await exportsService.getExportDonneesTerritoire(territoire, formatDate(dateDebut), formatDate(dateFin), nomOrdre, ordre)
    .then(exportTerritoireFileBlob => dispatch(success(exportTerritoireFileBlob)))
    .catch(exportTerritoireFileError => dispatch(failure(exportTerritoireFileError)));
  };

  function request() {
    return { type: 'EXPORT_TERRITOIRE_REQUEST' };
  }
  function success(exportTerritoireFileBlob) {
    const nameFile = `export-territoires_${territoire}_entre_${dayjs(dateDebut).format('YYYY-MM-DD')}_et_${dayjs(dateFin).format('YYYY-MM-DD')}`;
    return { type: 'EXPORT_TERRITOIRE_SUCCESS', exportTerritoireFileBlob, nameFile };
  }
  function failure(exportTerritoireFileError) {
    return { type: 'EXPORT_TERRITOIRE_FAILURE', exportTerritoireFileError };
  }
}

function exportDonneesConseiller(dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreParRegion, filtreParDepartement, filtreParNomStructure, nomOrdre = 'prenom', ordre = 1) {
  return async dispatch => {
    dispatch(request());
    await exportsService.getExportDonneesConseiller(formatDate(dateDebut), formatDate(dateFin), filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreParRegion, filtreParDepartement, filtreParNomStructure, nomOrdre, ordre)
    .then(exportConseillerFileBlob => dispatch(success(exportConseillerFileBlob)))
    .catch(exportConseillerFileError => dispatch(failure(exportConseillerFileError)));
  };

  function request() {
    return { type: 'EXPORT_CONSEILLER_REQUEST' };
  }
  function success(exportConseillerFileBlob) {
    const nameFile = `export-conseillers_entre_${dayjs(dateDebut).format('YYYY-MM-DD')}_et_${dayjs(dateFin).format('YYYY-MM-DD')}`;
    return { type: 'EXPORT_CONSEILLER_SUCCESS', exportConseillerFileBlob, nameFile };
  }
  function failure(exportConseillerFileError) {
    return { type: 'EXPORT_CONSEILLER_FAILURE', exportConseillerFileError };
  }
}

function exportDonneesStructure(dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, nomOrdre = 'nom', ordre = 1) {
  return async dispatch => {
    dispatch(request());
    await exportsService.getExportDonneesStructure(formatDate(dateDebut), formatDate(dateFin), filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, nomOrdre, ordre)
    .then(exportStructureFileBlob => dispatch(success(exportStructureFileBlob)))
    .catch(exportStructureFileError => dispatch(failure(exportStructureFileError)));
  };

  function request() {
    return { type: 'EXPORT_STRUCTURE_REQUEST' };
  }
  function success(exportStructureFileBlob) {
    const nameFile = `export-structures_entre_${dayjs(dateDebut).format('YYYY-MM-DD')}_et_${dayjs(dateFin).format('YYYY-MM-DD')}`;
    return { type: 'EXPORT_STRUCTURE_SUCCESS', exportStructureFileBlob, nameFile };
  }
  function failure(exportStructureFileError) {
    return { type: 'EXPORT_STRUCTURE_FAILURE', exportStructureFileError };
  }
}

function resetExportDonneesTerritoire() {
  return { type: 'EXPORT_TERRITOIRE_RESET' };
}

function exportStatistiquesCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal, ville, nom, prenom, region, departement, structureIds) {
  return dispatch => {
    dispatch(request());
    exportsService.getStatistiquesCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal, ville, nom, prenom, region, departement, structureIds)
    .then(
      data => dispatch(success(data)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'EXPORT_STATISTIQUES_CSV_REQUEST' };
  }
  function success(data) {
    const nameFile = `${formatFileName(dateDebut, dateFin, type, idType, codePostal, ville)}`;
    return { type: 'EXPORT_STATISTIQUES_CSV_SUCCESS', data, nameFile };
  }
  function failure(error) {
    return { type: 'EXPORT_STATISTIQUES_CSV_FAILURE', error };
  }
}

function exportDonneesGestionnaires(filtreRole, filtreParNomGestionnaire, nomOrdre = 'nom', ordre = 1) {
  return async dispatch => {
    dispatch(request());
    await exportsService.getExportDonneesGestionnaires(filtreRole, filtreParNomGestionnaire, nomOrdre, ordre)
    .then(exportGestionnairesFileBlob => dispatch(success(exportGestionnairesFileBlob)))
    .catch(exportGestionnairesFileError => dispatch(failure(exportGestionnairesFileError)));
  };

  function request() {
    return { type: 'EXPORT_GESTIONNAIRES_REQUEST' };
  }
  function success(exportGestionnairesFileBlob) {
    const nameFile = `export-gestionnaires_${filtreRole.toLowerCase()}`;
    return { type: 'EXPORT_GESTIONNAIRES_SUCCESS', exportGestionnairesFileBlob, nameFile };
  }
  function failure(error) {
    return { type: 'EXPORT_GESTIONNAIRES_FAILURE', error };
  }
}

function exportDonneesHistoriqueDossiersConvention(typeConvention, dateDebut, dateFin, filtreParNomStructure, ordreNom = 'dateDemande', ordre = 1) {
  return async dispatch => {
    dispatch(request());
    await exportsService.getExportDonneesHistoriqueDossiersConvention(typeConvention, dateDebut, dateFin, filtreParNomStructure, ordreNom, ordre)
    .then(exportHistoriqueDossiersConventionFileBlob => dispatch(success(exportHistoriqueDossiersConventionFileBlob)))
    .catch(exportHistoriqueDossiersConventionFileError => dispatch(failure(exportHistoriqueDossiersConventionFileError)));
  };

  function request() {
    return { type: 'EXPORT_HISTORIQUE_DOSSIERS_CONVENTION_REQUEST' };
  }
  function success(exportHistoriqueDossiersConventionFileBlob) {
    const nameFile = `export-historique-dossiers-convention_${formatDate(dateDebut)}_${formatDate(dateFin)}`;
    return { type: 'EXPORT_HISTORIQUE_DOSSIERS_CONVENTION_SUCCESS', exportHistoriqueDossiersConventionFileBlob, nameFile };
  }
  function failure(error) {
    return { type: 'EXPORT_HISTORIQUE_DOSSIERS_CONVENTION_FAILURE', error };
  }
}

function exportDonneesHistoriqueContrat(statutContrat, dateDebut, dateFin, filtreParNomConseiller, ordreNom = 'dateDemande', ordre = 1) {
  return async dispatch => {
    dispatch(request());
    await exportsService.getExportDonneesHistoriqueContrat(statutContrat, dateDebut, dateFin, filtreParNomConseiller, ordreNom, ordre)
    .then(exportHistoriqueContratFileBlob => dispatch(success(exportHistoriqueContratFileBlob)))
    .catch(exportHistoriqueContratFileError => dispatch(failure(exportHistoriqueContratFileError)));
  };

  function request() {
    return { type: 'EXPORT_HISTORIQUE_CONTRAT_REQUEST' };
  }
  function success(exportHistoriqueContratFileBlob) {
    const nameFile = `export-historique-contrat_${formatDate(dateDebut)}_${formatDate(dateFin)}`;
    return { type: 'EXPORT_HISTORIQUE_CONTRAT_SUCCESS', exportHistoriqueContratFileBlob, nameFile };
  }
  function failure(error) {
    return { type: 'EXPORT_HISTORIQUE_CONTRAT_FAILURE', error };
  }
}
