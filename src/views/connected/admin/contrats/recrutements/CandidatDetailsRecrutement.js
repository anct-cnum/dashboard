import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, conseillerActions, contratActions } from '../../../../../actions';
import { formatNomConseiller } from '../../../../../utils/formatagesUtils';
import Spinner from '../../../../../components/Spinner';
import { scrollTopWindow } from '../../../../../utils/exportsUtils';
import CardsRecrutement from './CardsRecrutement';
import InformationCandidat from '../../../../../components/InformationCandidat';
import PopinEditionContrat from '../../../structure/popins/popinEditionContrat';
import ModalValidationRecrutement from '../../modals/ModalValidationRecrutement';
import ModalAnnulationRecrutement from '../../modals/ModalAnnulationRecrutement';
import pinCoordinateur from '../../../../../assets/icons/icone-coordinateur.svg';
import { Tooltip } from 'react-tooltip';

function CandidatDetailsRecrutement() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { idCandidat, idMiseEnRelation } = useParams();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const loading = useSelector(state => state.conseiller?.loading);
  const loadingContrat = useSelector(state => state.contrat?.loading);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const errorContrat = useSelector(state => state.contrat?.error);
  const downloading = useSelector(state => state.conseiller?.downloading);
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAnnulation, setOpenModalAnnulation] = useState(false);
  const [successAnnulationRecrutement, setSuccessAnnulationRecrutement] = useState(false);
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

  useEffect(() => {
    if (successAnnulationRecrutement) {
      navigate('/admin/demandes/contrats',
        {
          state: {
            currentPage,
            statutContrat: 'recrutee',
            conseillerRefusRecrutement: {
              nom: conseiller?.nom,
              prenom: conseiller?.prenom,
            },
          }
        },
        {
          replace: true
        }
      );
    }
  }, [successAnnulationRecrutement]);

  const updateContract = (typeDeContrat, dateDebut, dateFin, salaire, isRecrutementCoordinateur = false) => {
    dispatch(contratActions.updateContractRecrutementAdmin(
      typeDeContrat,
      dateDebut,
      dateFin,
      salaire,
      isRecrutementCoordinateur,
      conseiller?.miseEnRelation?._id,
      conseiller?._id,
    ));
  };
  return (
    <div className="fr-container candidatDetails">
      <Spinner loading={loading || downloading || loadingContrat} />
      <Link
        to={location?.state?.origin}
        state={{ currentPage, statutContrat: location?.state?.statutContrat }}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </Link>
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
              data-tooltip-content="Conseiller numérique coordinateur"
              data-tooltip-id="tooltip-coordinateur-candidat"
              data-tooltip-float="true"
              className={`fr-ml-2w ${conseiller ? '' : 'fr-hidden'}`}
              src={pinCoordinateur}
              alt="ic&ocirc;ne Conseiller numérique coordinateur"
              style={{ height: '50px', position: 'absolute' }}
            />
          }
        </h1>
        <Tooltip id="tooltip-coordinateur-candidat" variant="light" className="infobulle" />
      </div>
      {openModalAnnulation &&
        <ModalAnnulationRecrutement
          setOpenModalAnnulation={setOpenModalAnnulation}
          setSuccessAnnulationRecrutement={setSuccessAnnulationRecrutement}
          idMiseEnRelation={conseiller?.miseEnRelation?._id}
        />
      }
      {openModalContrat &&
        <PopinEditionContrat
          setOpenModalContrat={setOpenModalContrat}
          updateContract={updateContract}
          conseiller={conseiller?.miseEnRelation}
          editMode={true}
        />
      }
      {openModal &&
        <ModalValidationRecrutement setOpenModal={setOpenModal} idMiseEnRelation={conseiller?.miseEnRelation?._id} />
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
        setOpenModalAnnulation={setOpenModalAnnulation}
        setOpenModal={setOpenModal}
      />
      <InformationCandidat conseiller={conseiller} />
    </div>
  );
}

export default CandidatDetailsRecrutement;
