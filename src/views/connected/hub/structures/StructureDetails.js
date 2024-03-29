import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions } from '../../../../actions';
import ActiviterStructure from '../../../../components/ActiviterStructure';
import { formatNumeroTelephone } from '../../../../utils/formatagesUtils';

function StructureDetails() {

  const dispatch = useDispatch();
  const { idStructure } = useParams();
  const structure = useSelector(state => state.structure?.structure);
  const error = useSelector(state => state.structure?.error);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  useEffect(() => {
    if (structure?._id !== idStructure) {
      dispatch(structureActions.getDetails(idStructure));
    }
  }, [structure]);

  return (
    <div className="fr-container structureDetails">
      {(error !== undefined && error !== false) &&
        <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-4w">
          <p>Une erreur est survenue : {error?.toString()}</p>
        </div>
      }
      <button
        onClick={() => window.close()}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--secondary">
        Retour &agrave; la liste
      </button>
      <div className="fr-col-12 fr-pt-6w">
        <h1 className="fr-h1">{structure?.nom ?? ''}</h1>
      </div>
      <div className="fr-col-12">
        <h2 className="fr-h2">Id: {structure?.idPG ?? ''}</h2>
      </div>
      <div className="fr-grid-row fr-mt-4w fr-mb-2w fr-col-12">
        <div className="fr-col-12">
          <hr style={{ borderWidth: '0.5px' }} />
        </div>
      </div>
      <div className="fr-grid-row fr-grid-row--bottom fr-pt-1w fr-pb-9w">
        <div className="fr-grid-row fr-mt-5w fr-mb-4w">
          <div className="fr-col-12 titreCol">
            <h1>Informations structure</h1>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-col-6">
            <h4 className="titre">Contact principal</h4>
            <div className="fr-mb-3w">
              <strong>Email</strong><br />
              <div>
                {structure?.contact?.email &&
                  <div>
                    <a className="email" href={'mailto:' + structure?.contact?.email}>
                      {structure?.contact?.email}
                    </a>
                  </div>
                }
                {!structure?.contact?.email &&
                  <span>-</span>
                }
              </div>
            </div>
            <div className="fr-mb-3w">
              <strong>Nom</strong><br />
              <div className="fr-grid-row">
                <span className="uppercase-letter">{structure?.contact?.nom}</span>
              </div>
            </div>
            <div className="fr-mb-3w">
              <strong>Pr&eacute;nom</strong><br />
              <div className="fr-grid-row">
                <span className="uppercase-letter">{structure?.contact?.prenom}</span>
              </div>
            </div>
            <div className="fr-mb-3w">
              <strong>T&eacute;l&eacute;phone</strong><br />
              <span>{formatNumeroTelephone(structure?.contact?.telephone)}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Fonction</strong><br />
              <span>{structure?.contact?.fonction ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Raison social</strong><br />
              <span>{structure?.insee?.unite_legale?.personne_morale_attributs?.raison_sociale ?? '-'}</span>
            </div>
          </div>
          <div className="fr-col-6">
            <h4 className="titre">Administrateurs</h4>
            <div className="fr-mb-3w">
              {structure?.users?.length === 0 && <p>Aucun administrateur associ&eacute;</p>}
              {structure?.users?.map((user, idx) =>
                <p key={idx}>{user.name} - {user?.sub ? <span>(actif)</span> : <span>(inactif)</span>}</p>
              )}
            </div>
          </div>
          <div className="fr-col-6 fr-mt-4w">
            <h4 className="titre">Informations g&eacute;n&eacute;rales</h4>
            <div className="fr-mb-3w">
              <strong>Id</strong><br />
              <span>{structure?.idPG ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Siret</strong><br />
              <span>{structure?.siret ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Adresse</strong><br />
              <span>{structure?.adresseFormat ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Code Postal</strong><br />
              <span>{structure?.codePostal ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Type</strong><br />
              <span>{structure?.type ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Quartier Prioritaire de la Ville</strong><br />
              <span>{structure?.qpvStatut ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Zone de revitalisation rurale</strong><br />
              <span>{structure?.estZRR ?? '-'}</span>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-5w fr-mb-2w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }} />
          </div>
        </div>
        <ActiviterStructure structure={structure} roleActivated={roleActivated} />
        <div className="fr-grid-row fr-mt-5w fr-mb-2w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }} />
          </div>
        </div>
        <div className="fr-grid-row fr-mt-6w fr-mb-4w">
          <div className="fr-col-12 titreCol">
            <h1>Accompagnements</h1>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-col-3">
            <div className="fr-mb-3w">
              <strong>Cra total cumul&eacute;s</strong><br />
              <span>{structure?.craCount === 0 ? '-' : structure?.craCount}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Personnes accompagn&eacute;es</strong><br />
              <span>{structure?.accompagnementCount ?? '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StructureDetails;
