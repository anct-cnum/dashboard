// eslint-disable-next-line max-len
export function conseillerQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNomConseiller, filtreRupture, filtreCoordinateur, filtreParRegion, filtreParNomStructure) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterByNameConseiller = filtreParNomConseiller ? `&searchByConseiller=${filtreParNomConseiller}` : '';
  const filterByRegion = filtreParRegion !== 'tous' && filtreParRegion !== undefined ? `&region=${filtreParRegion}` : '';
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
  
  return { ordreColonne, filterDateStart, filterDateEnd, filterByNameConseiller, rupture, coordinateur, filterByRegion, filterByNameStructure };
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
export function structureQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, filtreParComs) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterByName = filtreParNom ? `&searchByNom=${filtreParNom}` : '';
  const filterByRegion = filtreParRegion !== 'tous' && filtreParRegion !== undefined ? `&region=${filtreParRegion}` : '';
  const filterByDepartement = filtreParDepartement !== 'tous' && filtreParDepartement !== undefined ? `&departement=${filtreParDepartement}` : '';
  const filterByComs = filtreParComs !== 'tous' && filtreParComs !== undefined ? `&coms=${filtreParComs}` : '';
  const filterByType = filtreParType !== 'tous' && filtreParType !== undefined ? `&type=${filtreParType}` : '';
  const filterByStatut = filtreParStatut !== 'tous' && filtreParStatut !== undefined ? `&statut=${filtreParStatut}` : '';
  const ordreColonne = nomOrdre ? '&nomOrdre=' + nomOrdre + '&ordre=' + ordre : '';
  
  return { ordreColonne, filterDateStart, filterDateEnd, filterByName, filterByType, filterByStatut, filterByRegion, filterByComs, filterByDepartement };
}

// eslint-disable-next-line max-len
export function statsCsvQueryStringParameters(dateDebut, dateFin, type, idType, conseillerIds, codePostal, ville, nom, prenom, region, departement, structureIds) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterIdType = idType ? `&idType=${idType}` : '';
  const filterByType = type ? `&type=${type}` : '';
  const filterByLastName = nom ? `&nom=${nom}` : '';
  const filterByFirstName = prenom ? `&prenom=${prenom}` : '';
  const filterByRegion = region !== 'tous' && region !== undefined ? `&codeRegion=${region}` : '';
  const filterByDepartement = departement !== 'tous' && departement !== undefined ? `&numeroDepartement=${departement}` : '';
  const filterByCodePostal = codePostal !== 'tous' && codePostal !== undefined ? `&codePostal=${codePostal}` : '';
  const filterByVille = ville !== 'tous' && ville !== undefined ? `&ville=${ville}` : '';
  const filterByConseillerIds = conseillerIds?.length > 0 ? `&conseillerIds=${JSON.stringify(conseillerIds)}` : '';
  const filterByStructureIds = structureIds?.length > 0 ? `&structureIds=${JSON.stringify(structureIds)}` : '';
  
  // eslint-disable-next-line max-len
  return { filterDateStart, filterDateEnd, filterIdType, filterByType, filterByVille, filterByRegion, filterByCodePostal, filterByDepartement, filterByLastName, filterByFirstName, filterByConseillerIds, filterByStructureIds };
}

export function gestionnairesQueryStringParameters(nomOrdre, ordre, filtreParRole, filtreParNom) {
  const filterByName = filtreParNom ? `&searchByNom=${filtreParNom}` : '';
  const filterByRole = filtreParRole !== 'tous' && filtreParRole !== undefined ? `&searchRole=${filtreParRole}` : '';
  const ordreColonne = nomOrdre && ordre !== undefined ? '&nomOrdre=' + nomOrdre + '&ordre=' + ordre : '';
  return { ordreColonne, filterByName, filterByRole };
}

export function statsGrandReseauQueryStringParameters(dateDebut, dateFin, conseillerIds, codePostal, ville, region, departement, structureIds) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterByRegion = region !== 'tous' && region !== undefined ? `&codeRegion=${region}` : '';
  const filterByDepartement = departement !== 'tous' && departement !== undefined ? `&numeroDepartement=${departement}` : '';
  const filterByCodePostal = codePostal !== 'tous' && codePostal !== undefined ? `&codePostal=${codePostal}` : '';
  const filterByVille = ville !== 'tous' && ville !== undefined ? `&ville=${ville}` : '';
  const filterByConseillerIds = conseillerIds?.length > 0 ? `&conseillerIds=${JSON.stringify(conseillerIds)}` : '';
  const filterByStructureIds = structureIds?.length > 0 ? `&structureIds=${JSON.stringify(structureIds)}` : '';
  
  // eslint-disable-next-line max-len
  return { filterDateStart, filterDateEnd, filterByVille, filterByRegion, filterByCodePostal, filterByDepartement, filterByConseillerIds, filterByStructureIds };
}

export function statsQueryStringParameters(dateDebut, dateFin, codePostal, ville) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterByCodePostal = codePostal !== 'tous' && codePostal !== undefined ? `&codePostal=${codePostal}` : '';
  const filterByVille = ville !== 'tous' && ville !== undefined ? `&ville=${ville}` : '';

  return { filterDateStart, filterDateEnd, filterByCodePostal, filterByVille };
}

export function candidatQueryStringParameters(filtreParNomCandidat, filtreParRegion, filtreParComs, filtreParDepartement) {
  const filterByNameCandidat = filtreParNomCandidat ? `&searchByNomCandidat=${filtreParNomCandidat}` : '';
  const filterByRegion = filtreParRegion !== 'tous' && filtreParRegion !== undefined ? `&region=${filtreParRegion}` : '';
  const filterByDepartement = filtreParDepartement !== 'tous' && filtreParDepartement !== undefined ? `&departement=${filtreParDepartement}` : '';
  const filterByComs = filtreParComs !== 'tous' && filtreParComs !== undefined ? `&coms=${filtreParComs}` : '';
  
  return { filterByNameCandidat, filterByRegion, filterByComs, filterByDepartement };
}
