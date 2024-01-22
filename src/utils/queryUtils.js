// eslint-disable-next-line max-len
export function conseillerQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNomConseiller, filtreRupture, filtreCoordinateur, filtreParRegion, filtreParDepartement, filtreParNomStructure) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterByNameConseiller = filtreParNomConseiller ? `&searchByConseiller=${filtreParNomConseiller}` : '';
  const filterByRegion = filtreParRegion !== 'tous' && filtreParRegion !== undefined ? `&region=${filtreParRegion}` : '';
  const filterByDepartement = filtreParDepartement !== 'tous' && filtreParDepartement !== undefined ? `&departement=${filtreParDepartement}` : '';
  const ordreColonne = nomOrdre ? '&nomOrdre=' + nomOrdre + '&ordre=' + ordre : '';
  const filterByNameStructure = filtreParNomStructure ? `&searchByStructure=${filtreParNomStructure}` : '';

  let coordinateur = '';
  switch (filtreCoordinateur) {
    case 'tous':
      coordinateur = '';
      break;
    case 'est-coordinateur':
      coordinateur = `&coordinateur=true`;
      break;
    case 'non-coordinateur':
      coordinateur = `&coordinateur=false`;
      break;
    default:
      break;
  }
  let rupture = '';
  switch (filtreRupture) {
    case 'tous':
      rupture = '';
      break;
    case 'rupture':
      rupture = `&rupture=finalisee_rupture`;
      break;
    case 'en-cours':
      rupture = `&rupture=nouvelle_rupture`;
      break;
    case 'pieces-manquantes':
      rupture = `&rupture=nouvelle_rupture&piecesManquantes=true`;
      break;
    case 'contrat':
      rupture = `&rupture=contrat`;
      break;
    default:
      break;
  }

  // eslint-disable-next-line max-len
  return { ordreColonne, filterDateStart, filterDateEnd, filterByNameConseiller, rupture, coordinateur, filterByRegion, filterByDepartement, filterByNameStructure };
}

export function territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin, page) {
  if (nomOrdre === 'code') {
    nomOrdre = territoire;
  } else if (nomOrdre === 'nom') {
    //Afin d'obtenir nomDepartemement ou nomRegion
    nomOrdre += territoire.slice(4);
  }
  const ordreColonne = nomOrdre ? '&nomOrdre=' + nomOrdre + '&ordre=' + ordre : '';
  const pageIfDefined = page ? '&page=' + page : '';

  return `?territoire=${territoire}&dateDebut=${dateDebut}&dateFin=${dateFin}${pageIfDefined}${ordreColonne}`;
}

// eslint-disable-next-line max-len
export function structureQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterByName = filtreParNom ? `&searchByNom=${filtreParNom}` : '';
  const filterByRegion = filtreParRegion !== 'tous' && filtreParRegion !== undefined ? `&region=${filtreParRegion}` : '';
  const filterByDepartement = filtreParDepartement !== 'tous' && filtreParDepartement !== undefined ? `&departement=${filtreParDepartement}` : '';
  const filterByType = filtreParType !== 'tous' && filtreParType !== undefined ? `&type=${filtreParType}` : '';
  const filterByStatut = filtreParStatut !== 'tous' && filtreParStatut !== undefined ? `&statut=${filtreParStatut}` : '';
  const ordreColonne = nomOrdre ? '&nomOrdre=' + nomOrdre + '&ordre=' + ordre : '';

  return { ordreColonne, filterDateStart, filterDateEnd, filterByName, filterByType, filterByStatut, filterByRegion, filterByDepartement };
}

export function conventionQueryStringParameters(filtreParNomStructure, filterDepartement, filtreRegion, ordreNom, ordre) {
  const filterByName = filtreParNomStructure ? `&searchByNomStructure=${filtreParNomStructure}` : '';
  const filterByRegion = filtreRegion !== 'tous' && filtreRegion !== undefined ? `&region=${filtreRegion}` : '';
  const filterByDepartement = filterDepartement !== 'tous' && filterDepartement !== undefined ? `&departement=${filterDepartement}` : '';
  const ordreColonne = ordreNom ? '&nomOrdre=' + ordreNom + '&ordre=' + ordre : '';

  return { ordreColonne, filterByName, filterByRegion, filterByDepartement };
}

export function contratQueryStringParameters(filtreSearchBar, filtreDepartement, filtreRegion, ordreNom, ordre) {
  const filterByName = filtreSearchBar ? `&search=${filtreSearchBar}` : '';
  const filterByRegion = filtreRegion !== 'tous' && filtreRegion !== undefined ? `&region=${filtreRegion}` : '';
  const filterByDepartement = filtreDepartement !== 'tous' && filtreDepartement !== undefined ? `&departement=${filtreDepartement}` : '';
  const ordreColonne = ordreNom ? '&nomOrdre=' + ordreNom + '&ordre=' + ordre : '';

  return { ordreColonne, filterByName, filterByRegion, filterByDepartement };

}

export function demandesQueryStringParameters(filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre) {
  const filterByName = filtreSearchBar ? `&search=${filtreSearchBar}` : '';
  const filterByRegion = filtreRegion !== 'tous' && filtreRegion !== undefined ? `&region=${filtreRegion}` : '';
  const filterByDepartement = filtreDepartement !== 'tous' && filtreDepartement !== undefined ? `&departement=${filtreDepartement}` : '';
  const filterByAvisPrefet = filtreAvisPrefet !== 'tous' && filtreAvisPrefet !== undefined ? `&avisPrefet=${filtreAvisPrefet}` : '';
  const ordreColonne = ordreNom ? '&nomOrdre=' + ordreNom + '&ordre=' + ordre : '';

  return { filterByName, filterByDepartement, filterByRegion, filterByAvisPrefet, ordreColonne };
}

export function statsCsvConseillerQueryStringParameters(dateDebut, dateFin, idType, codePostal, ville, codeCommune, nom, prenom, idStructure) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterIdType = idType ? `&idType=${idType}` : '';
  const filterByLastName = nom ? `&nom=${nom}` : '';
  const filterByFirstName = prenom ? `&prenom=${prenom}` : '';
  const filterByCodePostal = codePostal !== 'tous' && codePostal !== undefined ? `&codePostal=${codePostal}` : '';
  const filterByVille = ville !== 'tous' && ville !== undefined ? `&ville=${ville}` : '';
  const filterByCodeCommune = codeCommune !== 'tous' && codeCommune !== undefined ? `&codeCommune=${codeCommune}` : '';
  const filterByIdStructure = idStructure !== 'tous' && idStructure !== undefined ? `&idStructure=${idStructure}` : '';

  // eslint-disable-next-line max-len
  return { filterDateStart, filterDateEnd, filterIdType, filterByVille, filterByCodeCommune, filterByCodePostal, filterByLastName, filterByFirstName, filterByIdStructure };
}

export function statsCsvStructureQueryStringParameters(dateDebut, dateFin, idType, codePostal, ville, codeCommune) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterIdType = idType ? `&idType=${idType}` : '';
  const filterByCodePostal = codePostal !== 'tous' && codePostal !== undefined ? `&codePostal=${codePostal}` : '';
  const filterByVille = ville !== 'tous' && ville !== undefined ? `&ville=${ville}` : '';
  const filterByCodeCommune = codeCommune !== 'tous' && codeCommune !== undefined ? `&codeCommune=${codeCommune}` : '';

  return { filterDateStart, filterDateEnd, filterIdType, filterByVille, filterByCodeCommune, filterByCodePostal };
}

// eslint-disable-next-line max-len
export function statsCsvGrandReseauQueryStringParameters(dateDebut, dateFin, codePostal, ville, codeCommune, structureId, conseillerId, region, departement) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterByRegion = region !== 'tous' && region !== undefined ? `&codeRegion=${region}` : '';
  const filterByDepartement = departement !== 'tous' && departement !== undefined ? `&numeroDepartement=${departement}` : '';
  const filterByCodePostal = codePostal !== 'tous' && codePostal !== undefined ? `&codePostal=${codePostal}` : '';
  const filterByVille = ville !== 'tous' && ville !== undefined ? `&ville=${ville}` : '';
  const filterByCodeCommune = codeCommune !== 'tous' && codeCommune !== undefined ? `&codeCommune=${codeCommune}` : '';
  const filterByIdStructure = structureId !== 'tous' && structureId !== undefined ? `&idStructure=${structureId}` : '';
  const filterByIdConseiller = conseillerId !== 'tous' && conseillerId !== undefined ? `&idConseiller=${conseillerId}` : '';

  // eslint-disable-next-line max-len
  return { filterDateStart, filterDateEnd, filterByVille, filterByCodeCommune, filterByCodePostal, filterByRegion, filterByDepartement, filterByIdStructure, filterByIdConseiller };
}

export function gestionnairesQueryStringParameters(nomOrdre, ordre, filtreParRole, filtreParNom) {
  const filterByName = filtreParNom ? `&searchByNom=${filtreParNom}` : '';
  const filterByRole = filtreParRole !== 'tous' && filtreParRole !== undefined ? `&searchRole=${filtreParRole}` : '';
  const ordreColonne = nomOrdre && ordre !== undefined ? '&nomOrdre=' + nomOrdre + '&ordre=' + ordre : '';
  return { ordreColonne, filterByName, filterByRole };
}

export function statsGrandReseauQueryStringParameters(dateDebut, dateFin, conseillerId, codePostal, codeCommune, region, departement, structureId) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterByRegion = region !== 'tous' && region !== undefined ? `&codeRegion=${region}` : '';
  const filterByDepartement = departement !== 'tous' && departement !== undefined ? `&numeroDepartement=${departement}` : '';
  const filterByCodePostal = codePostal !== 'tous' && codePostal !== undefined ? `&codePostal=${codePostal}` : '';
  const filterByCodeCommune = codeCommune !== 'tous' && codeCommune !== undefined ? `&codeCommune=${codeCommune}` : '';
  const filterByIdStructure = structureId !== 'tous' && structureId !== undefined ? `&idStructure=${structureId}` : '';
  const filterByIdConseiller = conseillerId !== 'tous' && conseillerId !== undefined ? `&idConseiller=${conseillerId}` : '';

  // eslint-disable-next-line max-len
  return { filterDateStart, filterDateEnd, filterByCodeCommune, filterByRegion, filterByCodePostal, filterByDepartement, filterByIdConseiller, filterByIdStructure };
}

export function statsQueryStringParameters(dateDebut, dateFin, codePostal, codeCommune, idStructure) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterByCodePostal = codePostal !== 'tous' && codePostal !== undefined ? `&codePostal=${codePostal}` : '';
  const filterByCodeCommune = codeCommune !== '' && codeCommune !== undefined ? `&codeCommune=${codeCommune}` : '';
  const filterByIdStructure = idStructure !== 'tous' && idStructure !== undefined ? `&idStructure=${idStructure}` : '';

  return { filterDateStart, filterDateEnd, filterByCodePostal, filterByCodeCommune, filterByIdStructure };
}

export function candidatQueryStringParameters(filtreSearch, filtreParRegion, filtreParDepartement) {
  const filterByNameAndEmailCandidat = filtreSearch ? `&search=${filtreSearch}` : '';
  const filterByRegion = filtreParRegion !== 'tous' && filtreParRegion !== undefined ? `&region=${filtreParRegion}` : '';
  const filterByDepartement = filtreParDepartement !== 'tous' && filtreParDepartement !== undefined ? `&departement=${filtreParDepartement}` : '';

  return { filterByNameAndEmailCandidat, filterByRegion, filterByDepartement };
}
