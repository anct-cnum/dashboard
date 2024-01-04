import dayjs from 'dayjs';
import React from 'react';
import StatutCandidat from '../datas/statut-candidat.json';

const slugify = require('slugify');

export function formatDate(date) {
  return dayjs(date).format('YYYY-MM-DD');
}

const removeCodePrefix = type =>
  type.startsWith('code') ? type.substring('code'.length) : type;

const formatNomConseillerExport = (nom, prenom) => {
  if (nom && prenom) {
    const nomFormat = slugify(nom, {
      replacement: '-',
      lower: true,
      strict: true,
    });
    const prenomFormat = slugify(prenom, {
      replacement: '-',
      lower: true,
      strict: true,
    });
    return `${nomFormat}_${prenomFormat}`;
  }
  return '';
};

export const formatCodePostalVille = (codePostal, ville) => {
  if (codePostal !== 'tous' && ville !== 'tous') {
    const villeFormat = slugify(ville, {
      replacement: '-',
      lower: true,
      strict: true,
    });
    return `_${codePostal}_${villeFormat}`;
  }
  return '';
};

export function formatFileNameStatsConseiller(dateDebut, dateFin, nom, prenom, codePostal, ville) {
  // eslint-disable-next-line max-len
  return `Statistiques_conseiller_${formatNomConseillerExport(nom, prenom)}${formatCodePostalVille(codePostal, ville)}_${formatDate(dateDebut)}_${formatDate(dateFin)}`;
}

export function formatFileNameStatsStructure(dateDebut, dateFin, nom, codePostal, ville) {
  // eslint-disable-next-line max-len
  return `Statistiques_structure_${slugify(nom, { replacement: '-', lower: true, strict: true })}${formatCodePostalVille(codePostal, ville)}_${formatDate(dateDebut)}_${formatDate(dateFin)}`;
}

export function formatFileName(dateDebut, dateFin, type, nom, prenom, codePostal, ville) {
  // eslint-disable-next-line max-len
  return `Statistiques_${removeCodePrefix(type)}${formatNomConseillerExport(nom, prenom)}${codePostal ? `_${codePostal}` : ''}${ville ? `_${ville}` : ''}_${formatDate(dateDebut)}_${formatDate(dateFin)}`;
}

export function pluralize(zero, singulier, pluriel, count, showCount = false) {
  let phrase = showCount ? count + ' ' : '';
  switch (count) {
    case 0:
      phrase += zero;
      break;
    case 1:
      phrase += singulier;
      break;

    default:
      phrase += pluriel;
      break;
  }
  return phrase;
}

export const valideInputEmail = email => {
  const regexValidEmail = new RegExp(
    /^[a-zA-Z0-9-._]+@[a-zA-Z0-9-._]{2,}[.][a-zA-Z]{2,}$/
  );

  return regexValidEmail.test(email);
};

export const validInputSiret = siret => {
  const regexValidSiret = new RegExp(/^[0-9]{14}$/);

  return regexValidSiret.test(siret);
};

export const validQueryParamsObjectId = id => {
  const regexValidId = new RegExp(/^[0-9a-fA-f]{24}$/g);

  return regexValidId.test(id);
};

export const validTypeDeContratWithoutEndDate = typeDeContrat => typeDeContrat === 'CDI';

export const formatNomConseiller = conseiller =>
  (conseiller?.nom + ' ' + conseiller?.prenom).toLowerCase().replace(/(^\w{1})|([\s,-]+\w{1})/g, letter => letter.toUpperCase());

/* espace tous les 2 chiffres après l'indicatif*/
export const formatNumeroTelephone = telephone => {
  if (telephone?.length > 0) {
    return telephone?.replace(/(\+)(33|590|596|594|262|269)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2$3 $4 $5 $6 $7');
  }
  return '-';
};

export const formatNomContactStructure = structure =>
  (structure?.contact?.nom + ' ' + structure?.contact?.prenom).toLowerCase().replace(/(^\w{1})|([\s,-]+\w{1})/g, letter => letter.toUpperCase());

export const formatNomStats = (key, structure) => structure?.stats?.find(stat => stat._id === key)?.count ?? '-';

export const formatAdressePermanence = permanence => `${permanence?.numeroRue} ${permanence?.rue} ${permanence?.codePostal} ${permanence?.ville}`;

export const formatStatut = statut => {
  switch (statut) {
    case 'nouvelle_rupture':
      return 'En cours';
    case 'finalisee_rupture':
      return 'Validée';
    default:
      return '';
  }
};

export const formatMotifRupture = motif => {
  switch (motif) {
    case 'nonReconductionCDD':
      return 'Non-reconduction du CDD';
    case 'licenciement':
      return 'Licenciement';
    case 'demission':
      return 'Démission';
    default:
      return motif;
  }
};

export const formatRenderStars = palier => {
  switch (palier) {
    case 1:
      return <p>Degr&eacute; de maîtrise :&nbsp;
        <span>
          <i className="ri-star-fill ri-xl" title="Débutant"></i>
          <i className="ri-star-line ri-xl" title="Débutant"></i>
          <i className="ri-star-line ri-xl" title="Débutant"></i>
        </span>
      </p>;
    case 2:
      return <p>Degr&eacute; de maîtrise :&nbsp;
        <span>
          <i className="ri-star-fill ri-xl" title="Intermédiaire"></i>
          <i className="ri-star-fill ri-xl" title="Intermédiaire"></i>
          <i className="ri-star-line ri-xl" title="Intermédiaire"></i>
        </span>
      </p>;
    case 3:
      return <p>Degr&eacute; de maîtrise :&nbsp;
        <span>
          <i className="ri-star-fill ri-xl" title="Avancé"></i>
          <i className="ri-star-fill ri-xl" title="Avancé"></i>
          <i className="ri-star-fill ri-xl" title="Avancé"></i>
        </span>
      </p>;
    default:
      return <p>Degr&eacute; de maîtrise non communiqu&eacute;</p>;
  }
};

export const badgeStatutDossierDS = statut => {
  switch (statut) {
    case 'en_instruction':
      return <p className="fr-badge fr-badge--new fr-mr-3w">Dossier en instruction</p>;
    case 'accepte':
      return <p className="fr-badge fr-badge--success fr-mr-3w">Dossier valid&eacute;</p>;
    case 'en_construction':
      return <p className="fr-badge fr-badge--new fr-mr-3w">Dossier en construction</p>;
    case 'refuse':
    case 'sans_suite':
      return <p className="fr-badge fr-badge--error fr-mr-3w">Dossier refus&eacute;</p>;
    default:
      return <p className="fr-badge fr-badge--warning fr-mr-3w">Dossier non cr&eacute;&eacute;</p>;
  }
};

export const displayBadgeStatutCandidat = statut => {
  const statutObject = StatutCandidat.find(item => item.filter === statut);
  return <div className={`fr-badge fr-mt-2w fr-mt-md-0 fr-badge--${statutObject?.badge}`}>{statutObject?.name_singular}</div>;
};

export const formatTypeDeContrat = typeDeContrat => {
  switch (typeDeContrat) {
    case 'contrat_de_projet_public':
      return 'Projet public';
    default:
      return typeDeContrat;
  }
};
