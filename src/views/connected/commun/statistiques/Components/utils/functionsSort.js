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
