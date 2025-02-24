import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import PeriodFilter from './PeriodFilter';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { filtresCoopActions } from '../../../../../../../actions/filtresCoopActions';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ActiviteTypeFilter from './ActiviteTypeFilter';
import MediateurFilter from './MediateurFilter';

dayjs.extend(customParseFormat);

const replaceRouteWithNewParams = ({
  pathname,
  searchParams,
  newParams,
  navigate,
}) => {
  const newSearchParams = new URLSearchParams(searchParams.search.toString());

  for (const [key, value] of Object.entries(newParams)) {
    if (value === null) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }
  }

  // We always return to page 1 when changing filters
  newSearchParams.delete('page');

  navigate(`${pathname}?${newSearchParams.toString()}`, {
    replace: true
  });
};

const createRouteParamsReplacer =
  ({
    pathname,
    searchParams,
    navigate,
  }) =>
    newParams =>
      replaceRouteWithNewParams({
        pathname,
        searchParams,
        newParams,
        navigate,
      });


const ActivitesFilterTags = ({
  defaultFilters,
  initialMediateursOptions,
  minDate,
  maxDate,
  className,
}) => {

  const navigate = useNavigate();
  const searchParams = useLocation();
  const pathname = useLocation().pathname;

  const replaceRouteParams = useMemo(
    () =>
      createRouteParamsReplacer({
        navigate,
        searchParams,
        pathname,
      }),
    [navigate, searchParams, pathname],
  );
  const defaultPeriod =
    defaultFilters?.au && defaultFilters?.du ?
      {
        du: defaultFilters.du,
        au: defaultFilters.au,
      } :
      undefined;
  const dispatch = useDispatch();

  function onPeriodChange(value) {
    dispatch(filtresCoopActions.changeDateDebut(dayjs(value?.du ?? minDate).format('YYYY-MM-DD')));
    dispatch(filtresCoopActions.changeDateFin(dayjs(value?.au ?? maxDate).format('YYYY-MM-DD')));

    return replaceRouteParams(
      value === null ? { du: null, au: null } : { du: value.du, au: value.au },
    );
  }
  const onActiviteTypeChange = type => {
    dispatch(filtresCoopActions.changeType(type));
    replaceRouteParams({ type });
  };

  const onMediateurChange = mediateurId => {
    dispatch(filtresCoopActions.changeMediateur(mediateurId));
    replaceRouteParams({ mediateur: mediateurId });
  };

  return (
    <div
      className={classNames(
        'fr-flex fr-align-items-start fr-flex-gap-2v fr-mb-4w',
        className,
      )}
    >
      <p className="fr-text--sm fr-text--medium fr-mb-0 fr-mt-1v">
        Filtres&nbsp;:
      </p>
      <div className="fr-flex fr-flex-gap-2v fr-flex-wrap">
        <MediateurFilter
          onChange={onMediateurChange}
          initialMediateursOptions={initialMediateursOptions}
          defaultValue={defaultFilters.mediateur}
        />
        <PeriodFilter
          onChange={onPeriodChange}
          minDate={minDate ?? new Date()}
          defaultValue={defaultPeriod}
        />
        <ActiviteTypeFilter
          onChange={onActiviteTypeChange}
          defaultValue={defaultFilters.type}
        />
      </div>
    </div>
  );
};

ActivitesFilterTags.propTypes = {
  defaultFilters: PropTypes.object,
  initialMediateursOptions: PropTypes.array,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
};

export default ActivitesFilterTags;
