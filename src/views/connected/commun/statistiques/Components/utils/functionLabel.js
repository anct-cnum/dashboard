import { dateAsDay } from '../nouvelleCoop/utils/convert';
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

export const toLieuPrefix = ({
  label,
  type,
  key,
}) => ({
  label,
  type,
  key,
});

export const generateActivitesPeriodeFilterLabel = ({
  au,
  du,
}) => ({
  label: `${dateAsDay(new Date(du) < new Date('2020-11-17') ? new Date('2020-11-17') : new Date(du))} - ${dateAsDay(new Date(au))}`,
  key: ['du', 'au'],
  type: 'periode',
});

const generateActivitesFiltersLabels = (
  {
    mediateurs,
    types = [],
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

  const typesLabel = types ? types.map(type => ({
    label: typeActiviteSlugLabels[type],
    key: type,
    type: 'types',
  })) : [];

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
  ) => {
    return [
      ...(departementsOptions.departementsOptions ??
      departementsOptions)
      .filter(({ value }) => departements?.includes(value))
      .map(({ label, value }) => ({
        label,
        key: value,
        type: 'departements',
      })),
    ];
  };

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

export const filterLabelsToDisplay = (filters, departementsOptions, mediateursOptions) => generateActivitesFiltersLabels(filters, {
  departementsOptions,
  mediateursOptions,
}).map(toLieuPrefix);

export function infoParTypeFiltre(data) {
  const groupe = {};

  data.forEach(({ type, label }) => {
    groupe[type] ??= [];
    groupe[type].push(label.replace(/^.*?:\s*/, ''));
  });

  return groupe;
}

