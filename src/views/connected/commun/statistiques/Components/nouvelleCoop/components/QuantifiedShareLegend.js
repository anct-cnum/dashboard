import React from 'react';
import classNames from 'classnames';
const numberToString = value => value?.toLocaleString('fr-FR');

export const optionalNumberToString = (
  value,
  defaultValue,
) =>
  typeof value === 'number' ? numberToString(value) : (defaultValue ?? '');

const numberToPercentage = value =>
  `${value.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  // eslint-disable-next-line no-irregular-whitespace
  })} %`;


import PropTypes from 'prop-types';

export const QuantifiedShareLegend = ({
  colors,
  quantifiedShares,
  classeName,
}) => (
  <ul className={classNames('fr-width-full fr-px-0', classeName)}>
    {quantifiedShares.map(({ label, count, proportion }, index) => (
      <li key={label} className="fr-grid-row fr-text--sm fr-mb-1w">
        <span
          className="ri-circle-fill fr-mr-1w"
          style={{ color: colors[index % colors.length] }}
        />
        <span className="fr-col">{label}</span>
        <span className="fr-pr-2w fr-text--bold">
          {numberToString(count ?? 0)}
        </span>
        <span className="fr-col-3 fr-text--medium fr-text-mention--grey fr-text--right">
          {numberToPercentage(proportion)}
        </span>
      </li>
    ))}
  </ul>
);

QuantifiedShareLegend.propTypes = {
  colors: PropTypes.array,
  quantifiedShares: PropTypes.array,
  classeName: PropTypes.string
};

export default QuantifiedShareLegend;
