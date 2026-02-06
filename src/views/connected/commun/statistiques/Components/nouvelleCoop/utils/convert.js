import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/fr';

dayjs.extend(utc);
dayjs.locale('fr');

export const numberToString = value => value?.toLocaleString('fr-FR');

export const sPluriel = count => (count === 1 ? '' : 's');


const parseDateLocal = dateInput => {
  if (typeof dateInput === 'number') {
    return dayjs.utc(dateInput).startOf('day');
  }

  if (dateInput instanceof Date) {
    return dayjs.utc(dateInput).startOf('day');
  }

  if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}/.test(dateInput)) {
    const [y, m, d] = dateInput.split('T')[0].split('-');
    return dayjs.utc(new Date(Date.UTC(y, m - 1, d)));
  }

  return dayjs(dateInput);
};

export const dateAsFull = date => {
  const result = parseDateLocal(date).format('dddd D MMMM YYYY');

  return result;
};

export const dateAsDay = date => parseDateLocal(date).format('DD.MM.YYYY');

export const dateAsIsoDay = date => parseDateLocal(date).format('YYYY-MM-DD');

export const dateAsFR = date => parseDateLocal(date).format('DD/MM/YYYY');

export const dateAsFRDate = date => new Date(parseDateLocal(date).toDate());
