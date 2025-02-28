import z from 'zod';

const isoDayRegex = /^\d{4}-\d{2}-\d{2}$/;

const typeActiviteLabels = {
  Individuel: 'Accompagnement individuel',
  Demarche: 'Aide aux démarches administratives',
  Collectif: 'Atelier collectif',
};
const typeActiviteForSlug =
{
  individuel: 'Individuel',
  demarche: 'Demarche',
  collectif: 'Collectif',
};
const typeActiviteSlugLabels = {
  individuel: typeActiviteLabels[typeActiviteForSlug.individuel],
  demarche: typeActiviteLabels[typeActiviteForSlug.demarche],
  collectif: typeActiviteLabels[typeActiviteForSlug.collectif],
};
const typeActiviteSlugValues = Object.keys(typeActiviteSlugLabels);
const ActivitesFilterValidations = {
  du: z.string().regex(isoDayRegex).optional(),
  au: z.string().regex(isoDayRegex).optional(),
  type: z.enum(typeActiviteSlugValues).optional(),
  mediateur: z.string().uuid().optional(),
  departement: z.string().max(3).optional(),
};

export const validateActivitesFilters = searchParams => {
  const result = { ...searchParams };

  for (const key of Object.keys(ActivitesFilterValidations)) {
    const typedKey = key;
    if (!(typedKey in result)) {
      continue;
    }

    const validatedFilterValue = ActivitesFilterValidations[typedKey].safeParse(
      result[typedKey],
    );
    if (
      validatedFilterValue.success &&
      validatedFilterValue.data !== undefined
    ) {
      result[typedKey] = validatedFilterValue.data;
    } else {
      delete result[typedKey];
    }
  }

  return result;
};
