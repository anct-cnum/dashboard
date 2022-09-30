import { exportsService } from '../services/exportsService';
import download from 'downloadjs';
import dayjs from 'dayjs';
import { formatDate, formatFileName } from '../utils/formatagesUtils';

export const exportsActions = {
  exportFile,
  resetFile,
  exportDonneesTerritoire,
  resetExportDonneesTerritoire,
  exportStatistiquesCSV,
};

function exportFile(nameFile, hubName) {
  return dispatch => {
    dispatch(request());

    exportsService.getFile(nameFile)
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

function resetExportDonneesTerritoire() {
  return { type: 'EXPORT_TERRITOIRE_RESET' };
}

function exportStatistiquesCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal) {
  return dispatch => {
    dispatch(request());
    exportsService.getStatistiquesCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal)
    .then(
      data => dispatch(success(data)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'EXPORT_STATISTIQUES_CSV_REQUEST' };
  }
  function success(data) {
    const nameFile = `${formatFileName(dateDebut, dateFin, type, idType, codePostal)}`;
    return { type: 'EXPORT_STATISTIQUES_CSV_SUCCESS', data, nameFile };
  }
  function failure(error) {
    return { type: 'EXPORT_STATISTIQUES_CSV_FAILURE', error };
  }
}
