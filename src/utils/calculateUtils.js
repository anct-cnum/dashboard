export const calculateMonthsDifference = (dateDebut, dateFin) => {
  const startDate = new Date(dateDebut);
  const endDate = new Date(dateFin);
  
  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += endDate.getMonth();
  
  return months <= 0 ? 0 : months;
};
