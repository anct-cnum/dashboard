import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { invitationsActions, structureActions, userActions } from '../../../../actions';
import { formatNomConseiller, valideInputEmail } from '../../../../utils/formatagesUtils';
import dayjs from 'dayjs';
import { scrollTopWindow } from '../../../../utils/exportsUtils';

function StructureDetails() {

  const dispatch = useDispatch();
  const { idStructure } = useParams();
  const structure = useSelector(state => state.structure?.structure);
  const error = useSelector(state => state.structure?.error);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const entity = useSelector(state => state.authentication?.user?.entity);
  const [form, setForm] = useState(false);
  const [email, setEmail] = useState('');
  const [activeMessage, setActiveMessage] = useState(false);

  const sendInvitation = () => {
    if (!valideInputEmail(email)) {
      setActiveMessage(true);
      return;
    }
    dispatch(invitationsActions.inviteStructure({ email, structureId: entity['$id'] }));
    setActiveMessage(false);
    scrollTopWindow();
    dispatch(userActions.usersByStructure());
    setTimeout(() => {
      dispatch(invitationsActions.resetInvitation());
    }, 10000);
  };

  useEffect(() => {
    if (structure?._id !== idStructure) {
      dispatch(structureActions.getDetails(idStructure));
    }
  }, [structure]);

  return (
    <div className="fr-container conseillerDetails">
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
        <h1 className="fr-h1">{structure?.nom}</h1>
      </div>
      <div className="fr-grid-row fr-mt-4w fr-mb-2w fr-col-12">
        <div className="fr-col-12">
          <hr style={{ borderWidth: '0.5px' }}/>
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
            <h4 style={{ color: '#1716AD' }}>Contact principal</h4>
            <div className="fr-mb-3w">
              <strong>Email</strong><br/>
              <div>
                {structure?.contact?.email &&
                  <div>
                    <a className="email"href={'mailto:' + structure?.contact?.email}>
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
            <h4 style={{ color: '#1716AD' }}>Administrateurs</h4>
            <div className="fr-mb-3w">
              <div>
                {structure?.users.map((user, idx) =>
                  <>
                    <span key={idx}>{user.name}</span>
                  </>
                )}
              </div>
              {form === false ?
                <>
                  <button className="fr-btn fr-mt-2w fr-icon-mail-line fr-btn--icon-left" onClick={() => setForm(true)}>
                    Inviter un administrateur
                  </button>
                </> :
                <div className="fr-container--fluid">
                  <div className="fr-my-3w">
                    <div className="fr-input-group">
                      <label className="fr-label">E-mail de l&lsquo;administrateur
                        <span className="fr-hint-text">
                        Renseigner le mail de l&lsquo;administrateur et envoyer une invitation à rejoindre le tableau de pilotage
                        </span>
                      </label>
                      <input className="fr-input" type="text" id="text-input-text" value={email} name="name" onChange={e => setEmail(e.target.value.trim())} />
                    </div>
                  </div>
                  <div className="fr-ml-auto">
                    <button onClick={() => setForm(false)} className="fr-btn">Annuler</button>
                    <button
                      className="fr-btn"
                      style={{ float: 'right' }}
                      onClick={sendInvitation}
                      {...!email || !valideInputEmail(email) ? { 'disabled': true } : {}}>Envoyer</button>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="fr-col-6 fr-mt-4w">
            <h4 style={{ color: '#1716AD' }}>Informations g&eacute;n&eacute;rales</h4>
            <div className="fr-mb-3w">
              <strong>Id</strong><br/>
              <span>{structure?.idPG ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Siret</strong><br/>
              <span>{structure?.siret ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Adresse</strong><br/>
              <span>{structure?.adresseFormat ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Code Postal</strong><br/>
              <span>{structure?.codePostal ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Type</strong><br/>
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
            <hr style={{ borderWidth: '0.5px' }}/>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-6w fr-mb-4w">
          <div className="fr-col-12 titreCol">
            <h1>Activit&eacute;</h1>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-col-6">
            <h4 style={{ color: '#1716AD' }}>Conventionnement phase 1</h4>
            <div className="fr-mb-3w">
              <strong>Postes valid&eacute;s</strong><br />
              <span>{structure?.craCount ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Postes recrut&eacute;s</strong><br />
              <span>{structure?.craCount ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Profils recrut&eacute;s</strong><br />
              {structure?.conseillers.map((conseiller, idx) =>
                <p key={idx}>
                  <button
                    style={{ paddingLeft: '0' }}
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
              <span>{structure?.craCount ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Personnes accompagnés</strong><br />
              <span>{structure?.accompagnementCount ?? '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StructureDetails;
