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
  types: z
  .union([
    z.string().transform(val => val.split(',').map(id => id.trim()).filter(type => typeActiviteSlugValues.includes(type))),
    z.array(z.enum(typeActiviteSlugValues)),
  ])
  .optional(),
  mediateurs: z
  .union([
    z.string().transform(val => val.split(',').map(id => id.trim()).filter(id => z.string().uuid().safeParse(id).success)),
    z.array(z.string().uuid()),
  ])
  .optional(),
  departements: z
  .union([
    z.string().transform(val => val.split(',').map(val => val.trim()).filter(departement => departement.length <= 3)),
    z.array(z.string().max(3)),
  ])
  .optional(),
};

export const validateActivitesFilters = searchParams => {
  const params = { ...searchParams };

  const result = { };

  for (const key of Object.keys(ActivitesFilterValidations)) {
    const typedKey = key;
    if (!(typedKey in params)) {
      continue;
    }

    const validatedFilterValue = ActivitesFilterValidations[typedKey].safeParse(
      params[typedKey],
    );
    if (
      validatedFilterValue.success &&
      validatedFilterValue.data !== undefined &&
      validatedFilterValue.data.length > 0
    ) {
      result[typedKey] = validatedFilterValue.data;
    } else {
      delete result[typedKey];
    }
  }

  return result;
};
