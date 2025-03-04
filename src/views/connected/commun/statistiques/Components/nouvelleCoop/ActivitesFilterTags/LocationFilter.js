import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomSelect from './CustomSelect';
import FilterTag from './FilterTag';

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

const locationValuePlaceholder = {
  departement: 'Choisir un département',
};

const LocationFilter = ({
  onChange,
  defaultValue,
  departementsOptions,
}) => {
  const [locationType, setLocationType] = useState(
    defaultValue?.type ?? 'departement',
  );

  const [locationValue, setLocationValue] = useState(
    defaultValue?.value ?? null,
  );

  const onValueChange = option => {
    if (!option || !option.value) {
      return setLocationValue(null);
    }

    setLocationValue(option.value);
    onChange({
      type: 'departement',
      value: option?.value,
    });
  };

  const onClear = () => {
    onChange(null);
    setLocationType('departement');
    setLocationValue(null);
  };

  const optionsForType = type =>
    type === 'departement' ?
      departementsOptions :
      [];

  const filterValue =
                locationType && locationValue ?
                  { type: locationType, value: locationValue } :
                  null;

  const valueLabel = location => {
    if (!location) {
      return null;
    }

    return (
      optionsForType(location.type).find(({ value }) => value === locationValue)
      ?.label ?? null
    );
  };

  const locationValueForTypeOptions = optionsForType(locationType);

  const defaultLocationValue =
                locationType && locationValue ?
                  locationValueForTypeOptions.find(({ value }) => value === locationValue) :
                  undefined;

  const valuePlaceholder = locationType ? locationValuePlaceholder[locationType] :
    undefined;

  return (
    <FilterTag
      value={filterValue}
      valueLabel={valueLabel}
      onClear={onClear}
      label="Lieu"
    >
      <div style={{ width: 460 }}>
        {locationType && (
          <CustomSelect
            className="fr-mt-4v"
            key={locationType}
            instanceId="location-filter-value"
            options={locationValueForTypeOptions}
            defaultValue={defaultLocationValue}
            onChange={onValueChange}
            placeholder={valuePlaceholder}
          />
        )}
      </div>
    </FilterTag>
  );
};

LocationFilter.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.object,
  departementsOptions: PropTypes.array,
};

export default LocationFilter;
