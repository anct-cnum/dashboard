import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomSelect from './CustomSelect';
import FilterTag from './FilterTag';

const MediateurFilter = ({
  onChange,
  defaultValue,
  initialMediateursOptions,
}) => {

  const [mediateur, setMediateur] = useState(null);

  useEffect(() => {
    const initMediateur = initialMediateursOptions.find(
      option => option.value?.mediateurId === defaultValue,
    ) ?? null;
    setMediateur(initMediateur);
  }, [initialMediateursOptions]);

  const onClear = () => {
    onChange(null);
    setMediateur(null);
  };

  const valueLabel = option => option?.label ?? null;

  const onSelectChange = option => {
    if (option?.value?.mediateurId === null) {
      return onClear();
    }

    setMediateur(option);
    onChange(option.value.mediateurId);
  };

  return (
    <FilterTag
      value={mediateur}
      valueLabel={valueLabel}
      onClear={onClear}
      label="Tous les médiateurs"
    >
      <div style={{ width: 460 }}>
        <CustomSelect
          instanceId="mediateur-filter-search"
          placeholder="Rechercher un médiateur"
          className="fr-mb-2v fr-mt-3v"
          options={initialMediateursOptions}
          onChange={onSelectChange}
        />
      </div>
    </FilterTag>
  );
};

MediateurFilter.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  initialMediateursOptions: PropTypes.array,
};

export default MediateurFilter;
