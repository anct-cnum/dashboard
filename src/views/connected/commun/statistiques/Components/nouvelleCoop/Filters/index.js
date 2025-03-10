import React from 'react';
import classNames from 'classnames';

import PeriodeFilter from './PeriodeFilter';
import PropTypes from 'prop-types';
import ActiviteTypeFilter from './ActiviteTypeFilter';
import MediateurFilter from './MediateurFilter';
import LieuFilter from './LieuFilter';


const FiltersCoop = ({
  defaultFilters,
  initialMediateursOptions,
  departementsOptions,
  minDate,
  maxDate,
  className,
  isActiveSearch,
}) => (
  <div
    className={classNames(
      'fr-flex fr-align-items-start fr-flex-wrap fr-flex-gap-2v',
      className,
    )}
  >
    <MediateurFilter
      initialMediateursOptions={initialMediateursOptions}
      defaultValue={defaultFilters.mediateurs ?? []}
      isActiveSearch={isActiveSearch}
    />
    <PeriodeFilter
      minDate={minDate}
      maxDate={maxDate}
      defaultValue={
        defaultFilters.au && defaultFilters.du ?
          {
            du: defaultFilters.du,
            au: defaultFilters.au,
          } :
          undefined
      }
    />
    <LieuFilter
      defaultValue={[
        {
          type: 'departement',
          value: defaultFilters.departements,
        },
      ]}
      departementsOptions={departementsOptions}
    />
    <ActiviteTypeFilter defaultValue={defaultFilters.types ?? []} />
  </div>
);

FiltersCoop.propTypes = {
  defaultFilters: PropTypes.object,
  initialMediateursOptions: PropTypes.array,
  departementsOptions: PropTypes.array,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  isActiveSearch: PropTypes.bool,
};

export default FiltersCoop;

