import React from 'react';
import PropTypes from 'prop-types';

const SelectOptions = ({ options, valueName, labelName, title }) => {
  return (
    <React.Fragment>
      <option value={'tous'}>{title}</option>
      {options?.map((option, idx) => (
        <option key={idx} value={option[valueName]}>
          {option[labelName]}
        </option>
      ))}
    </React.Fragment>
  );
};
  
SelectOptions.propTypes = {
  options: PropTypes.array,
  valueName: PropTypes.string,
  labelName: PropTypes.string,
  title: PropTypes.string
};

export default SelectOptions;
