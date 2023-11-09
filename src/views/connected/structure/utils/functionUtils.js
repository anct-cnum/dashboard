import { StatutConventionnement } from '../../../../utils/enumUtils';
import { pluralize } from '../../../../utils/formatagesUtils';

export function getNombreDePostes(demandesCoselec) {
  if (!demandesCoselec) {
    return '-';
  }

  const { type, statut, nombreDePostesRendus, nombreDePostesAccordes, nombreDePostesSouhaites } = demandesCoselec;

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

export function displayNombreDePostes(demandesCoselec) {
  if (!demandesCoselec) {
    return '-';
  }

  const { type, statut, nombreDePostesRendus, nombreDePostesAccordes, nombreDePostesSouhaites } = demandesCoselec;

  switch (type) {
    case 'retrait':
      return nombreDePostesRendus;
    default:
      switch (statut) {
        case 'validee':
          return `${nombreDePostesAccordes}/${nombreDePostesSouhaites}`;
        case 'en_cours':
        case 'refusee':
          return nombreDePostesSouhaites;
        default:
          return '-';
      }
  }
}

export const displayStatutRequestText = demandesCoselec => {
  const { type, statut, nombreDePostesSouhaites, nombreDePostesAccordes, nombreDePostesRendus } =
  demandesCoselec || {};

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

export const checkStructurePhase2 = statut => {
  if (statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ) {
    return true;
  }
  if (statut === StatutConventionnement.CONVENTIONNEMENT_VALIDÉ_PHASE_2) {
    return true;
  }
  return false;
};

