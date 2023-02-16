import React from 'react';
import PropTypes from 'prop-types';

const SelectOptions = ({ options, valueName, labelName, subLabelName, title, defaultValue }) => {
  return (
    <React.Fragment>
      <option value={defaultValue}>{title}</option>
      {options?.map((option, idx) => (
        <option key={idx} value={option[valueName]}>
          {subLabelName && `${option[subLabelName]} - `} {option[labelName]}
        </option>
      ))}
    </React.Fragment>
  );
};
  
SelectOptions.propTypes = {
  options: PropTypes.array,
  valueName: PropTypes.string,
  labelName: PropTypes.string,
  subLabelName: PropTypes.string,
  title: PropTypes.string,
  defaultValue: PropTypes.any
};

export default SelectOptions;
