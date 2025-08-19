import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  const optonsSelectAll = [{ label: 'Tous les conseillers numériques', value: initialMediateursOptions.map(option => option.value.mediateurId) }];
  const loadingOptions = useSelector(state => state.filtresCoop?.loadingOptions);

  const mediateursOptions = initialMediateursOptions
  .filter(onlyDefinedIds)
  .map(toSelectOption);

  const selectedMediateurs = mediateursOptions.filter(
    defautValuesFrom(new Set(defaultValue)),
  );

  const [mediateurs, setMediateurs] = useState(selectedMediateurs);

  useEffect(() => {
    if (isActiveSearch) {
      const includesOptions = initialMediateursOptions.map(i => i.value?.mediateurId);
      const mediateursCacheSansDoublon =
        [...new Map([...mediateurs, ...selectedMediateurs]
        .map(item => [item.value, item])).values()]
        .filter(i => includesOptions.includes(i.value));
      setMediateurs(mediateursCacheSansDoublon);
    } else {
      setMediateurs(selectedMediateurs);
    }
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
    setSearchParNomEtOuPrenom('');
    update(params)('mediateurs', []);
    closePopover(true);
  };

  const handleSelectFilter = option => {
    if (!option) {
      return handleClearFilters();
    }
    if (option.label === 'Tous les conseillers numériques') {
      setMediateurs(mediateursOptions);
    } else {
      setSearchParNomEtOuPrenom('');
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
          Conseiller numérique{hasFilters && ` · ${mediateurs.length}`}
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
            placeholder="Rechercher un conseiller numérique"
            className="fr-mb-2v fr-mt-3v"
            options={mediateursOptions.filter(availableOptionsIn(mediateurs))}
            onChange={handleSelectFilter}
            isLoading={loadingOptions}
            onInputChange={handleChangeValueSearchInSelect}
            inputValue={searchParNomEtOuPrenom}
            cacheOptions
            value={[]}
          />
        }
        {!isActiveSearch &&
          <CustomSelect
            inputId="mediateur-filter"
            instanceId="mediateur-filter-search"
            placeholder="Choisir un conseiller numérique"
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
                singular: 'conseiller numérique sélectionné',
                plural: 'conseillers sélectionnés',
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
