import React from 'react';
import Tag from '@codegouvfr/react-dsfr/Tag';
import PropTypes from 'prop-types';

const FilterSelection = ({
  options,
  label,
  onRemoveFilter,
}) => {
  return (
    <>
      <hr className="fr-separator-1px fr-my-6v fr-mx-n8v" />
      <span className="fr-text--bold">
        {options.length}&nbsp;
        {options.length > 1 ? label.plural : label.singular}
      </span>
      <ul className="fr-list-group fr-flex fr-flex-wrap fr-flex-gap-1v fr-mt-2v">
        {options.map(option => (
          <li key={option.value} className="fr-pb-0">
            <Tag
              nativeButtonProps={{
                type: 'button',
                onClick: () => onRemoveFilter(option),
              }}
            >
              {option.label}&nbsp;
              <span className="fr-icon-close-line fr-icon--sm" />
            </Tag>
          </li>
        ))}
      </ul>
    </>
  );
};


FilterSelection.propTypes = {
  options: PropTypes.object,
  label: PropTypes.object,
  onRemoveFilter: PropTypes.func,
};

export default FilterSelection;
