import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import iconeIndividuel from '../../../../../../../assets/icons/accompagnement-individuel.svg';
import iconeDemarche from '../../../../../../../assets/icons/demarche-administrative.svg';
import iconeCollectif from '../../../../../../../assets/icons/accompagnement-collectif.svg';

const typeActivitePluralLabels = {
  Individuel: 'Accompagnements individuels',
  Demarche: 'Aides aux démarches administratives',
  Collectif: 'Ateliers collectifs',
};

const typeActiviteIllustrations = {
  Individuel: iconeIndividuel,
  Demarche: iconeDemarche,
  Collectif: iconeCollectif,
};

const numberToString = value => value?.toLocaleString('fr-FR');
export const numberToPercentage = value =>
  `${value.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  // eslint-disable-next-line no-irregular-whitespace
  })} %`;

const StatistiqueAccompagnement = ({
  typeActivite,
  count,
  proportion,
  className,
  children,
}) => (
  <div
    className={classNames(
      className,
      'fr-flex fr-align-items-center fr-flex-gap-4v',
    )}
  >
    <div className="fr-py-1v fr-px-2v fr-border-radius--8 fr-background-default--grey">
      <img src={typeActiviteIllustrations[typeActivite]} />
    </div>
    <div>
      <div className="fr-flex fr-direction-row fr-flex-gap-3v fr-align-items-baseline">
        <span className="fr-h4 fr-mb-0">{numberToString(count ?? 0)}</span>
        <span className="fr-text-mention--grey ">
          {numberToPercentage(proportion)}
        </span>
      </div>
      <div className="fr-text--sm fr-mb-0">
        {typeActivitePluralLabels[typeActivite]}
      </div>
      <div className="fr-text--sm fr-text-mention--grey fr-mb-0">
        {children}
      </div>
    </div>
  </div>
);

StatistiqueAccompagnement.propTypes = {
  typeActivite: PropTypes.string,
  count: PropTypes.number,
  proportion: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.object,
};

export default StatistiqueAccompagnement;
