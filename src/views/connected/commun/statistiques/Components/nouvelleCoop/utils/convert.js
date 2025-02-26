import dayjs from 'dayjs';

export const numberToString = value => value?.toLocaleString('fr-FR');

export const sPluriel = count => (count === 1 ? '' : 's');

export const dateAsDay = date => dayjs(date).format('DD.MM.YYYY');

export const dateAsIsoDay = date => dayjs(date).format('YYYY-MM-DD');
