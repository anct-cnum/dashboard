import dayjs from 'dayjs';
import React from 'react';

export function formatDate(date) {
  return dayjs(date).format('YYYY-MM-DD');
}

const removeCodePrefix = type =>
  type.startsWith('code') ? type.substring('code'.length) : type;

export function formatFileName(dateDebut, dateFin, type, idType, codePostal) {
  return `Statistiques_${removeCodePrefix(type)}${
    codePostal ? `_${codePostal}` : ''}${idType ? `_${idType}` : ''}_${formatDate(dateDebut)}_${formatDate(dateFin)}`;
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
    /^[a-zA-Z0-9-._]+@[a-zA-Z0-9-._]{2,}[.][a-zA-Z]{2,3}$/
  );
  
  return regexValidEmail.test(email);
};

export const validInputSiret = siret => {
  const regexValidSiret = new RegExp(/^[0-9]{14}$/);
  
  return regexValidSiret.test(siret);
};

export const formatNomConseiller = conseiller =>
  (conseiller?.nom + ' ' + conseiller?.prenom).toLowerCase().replace(/(^\w{1})|([\s,-]+\w{1})/g, letter => letter.toUpperCase());

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
        <span style={{ verticalAlign: 'sub' }}>
          <i className="ri-star-fill ri-xl" title="Débutant"></i>
          <i className="ri-star-line ri-xl" title="Débutant"></i>
          <i className="ri-star-line ri-xl" title="Débutant"></i>
        </span>
      </p>;
    case 2:
      return <p>Degr&eacute; de maîtrise :&nbsp;
        <span style={{ verticalAlign: 'sub' }}>
          <i className="ri-star-fill ri-xl" title="Intermédiaire"></i>
          <i className="ri-star-fill ri-xl" title="Intermédiaire"></i>
          <i className="ri-star-line ri-xl" title="Intermédiaire"></i>
        </span>
      </p>;
    case 3:
      return <p>Degr&eacute; de maîtrise :&nbsp;
        <span style={{ verticalAlign: 'sub' }}>
          <i className="ri-star-fill ri-xl" title="Avancé"></i>
          <i className="ri-star-fill ri-xl" title="Avancé"></i>
          <i className="ri-star-fill ri-xl" title="Avancé"></i>
        </span>
      </p>;
    default:
      return <p>Degr&eacute; de maîtrise non communiqu&eacute;</p>;
  }
};
