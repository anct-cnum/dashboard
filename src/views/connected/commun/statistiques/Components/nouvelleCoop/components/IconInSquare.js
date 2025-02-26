
import React from 'react';
import classNames from 'classnames';
import styles from './IconInSquare.module.css';
import PropTypes from 'prop-types';

const IconInSquare = ({
  className,
  iconId,
  size = 'medium',
  background = 'fr-background-alt--blue-france',
}) => (
  <div
    className={classNames(
      background,
      'fr-border-radius--8',
      styles.container,
      styles[size],
      className,
    )}
  >
    <span
      className={classNames('fr-text-title--blue-france', styles.icon, iconId)}
      aria-hidden
    />
  </div>
);


IconInSquare.propTypes = {
  background: PropTypes.string,
  className: PropTypes.string,
  iconId: PropTypes.string,
  size: PropTypes.string,
};
export default IconInSquare;
