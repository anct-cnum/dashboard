export function sortByMonthAndYear(a, b) {
  if (a.annee === b.annee) {
    if (a.mois < b.mois) {
      return -1;
    }
    if (a.mois > b.mois) {
      return 1;
    }
    return 0;
  } else {
    return a.annee < b.annee ? -1 : 1;
  }
}

export function get4lastMonths(month, year) {
  let monthToPrint = [month];
  let yearAssociated = [year];
  let lastInsertedMonth = month;
  let lastInsertedYear = year;
  for (let i = 0; i < 3; i++) {
    lastInsertedYear = lastInsertedMonth - 1 === -1 ? lastInsertedYear - 1 : lastInsertedYear;
    lastInsertedMonth = lastInsertedMonth - 1 === -1 ? 11 : lastInsertedMonth - 1; //11 = décembre dans Date
    monthToPrint.push(lastInsertedMonth);
    yearAssociated.push(lastInsertedYear.toString());
  }
  return [monthToPrint, yearAssociated];
}
