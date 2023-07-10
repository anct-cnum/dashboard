import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { structureActions, alerteEtSpinnerActions, invitationsActions, userActions } from '../../../actions';
import SiretForm from '../admin/structures/SiretForm';
import Spinner from '../../../components/Spinner';
import { valideInputEmail } from '../../../utils/formatagesUtils';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import {
  StructureInformationsCard,
  ReconventionnementInfosCard,
  ConventionnementInfosCard,
  AccompagnementsCard,
  CollaborateurCard
} from './cards';
import PopinFormulaireInvitation from './popins/popinFormulaireInvitation';
import { StatutConventionnement } from '../../../utils/enumUtils';

function MaStructure() {
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication?.user);
  const structure = useSelector(state => state.structure?.structure);
  const [formInformationContact, setFormInformationContact] = useState(false);
  const [displaySiretForm, setDisplaySiretForm] = useState(false);
  const loadingStructure = useSelector(state => state.structure?.loading);
  const loadingInvitation = useSelector(state => state.invitations?.loading);
  const loadingSuppression = useSelector(state => state.user?.loading);
  const successInvitation = useSelector(state => state.invitations?.success);
  const deleteMessageSuccess = useSelector(state => state.user?.deleteMessageSuccess);
  const errorInvitation = useSelector(state => state.invitations?.error);
  const errorSuppression = useSelector(state => state.user?.error);
  const [email, setEmail] = useState('');
  const [activeMessage, setActiveMessage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const users = useSelector(state => state.user?.users);
  const errorStructure = useSelector(state => state.structure?.error);
  const errorUsers = useSelector(state => state.user?.error);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const [initStructure, setInitStructure] = useState(false);

  useEffect(() => {
    if (!errorStructure && !initStructure) {
      setInitStructure(true);
      dispatch(structureActions.getDetails(userAuth?.entity?.$id));
      dispatch(userActions.getUsers());
    }
  }, [structure]);

  useEffect(() => {
    if (successInvitation) {
      scrollTopWindow();
      dispatch(
        alerteEtSpinnerActions.getMessageAlerte({
          type: 'success',
          message: successInvitation,
          status: null,
          description: null,
        })
      );
    }
  });

  useEffect(() => {
    const errors = [errorInvitation, errorSuppression, errorStructure, errorUsers];
    const errorMessage = errors.filter(error => error);

    if (errorMessage.length > 0) {
      scrollTopWindow();
      dispatch(
        alerteEtSpinnerActions.getMessageAlerte({
          type: 'error',
          message: errorMessage[0],
          status: null,
          description: null,
        })
      );
    }
  }, [errorInvitation, errorSuppression, errorStructure, errorUsers]);

  const sendInvitation = () => {
    if (!valideInputEmail(email)) {
      setActiveMessage(true);
      return;
    }
    dispatch(invitationsActions.inviteStructureInDetails({ email, structureId: userAuth?.entity?.$id }));
    setActiveMessage(false);
    setEmail('');
    scrollTopWindow();
    setTimeout(() => {
      dispatch(invitationsActions.resetInvitation());
    }, 10000);
  };

  return (
    <>
      {openModal && (
        <PopinFormulaireInvitation
          structure={structure}
          setOpenModal={setOpenModal}
          email={email}
          setEmail={setEmail}
          sendInvitation={sendInvitation}
          activeMessage={activeMessage}
        />
      )}
      <div className="fr-container maStructure">
        {deleteMessageSuccess &&
        <div className="fr-alert fr-alert--success" style={{ marginBottom: '2rem' }}>
          <p className="fr-alert__title">
            {deleteMessageSuccess}
          </p>
        </div>
        }
        <Spinner loading={loadingStructure || loadingInvitation || loadingSuppression} />
        <h2 className="fr-mb-1w titre">
          {structure?.nom}
        </h2>
        <h6>{`ID - ${structure?.idPG}`}</h6>
        <StructureInformationsCard structure={structure} formInformationContact={formInformationContact} setFormInformationContact={setFormInformationContact}/>
        <div className="fr-col-12 fr-mb-2w fr-mt-7w">
          <hr style={{ borderWidth: '0.5px' }} />
        </div>
        <h2>Activit&eacute;</h2>
        {structure?.conventionnement?.statut && (structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ ||
        structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_EN_COURS) &&
        (
          <ReconventionnementInfosCard structure={structure}/>
        )}
        <ConventionnementInfosCard structure={structure} roleActivated={roleActivated}/>
        <h2>Accompagnements</h2>
        <AccompagnementsCard structure={structure} />
        <div className="fr-col-12 fr-my-6w">
          <hr style={{ borderWidth: '0.5px' }} />
        </div>
        <h2>Informations structure</h2>
        <div className="fr-grid-row color-text color-title-subpart">
          <div className="fr-col-md-6 fr-col-12 fr-mt-4w">
            <h4 className="titre">
              Informations g&eacute;n&eacute;rales
            </h4>
            <div className="fr-mb-3w">
              <strong>Siret</strong>
              <br />
              {displaySiretForm === true ? (
                <div style={{ width: '320px' }}>
                  <SiretForm
                    setDisplaySiretForm={setDisplaySiretForm}
                    structureId={structure?._id}
                    structureSiret={structure?.siret}
                  />
                </div>
              ) : (
                <div>
                  <span>{structure?.siret ?? '-'}</span>
                  <button onClick={() => setDisplaySiretForm(true)} className="fr-grid fr-ml-1w">
                    <span className="fr-icon-edit-line"></span>
                  </button>
                </div>
              )}
            </div>
            <div className="fr-mb-3w">
              <strong>Date d&lsquo;inscription</strong>
              <br />
              {structure?.createdAt ? <span>{dayjs(structure?.createdAt).format('DD/MM/YYYY')}</span> : <span>-</span>}
            </div>
            <div className="fr-mb-3w">
              <strong>Type</strong>
              <br />
              <span>{structure?.type ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Quartier Prioritaire de la Ville</strong>
              <br />
              <span>{structure?.qpvStatut ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Zone de revitalisation rurale</strong>
              <br />
              <span>{structure?.estZRR ?? '-'}</span>
            </div>
          </div>
          <div className="fr-col-md-6 fr-col-12 fr-mt-4w">
            <h4 className="titre">
              Adresse
            </h4>
            <div className="fr-mb-3w">
              <strong>Adresse</strong>
              <br />
              <span>{structure?.adresseFormat ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Code Postal</strong>
              <br />
              <span>{structure?.codePostal ?? '-'}</span>
            </div>
          </div>
        </div>
        <div className="fr-col-12 fr-my-6w">
          <hr style={{ borderWidth: '0.5px' }} />
        </div>
        <div className="fr-grid-row" style={{ alignItems: 'start' }}>
          <h2>Collaborateurs</h2>
          <button
            className="fr-btn fr-btn--tertiary fr-btn--icon-left fr-icon-add-line fr-ml-auto"
            onClick={() => setOpenModal(true)}
            title="Ajouter un collaborateur"
          >
            Ajouter un collaborateur
          </button>
        </div>
        {users?.length > 0 ? (
          users?.map((collaborateur, idx) => (
            <CollaborateurCard gestionnaire={collaborateur} key={idx} />
          ))
        ) : (
          <div className="fr-mt-3w">Aucun compte associ&eacute;.</div>
        )}
      </div>
    </>
  );
}

export default MaStructure;
