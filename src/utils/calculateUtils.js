import dayjs from 'dayjs';

export const calculateMonthsDifference = (dateDebut, dateFin) => {
  const startDate = new Date(dateDebut);
  const endDate = new Date(dateFin);
  
  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += endDate.getMonth();
  
  return months <= 0 ? 0 : months;
};

export const calcNbJoursAvantDateFinContrat = dateFinContrat => {
  const dateFin = dayjs(dateFinContrat);
  const dateAujourdhui = dayjs();
  const nbJours = dateFin.diff(dateAujourdhui, 'day');

  return Math.max(nbJours, 0);
};

export const isContractExpiring = dateFinDeContrat => {
  const daysLeft = calcNbJoursAvantDateFinContrat(dateFinDeContrat);
  return daysLeft <= 30 && daysLeft > 0;
};
