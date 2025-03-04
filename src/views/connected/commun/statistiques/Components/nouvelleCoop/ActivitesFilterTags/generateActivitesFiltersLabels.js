import { dateAsDay } from '../utils/convert';

export const locationTypeLabels = {
  departement: 'Département',
};
export const typeActiviteForSlug =
{
  individuel: 'Individuel',
  demarche: 'Demarche',
  collectif: 'Collectif',
};
export const typeActiviteLabels = {
  Individuel: 'Accompagnement individuel',
  Demarche: 'Aide aux démarches administratives',
  Collectif: 'Atelier collectif',
};

const typeActiviteSlugLabels = {
  individuel: typeActiviteLabels[typeActiviteForSlug.individuel],
  demarche: typeActiviteLabels[typeActiviteForSlug.demarche],
  collectif: typeActiviteLabels[typeActiviteForSlug.collectif],
};

export const generateActivitesPeriodeFilterLabel = ({
  au,
  du,
}) => `${dateAsDay(new Date(du))} - ${dateAsDay(new Date(au))}`;

export const generateActivitesLocationTypeFilterLabel = ({ departement }) => {
  if (departement) {
    return locationTypeLabels.departement;
  }
  return null;
};

export const generateActivitesLocationNameFilterLabel = (
  {
    commune,
    departement,
    lieu,
  },
  {
    communesOptions,
    departementsOptions,
    lieuxActiviteOptions,
  }
) => {
  if (commune) {
    return (
      communesOptions.find(option => option.value === commune)?.label ?? null
    );
  }
  if (departement) {
    return (
      departementsOptions.find(option => option.value === departement)
      ?.label ?? null
    );
  }
  if (lieu) {
    return (
      lieuxActiviteOptions.find(option => option.value === lieu)?.label ??
      null
    );
  }
  return null;
};

const generateBeneficiaireFilterLabel = (
  { beneficiaire },
  { beneficiairesOptions },
) => {
  if (!beneficiaire) {
    return null;
  }

  return (
    beneficiairesOptions.find(option => option.value?.id === beneficiaire)
    ?.label ?? null
  );
};

const generateMediateurFilterLabel = (
  { mediateur },
  { mediateursOptions = [] },
) => {
  if (!mediateur) {
    return null;
  }

  return (
    mediateursOptions.find(option => option.value?.mediateurId === mediateur)
    ?.label ?? null
  );
};

export const generateActivitesFiltersLabels = (
  {
    beneficiaire,
    mediateur,
    type,
    departement,
    commune,
    lieu,
    au,
    du,
  },
  {
    beneficiairesOptions,
    mediateursOptions,
    communesOptions,
    departementsOptions,
    lieuxActiviteOptions,
  }
) => {
  const periode =
    du && au ?
      generateActivitesPeriodeFilterLabel({
        du,
        au,
      }) :
      null;

  const typeLabel = type ? typeActiviteSlugLabels[type] : null;

  const beneficiaireLabel = generateBeneficiaireFilterLabel(
    { beneficiaire },
    { beneficiairesOptions },
  );

  const mediateurLabel = generateMediateurFilterLabel(
    { mediateur },
    { mediateursOptions },
  );

  const typeLieu = generateActivitesLocationTypeFilterLabel({
    commune,
    departement,
    lieu,
  });

  const nomLieu = generateActivitesLocationNameFilterLabel(
    {
      commune,
      departement,
      lieu,
    },
    { departementsOptions, communesOptions, lieuxActiviteOptions },
  );

  // eslint-disable-next-line no-irregular-whitespace
  const lieuFull = typeLieu ? `${typeLieu} : ${nomLieu}` : null;

  return {
    du: du ? dateAsDay(new Date(du)) : null,
    au: au ? dateAsDay(new Date(au)) : null,
    periode,
    type: typeLabel,
    mediateur: mediateurLabel,
    beneficiaire: beneficiaireLabel,
    typeLieu,
    nomLieu,
    lieu: lieuFull,
  };
};
