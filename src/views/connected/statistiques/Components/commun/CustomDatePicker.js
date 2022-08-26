import React, { forwardRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { statistiquesActions } from '../../../../../actions';

registerLocale('fr', fr);

function CustomDatePicker({ idDate, nomDate, initDate, dateDebut, dateFin }) {
  const dispatch = useDispatch();

  const setDate = date => {
    if (nomDate === 'datePickerDebut') {
      if (date <= dateFin) {
        dispatch(statistiquesActions.changeDateDebut(date));
      }
    } else if (date >= dateDebut) {
      dispatch(statistiquesActions.changeDateFin(date));
    }
  };

  const [active, setActive] = useState(false);

  const CustomDateInput = forwardRef(
    ({ value, onClick }, ref) => (
      <span className={active ? 'date-btn date-active' : 'date-btn' } onClick={onClick} ref={ref}>
        <b>{value}</b>
        <i className={active ? 'fr-icon-arrow-up-s-line chevron-stats' : 'fr-icon-arrow-down-s-line chevron-stats' }></i>
      </span>
    ),
  );
  CustomDateInput.displayName = 'CustomDateInput';

  return (
    <DatePicker
      id={idDate}
      name={nomDate}
      dateFormat="dd/MM/yyyy"
      locale="fr"
      selected={initDate}
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
  value: PropTypes.instanceOf(Date),
  onClick: PropTypes.string,
};

export default CustomDatePicker;
