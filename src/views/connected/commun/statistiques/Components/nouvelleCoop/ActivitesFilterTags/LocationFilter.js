import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomSelect from './CustomSelect';
import FilterTag from './FilterTag';
import { locationTypeLabels } from './generateActivitesFiltersLabels';

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

const locationTypeOptions = labelsToOptions(locationTypeLabels);

const locationValuePlaceholder = {
  departement: 'Choisir un département',
};

const LocationFilter = ({
  onChange,
  defaultValue,
  communesOptions,
  departementsOptions,
  lieuxActiviteOptions,
}) => {
  const [locationType, setLocationType] = useState(
    defaultValue?.type ?? null,
  );

  const [locationValue, setLocationValue] = useState(
    defaultValue?.value ?? null,
  );

  const onTypeChange = option => {
    setLocationType(option?.value ?? null);
    setLocationValue(null);
  };

  const onValueChange = option => {
    if (!option || !locationType || !option.value) {
      return setLocationValue(null);
    }

    setLocationValue(option.value);
    onChange({
      type: locationType,
      value: option?.value,
    });
  };

  const onClear = () => {
    onChange(null);
    setLocationType(null);
    setLocationValue(null);
  };

  const optionsForType = type =>
  // eslint-disable-next-line no-nested-ternary
    type ?
    // eslint-disable-next-line no-nested-ternary
      type === 'commune' ?
        communesOptions :
        type === 'departement' ?
          departementsOptions :
          lieuxActiviteOptions :
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

  const defaultTypeValue =
                locationType ?
                  locationTypeOptions.find(({ value }) => value === locationType) :
                  undefined;

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
        <CustomSelect
          instanceId="location-filter-type"
          options={locationTypeOptions}
          defaultValue={defaultTypeValue}
          onChange={onTypeChange}
          placeholder="Choisir un type de localisation"
        />
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
  communesOptions: PropTypes.array,
  departementsOptions: PropTypes.array,
  lieuxActiviteOptions: PropTypes.array,
};

export default LocationFilter;
