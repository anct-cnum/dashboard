import React from 'react';
import classNames from 'classnames';
// import { materielIcons } from '@app/web/cra/cra';
import PropTypes from 'prop-types';
const materielIcons = {
  Ordinateur: { icon: 'ri-computer-line' },
  Telephone: { icon: 'ri-smartphone-line' },
  Tablette: { icon: 'ri-tablet-line', rotation: -90 },
  Autre: { icon: 'ri-remote-control-line' },
  Aucun: { icon: 'ri-loader-fill' },
};
const numberToString = value => value?.toLocaleString('fr-FR');

const numberToPercentage = value =>
  `${value.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  // eslint-disable-next-line no-irregular-whitespace
  })} %`;

export const StatistiqueMateriel = ({
  label,
  value,
  count,
  proportion,
  className,
}) => (
  <div className={classNames('fr-text--center', className)}>
    <div className="fr-background-alt--blue-france fr-p-2w fr-mb-3v fr-border-radius--8 fr-display-inline-block">
      <div
        style={
          materielIcons[value].rotation ?
            { transform: `rotate(${materielIcons[value].rotation}deg)` } :
            {}
        }
        className={`${materielIcons[value].icon} ri-lg fr-line-height-1 fr-text-label--blue-france`}
        aria-hidden
      />
    </div>
    <div className="fr-flex fr-flex-gap-2v fr-justify-content-center">
      <span className="fr-text--bold">{numberToString(count)}</span>
      <span className="fr-text-mention--grey">
        {numberToPercentage(proportion)}
      </span>
    </div>
    {label}
  </div>
);

StatistiqueMateriel.propTypes = {
  label: PropTypes.string,
  count: PropTypes.number,
  value: PropTypes.string,
  proportion: PropTypes.number,
  className: PropTypes.string,
};
export default StatistiqueMateriel;
