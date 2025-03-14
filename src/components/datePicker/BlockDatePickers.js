import React from 'react';
import PropTypes from 'prop-types';
import CustomDatePicker from './CustomDatePicker';

function BlockDatePickers({ dateDebut, dateFin, dateFinMax }) {

  return (
    <>
      <span>P&eacute;riode du &nbsp;</span><br className="periode-xs" />
      <span id="span-datePickerDebut" >
        <CustomDatePicker initDate={dateDebut} dateFin={dateFin} idDate="datePickerDebut" nomDate="datePickerDebut" />
      </span>
      <span>&nbsp;au&nbsp;</span>
      <span id="span-datePickerFin">
        <CustomDatePicker initDate={dateFin} dateDebut={dateDebut} dateFinMax={dateFinMax} idDate="datePickerFin" nomDate="datePickerFin" />
      </span>
    </>
  );
}

BlockDatePickers.propTypes = {
  dateDebut: PropTypes.instanceOf(Date),
  dateFin: PropTypes.instanceOf(Date),
  dateFinMax: PropTypes.instanceOf(Date),
};


export default BlockDatePickers;
