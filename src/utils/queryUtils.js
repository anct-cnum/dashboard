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

export function candidatQueryStringParameters(filtreParNomCandidat, filtreParRegion, filtreParComs, filtreParDepartement) {
  const filterByNameCandidat = filtreParNomCandidat ? `&searchByNomCandidat=${filtreParNomCandidat}` : '';
  const filterByRegion = filtreParRegion !== 'tous' && filtreParRegion !== undefined ? `&region=${filtreParRegion}` : '';
  const filterByDepartement = filtreParDepartement !== 'tous' && filtreParDepartement !== undefined ? `&departement=${filtreParDepartement}` : '';
  const filterByComs = filtreParComs !== 'tous' && filtreParComs !== undefined ? `&coms=${filtreParComs}` : '';
  
  return { filterByNameCandidat, filterByRegion, filterByComs, filterByDepartement };
}
