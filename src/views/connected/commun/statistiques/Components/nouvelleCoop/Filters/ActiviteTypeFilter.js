
import React, { useEffect, useState } from 'react';
import FilterFooter from './elements/FilterFooter';
import TriggerButton from './elements/TriggerButton';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { filtresCoopActions } from '../../../../../../../actions/filtresCoopActions';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { Popover } from './Popover';

export const typeActiviteForSlug =
{
  individuel: 'Individuel',
  demarche: 'Demarche',
  collectif: 'Collectif',
};
export const typeActiviteLabels = {
  Individuel: 'Accompagnement individuel',
  Collectif: 'Atelier collectif',
};

export const typeActiviteSlugLabels = {
  individuel: typeActiviteLabels[typeActiviteForSlug.individuel],
  collectif: typeActiviteLabels[typeActiviteForSlug.collectif],
};

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
  defaultValue = [],
}) => {
  const navigate = useNavigate();
  const searchParams = useLocation();
  const params = new URLSearchParams(searchParams.search.toString());
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const [activiteTypes, setActiviteTypes] = useState(defaultValue);

  useEffect(() => {
    setActiviteTypes(defaultValue);
  }, [defaultValue]);

  const hasFilters = activiteTypes.length > 0;

  const closePopover = close => {
    if (close) {
      setIsOpen(false);
    }
    navigate(`?${params}`, { scroll: false, replace: true });
  };

  const handleSubmit = (close = false) => {
    if (activiteTypes.length > 0) {
      params.set('types', activiteTypes.join(','));
    } else {
      params.delete('types');
    }
    dispatch(filtresCoopActions.changeTypes(activiteTypes));
    closePopover(close);
  };

  const handleClearFilters = () => {
    setActiviteTypes([]);
    params.delete('types');
    closePopover(true);
  };

  const handleSelectFilter = option => {
    return option.target.checked ?
      setActiviteTypes([
        ...activiteTypes,
        option.target.value,
      ]) :
      setActiviteTypes(
        activiteTypes.filter(type => type !== option.target.value),
      );
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      onInteractOutside={() => handleSubmit()}
      onEscapeKeyDown={() => handleSubmit()}
      trigger={
        <TriggerButton isOpen={isOpen} isFilled={hasFilters}>
          Type{hasFilters && ` · ${activiteTypes.length}`}
        </TriggerButton>
      }
    >
      <form style={{ width: 384 }} onSubmit={() => handleSubmit(true)}>
        <fieldset className="fr-fieldset fr-mb-0">
          <label className="fr-label fr-mb-2v fr-text--bold">
            Filtrer par&nbsp;:
          </label>
          {typeActiviteSlugOptions.map(
            ({ label, value: optionValue }, index) => {
              const id = `activite-filter-radio-${optionValue}`;

              return (
                <div
                  className={classNames(
                    'fr-fieldset__element',
                    index === typeActiviteOptions.length - 1 && 'fr-mb-0',
                  )}
                  key={optionValue}
                >
                  <div className="fr-checkbox-group">
                    <input
                      type="checkbox"
                      id={id}
                      name="types"
                      value={optionValue}
                      defaultChecked={defaultValue?.includes(optionValue)}
                      onChange={handleSelectFilter}
                    />
                    <label
                      className="fr-label fr-whitespace-nowrap"
                      htmlFor={id}
                    >
                      {label}
                    </label>
                  </div>
                </div>
              );
            },
          )}
        </fieldset>
        <FilterFooter onClearFilters={handleClearFilters} />
      </form>
    </Popover>
  );
};


ActiviteTypeFilter.propTypes = {
  defaultValue: PropTypes.array,
};

export default ActiviteTypeFilter;
