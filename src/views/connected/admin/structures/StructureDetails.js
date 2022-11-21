import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { structureActions } from '../../../../actions';
import SiretForm from './SiretForm';
import EmailForm from './EmailForm';
import Spinner from '../../../../components/Spinner';
import { formatNomConseiller, formatNomStats } from '../../../../utils/formatagesUtils';
import statutsLabelFirstPart from '../../../../datas/statut_label_first_part.json';
import statutsLabelSecondPart from '../../../../datas/statut_label_second_part.json';

function StructureDetails() {

  const dispatch = useDispatch();
  const { idStructure } = useParams();
  const structure = useSelector(state => state.structure?.structure);
  const [displaySiretForm, setDisplaySiretForm] = useState(false);
  const [displayFormEmail, setDisplayFormEmail] = useState(false);
  const error = useSelector(state => state.structure?.error);
  const loading = useSelector(state => state.structure?.loading);
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
      <Spinner loading={loading} />
      <button
        onClick={() => window.close()}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--secondary">
        Retour &agrave; la liste
      </button>
      <div className="fr-col-12 fr-pt-6w">
        <h1 className="fr-h1">{structure?.nom}</h1>
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
          <div className="fr-col-4">
            <div className="fr-mb-3w">
              <strong>Id</strong><br />
              <span>{structure?.idPG ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Siret</strong><br />
              {displaySiretForm === true ?
                <div style={{ width: '320px' }}>
                  <SiretForm setDisplaySiretForm={setDisplaySiretForm} structureId={structure?._id} structureSiret={structure?.siret} />
                </div> :
                <div>
                  <span>{structure?.siret ?? '-'}</span>
                  <button onClick={() => setDisplaySiretForm(true)} className="fr-grid fr-ml-1w">
                    <span className="fr-icon-edit-line"></span>
                  </button>
                </div>
              }
            </div>
            <div className="fr-mb-3w">
              <strong>Code Postal</strong><br />
              <span>{structure?.codePostal ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Adresse</strong><br />
              <span>{structure?.adresseFormat ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Type</strong><br />
              <span>{structure?.type ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Date d&lsquo;inscription</strong><br />
              {structure?.createdAt ?
                <span>{dayjs(structure?.createdAt).format('DD/MM/YYYY')}</span> : <span>-</span>
              }
            </div>
          </div>
          <div className="fr-col-4">
            <div className="fr-mb-3w">
              <strong>Email</strong><br/>
              {displayFormEmail === true ?
                <div style={{ width: '320px' }}>
                  <EmailForm setDisplayFormEmail={setDisplayFormEmail} structureId={structure?._id} structureEmail={structure?.contact?.email} />
                </div> : <div>
                  {structure?.contact?.email &&
                  <div>
                    <a className="email"href={'mailto:' + structure?.contact?.email}>
                      {structure?.contact?.email}
                    </a>
                    <button onClick={() => setDisplayFormEmail(true)} className="fr-grid fr-ml-1w">
                      <span className="fr-icon-edit-line"></span>
                    </button>
                  </div>
                  }
                  {!structure?.contact?.email &&
              <span>-</span>
                  }
                </div>
              }
            </div>
            <div className="fr-mb-3w">
              <strong>Nom</strong><br/>
              <div className="fr-grid-row">
                <span>{structure?.contact?.nom ?? '-'}&nbsp;</span>
                <span>{structure?.contact?.prenom ?? ''}</span>
              </div>
            </div>
            <div className="fr-mb-3w">
              <strong>Fonction</strong><br/>
              <span>{structure?.contact?.fonction ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Raison social</strong><br/>
              <span>{structure?.insee?.entreprise?.raison_sociale ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Zone de revitalisation rurale</strong><br/>
              <span>{structure?.qpvStatut ?? '-'}</span>
            </div>
          </div>
          <div className="fr-col-4">
            <div className="fr-mb-3w">
              <strong>Compte associés à la structure</strong><br />
              <div>
                {structure?.users.map((user, idx) =>
                  <>
                    <span key={idx}>{user.name}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-5w fr-mb-2w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }} />
          </div>
        </div>
        <div className="fr-grid-row fr-mt-6w fr-mb-4w">
          <div className="fr-col-12 titreCol">
            <h1>Activit&eacute;</h1>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-col-3">
            <div className="fr-mb-3w">
              <strong>Nombre de cra total cumul&eacute;s</strong><br />
              <span>{structure?.craCount ?? '-'}</span>
            </div>
          </div>
          <div className="fr-col-4">
            {statutsLabelFirstPart.map((stat, idx) =>
              <>
                <div className="fr-mb-3w" key={idx}>
                  <strong>{stat.name}</strong><br />
                  <span>{formatNomStats(stat.key, structure)}</span>
                </div>
              </>
            )}
          </div>
          <div className="fr-col-5">
            {statutsLabelSecondPart.map((stat, idx) =>
              <>
                <div className="fr-mb-3w" key={idx}>
                  <strong>{stat.name}</strong><br />
                  <span>{formatNomStats(stat.key, structure)}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="fr-grid-row fr-mt-5w fr-mb-2w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }} />
          </div>
        </div>
        <div className="fr-grid-row fr-mt-6w fr-mb-4w">
          <div className="fr-col-12 titreCol">
            <h1>Conseillers recrut&eacute;s</h1>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-col-5">
            <div className="fr-mb-3w">
              {structure?.conseillers.map((conseiller, idx) =>
                <p key={idx}>
                  <button
                    title="D&eacute;tail"
                    className="fr-text--md"
                    onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}>
                    {conseiller.idPG}&nbsp;-&nbsp;{formatNomConseiller(conseiller)}
                  </button>
                </p>
              )}
              {structure?.conseillers?.length === 0 &&
                <span>Aucun conseiller trouv&eacute;</span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StructureDetails;
