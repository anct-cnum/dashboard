import React from 'react';
import PropTypes from 'prop-types';
import { formatNomConseiller, pluralize } from '../utils/formatagesUtils';
import { StatutConventionnement } from '../utils/enumUtils';
import { checkStructurePhase2 } from '../views/connected/structure/utils/functionUtils';

function ActiviterStructure({ structure, roleActivated }) {

  const demandesCoordinateurValidees = structure?.demandesCoordinateur?.filter(demande => demande.statut === 'validee').length ?? 0;
  const conseillersValider = structure?.conseillersValiderRenouvellementReconventionnement.concat(structure?.conseillersValiderReconventionnement);

  return (
    <>
      <div className="fr-grid-row fr-mt-6w fr-mb-4w fr-col-12">
        <div className="fr-col-12 titreCol">
          <h1>Activit&eacute;</h1>
        </div>
      </div>
      <div className="fr-grid-row fr-col-12">
        {structure?.conventionnement?.statut !== StatutConventionnement.CONVENTIONNEMENT_VALIDÉ_PHASE_2 &&
          <div className="fr-col-6">
            <h4 className="titre">Conventionnement phase 1</h4>
            <div className="fr-mb-3w">
              <strong>Nombre de postes valid&eacute;s en comit&eacute; de s&eacute;lection</strong>
              <br />
              {structure?.posteValiderCoselecConventionnement ?? '-'}{' '}
              {pluralize(
                'Poste de conseiller',
                'Poste de conseiller',
                'Postes de conseillers',
                structure?.posteValiderCoselecConventionnement
              )}<br />
              {
                demandesCoordinateurValidees > 0 && <>
                dont&nbsp;
                  {demandesCoordinateurValidees}&nbsp;
                  {pluralize(
                    'poste de coordinateur',
                    'poste de coordinateur',
                    'postes de coordinateurs',
                    demandesCoordinateurValidees
                  )}
                </>
              }
            </div>
            <div className="fr-mb-3w fr-grid-row">
              <strong>{pluralize(
                'Profil recruté',
                'Profil recruté',
                'Profils recrutés',
                structure?.conseillersRecruterConventionnement?.length
              )}</strong>
              {structure?.conseillersRecruterConventionnement?.map(conseiller =>
                <span key={conseiller._id} className="fr-col-12" style={{ height: '2rem' }}>
                  <button
                    style={{ paddingLeft: '0' }}
                    title="D&eacute;tail"
                    className="fr-text--md"
                    onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}>
                    {conseiller?.idPG}&nbsp;-&nbsp;{conseiller ? formatNomConseiller(conseiller) : ''}
                  </button>
                </span>
              )}
              {structure?.conseillersRecruterConventionnement?.length === 0 &&
                <span className="fr-col-12">-</span>
              }
            </div>
            <div className="fr-mb-3w fr-grid-row">
              <strong>{pluralize(
                'Profil validé',
                'Profil validé',
                'Profils validés',
                structure?.conseillersValiderConventionnement?.length
              )}</strong>
              {structure?.conseillersValiderConventionnement?.map(conseiller =>
                <span key={conseiller._id} className="fr-col-12" style={{ height: '2rem' }}>
                  <button
                    style={{ paddingLeft: '0' }}
                    title="D&eacute;tail"
                    className="fr-text--md"
                    onClick={() => window.open(`/${roleActivated}/candidat/${conseiller?._id}`)}>
                    {conseiller?.idPG}&nbsp;-&nbsp;{conseiller ? formatNomConseiller(conseiller) : ''}
                  </button>
                </span>
              )}
              {structure?.conseillersValiderConventionnement?.length === 0 &&
                <span className="fr-col-12">-</span>
              }
            </div>
            <div className="fr-mb-3w fr-grid-row">
              <strong>{pluralize(
                'Profil en cours de rupture',
                'Profil en cours de rupture',
                'Profils en cours de rupture',
                structure?.conseillersNouvelleRuptureConventionnement?.length ?? 0
              )}</strong>
              {structure?.conseillersNouvelleRuptureConventionnement?.map(conseiller =>
                <span key={conseiller._id} className="fr-col-12" style={{ height: '2rem' }}>
                  <button
                    style={{ paddingLeft: '0' }}
                    title="D&eacute;tail"
                    className="fr-text--md"
                    onClick={() => window.open(`/${roleActivated}/candidat/${conseiller._id}`)}>
                    {conseiller.idPG}&nbsp;-&nbsp;{formatNomConseiller(conseiller)}
                  </button>
                </span>
              )}
              {structure?.conseillersNouvelleRuptureConventionnement?.length === 0 &&
                <span className="fr-col-12">-</span>
              }
            </div>
            <div className="fr-mb-3w fr-grid-row">
              <strong>{pluralize(
                'Ancien conseiller',
                'Ancien conseiller',
                'Anciens conseillers',
                structure?.conseillersFinaliseeRuptureConventionnement?.length ?? 0
              )}</strong>
              {structure?.conseillersFinaliseeRuptureConventionnement?.map(conseiller =>
                <span key={conseiller._id} className="fr-col-12" style={{ height: '2rem' }}>
                  <button
                    style={{ paddingLeft: '0' }}
                    title="D&eacute;tail"
                    className="fr-text--md"
                    onClick={() => window.open(`/${roleActivated}/candidat/${conseiller._id}`)}>
                    {conseiller.idPG}&nbsp;-&nbsp;{formatNomConseiller(conseiller)}
                  </button>
                </span>
              )}
              {structure?.conseillersFinaliseeRuptureConventionnement?.length === 0 &&
                <span className="fr-col-12">-</span>
              }
            </div>
          </div>
        }
        <div className="fr-col-6">
          <h4 className="titre">Conventionnement phase 2</h4>
          {checkStructurePhase2(structure?.conventionnement?.statut) ? <>
            <div className="fr-mb-3w">
              <strong>{pluralize(
                'Poste attribué',
                'Poste attribué',
                'Postes attribués',
                structure?.posteValiderCoselec
              )}</strong><br />
              <span>{structure?.posteValiderCoselec ?? '-'}</span>
            </div>
            <div className="fr-mb-3w fr-grid-row">
              <strong>{pluralize(
                'Profil recruté',
                'Profil recruté',
                'Profils recrutés',
                structure?.conseillersRecruterReconventionnement?.length
              )}</strong>
              {structure?.conseillersRecruterReconventionnement?.map(conseiller =>
                <span key={conseiller._id} className="fr-col-12" style={{ height: '2rem' }}>
                  <button
                    style={{ paddingLeft: '0' }}
                    title="D&eacute;tail"
                    className="fr-text--md"
                    onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}>
                    {conseiller?.idPG}&nbsp;-&nbsp;{conseiller ? formatNomConseiller(conseiller) : ''}
                  </button>
                </span>
              )}
              {structure?.conseillersRecruterReconventionnement?.length === 0 &&
                <span className="fr-col-12">-</span>
              }
            </div>
            <div className="fr-mb-3w fr-grid-row">
              <strong>{pluralize(
                'Profil validé',
                'Profil validé',
                'Profils validés',
                conseillersValider?.length
              )}</strong>
              {conseillersValider?.map(conseiller =>
                <span key={conseiller._id} className="fr-col-12" style={{ height: '2rem' }}>
                  <button
                    style={{ paddingLeft: '0' }}
                    title="D&eacute;tail"
                    className="fr-text--md"
                    onClick={() => window.open(`/${roleActivated}/candidat/${conseiller?._id}`)}>
                    {conseiller?.idPG}&nbsp;-&nbsp;{conseiller ? formatNomConseiller(conseiller) : ''}
                  </button>
                </span>
              )}
              {conseillersValider?.length === 0 &&
                <span className="fr-col-12">-</span>
              }
            </div>
            <div className="fr-mb-3w fr-grid-row">
              <strong>{pluralize(
                'Profil en cours de rupture',
                'Profil en cours de rupture',
                'Profils en cours de rupture',
                structure?.conseillersNouvelleRuptureReconventionnement?.length ?? 0
              )}</strong>
              {structure?.conseillersNouvelleRuptureReconventionnement?.map(conseiller =>
                <span key={conseiller._id} className="fr-col-12" style={{ height: '2rem' }}>
                  <button
                    style={{ paddingLeft: '0' }}
                    title="D&eacute;tail"
                    className="fr-text--md"
                    onClick={() => window.open(`/${roleActivated}/candidat/${conseiller._id}`)}>
                    {conseiller.idPG}&nbsp;-&nbsp;{formatNomConseiller(conseiller)}
                  </button>
                </span>
              )}
              {structure?.conseillersNouvelleRuptureReconventionnement?.length === 0 &&
                <span className="fr-col-12">-</span>
              }
            </div>
            <div className="fr-mb-3w fr-grid-row">
              <strong>{pluralize(
                'Ancien conseiller',
                'Ancien conseiller',
                'Anciens conseillers',
                structure?.conseillersFinaliseeRuptureReconventionnement?.length ?? 0
              )}</strong>
              {structure?.conseillersFinaliseeRuptureReconventionnement?.map(conseiller =>
                <span key={conseiller._id} className="fr-col-12" style={{ height: '2rem' }}>
                  <button
                    style={{ paddingLeft: '0' }}
                    title="D&eacute;tail"
                    className="fr-text--md"
                    onClick={() => window.open(`/${roleActivated}/candidat/${conseiller._id}`)}>
                    {conseiller.idPG}&nbsp;-&nbsp;{formatNomConseiller(conseiller)}
                  </button>
                </span>
              )}
              {structure?.conseillersFinaliseeRuptureReconventionnement?.length === 0 &&
                <span className="fr-col-12">-</span>
              }
            </div>
          </> :
            <>
              <p>
                La structure n&rsquo;a pas effectu&eacute; de reconventionnement
              </p>
              <a className="fr-link"
                // eslint-disable-next-line max-len
                href="https://outline.incubateur.anct.gouv.fr/s/ab5a3b4d-e742-4f69-b004-b08b6fdbd3db/doc/la-structure-na-pas-effectue-de-reconventionnement-pourquoi-St26xzBOOP"
                target="_blank"
                rel="noopener noreferrer">
                En savoir plus
              </a>
            </>
          }
        </div>
      </div>
    </>
  );
}

ActiviterStructure.propTypes = {
  structure: PropTypes.object,
  roleActivated: PropTypes.string
};

export default ActiviterStructure;
