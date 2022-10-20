import React from 'react';
import PropTypes from 'prop-types';
import CustomDatePicker from '../commun/CustomDatePicker';

function BlockDatePickers({ dateDebut, dateFin }) {

  return (
    <>
      <span>P&eacute;riode du &nbsp;</span><br className="periode-xs"/>
      <span id="span-datePickerDebut" >
        <CustomDatePicker initDate={dateDebut} dateFin={dateFin} idDate="datePickerDebut" nomDate="datePickerDebut"/>
      </span>
      <span>&nbsp;au&nbsp;</span>
      <span id="span-datePickerFin">
        <CustomDatePicker initDate={dateFin} dateDebut={dateDebut} idDate="datePickerFin" nomDate="datePickerFin"/>
      </span>
    </>
  );
}

BlockDatePickers.propTypes = {
  dateDebut: PropTypes.instanceOf(Date),
  dateFin: PropTypes.instanceOf(Date),
};


export default BlockDatePickers;
