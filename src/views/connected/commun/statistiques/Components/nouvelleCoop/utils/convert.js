import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/fr';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('fr');

export const numberToString = value => value?.toLocaleString('fr-FR');

export const sPluriel = count => (count === 1 ? '' : 's');

const parseDateLocal = dateInput => {
  if (typeof dateInput === 'number' || dateInput instanceof Date) {
    return dayjs.utc(dateInput).tz('Europe/Paris', false);
  }

  if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}/.test(dateInput)) {
    const [y, m, d] = dateInput.split('T')[0].split('-');
    return dayjs.tz(`${y}-${m}-${d}`, 'Europe/Paris');
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

export const dateAsFRDate = date => {
  const parsed = parseDateLocal(date);
  return new Date(parsed.year(), parsed.month(), parsed.date(), 12, 0, 0);
};
