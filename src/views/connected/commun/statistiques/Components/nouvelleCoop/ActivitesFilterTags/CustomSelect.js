import React from 'react';
import Select from 'react-select';
import Spinner from '../../../../../../../components/Spinner';

import styles from './CustomSelect.module.css';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

// TODO The custom theme is not sufficient for DSFR implementation, we should replace components and/or override classes
// See https://react-select.com/styles
const customTheme = {
  borderRadius: 4,
  spacing: {
    baseUnit: 6,
    menuGutter: 6,
    controlHeight: 38,
  },
  colors: {
    primary: 'var(--blue-france-975-75)', // Selected option (text is white...)
    primary75: 'var(--grey-950-100-active)', // ?
    primary50: 'var(--grey-950-100)', // Active option
    primary25: 'var(--grey-975-75)', // Hover option
    danger: 'var(--red-marianne-425-625)',
    dangerLight: 'var(--red-marianne-850-200)',
    neutral0: 'var(--grey-1000-50)',
    neutral5: 'var(--grey-925-125)',
    neutral10: 'var(--grey-950-125-hover)',
    neutral20: 'var(--grey-950-125-active)',
    neutral30: 'var(--grey-625-425)',
    neutral40: 'var(--grey-425-625)', // Button Color
    neutral50: 'var(--grey-425-625)', // Placeholder
    neutral60: 'var(--grey-425-625)',
    neutral70: 'var(--grey-200-850)',
    neutral80: 'var(--grey-50-1000)', // Value text
    neutral90: 'var(--grey-0-1000)',
  },
};

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'var(--text-black-white-grey)' : provided.color,
  }),
  control: provided => ({
    ...provided,
    borderColor: 'var(--border-default-grey)',
  }),
};

const loadingMessage = () => (
  <div className={styles.loadingSpinnerContainer}>
    <Spinner />
  </div>
);

const noOptionsMessage = () => (
  <div className={styles.noOptionsContainer}>Aucun résultat</div>
);


const CustomSelect = ({
  components,
  ...props
}) => {
  const classNames = {
    container: () => styles.container,
    control: () => styles.control,
    valueContainer: () => styles.valueContainer,
    ...props.classNames,
  };

  const componentsWithValueContainer = {
    ...components,
  };

  if (props.loadOptions) {
    return (
      <AsyncSelect
        {...props}
        components={componentsWithValueContainer}
        loadingMessage={props.loadingMessage ?? loadingMessage}
        noOptionsMessage={props.noOptionsMessage ?? noOptionsMessage}
        theme={customTheme}
        styles={customStyles}
        classNames={classNames}
      />
    );
  }

  return (
    <Select
      {...props}
      components={componentsWithValueContainer}
      loadingMessage={props.loadingMessage ?? loadingMessage}
      noOptionsMessage={props.noOptionsMessage ?? noOptionsMessage}
      theme={customTheme}
      styles={customStyles}
      classNames={classNames}
    />
  );
};

CustomSelect.propTypes = {
  components: PropTypes.object,
  classNames: PropTypes.func,
  loadingMessage: PropTypes.bool,
  noOptionsMessage: PropTypes.bool,
  loadOptions: PropTypes.bool

};

export default CustomSelect;
