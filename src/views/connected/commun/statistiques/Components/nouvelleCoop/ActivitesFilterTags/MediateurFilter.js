import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import CustomSelect from './CustomSelect';
import FilterTag from './FilterTag';
import { statistiquesActions } from '../../../../../../../actions';
import { useDispatch } from 'react-redux';

const MediateurFilter = ({
  onChange,
  defaultValue,
  initialMediateursOptions,
  isActiveSearch
}) => {

  const dispatch = useDispatch();
  const [mediateur, setMediateur] = useState(null);
  const [searchParNomEtOuPrenom, setSearchParNomEtOuPrenom] = useState('');

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

  const debouncedDispatch = useCallback(
    debounce(valueInput => {
      dispatch(dispatch(statistiquesActions.getConseillersNouvelleCoop(valueInput)));
    }, 500)
    , []);

  const handleChangeValueSearchInSelect = value => {
    setSearchParNomEtOuPrenom(value);
    debouncedDispatch(value);
  };

  const loadOptionsConseiller = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const optionsConseiller = initialMediateursOptions.filter(option =>
          option.label.toLowerCase().includes(searchParNomEtOuPrenom.toLowerCase())
        );

        resolve(optionsConseiller);
      }, 1000);
    });
  };
  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  return (
    <FilterTag
      value={mediateur}
      valueLabel={valueLabel}
      onClear={onClear}
      label="Tous les médiateurs"
    >
      <div style={{ width: 456 }}>
        {isActiveSearch &&
          <CustomSelect
            instanceId="mediateur-filter-search"
            placeholder="Rechercher un médiateur"
            className="fr-mb-2v fr-mt-3v"
            onChange={onSelectChange}
            onInputChange={handleChangeValueSearchInSelect}
            loadOptions={loadOptionsConseiller}
          />
        }
        {!isActiveSearch &&
          <CustomSelect
            instanceId="mediateur-filter-search"
            placeholder="Rechercher un médiateur"
            className="fr-mb-2v fr-mt-3v"
            options={initialMediateursOptions}
            onChange={onSelectChange}
          />
        }
      </div>
    </FilterTag>
  );
};

MediateurFilter.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  initialMediateursOptions: PropTypes.array,
  isActiveSearch: PropTypes.bool,
};

export default MediateurFilter;
