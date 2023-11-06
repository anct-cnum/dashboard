import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, conseillerActions, contratActions } from '../../../../../actions';
import { formatNomConseiller } from '../../../../../utils/formatagesUtils';
import Spinner from '../../../../../components/Spinner';
import { scrollTopWindow } from '../../../../../utils/exportsUtils';
import CardsRecrutement from './CardsRecrutement';
import InformationCandidat from '../../../../../components/InformationCandidat';
import PopinEditionContrat from '../../../structure/popins/popinEditionContrat';
import ModalValidationRecrutement from '../../modals/ModalValidationRecrutement';
import pinCoordinateur from '../../../../../assets/icons/pin-coordinateur.svg';
import { Tooltip } from 'react-tooltip';

function CandidatDetailsRecrutement() {
  const dispatch = useDispatch();
  const { idCandidat, idMiseEnRelation } = useParams();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const loading = useSelector(state => state.conseiller?.loading);
  const loadingContrat = useSelector(state => state.contrat?.loading);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const errorContrat = useSelector(state => state.contrat?.error);
  const downloading = useSelector(state => state.conseiller?.downloading);
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const [openModal, setOpenModal] = useState(false);
  const [openModalContrat, setOpenModalContrat] = useState(false);

  useEffect(() => {
    if (!errorConseiller) {
      scrollTopWindow();
      if (conseiller?._id !== idCandidat) {
        dispatch(conseillerActions.getCandidatRecrutement(idCandidat, idMiseEnRelation));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le candidat n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorConseiller]);

  useEffect(() => {
    if (downloadError !== undefined && downloadError !== false) {
      scrollTopWindow();
    }
  }, [downloadError]);

  const updateContract = (typeDeContrat, dateDebut, dateFin, salaire, isRecrutementCoordinateur) => {
    dispatch(contratActions.updateContractRecrutement(typeDeContrat, dateDebut, dateFin, salaire, isRecrutementCoordinateur, conseiller?.miseEnRelation?._id));
  };

  return (
    <div className="fr-container candidatDetails">
      <Spinner loading={loading || downloading || loadingContrat} />
      <button
        onClick={() => window.close()}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </button>
      {(downloadError !== undefined && downloadError !== false) &&
        <div className="fr-alert fr-alert--error fr-mt-4w">
          <p>Le CV n&rsquo;a pas pu &ecirc;tre r&eacute;cup&eacute;r&eacute; !</p>
        </div>
      }
      {(errorContrat !== undefined && errorContrat !== false) &&
        <div className="fr-alert fr-alert--error fr-mt-4w">
          <p>{errorContrat}</p>
        </div>
      }
      <div className="fr-col-12 fr-pt-6w">
        <h1 className="fr-h1 fr-mb-2v" style={{ color: '#000091' }}>
          {conseiller ? formatNomConseiller(conseiller) : ''}
          {conseiller?.miseEnRelation?.contratCoordinateur &&
            <img
              data-tooltip-content="Conseiller numérique Coordinateur"
              data-tooltip-id="tooltip-coordinateur-candidat"
              data-tooltip-float="true"
              className={`fr-ml-2w ${conseiller ? '' : 'fr-hidden'}`}
              src={pinCoordinateur}
              alt="logo Coordinateur"
              style={{ height: '50px', position: 'absolute' }}
            />
          }
        </h1>
        <Tooltip id="tooltip-coordinateur-candidat" variant="light" className="infobulle" />
      </div>
      {openModal &&
        <ModalValidationRecrutement setOpenModal={setOpenModal} idMiseEnRelation={conseiller?.miseEnRelation?._id} />
      }
      {openModalContrat &&
        <PopinEditionContrat
          setOpenModalContrat={setOpenModalContrat}
          updateContract={updateContract}
          conseiller={conseiller?.miseEnRelation}
          editMode={true}
        />
      }
      <div className="fr-col-12">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <h5 className="fr-h5 fr-mb-3v">ID - {conseiller?.idPG ?? ''}</h5>
        </div>
      </div>
      <CardsRecrutement
        miseEnRelation={conseiller?.miseEnRelation}
        conseiller={conseiller}
        setOpenModalContrat={setOpenModalContrat}
        setOpenModal={setOpenModal}
      />
      <InformationCandidat conseiller={conseiller} />
    </div>
  );
}

export default CandidatDetailsRecrutement;
