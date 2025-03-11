import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import CustomSelect from './CustomSelect';
import TriggerButton from './TriggerButton';
import { Popover } from './Popover';
import FilterFooter from './elements/FilterFooter';
import FilterSelection from './elements/FilterSelection';
import { statistiquesActions } from '../../../../../../../actions';
import { filtresCoopActions } from '../../../../../../../actions/filtresCoopActions';

import {
  availableOptionsIn,
  defautValuesFrom,
  matchingOption,
  update
} from './elements/helpers';

const onlyDefinedIds =
  mediateurOption =>
    mediateurOption.value?.mediateurId !== null;

const toSelectOption = ({
  label,
  value: { mediateurId: value },
}) => ({
  label,
  value,
});

export const MediateurFilter = ({
  defaultValue,
  initialMediateursOptions,
  isActiveSearch
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = useLocation();
  const params = new URLSearchParams(searchParams.search.toString());
  const [searchParNomEtOuPrenom, setSearchParNomEtOuPrenom] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const optonsSelectAll = [{ label: 'Tous les médiateurs', value: initialMediateursOptions.map(option => option.value.mediateurId) }];

  const mediateursOptions = initialMediateursOptions
  .filter(onlyDefinedIds)
  .map(toSelectOption);

  const selectedMediateurs = mediateursOptions.filter(
    defautValuesFrom(new Set(defaultValue)),
  );

  const [mediateurs, setMediateurs] = useState(selectedMediateurs);
  useEffect(() => {
    setMediateurs(selectedMediateurs);
  }, [initialMediateursOptions]);

  const hasFilters = mediateurs.length > 0;

  const closePopover = (close = false) => {
    if (close) {
      setIsOpen(false);
    }
    navigate(`?${params}`, { scroll: false, replace: true });
  };

  const handleSubmit = (close = false) => {
    dispatch(filtresCoopActions.changeMediateurs(mediateurs.map(e => e.value)));
    update(params)('mediateurs', mediateurs);
    closePopover(close);
  };

  const handleClearFilters = () => {
    setMediateurs([]);
    update(params)('mediateurs', []);
    closePopover(true);
  };

  const handleSelectFilter = option => {
    if (!option) {
      return handleClearFilters();
    }
    if (option.label === 'Tous les mediateurs') {
      setMediateurs(mediateursOptions);
    } else {
      setMediateurs([...mediateurs, option]);
    }
  };

  const handleRemoveFilter = option =>
    setMediateurs(mediateurs.filter(matchingOption(option)));

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
        resolve(mediateursOptions.filter(availableOptionsIn(mediateurs)));
      }, 500);
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
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      onInteractOutside={() => handleSubmit()}
      onEscapeKeyDown={() => handleSubmit()}
      trigger={
        <TriggerButton isOpen={isOpen} isFilled={hasFilters}>
          Médiateur{hasFilters && ` · ${mediateurs.length}`}
        </TriggerButton>
      }
    >
      <form style={{ width: 384 }} onSubmit={() => handleSubmit(true)}>
        <label
          className="fr-label fr-mb-1v fr-text--bold"
          htmlFor="mediateur-filter"
        >
          Filtrer par&nbsp;:
        </label>
        {isActiveSearch &&
          <CustomSelect
            instanceId="mediateur-filter-search"
            placeholder="Rechercher un médiateur"
            className="fr-mb-2v fr-mt-3v"
            defaultOptions={mediateursOptions.filter(availableOptionsIn(mediateurs))}
            onChange={handleSelectFilter}
            onInputChange={handleChangeValueSearchInSelect}
            loadOptions={loadOptionsConseiller}
            inputValue={searchParNomEtOuPrenom}
            value={[]}
          />
        }
        {!isActiveSearch &&
          <CustomSelect
            inputId="mediateur-filter"
            instanceId="mediateur-filter-search"
            placeholder="Choisir un médiateur numérique"
            className="fr-mb-2v fr-mt-3v"
            options={optonsSelectAll.concat(mediateursOptions).filter(availableOptionsIn(mediateurs))}
            onChange={handleSelectFilter}
            value={[]}
          />
        }
        {hasFilters && (
          <>
            <FilterSelection
              options={mediateurs}
              onRemoveFilter={handleRemoveFilter}
              label={{
                singular: 'médiateur sélectionné',
                plural: 'médiateurs sélectionnés',
              }}
            />
            <FilterFooter onClearFilters={handleClearFilters} />
          </>
        )}
      </form>
    </Popover>
  );
};


MediateurFilter.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.array,
  initialMediateursOptions: PropTypes.array,
  isActiveSearch: PropTypes.bool,
};

export default MediateurFilter;
