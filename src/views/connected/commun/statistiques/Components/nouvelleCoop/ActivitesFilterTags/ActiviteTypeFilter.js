import React, { useState } from 'react';
import classNames from 'classnames';
import FilterTag from './FilterTag';
import PropTypes from 'prop-types';

export const locationTypeLabels = {
  lieu: 'Lieu d’activité',
  commune: 'Commune',
  departement: 'Département',
};
export const typeActiviteForSlug =
{
  individuel: 'Individuel',
  demarche: 'Demarche',
  collectif: 'Collectif',
};
export const typeActiviteLabels = {
  Individuel: 'Accompagnement individuel',
  Demarche: 'Aide aux démarches administratives',
  Collectif: 'Atelier collectif',
};

export const typeActiviteSlugLabels = {
  individuel: typeActiviteLabels[typeActiviteForSlug.individuel],
  demarche: typeActiviteLabels[typeActiviteForSlug.demarche],
  collectif: typeActiviteLabels[typeActiviteForSlug.collectif],
};
const valueLabel = value => typeActiviteSlugLabels[value];
export const labelsToOptions = (
  object,
  { hints } = {},
) =>
  Object.entries(object).map(([value, label]) =>
    hints ?
      ({
        label,
        value,
        hint: hints[value],
      }) :
      ({ label, value }),
  );
const typeActiviteSlugOptions = labelsToOptions(typeActiviteSlugLabels);
const typeActiviteOptions = labelsToOptions(typeActiviteLabels);
const ActiviteTypeFilter = ({
  onChange,
  defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue ?? null);

  const onClear = () => {
    onChange(null);
    setValue(null);
  };
  const onFormChange = event => {
    setValue(event.target.value);
    onChange(event.target.value);
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <FilterTag
      value={value}
      valueLabel={valueLabel}
      onClear={onClear}
      label="Type"
    >
      <fieldset className="fr-fieldset fr-mb-0">
        {typeActiviteSlugOptions.map(({ label, value: optionValue }, index) => {
          const id = `activite-filter-radio-${optionValue}`;

          return (
            <div
              className={classNames(
                'fr-fieldset__element',
                index === typeActiviteOptions.length - 1 && 'fr-mb-0',
              )}
              key={optionValue}
            >
              <div className="fr-radio-group">
                <input
                  type="radio"
                  id={id}
                  name="activite-type"
                  value={optionValue}
                  checked={value === optionValue}
                  onChange={onFormChange}
                />
                <label className="fr-label fr-whitespace-nowrap" htmlFor={id}>
                  {label}
                </label>
              </div>
            </div>
          );
        })}
      </fieldset>
    </FilterTag>
  );
};

ActiviteTypeFilter.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.object,
};

export default ActiviteTypeFilter;
