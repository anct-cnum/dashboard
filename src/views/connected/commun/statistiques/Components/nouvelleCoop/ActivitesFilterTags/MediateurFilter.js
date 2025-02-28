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
  const [key, setKey] = useState(0);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const closeMenu = () => setMenuIsOpen(false);

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
    debounce(value => {
      dispatch(statistiquesActions.getConseillersNouvelleCoop(value));
    }, 1000)
    , []);

  const handleChangeValueSearchInSelect = (value, { action }) => {
    if (action === 'input-change') {
      debouncedDispatch(value);
      setSearchParNomEtOuPrenom(value);
    }
  };

  const loadOptionsConseiller = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(initialMediateursOptions);
        setKey(prevKey => prevKey + 1);
        setMenuIsOpen(true);
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

  useEffect(() => {
    if (defaultValue) {
      const initMediateur = initialMediateursOptions.find(
        option => option.value?.mediateurId === defaultValue,
      ) ?? null;

      setMediateur(initMediateur);
    }
  }, [initialMediateursOptions]);

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
            key={key}
            instanceId="mediateur-filter-search"
            placeholder="Rechercher un médiateur"
            className="fr-mb-2v fr-mt-3v"
            defaultOptions={initialMediateursOptions}
            onChange={onSelectChange}
            onInputChange={handleChangeValueSearchInSelect}
            loadOptions={loadOptionsConseiller}
            defaultValue={searchParNomEtOuPrenom}
            inputValue={searchParNomEtOuPrenom}
            menuIsOpen={menuIsOpen}
            onMenuClose={closeMenu}
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
