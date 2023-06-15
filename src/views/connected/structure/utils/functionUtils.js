import { pluralize } from '../../../../utils/formatagesUtils';

export function getNombreDePostes(structure) {
  const lastDemandeCoselec = structure?.lastDemandeCoselec;
  if (!lastDemandeCoselec) {
    return '-';
  }
  
  const { type, statut, nombreDePostesRendus, nombreDePostesAccordes, nombreDePostesSouhaites } = lastDemandeCoselec;
  
  switch (type) {
    case 'retrait':
      return nombreDePostesRendus;
    default:
      switch (statut) {
        case 'validee':
          return nombreDePostesAccordes;
        case 'en_cours':
        case 'refusee':
          return nombreDePostesSouhaites;
        default:
          return '-';
      }
  }
}

export const displayStatutRequestText = structure => {
  const { type, statut, nombreDePostesSouhaites, nombreDePostesAccordes, nombreDePostesRendus } =
      structure?.lastDemandeCoselec || {};
  
  switch (type) {
    case 'ajout':
      switch (statut) {
        case 'en_cours':
          return pluralize('demandé', 'demandé', 'demandés', nombreDePostesSouhaites);
        case 'validee':
          return pluralize('obtenu', 'obtenu', 'obtenus', nombreDePostesAccordes);
        case 'refusee':
          return pluralize('refusé', 'refusé', 'refusés', nombreDePostesSouhaites);
        default:
          break;
      }
      break;
    case 'retrait':
      return pluralize('vacant rendu', 'vacant rendu', 'vacants rendus', nombreDePostesRendus);
    default:
      break;
  }
};
