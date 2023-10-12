import React from 'react';
import PropTypes from 'prop-types';
import { formatNomConseiller, pluralize } from '../utils/formatagesUtils';

function ActiviterStructure({ structure, roleActivated }) {

  return (
    <>
      <div className="fr-grid-row fr-mt-6w fr-mb-4w fr-col-12">
        <div className="fr-col-12 titreCol">
          <h1>Activit&eacute;</h1>
        </div>
      </div>
      <div className="fr-grid-row fr-col-12">
        <div className="fr-col-6">
          <h4 className="titre">Conventionnement phase 1</h4>
          <div className="fr-mb-3w">
            <strong>{pluralize(
              'Poste validé en comité de sélection',
              'Poste validé en comité de sélection',
              'Postes validés en comité de sélection',
              structure?.posteValiderCoselecConventionnement
            )}</strong><br />
            <span>{structure?.posteValiderCoselecConventionnement ?? '-'}</span>
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
              'Profil en rupture',
              'Profil en rupture',
              'Profils en rupture',
              structure?.conseillersRuptureConventionnement?.length ?? 0
            )}</strong>
            {structure?.conseillersRuptureConventionnement?.map(conseiller =>
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
            {structure?.conseillersValiderConventionnement?.length === 0 &&
              <span className="fr-col-12">-</span>
            }
          </div>
        </div>
        <div className="fr-col-6">
          <h4 className="titre">Conventionnement phase 2</h4>
          <div className="fr-mb-3w">
            <strong>{pluralize(
              'Poste validé en comité de sélection',
              'Poste validé en comité de sélection',
              'Postes validés en comité de sélection',
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
              structure?.conseillersValiderReconventionnement?.length
            )}</strong>
            {structure?.conseillersValiderReconventionnement?.map(conseiller =>
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
            {structure?.conseillersValiderReconventionnement?.length === 0 &&
              <span className="fr-col-12">-</span>
            }
          </div>
          <div className="fr-mb-3w fr-grid-row">
            <strong>{pluralize(
              'Profil en rupture',
              'Profil en rupture',
              'Profils en rupture',
              structure?.conseillersRuptureReconventionnement?.length ?? 0
            )}</strong>
            {structure?.conseillersRuptureReconventionnement?.map(conseiller =>
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
            {structure?.conseillersValiderConventionnement?.length === 0 &&
              <span className="fr-col-12">-</span>
            }
          </div>
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
