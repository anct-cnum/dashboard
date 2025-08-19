import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { filtresCoopActions } from '../../../../../../../actions/filtresCoopActions';
import { Popover } from './Popover';
import classNames from 'classnames';
import { format as dateFnsFormat } from 'date-fns';
import dayjs from 'dayjs';
import FilterFooter from './elements/FilterFooter';
import TriggerButton from './elements/TriggerButton';
import styles from './Calendar.module.css';
import { dateAsIsoDay } from '../utils/convert';
import ReactCalendar from 'react-calendar';

const dateFormatter = (format, options) =>
  (date => formatDate(date, format, options));

function formatDate(
  date,
  format,
  options
) {
  if (!date) {
    return date;
  }
  return dateFnsFormat(date, format, options);
}

const today = dateAsIsoDay(new Date());

const tileClassName = ({ date }) => {
  if (dateAsIsoDay(date) === today) {
    return styles.today;
  }
  return '';
};

const dayLetterFormatter = dateFormatter('E');

const formatShortWeekday = (
  _locale,
  date,
) => dayLetterFormatter(date).charAt(0).toUpperCase();

const FilterCalendar = ({
  defaultValue,
  onChange,
  title,
  value,
  maxDate,
  minDate,
}) => (
  <div
    className={classNames('fr-flex fr-align-items-center fr-direction-column')}
  >
    <h4 className="fr-text--bold fr-text--md fr-mb-2v">{title}</h4>
    <ReactCalendar
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      selectRange={false}
      minDate={minDate}
      maxDate={maxDate}
      minDetail="year"
      className={classNames(styles.calendar)}
      tileClassName={tileClassName}
      formatShortWeekday={formatShortWeekday}
    />
  </div>
);

export const PeriodeFilter = ({
  minDate,
  maxDate,
  defaultValue,
}) => {
  const navigate = useNavigate();
  const searchParams = useLocation();
  const params = new URLSearchParams(searchParams.search.toString());
  const dispatch = useDispatch();
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [start, setStart] = useState(
    defaultValue ? new Date(defaultValue.du) : minDate,
  );
  const [end, setEnd] = useState(
    defaultValue ? new Date(defaultValue.au) : maxDate,
  );

  useEffect(() => {
    setStart(start < new Date('2024-11-15') ? minDate : start);
    setEnd(end);
  }, [defaultValue]);

  const onStartChange = value => {
    if (!value || Array.isArray(value)) {
      return setStart(null);
    }

    if (end && value > end) {
      setEnd(null);
      setStart(value);
      return;
    }
    setStart(value);
  };

  const onEndChange = value => {
    if (!value || Array.isArray(value)) {
      return setStart(null);
    }

    if (start && value < start) {
      setStart(null);
      setEnd(value);
      return;
    }
    setEnd(value);
  };

  const closePopover = (close = false) => {
    if (close) {
      setIsOpen(false);
    }
    navigate(`?${params}`, { scroll: false, replace: true });
  };

  const handleSubmit = (close = false) => {
    if (start === null || end === null) {
      params.delete('du');
      params.delete('au');
      return;
    }
    if (isSubmitClicked) {
      dispatch(filtresCoopActions.changeDateDebut(dayjs(dateAsIsoDay(start) ?? minDate).format('YYYY-MM-DD')));
      dispatch(filtresCoopActions.changeDateFin(dayjs(dateAsIsoDay(end) ?? maxDate).format('YYYY-MM-DD')));
      setIsSubmitClicked(false);
    }
    params.set('du', dateAsIsoDay(start));
    params.set('au', dateAsIsoDay(end));
    closePopover(close);
  };

  const handleClearFilters = () => {
    setStart(null);
    setEnd(null);
    dispatch(filtresCoopActions.changeDateDebut(dayjs(minDate).format('YYYY-MM-DD')));
    dispatch(filtresCoopActions.changeDateFin(dayjs(maxDate).format('YYYY-MM-DD')));
    params.delete('du');
    params.delete('au');
    closePopover(true);
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      onInteractOutside={() => handleSubmit()}
      onEscapeKeyDown={() => handleSubmit()}
      trigger={
        <TriggerButton isOpen={isOpen} isFilled={start !== null && end !== null}>
          {start && end ?
            `${formatDate(start, 'dd.MM.yy')} - ${formatDate(end, 'dd.MM.yy')}` :
            'Période'}
        </TriggerButton>
      }
    >
      <div className="fr-flex fr-flex-gap-4v">
        <FilterCalendar
          minDate={minDate}
          onChange={onStartChange}
          title="Début"
          value={start}
        />
        <FilterCalendar
          maxDate={maxDate}
          onChange={onEndChange}
          title="Fin"
          value={end}
        />
      </div>

      {start && end && (
        <form onSubmit={() => handleSubmit(true)}>
          <FilterFooter onClearFilters={handleClearFilters} />
        </form>
      )}
    </Popover>
  );
};

PeriodeFilter.propTypes = {
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  defaultValue: PropTypes.object,
};

FilterCalendar.propTypes = {
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  defaultValue: PropTypes.array,
  title: PropTypes.string,
  value: PropTypes.instanceOf(Date),

};

export default PeriodeFilter;
