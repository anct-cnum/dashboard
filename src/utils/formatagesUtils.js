import dayjs from 'dayjs';

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


export const checkComplexity = password => {
  const check = new RegExp(
    /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,199})/
  );
  
  return check.test(password);
};

export const validInputSiret = siret => {
  const regexValidSiret = new RegExp(/^[0-9]{14}$/);
  
  return regexValidSiret.test(siret);
};

export const formatNomConseiller = conseiller =>
  (conseiller?.nom + ' ' + conseiller?.prenom).toLowerCase().replace(/(^\w{1})|([\s,-]+\w{1})/g, letter => letter.toUpperCase());
