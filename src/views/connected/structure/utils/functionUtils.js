import { calcNbJoursAvantDateFinContrat, isContractExpiring } from '../../../../utils/calculateUtils';
import { StatutConventionnement } from '../../../../utils/enumUtils';
import { pluralize, validTypeDeContratWithoutEndDate } from '../../../../utils/formatagesUtils';
import React from 'react';
import ReactDOM from 'react-dom';

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

export const filterActiveAdvisors = (contrat, structure) => {
  const isReconventionnementValide = structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ;
  if (!isReconventionnementValide) {
    return true;
  }
  return validTypeDeContratWithoutEndDate(contrat?.typeDeContrat) ||
         (contrat?.phaseConventionnement && contrat?.statut === 'finalisee');
};

export const isConventionnementOrReconventionnementValide =
structure => structure?.conventionnement?.statut === StatutConventionnement.CONVENTIONNEMENT_VALIDÉ ||
structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ ||
structure?.conventionnement?.statut === StatutConventionnement.CONVENTIONNEMENT_VALIDÉ_PHASE_2;

export const checkStructurePhase2 = statut => {
  if (statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ) {
    return true;
  }
  if (statut === StatutConventionnement.CONVENTIONNEMENT_VALIDÉ_PHASE_2) {
    return true;
  }
  return false;
};

export const getGroupText = group => {
  switch (group) {
    case 0:
    case 1:
    case 2:
      return 'Ce conseiller remplit activement ses CRAs';
    case 3:
      return 'Ce conseiller n\'a pas rempli de CRA depuis 30 jours';
    case 4:
      return 'Ce conseiller n\'a jamais rempli de CRA';
    case 5:
      return 'Ce conseiller n\'a pas rempli de CRA cette année';
    default:
      return 'non renseigné';
  }
};

export const getAlertLevel = group => {
  switch (group) {
    case 0:
    case 1:
    case 2:
      return 'success';
    case 3:
      return 'warning';
    case 4:
    case 5:
      return 'error';
    default:
      return '';
  }
};

export function getDateFin(conseiller) {
  const demandeInitiee = getDemandeInitiee(conseiller);
  if (demandeInitiee) {
    return new Date(demandeInitiee.dateDeFinSouhaitee);
  } else if (conseiller?.dateFinDeContrat) {
    return new Date(conseiller.dateFinDeContrat);
  }
  return null;
}

export function getDemandeInitiee(contrat) {
  return contrat.demandesDeProlongation?.find(demande => demande.statut === 'initiee');
}


const renderStatusBadge = (statut, conseiller) => {
  switch (statut) {
    case 'finalisee': {
      if (!conseiller.dateFinDeContrat || calcNbJoursAvantDateFinContrat(conseiller.dateFinDeContrat) > 0) {
        if (isContractExpiring(conseiller.dateFinDeContrat)) {
          return <p className="fr-badge fr-badge--sm fr-badge--new">Arrive &agrave; &eacute;ch&eacute;ance</p>;
        } else {
          return <p className="fr-badge fr-badge--sm fr-badge--success">En activit&eacute;</p>;
        }
      } else {
        return <p className="fr-badge fr-badge--sm fr-badge--warning">Contrat termin&eacute;</p>;
      }
    }
    case 'nouvelle_rupture':
      return <p className="fr-badge fr-badge--sm fr-badge--info">Rupture en cours</p>;

    case 'renouvellement_initiee':
      return <p className="fr-badge fr-badge--sm fr-badge--success">En activit&eacute;</p>;

    case 'finalisee_rupture':
      return <p className="fr-badge fr-badge--sm fr-badge--warning">Contrat termin&eacute;</p>;

    case 'recrutee':
      return <p className="fr-badge fr-badge--sm fr-badge--new">Recrutement en cours</p>;

    default:
      return null;
  }
};

export function DatePickerPortal({ children }) {
  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed',
      zIndex: 9999,
    }}>
      {children}
    </div>,
    document.body
  );
}

export default renderStatusBadge;
