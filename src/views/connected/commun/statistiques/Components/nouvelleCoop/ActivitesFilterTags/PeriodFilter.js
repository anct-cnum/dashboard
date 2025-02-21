import React, { useState } from 'react';
import { format as dateFnsFormat } from 'date-fns';
import ReactCalendar from 'react-calendar';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import FilterTag from './FilterTag';
import styles from './Calendar.module.css';
import { dateAsDay, dateAsIsoDay } from '../utils/convert';

const valueLabel = value => (
  <>
    {dateAsDay(value.du)}&nbsp;-&nbsp;{dateAsDay(value.au)}
  </>
);

const maxDate = new Date();
const today = dateAsIsoDay(new Date());

const tileClassName = ({ date }) => {
  if (dateAsIsoDay(date) === today) {
    return styles.today;
  }
  return '';
};

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
const dateFormatter = (format, options) =>
  (date => formatDate(date, format, options));

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
  minDate = new Date('2024-01-01'),
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

const PeriodFilter = ({
  minDate,
  onChange,
  defaultValue,
}) => {
  const [start, setStart] = useState(
    defaultValue ? new Date(defaultValue.du) : null,
  );
  const [end, setEnd] = useState(
    defaultValue ? new Date(defaultValue.au) : null,
  );

  const onStartChange = value => {
    if (Array.isArray(value)) {
      return;
    }
    if (!value) {
      return setStart(null);
    }

    if (end && value > end) {
      setEnd(null);
      setStart(value);
      return;
    }

    setStart(value);
    if (end) {
      onChange({
        du: dateAsIsoDay(value),
        au: dateAsIsoDay(end),
      });
    }
  };

  const onEndChange = value => {
    if (Array.isArray(value)) {
      return;
    }
    if (!value) {
      return setEnd(null);
    }

    if (start && value < start) {
      setStart(null);
      setEnd(value);
      return;
    }

    setEnd(value);
    if (start) {
      onChange({
        du: dateAsIsoDay(start),
        au: dateAsIsoDay(value),
      });
    }
  };

  const onClear = () => {
    setStart(null);
    setEnd(null);
    onChange(null);
  };

  const tagValue = start && end ? { du: start, au: end } : null;

  return (
    <FilterTag
      value={tagValue}
      valueLabel={valueLabel}
      onClear={onClear}
      label="Période"
    >
      <div className="fr-flex fr-flex-gap-4v">
        <FilterCalendar
          minDate={minDate}
          onChange={onStartChange}
          title="Début"
          value={start}
        />
        <FilterCalendar
          minDate={minDate}
          onChange={onEndChange}
          title="Fin"
          value={end}
        />
      </div>
    </FilterTag>
  );
};

PeriodFilter.propTypes = {
  minDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  defaultValue: PropTypes.object,
};

FilterCalendar.propTypes = {
  minDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.instanceOf(Date),

};

export default PeriodFilter;
