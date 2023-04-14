import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

function StructureDetails() {
  const dispatch = useDispatch();
  const { idStructure } = useParams();
  const structure = useSelector(state => state.structure?.structure);
  const [displaySiretForm, setDisplaySiretForm] = useState(false);
  const loadingStructure = useSelector(state => state.structure?.loading);
  const loadingInvitation = useSelector(state => state.invitations?.loading);
  const success = useSelector(state => state.invitations?.success);
  const errorInvitation = useSelector(state => state.invitations?.error);
  const [email, setEmail] = useState('');
  const [activeMessage, setActiveMessage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const users = useSelector(state => state.user?.users);
  const { entity } = useSelector(state => state.authentication?.user);
  const [collaborateurs, setCollaborateurs] = useState([]);

  useEffect(() => {
    dispatch(structureActions.getDetails(idStructure));
  }, [idStructure]);

  useEffect(() => {
    if (entity) {
      dispatch(userActions.getUsers());
    }
  }, [entity]);

  useEffect(() => {
    if (users) {
      setCollaborateurs(users);
    }
  }, [users]);

  useEffect(() => {
    if (success) {
      scrollTopWindow();
      dispatch(
        alerteEtSpinnerActions.getMessageAlerte({
          type: 'success',
          message: success,
          status: null,
          description: null,
        })
      );
    } else if (errorInvitation) {
      scrollTopWindow();
      dispatch(
        alerteEtSpinnerActions.getMessageAlerte({
          type: 'error',
          message: errorInvitation,
          status: null,
          description: null,
        })
      );
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
      <div className="fr-container">
        <Spinner loading={loadingStructure || loadingInvitation} />
        <h2 className="fr-mb-1w" style={{ color: '#000091' }}>
          {structure?.nom}
        </h2>
        <h6>{`ID - ${structure?.idPG}`}</h6>
        <StructureInformationsCard structure={structure} />
        <div className="fr-col-12 fr-mb-2w fr-mt-7w">
          <hr style={{ borderWidth: '0.5px' }} />
        </div>
        <h2>Activit&eacute;</h2>
        {structure?.conventionnement?.statut && structure?.conventionnement?.statut !== 'NON_INTERESSÉ' && (
          <ReconventionnementInfosCard structure={structure} />
        )}
        <ConventionnementInfosCard structure={structure}/>
        <h2>Accompagnements</h2>
        <AccompagnementsCard structure={structure} />
        <div className="fr-col-12 fr-my-6w">
          <hr style={{ borderWidth: '0.5px' }} />
        </div>
        <h2>Informations structure</h2>
        <div className="fr-grid-row">
          <div className="fr-col-6 fr-mt-4w">
            <h4 className="titre" style={{ color: '#000091' }}>
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
              <strong>Zone de revitalisation rurale</strong>
              <br />
              <span>{structure?.qpvStatut ?? '-'}</span>
            </div>
          </div>
          <div className="fr-col-6 fr-mt-4w">
            <h4 className="titre" style={{ color: '#000091' }}>
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
            disabled
          >
            Ajouter un collaborateur
          </button>
        </div>
        {collaborateurs?.length > 0 ? (
          collaborateurs?.map((collaborateur, idx) => (
            <CollaborateurCard gestionnaire={collaborateur} setCollaborateurs={setCollaborateurs} key={idx} />
          ))
        ) : (
          <div className="fr-mt-3w">Aucun compte associ&eacute;.</div>
        )}
      </div>
    </>
  );
}

export default StructureDetails;