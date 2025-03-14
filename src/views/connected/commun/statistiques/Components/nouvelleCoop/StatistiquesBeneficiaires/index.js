import React from 'react';
import AccompagnementPieChart from '../components/AccompagnementPieChart';
import QuantifiedShareLegend from '../components/QuantifiedShareLegend';
import QuantifiedShareList from '../components/QuantifiedShareList';
import PropTypes from 'prop-types';
import Button from '@codegouvfr/react-dsfr/Button';
import ProgressBar from '../components/ProgressBar';
import { numberToString } from '../utils/convert';
import {
  communeColor,
  genresColors,
  statusColors,
  tranchesAgeColors
} from '../../utils/colorsNouvelleCoop';

const toProgress = ({
  label,
  count,
  proportion,
}) => ({
  label,
  count,
  percentage: proportion,
});

const StatistiquesBeneficiaires = ({
  beneficiaires,
  wording = 'personnel',
}) => {
  const totalWithGenre = beneficiaires.genres.reduce(
    (total, { count, value }) =>
      value === 'NonCommunique' ? total : total + count,
    0,
  );

  const totalWithTrancheAge = beneficiaires.tranche_ages.reduce(
    (total, { count, value }) =>
      value === 'NonCommunique' ? total : total + count,
    0,
  );

  const totalWithStatut = beneficiaires.statuts_social.reduce(
    (total, { count, value }) =>
      value === 'NonCommunique' ? total : total + count,
    0,
  );

  const totalWithCommune =
    'communes' in beneficiaires ?
      beneficiaires.communes.reduce(
        (total, { count }) => total + count,
        0,
      ) :
      null;

  return (
    <>
      <h2 className="fr-h5 fr-text-mention--grey">
        <span className="ri-user-heart-line fr-mr-1w" aria-hidden />
        Statistiques sur{' '}
        {wording === 'personnel' ? 'vos bénéficiaires' : 'les bénéficiaires'}
      </h2>
      <div className="fr-border fr-p-4w fr-border-radius--16">
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-lg-6 fr-col-12">
            <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
              <h3 className="fr-text--lg fr-mb-0">Genres</h3>
              <Button
                className="fr-px-1v fr-ml-1v"
                title="Plus d’information à propos des genres"
                priority="tertiary no outline"
                size="small"
                type="button"
                aria-describedby="tooltip-genres"
              >
                <span className="ri-information-line fr-text--lg" aria-hidden />
              </Button>
              <span
                className="fr-tooltip fr-placement"
                id="tooltip-genres"
                role="tooltip"
                aria-hidden
              >
                Les statistiques prennent en compte les bénéficiaires suivis et
                anonymes dont le genre a été complété.
                <br />
                <br />
                Total des bénéficiaires dont le genre a été complété&nbsp;:{' '}
                {numberToString(totalWithGenre)}/
                {numberToString(beneficiaires.total)} bénéficiaires suivis ou
                anonymes
              </span>
            </div>
            <QuantifiedShareLegend
              quantifiedShares={beneficiaires.genres}
              colors={genresColors}
            />
          </div>
          <div className="fr-col-lg-6 fr-col-12">
            <AccompagnementPieChart
              size={140}
              className="fr-mx-auto"
              data={beneficiaires.genres}
              colors={genresColors}
            />
          </div>
        </div>
        <hr className="fr-separator-1px fr-my-5w" />
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-lg-6 fr-col-12">
            <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
              <h3 className="fr-text--lg fr-mb-0">Tranches d’âge</h3>
              <Button
                className="fr-px-1v fr-ml-1v"
                title="Plus d’information à propos des tranches d’âge"
                priority="tertiary no outline"
                size="small"
                type="button"
                aria-describedby="tooltip-tranches-age"
              >
                <span className="ri-information-line fr-text--lg" aria-hidden />
              </Button>
              <span
                className="fr-tooltip fr-placement"
                id="tooltip-tranches-age"
                role="tooltip"
                aria-hidden
              >
                Les statistiques prennent en compte les bénéficiaires suivis et
                anonymes dont l’année de naissance ou la tranche d’âge a été
                complétée.
                <br />
                <br />
                Total des bénéficiaires dont la tranche d’âge a été
                complétée&nbsp;: {totalWithTrancheAge}/{beneficiaires.total}{' '}
                bénéficiaires suivis ou anonymes
              </span>
            </div>
            <div className="fr-mr-3w fr-mb-2w">
              <ProgressBar
                size="large"
                progress={beneficiaires.tranche_ages.map(toProgress)}
                colors={tranchesAgeColors}
                tooltopKey="tranches-age"
              />
            </div>
            <QuantifiedShareLegend
              quantifiedShares={beneficiaires.tranche_ages}
              colors={tranchesAgeColors}
            />
          </div>
          <div className="fr-col-lg-6 fr-col-12">
            <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
              <h3 className="fr-text--lg fr-mb-0">Statuts</h3>
              <Button
                className="fr-px-1v fr-ml-1v"
                title="Plus d’information à propos des statuts"
                priority="tertiary no outline"
                size="small"
                type="button"
                aria-describedby="tooltip-statuts"
              >
                <span className="ri-information-line fr-text--lg" aria-hidden />
              </Button>
              <span
                className="fr-tooltip fr-placement"
                id="tooltip-statuts"
                role="tooltip"
                aria-hidden
              >
                Les statistiques prennent en compte les bénéficiaires suivis et
                anonymes dont le statut a été complété.
                <br />
                <br />
                Total des bénéficiaires dont le statut a été complété&nbsp;:{' '}
                {totalWithStatut}/{beneficiaires.total} bénéficiaires suivis ou
                anonymes
              </span>
            </div>
            <div className="fr-mr-3w fr-mb-2w">
              <ProgressBar
                size="large"
                progress={beneficiaires.statuts_social.map(toProgress)}
                colors={statusColors}
                tooltopKey="status-beneficiaires"
              />
            </div>
            <QuantifiedShareLegend
              quantifiedShares={beneficiaires.statuts_social}
              colors={statusColors}
            />
          </div>
        </div>
        <hr className="fr-separator-1px fr-my-5w" />

        {'communes' in beneficiaires && (
          <>
            <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
              <h3 className="fr-text--lg fr-mb-0">
                Commune de résidence des bénéficiaires
              </h3>
              <Button
                className="fr-px-1v fr-ml-1v"
                title="Plus d’information à propos des communes de résidence des bénéficiaires"
                priority="tertiary no outline"
                size="small"
                type="button"
                aria-describedby="tooltip-communes-beneficiaires"
              >
                <span className="ri-information-line fr-text--lg" aria-hidden />
              </Button>
              <span
                className="fr-tooltip fr-placement"
                id="tooltip-communes-beneficiaires"
                role="tooltip"
                aria-hidden
              >
                Les statistiques prennent en compte les bénéficiaires suivis et
                anonymes dont la commune de résidence a été complétée.
                <br />
                <br />
                Total des bénéficiaires dont la commune de résidence a été
                complétée&nbsp;: {totalWithCommune}/{beneficiaires.total}{' '}
                bénéficiaires suivis ou anonymes
              </span>
            </div>

            <div className="fr-text--bold fr-text--uppercase fr-text--sm fr-text-mention--grey fr-mb-1w">
              Commune
            </div>
            <QuantifiedShareList
              order="desc"
              limit={{
                showLabel: 'Voir toutes les communes',
                hideLabel: 'Réduire',
                count: 5,
              }}
              quantifiedShares={beneficiaires.communes}
              colors={[communeColor]}
            />
          </>
        )}
      </div>
    </>
  );
};


StatistiquesBeneficiaires.propTypes = {
  beneficiaires: PropTypes.object,
  wording: PropTypes.string,
};

export default StatistiquesBeneficiaires;
