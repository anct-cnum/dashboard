import React from 'react';
import Select, { createFilter } from 'react-select';
import PropTypes from 'prop-types';

export function FilterSelect({ options, getOptionLabel, getOptionValue, onChange, placeholder, noOptionsMessage, filterOption }) {

  return (
    <Select options={options}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      onChange={onChange}
      placeholder={placeholder}
      noOptionsMessage={noOptionsMessage}
      isClearable
      filterOption={createFilter(filterOption)}
      styles={{
        menuList: baseStyles => ({
          ...baseStyles,
          maxHeight: '14.2rem',
        }),
        control: baseStyles => ({
          ...baseStyles,
          borderRadius: '0.25rem 0.25rem 0 0',
          borderWidth: '0',
          backgroundColor: 'var(--background-contrast-grey)',
          cursor: 'pointer',
          fontFamily: 'Marianne, arial, sans-serif',
          boxShadow: 'inset 0 -2px 0 0 var(--border-plain-grey)',
          paddingTop: '0.2rem',
          paddingBottom: '0.2rem',
        }),
        option: (base, state) => ({
          ...base,
          height: '100%',
          cursor: 'pointer',
          backgroundColor: state.isFocused ? 'var(--background-action-high-blue-france)' : '',
          color: state.isFocused ? 'var(--text-inverted-blue-france)' : 'var(--text-label-grey)',
        }),
      }}
    />
  );
}

FilterSelect.propTypes = {
  options: PropTypes.array,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  noOptionsMessage: PropTypes.func,
  filterOption: PropTypes.func,
};

export default FilterSelect;
