import React from 'react';
import PropTypes from 'prop-types';

function ElementNumber(props) {
  return (
    <div className={props.classe}>{props.nombre}{props.caracteresSpeciaux ?? ''}</div>
  );
}

ElementNumber.propTypes = {
  nombre: PropTypes.number,
  caracteresSpeciaux: PropTypes.string,
  classe: PropTypes.string
};

export default ElementNumber;
