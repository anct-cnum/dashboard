import React from 'react';
import PropTypes from 'prop-types';
const numberToString = value => value?.toLocaleString('fr-FR');

const numberToPercentage = value =>
  `${value.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    // eslint-disable-next-line no-irregular-whitespace
  })} %`;

import ProgressBar from './ProgressBar';

const ProgressListItem = ({
  label,
  count,
  proportion,
  maxProportion,
  colors = [],
}) => (
  <li className="fr-grid-row fr-grid-row--gutters fr-text--sm fr-mb-0 fr-align-items-center">
    <span className="fr-sm-col fr-col-12">{label}</span>
    <span className="fr-col-md-1 fr-col-2 fr-text--right fr-text--bold fr-whitespace-nowrap">
      {numberToString(count)}
    </span>
    <span className="fr-col-1 fr-text--right fr-text--medium fr-text-mention--grey fr-whitespace-nowrap">
      {numberToPercentage(proportion)}
    </span>
    <ProgressBar
      className="fr-col fr-my-auto"
      progress={[
        {
          label,
          percentage:
            maxProportion === 0 ? 0 : (100 * proportion) / maxProportion,
        },
      ]}
      colors={colors}
    />
  </li>
);

ProgressListItem.propTypes = {
  label: PropTypes.string,
  count: PropTypes.number,
  proportion: PropTypes.number,
  maxProportion: PropTypes.number,
  colors: PropTypes.array,
};
export default ProgressListItem;
