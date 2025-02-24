import React, {
  useEffect,
  useRef,
  useState
} from 'react';

import Tag from '@codegouvfr/react-dsfr/Tag';
import classNames from 'classnames';
import { useOnClickOutside } from 'usehooks-ts';
import styles from './FilterTag.module.css';
import PropTypes from 'prop-types';

const FilterTag = ({
  label,
  children,
  value,
  valueLabel,
  onClear,
}) => {
  const [open, setOpen] = useState(false);

  const hasValue = value !== null;

  // eslint-disable-next-line no-nested-ternary
  const state = hasValue ? 'active' : open ? 'open' : 'idle';

  const onClick = event => {
    event.stopPropagation();
    event.preventDefault();

    if (hasValue) {
      onClear();
      return setOpen(false);
    }

    return setOpen(!open);
  };

  const iconId =
    // eslint-disable-next-line no-nested-ternary
    state === 'idle' ?
      'fr-icon-arrow-down-s-line' :
      state === 'open' ?
        'fr-icon-arrow-up-s-line' :
        'fr-icon-close-line';

  const buttonRef = useRef(null);
  const collapseRef = useRef(null);

  useOnClickOutside(collapseRef, event => {
    // Let the event propagate if clicked on the control button
    if (event.target === buttonRef?.current) {
      return;
    }

    // Close the dropdown if open on outside click
    buttonRef.current?.click();
  });

  const activeLabel = value === null ? null : valueLabel(value);

  useEffect(() => {
    // Value changed
    if (activeLabel) {
      setOpen(false);
    }
    setOpen(false);


  }, [activeLabel, label]);

  return (
    <div className={styles.container}>
      <Tag
        ref={buttonRef}
        className={classNames(
          state === 'active' && styles.active,
          state === 'open' && styles.open,
        )}
        nativeButtonProps={{
          onClick,
        }}
      >
        {activeLabel ?? label}
        <span
          className={classNames('fr-ml-1v fr-icon--sm', iconId)}
          style={{ pointerEvents: 'none' }}
        />
      </Tag>
      {state === 'open' && (
        <div className={classNames(styles.content)} ref={collapseRef}>
          {children}
        </div>
      )}
    </div>
  );
};

FilterTag.propTypes = {
  label: PropTypes.string,
  children: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  valueLabel: PropTypes.func,
  onClear: PropTypes.func,
};

export default FilterTag;
