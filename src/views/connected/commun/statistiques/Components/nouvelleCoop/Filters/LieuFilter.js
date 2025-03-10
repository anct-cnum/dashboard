import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomSelect from './CustomSelect';
import { Popover } from './Popover';
import FilterFooter from './elements/FilterFooter';
import FilterSelection from './elements/FilterSelection';
import TriggerButton from './elements/TriggerButton';
import {
  availableOptionsIn,
  defautValuesFrom,
  matchingOption,
  update
} from './elements/helpers';
import { useDispatch } from 'react-redux';
import { filtresCoopActions } from '../../../../../../../actions/filtresCoopActions';

export const locationTypeLabels = {
  departement: 'Département',
};
export const labelsToOptions = (
  object,
  { hints } = {},
) =>
  Object.entries(object).map(([value, label]) =>
    hints ? ({
      label,
      value,
      hint: hints[value],
    }) : ({ label, value }),
  );

const lieuPlaceholder = {
  departement: 'Choisir un département',
};

const LieuFilter = ({
  defaultValue = [],
  departementsOptions = [],
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = useLocation();
  const params = new URLSearchParams(searchParams.search.toString());

  const [isOpen, setIsOpen] = useState(false);

  const [lieuFilterType, setLieuFilterType] = useState({
    departement: 'Choisir un département',
  });

  const defaultValueSet = new Set(defaultValue.flatMap(({ value }) => value));


  const filteredDepartementsOptions = departementsOptions.filter(
    defautValuesFrom(defaultValueSet),
  );
  const [departements, setDepartements] = useState(filteredDepartementsOptions);

  useEffect(() => {
    setDepartements(filteredDepartementsOptions);
  }, [departementsOptions]);

  const allFilters = [...departements];
  const hasFilters = allFilters.length > 0;

  const optionsForType = {
    departement: departementsOptions.filter(availableOptionsIn(departements)),
  };

  const closePopover = (close = false) => {
    setLieuFilterType({
      departement: 'Choisir un département',
    });
    if (close) {

      setIsOpen(false);
    }
    navigate(`?${params}`, { scroll: false, replace: true });
  };

  const handleSubmit = (close = false) => {
    dispatch(filtresCoopActions.changeDepartements(departements));
    update(params)('departements', departements);
    closePopover(close);
  };

  const handleClearFilters = () => {
    setDepartements([]);

    update(params)('departements', []);

    closePopover(true);
  };

  const handleSelectFilter = option => {
    if (!option || !lieuFilterType) {
      return handleClearFilters();
    }
    setDepartements(value => [...value, option]);
  };

  const handleRemoveFilter = option => {
    setDepartements(departements.filter(matchingOption(option)));

  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      onInteractOutside={() => handleSubmit()}
      onEscapeKeyDown={() => handleSubmit()}
      trigger={
        <TriggerButton isOpen={isOpen} isFilled={hasFilters}>
          Lieu{hasFilters && <>&nbsp;·&nbsp;{allFilters.length}</>}
        </TriggerButton>
      }
    >
      <form style={{ width: 384 }} onSubmit={e => handleSubmit(true, e)}>
        <label
          className="fr-label fr-mb-1v fr-text--bold"
          htmlFor="lieu-filter"
        >
          Filtrer par&nbsp;:
        </label>
        <CustomSelect
          instanceId="location-filter-value"
          placeholder={lieuPlaceholder['departement']}
          className="fr-mb-2v fr-mt-3v"
          options={optionsForType['departement']}
          onChange={handleSelectFilter}
          value={[]}
        />

        {hasFilters && (
          <>
            <FilterSelection
              options={allFilters}
              onRemoveFilter={handleRemoveFilter}
              label={{
                singular: 'lieu sélectionné',
                plural: 'lieux sélectionnés',
              }}
            />
            <FilterFooter onClearFilters={handleClearFilters} />
          </>
        )}
      </form>
    </Popover>
  );
};


LieuFilter.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.array,
  departementsOptions: PropTypes.array,
};

export default LieuFilter;
