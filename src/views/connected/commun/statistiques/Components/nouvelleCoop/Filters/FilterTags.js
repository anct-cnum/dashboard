import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { dateAsDay } from '../utils/convert';
import Button from '@codegouvfr/react-dsfr/Button';
import Tag from '@codegouvfr/react-dsfr/Tag';
export const typeActiviteLabels = {
  Individuel: 'Accompagnement individuel',
  Collectif: 'Atelier collectif',
};
export const typeActiviteForSlug =
{
  individuel: 'Individuel',
  demarche: 'Demarche',
  collectif: 'Collectif',
};
export const typeActiviteSlugLabels = {
  individuel: typeActiviteLabels[typeActiviteForSlug.individuel],
  collectif: typeActiviteLabels[typeActiviteForSlug.collectif],
};
export const generateActivitesPeriodeFilterLabel = ({
  au,
  du,
}) => ({
  label: `${dateAsDay(new Date(du) < new Date('2024-11-15') ? new Date('2024-11-15') : new Date(du))} - ${dateAsDay(new Date(au))}`,
  key: ['du', 'au'],
  type: 'periode',
});
export const generateActivitesFiltersLabels = (
  {
    mediateurs,
    types,
    departements,
    au,
    du,
  },
  {
    mediateursOptions,
    departementsOptions,
  }
) => {
  const periode =
    du && au ?
      generateActivitesPeriodeFilterLabel({
        du,
        au,
      }) :
      null;

  const typesLabel = types ?
    types.map(type => ({
      label: typeActiviteSlugLabels[type],
      key: type,
      type: 'types',
    })) :
    [];
  const generateMediateurFilterLabel = (
    { mediateurs = [] },
    { mediateursOptions = [] },
  ) =>
    mediateursOptions
    .filter(
      ({ value }) =>
        value?.mediateurId && mediateurs.includes(value.mediateurId),
    )
    .map(({ label, value }) => ({
      label,
      key: value?.mediateurId,
      type: 'mediateurs',
    }));
  const mediateursLabels = generateMediateurFilterLabel(
    { mediateurs },
    { mediateursOptions },
  );
  const generateLieuxLabels = (
    {
      departements = [],
    },
    {
      departementsOptions = [],
    },
  ) => [
    ...departementsOptions
    .filter(({ value }) => departements?.includes(value))
    .map(({ label, value }) => ({
      label,
      key: value,
      type: 'departements',
    })),
  ];
  const lieuxLabels = generateLieuxLabels(
    { departements },
    { departementsOptions },
  );

  return [
    ...mediateursLabels,
    ...(periode === null ? [] : [periode]),
    ...lieuxLabels,
    ...typesLabel,
  ];
};
const labelPrefixes = {
  departements: 'Département : ',

};
export const toLieuPrefix = ({
  label,
  type,
  key,
}) => ({
  label: labelPrefixes[type] ? `${labelPrefixes[type]}${label}` : label,
  type,
  key,
});

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

  const filterLabelsToDisplay = generateActivitesFiltersLabels(filters, {
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
    filterLabelsToDisplay.length > 0 && (
      <>
        <div className="fr-flex fr-justify-content-space-between fr-mb-2v">
          <ul className="fr-tags-group">
            {filterLabelsToDisplay.map(filter => (
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
