import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { structureActions, alerteEtSpinnerActions, invitationsActions } from '../../../../actions';
import SiretForm from './SiretForm';
import EmailForm from './EmailForm';
import Spinner from '../../../../components/Spinner';
import { formatNomConseiller, pluralize, valideInputEmail } from '../../../../utils/formatagesUtils';
import { scrollTopWindow } from '../../../../utils/exportsUtils';

function StructureDetails() {

  const dispatch = useDispatch();
  const { idStructure } = useParams();
  const structure = useSelector(state => state.structure?.structure);
  const [displaySiretForm, setDisplaySiretForm] = useState(false);
  const [displayFormEmail, setDisplayFormEmail] = useState(false);
  const error = useSelector(state => state.structure?.error);
  const loadingStructure = useSelector(state => state.structure?.loading);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const loadingInvitation = useSelector(state => state.invitations.loading);
  const success = useSelector(state => state.invitations.success);
  const errorInvitation = useSelector(state => state.invitations.error);
  const [form, setForm] = useState(false);
  const [email, setEmail] = useState('');
  const [activeMessage, setActiveMessage] = useState(false);

  useEffect(() => {
    if (structure?._id !== idStructure) {
      dispatch(structureActions.getDetails(idStructure));
    }
  }, [structure]);

  useEffect(() => {
    if (success) {
      scrollTopWindow();
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'success',
        message: success,
        status: null, description: null
      }));
    } else if (errorInvitation) {
      scrollTopWindow();
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: errorInvitation,
        status: null, description: null
      }));
    }
  }, [errorInvitation, success]);

  const sendInvitation = () => {
    if (!valideInputEmail(email)) {
      setActiveMessage(true);
      return;
    }
    dispatch(invitationsActions.inviteStructureInDetails({ email, structureId: idStructure }));
    setActiveMessage(false);
    setEmail('');
    setForm(false);
    scrollTopWindow();
    setTimeout(() => {
      dispatch(invitationsActions.resetInvitation());
    }, 10000);
  };

  return (
    <div className="fr-container structureDetails">
      {(error !== undefined && error !== false) &&
        <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-4w">
          <p>Une erreur est survenue : {error?.toString()}</p>
        </div>
      }
      <Spinner loading={loadingStructure || loadingInvitation} />
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
              <strong>T&eacute;l&eacute;phone</strong><br/>
              <span>{structure?.contact?.telephone ?
                structure?.contact?.telephone?.replace(/(\+)(33|590|596|594|262|269)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2$3 $4 $5 $6 $7') :
                <>-</>
              }</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Fonction</strong><br/>
              <span>{structure?.contact?.fonction ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Raison social</strong><br/>
              <span>{structure?.insee?.entreprise?.raison_sociale ?? '-'}</span>
            </div>
          </div>
          <div className="fr-col-6">
            <h4 className="titre">Administrateurs</h4>
            <div className="fr-mb-3w">
              {form === false ?
                <div>
                  {structure?.users?.length === 0 && <p>Aucun administrateur associ&eacute;</p>}
                  {structure?.users.map((user, idx) =>
                    <>
                      <p key={idx}>{user.name} - {user.passwordCreated ? <span>(actif)</span> : <span>(inactif)</span> }</p>
                    </>
                  )}
                  <button className="fr-btn fr-mt-1w fr-icon-mail-line fr-btn--icon-left" onClick={() => setForm(true)}>
                    Inviter un administrateur
                  </button>
                </div> :
                <div className="fr-container--fluid">
                  <div className="fr-my-3w">
                    <div className={`fr-input-group ${email && !valideInputEmail(email) && activeMessage ? 'fr-input-group--error' : ''}`}>
                      <label className="fr-label" htmlFor="username-input">
                        E-mail de l&lsquo;administrateur
                        <span className="fr-hint-text">
                        Renseigner le mail de l&lsquo;administrateur et envoyer une invitation &agrave; rejoindre le tableau de pilotage
                        </span>
                      </label>
                      <input
                        className={`fr-input ${email && !valideInputEmail(email) && activeMessage ? 'fr-input--error' : ''}`}
                        aria-describedby="username-error"
                        type="text"
                        id="username-input"
                        name="username"
                        value={email}
                        onChange={e => setEmail(e.target.value.trim())} />
                      {email && !valideInputEmail(email) && activeMessage &&
                  <p id="username-error" className="fr-error-text">
                      Le format de l&rsquo;adresse mail saisi est invalide.
                  </p>
                      }
                      {email === '' && activeMessage &&
                  <p id="username-error" className="fr-error-text">
                      Veuillez saisir une adresse mail.
                  </p>
                      }
                    </div>
                  </div>
                  <button onClick={() => {
                    setEmail('');
                    setForm(false);
                  }}
                  className="fr-btn fr-btn--secondary"
                  >
                    Annuler
                  </button>
                  <button style={{ float: 'right' }}
                    className="fr-btn" onClick={sendInvitation}
                    {...!email || !valideInputEmail(email) ? { 'disabled': true } : {}}
                  >
                    Envoyer
                  </button>
                </div>
              }
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
            <div className="fr-mb-3w">
              <strong>Zone de revitalisation rurale</strong><br/>
              <span>{structure?.qpvStatut ?? '-'}</span>
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
          <div className="fr-col-6">
            <h4 className="titre">Conventionnement phase 1</h4>
            <div className="fr-mb-3w">
              <strong>{pluralize(
                'Postes validé en comité de sélection',
                'Postes validé en comité de sélection',
                'Postes validés en comité de sélection',
                structure?.posteValiderCoselec
              )}</strong><br />
              <span>{structure?.posteValiderCoselec ?? '-'}</span>
            </div>
            <div className="fr-mb-3w fr-grid-row">
              <strong>Profils recrut&eacute;s</strong>
              {structure?.conseillers.map((conseiller, idx) =>
                <span key={idx} className="fr-col-12" style={{ height: '2rem' }}>
                  <button
                    style={{ paddingLeft: '0' }}
                    title="D&eacute;tail"
                    className="fr-text--md"
                    onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}>
                    {conseiller?.idPG}&nbsp;-&nbsp;{formatNomConseiller(conseiller)}
                  </button>
                </span>
              )}
              {structure?.conseillers?.length === 0 &&
                <span className="fr-col-12">-</span>
              }
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
