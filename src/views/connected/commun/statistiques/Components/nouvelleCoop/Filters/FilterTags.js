import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@codegouvfr/react-dsfr/Button';
import Tag from '@codegouvfr/react-dsfr/Tag';
import { filterLabelsToDisplay, toLieuPrefix } from '../../utils/functionLabel';

const FilterTags = ({
  filters,
  mediateursOptions,
  departementsOptions,
  setMediateursCache,
  isActiveSearch
}) => {
  const navigate = useNavigate();
  const searchParams = useLocation();
  const params = new URLSearchParams(searchParams.search.toString());

  const filterLabels = filterLabelsToDisplay(filters, {
    departementsOptions,
    mediateursOptions,
  }).map(toLieuPrefix);

  const handleRemoveFilter = (key, value) => {
    if (Array.isArray(value)) {
      for (const param of value) {
        params.delete(param);
      }
      return navigate(`?${params}`, { scroll: false, replace: true });
    }

    const updatedValues = (params.get(key)?.split(',') ?? []).filter(
      v => v !== value,
    );

    if (updatedValues.length > 0) {
      params.set(key, updatedValues.join(','));
    } else {
      params.delete(key);
    }
    if (isActiveSearch) {
      setMediateursCache(mediateursOptions.filter(i => i.value.mediateurId !== value));
    }
    navigate(`?${params}`, { scroll: false, replace: true });
  };

  const handleClearFilters = () => {
    navigate('?', { scroll: false, replace: true });
  };

  return (
    filterLabels.length > 0 && (
      <>
        <div className="fr-flex fr-justify-content-space-between fr-mb-2v">
          <ul className="fr-tags-group">
            {filterLabels.map(filter => (
              <li
                className="fr-line-height-1"
                key={`${filter.type}-${filter.key}`}
              >
                <Tag
                  className="fr-pr-3v"
                  small
                  nativeButtonProps={{
                    type: 'button',
                    onClick: () =>
                      handleRemoveFilter(filter.type, filter.key ?? []),
                  }}
                >
                  {!['periode'].includes(filter.type) &&
                  <span className="fr-icon-close-line fr-icon--xs" />
                  }
                  &nbsp;{filter.label}
                </Tag>
              </li>
            ))}
          </ul>
          <div>
            <Button priority="tertiary no outline" onClick={handleClearFilters}>
              <span className="ri-close-circle-line" aria-hidden={true} />
              &nbsp;Effacer&nbsp;les&nbsp;filtres
            </Button>
          </div>
        </div>
        <hr className="fr-mt-4v fr-pb-3v" />
      </>
    )
  );
};


FilterTags.propTypes = {
  filters: PropTypes.object,
  mediateursOptions: PropTypes.array,
  departementsOptions: PropTypes.array,
  setMediateursCache: PropTypes.func,
  isActiveSearch: PropTypes.bool,
};

export default FilterTags;
