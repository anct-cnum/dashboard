import Button from '@codegouvfr/react-dsfr/Button';
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const TriggerButton = forwardRef(
  ({ isOpen, isFilled = false, children, ...props }, ref) => (
    <Button
      ref={ref}
      priority={isFilled ? 'secondary' : 'tertiary'}
      {...props}
      className={classNames(
        'fr-border-radius--4',
        isFilled && 'fr-background-alt--blue-france',
        isOpen && 'fr-background-contrast--grey',
      )}
    >
      {children}{' '}
      <span
        className={classNames(
          'fr-ml-1v fr-icon--sm',
          isOpen ? 'fr-icon-arrow-up-s-line' : 'fr-icon-arrow-down-s-line',
        )}
        aria-hidden="true"
      />
    </Button>
  ),
);

TriggerButton.displayName = 'TriggerButton';

TriggerButton.propTypes = {
  isOpen: PropTypes.bool,
  isFilled: PropTypes.bool,
  children: PropTypes.array,
};


export default TriggerButton;
