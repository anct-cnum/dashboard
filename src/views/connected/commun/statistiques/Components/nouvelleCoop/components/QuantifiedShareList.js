import React, { useMemo, useState } from 'react';
import Button from '@codegouvfr/react-dsfr/Button';
// import QuantifiedShare from './QuantifiedShareLegend';
import ProgressListItem from './ProgressListItem';

import PropTypes from 'prop-types';

const orderQuantifiedShares = (
  quantifiedShares,
  order,
) => {
  if (!order) {
    return quantifiedShares;
  }
  return quantifiedShares.sort((a, b) => {
    if (a.count > b.count) {
      return order === 'asc' ? 1 : -1;
    }
    if (a.count < b.count) {
      return order === 'asc' ? -1 : 1;
    }
    return 0;
  });
};

const QuantifiedShareList = ({
  quantifiedShares,
  limit,
  order,
  colors = [],
}) => {
  const listShouldBeTruncacted =
    !!limit?.count && quantifiedShares.length > limit.count;

  const [displayFullList, setdisplayFullList] = useState(false);

  const maxProportion = useMemo(
    () =>
      quantifiedShares.reduce(
        (max, quantifiedShare) =>
          quantifiedShare.proportion > max ? quantifiedShare.proportion : max,
        0,
      ),
    [quantifiedShares],
  );

  const orderedQuantifiedShares = orderQuantifiedShares(quantifiedShares, order);

  const quantifiedSharesToDisplay =
    !listShouldBeTruncacted || displayFullList ?
      orderedQuantifiedShares :
      orderedQuantifiedShares.slice(0, limit.count);

  return (
    <>
      <ul className="fr-px-0">
        {quantifiedSharesToDisplay.map(item => (
          <ProgressListItem
            {...item}
            key={item.label}
            colors={colors}
            maxProportion={maxProportion}
          />
        ))}
      </ul>
      {listShouldBeTruncacted && (
        <Button
          type="button"
          size="small"
          priority="tertiary no outline"
          className="fr-mt-2w"
          onClick={() => setdisplayFullList(!displayFullList)}
        >
          {displayFullList ? (
            limit.hideLabel
          ) : (
            <>
              {limit.showLabel} · {quantifiedShares.length - limit.count}
            </>
          )}
          <span
            className={
              displayFullList ?
                'fr-ml-1w ri-arrow-up-s-line' :
                'fr-ml-1w ri-arrow-down-s-line'
            }
            aria-hidden
          />
        </Button>
      )}
    </>
  );
};

QuantifiedShareList.propTypes = {
  quantifiedShares: PropTypes.string,
  limit: {
    showLabel: PropTypes.string,
    hideLabel: PropTypes.string,
    count: PropTypes.number,
  },
  order: PropTypes.string,
  colors: PropTypes.array,
};

export default QuantifiedShareList;
