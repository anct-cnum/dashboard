import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, structureActions, alerteEtSpinnerActions } from '../../../../actions';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import Spinner from '../../../../components/Spinner';
import InformationConseiller from '../../../../components/InformationConseiller';
import StructureContactCards from '../../../../components/cards/StructureContactCards';
import iconeCoordinateur from '../../../../assets/icons/icone-coordinateur.svg';

function ConseillerDetails() {

  const dispatch = useDispatch();
  const { idConseiller } = useParams();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const errorStructure = useSelector(state => state.structure?.error);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const loading = useSelector(state => state.conseiller?.loading);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const successSendMail = useSelector(state => state.conseiller?.successRelanceInvitation);
  const errorSendMail = useSelector(state => state.conseiller?.errorRelanceInvitation);

  const [misesEnRelationFinalisee, setMisesEnRelationFinalisee] = useState([]);
  const [misesEnRelationNouvelleRupture, setMisesEnRelationNouvelleRupture] = useState(null);
  const [misesEnRelationFinaliseeRupture, setMisesEnRelationFinaliseeRupture] = useState([]);
  const [misesEnRelationTermineeNaturelle, setMisesEnRelationTermineeNaturelle] = useState([]);

  const resendInvitationEspaceCoop = conseillerId => {
    dispatch(conseillerActions.resendInvitConseiller(conseillerId));
  };

  useEffect(() => {
    if (!errorConseiller) {
      if (conseiller?._id !== idConseiller) {
        dispatch(conseillerActions.get(idConseiller));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le conseiller n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorConseiller]);

  useEffect(() => {
    if (!errorStructure) {
      if (conseiller !== undefined) {
        setMisesEnRelationFinalisee(conseiller.misesEnRelation?.filter(miseEnRelation => miseEnRelation.statut === 'finalisee'));
        setMisesEnRelationNouvelleRupture(conseiller.misesEnRelation?.filter(miseEnRelation => miseEnRelation.statut === 'nouvelle_rupture')[0]);
        setMisesEnRelationFinaliseeRupture(conseiller.misesEnRelation?.filter(miseEnRelation => miseEnRelation.statut === 'finalisee_rupture'));
        setMisesEnRelationTermineeNaturelle(conseiller.misesEnRelation?.filter(miseEnRelation => miseEnRelation.statut === 'terminee_naturelle'));
        if (conseiller?.structureId) {
          dispatch(structureActions.get(conseiller?.structureId));
        }
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le conseiller n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [conseiller, errorStructure]);

  useEffect(() => {
    scrollTopWindow();
    if (successSendMail) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'success',
        message: successSendMail,
        status: null, description: null
      }));
    }
    if (errorSendMail) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: errorSendMail,
        status: null, description: null
      }));
    }
  }, [successSendMail, errorSendMail]);

  return (
    <div className="fr-container conseillerDetails">
      <Spinner loading={loading} />
      <button
        onClick={() => window.close()}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </button>
      {conseiller?.structureId &&
        <>
          <div className="fr-col-12 fr-pt-6w">
            <h1 className="fr-h1 fr-mb-2v" style={{ color: '#000091' }}>{structure?.nom ?? '-'}</h1>
          </div>
          <div className="fr-col-12 fr-mb-4w">
            <div className="fr-grid-row" style={{ alignItems: 'center' }}>
              <span className="fr-h5" style={{ marginBottom: '0' }}>ID - {structure?.idPG ?? ''}</span>
              <button className="fr-btn fr-icon-eye-line fr-btn--icon-left fr-ml-auto"
                onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)}>
                D&eacute;tails structure
              </button>
            </div>
          </div>
          <StructureContactCards structure={structure} />
          <div className="fr-grid-row fr-mt-7w fr-mb-2w fr-col-12">
            <div className="fr-col-12">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
          </div>
        </>
      }
      <div className="fr-grid-row">
        <div className={`fr-col-12 ${conseiller?.statut !== 'RECRUTE' ? 'fr-pt-6w' : ''}`}>
          <h1 className="fr-h1 fr-mb-2v" style={{ color: '#000091' }}>
            {conseiller ? formatNomConseiller(conseiller) : ''}
            {conseiller?.statut === 'RECRUTE' &&
              conseiller?.estCoordinateur === true &&
              <span>
                <img alt="ic&ocirc;ne Conseiller num&eacute;rique coordinateur" src={iconeCoordinateur} className="fr-ml-2w fr-mb-n1w" />
                <span className="icone-text-coordinateur-details">Coordinateur</span>
              </span>
            }
          </h1>
        </div>

        <div className="fr-col-md-8 fr-col-sm-6 fr-col-12">
          <div className="fr-grid-row" style={{ alignItems: 'center' }}>
            <h5 className="fr-h5 fr-mb-3v">ID - {conseiller?.idPG ?? ''}</h5>
          </div>
        </div>
        {conseiller &&
          <div className="fr-col-md-8 fr-col-sm-6  fr-col-12 fr-grid-row" style={{ alignItems: 'baseline' }}>
            {(misesEnRelationFinalisee.length > 0 || misesEnRelationNouvelleRupture) &&
              <p className="fr-badge fr-mr-2w fr-badge--success" style={{ height: '20%' }}>Contrat en cours</p>
            }
            {(conseiller?.statut === 'RUPTURE' || conseiller?.statut === 'TERMINE') &&
              <p className="fr-badge fr-badge--error" style={{ height: '20%' }}>Contrat termin&eacute;</p>
            }
            {misesEnRelationNouvelleRupture &&
              <>
                {misesEnRelationNouvelleRupture?.dossierIncompletRupture === true &&
                  <p className="fr-badge fr-badge--new fr-mt-2w fr-mt-md-0" style={{ height: '20%' }}>Dossier incomplet</p>
                }
                {misesEnRelationNouvelleRupture?.dossierIncompletRupture === false &&
                  <p className="fr-badge fr-badge--new fr-mt-2w fr-mt-md-0" style={{ height: '20%' }}>En attente de traitement</p>
                }
                {misesEnRelationNouvelleRupture?.dossierIncompletRupture === undefined &&
                  <p className="fr-badge fr-badge--warning fr-mt-2w fr-mt-md-0" style={{ height: '20%' }}>Rupture en cours</p>
                }
              </>
            }
          </div>
        }
        <div className="fr-col-md-4 fr-col-sm-6 fr-col-12 btn-invitation">
          {conseiller?.emailCN?.address && !conseiller?.mattermost?.id &&
            <button
              className="fr-btn fr-icon-mail-line fr-btn--icon-left fr-ml-auto"
              title="Inviter &agrave; rejoindre l&rsquo;espace Coop"
              onClick={() => {
                resendInvitationEspaceCoop(conseiller?._id);
              }}
            >
              Inviter sur l&rsquo;espace Coop
            </button>
          }
        </div>
      </div>
      <InformationConseiller
        conseiller={conseiller}
        misesEnRelationFinalisee={misesEnRelationFinalisee}
        misesEnRelationNouvelleRupture={misesEnRelationNouvelleRupture}
        misesEnRelationFinaliseeRupture={misesEnRelationFinaliseeRupture}
        misesEnRelationTermineeNaturelle={misesEnRelationTermineeNaturelle}
        roleActivated={roleActivated}
      />
    </div>
  );
}

export default ConseillerDetails;
