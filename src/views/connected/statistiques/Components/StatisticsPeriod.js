import React from 'react';
import PropTypes from 'prop-types';

import ElementDatePicker from './ElementDatePicker';

function StatisticsPeriod({ dateDebut, dateFin }) {

  return (
    <>
      <span>P&eacute;riode du &nbsp;</span><br className="periode-xs"/>
      <span id="span-datePickerDebut" >
        <ElementDatePicker initDate={dateDebut} dateFin={dateFin} idDate="datePickerDebut" nomDate="datePickerDebut"/>
      </span>
      <span id="span-datePickerFin" >
        &nbsp;au&nbsp;
        <ElementDatePicker initDate={dateFin} dateDebut={dateDebut} idDate="datePickerFin" nomDate="datePickerFin"/>
      </span>
    </>
  );
}

StatisticsPeriod.propTypes = {
  dateDebut: PropTypes.instanceOf(Date),
  dateFin: PropTypes.instanceOf(Date),
};


export default StatisticsPeriod;
