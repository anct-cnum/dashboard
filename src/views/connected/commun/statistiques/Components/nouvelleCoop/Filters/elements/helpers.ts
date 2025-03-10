export const matchingOption =
  option =>
    ({ value }) =>
      value !== option.value;

const toValue = ({ value }) => value

export const update =
  params => (type, options) =>
    options.length > 0 ?
      params.set(type, options.map(toValue).join(',')) :
      params.delete(type);


export const defautValuesFrom =
  defaultValues =>
    ({ value }) =>
      defaultValues.has(value);

export const availableOptionsIn =
  options => option =>
    options.every(({ value }) => value !== option.value);
