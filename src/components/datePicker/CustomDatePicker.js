import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { datePickerActions } from '../../actions/datePickerActions';
import { useLocation } from 'react-router-dom';
import { offset } from '@floating-ui/dom';

registerLocale('fr', fr);

function CustomDatePicker({ idDate, nomDate, initDate, dateDebut, dateFin, dateFinMax }) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const { state } = useLocation();

  const setDate = date => {
    if (nomDate === 'datePickerDebut') {
      if (date <= dateFin) {
        dispatch(datePickerActions.changeDateDebut(date));
      }
    } else if (date >= dateDebut) {
      dispatch(datePickerActions.changeDateFin(date));
    }
  };

  useEffect(() => {
    if (!state?.origin?.includes('/statistiques') && !location?.pathname?.startsWith('/statistiques')) {
      dispatch(datePickerActions.resetDatePicker());
    }
  }, [location]);

  const CustomDateInput = forwardRef(
    ({ value, onClick }, ref) => (
      <span className={`date-btn ${active ?? 'date-active'}`} onClick={onClick} ref={ref}>
        <b>{value}</b>
        <i className={`chevron-stats ${active ? 'fr-icon-arrow-up-s-line' : 'fr-icon-arrow-down-s-line chevron-stats'}`}></i>
      </span>
    ),
  );
  CustomDateInput.displayName = 'CustomDateInput';

  return (
    <DatePicker
      id={idDate}
      name={nomDate}
      maxDate={dateFinMax ?? new Date()}
      dateFormat="dd/MM/yyyy"
      locale="fr"
      popperClassName="datePicker-custom-css"
      popperProps={{
        middleware: [
          offset(({ rects }) => ({
            alignmentAxis: -rects.reference.height / 2 - rects.floating.height / 2,
          })),
        ],
      }}
      selected={dateFinMax ?? initDate}
      onChange={date => setDate(date)}
      onCalendarOpen={() => setActive(true)}
      onCalendarClose={() => setActive(false)}
      customInput={<CustomDateInput />}
      disabledKeyboardNavigation
    />
  );
}

CustomDatePicker.propTypes = {
  idDate: PropTypes.string,
  nomDate: PropTypes.string,
  initDate: PropTypes.instanceOf(Date),
  dateDebut: PropTypes.instanceOf(Date),
  dateFin: PropTypes.instanceOf(Date),
  dateFinMax: PropTypes.instanceOf(Date),
  value: PropTypes.instanceOf(Date),
  onClick: PropTypes.string,
};

export default CustomDatePicker;
