import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, alerteEtSpinnerActions } from '../../../../actions';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';
import Spinner from '../../../../components/Spinner';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import PopinCreationNouvelleRupture from '../popins/popinCreationNouvelleRupture';
import InformationConseiller from '../../../../components/InformationConseiller';
import iconeCoordinateur from '../../../../assets/icons/icone-coordinateur.svg';

function ConseillerDetails() {

  const dispatch = useDispatch();
  const { idConseiller } = useParams();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const errorConseillerStatut = useSelector(state => state.conseiller?.errorUpdateStatus);
  const loading = useSelector(state => state.conseiller?.loading);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const [misesEnRelationFinalisee, setMisesEnRelationFinalisee] = useState([]);
  const [misesEnRelationFinaliseeRupture, setMisesEnRelationFinaliseeRupture] = useState([]);
  const [misesEnRelationNouvelleRupture, setMisesEnRelationNouvelleRupture] = useState(null);
  const [misesEnRelationTermineeNaturel, setMisesEnRelationTermineeNaturel] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const updateStatut = (statut, motifRupture, dateRuptureValidee) => {
    if (statut === 'nouvelle_rupture') {
      dispatch(conseillerActions.updateStatus(misesEnRelationFinalisee[0]?._id, statut, motifRupture, dateRuptureValidee));
    } else {
      dispatch(conseillerActions.updateStatus(misesEnRelationNouvelleRupture?._id, statut));
    }
    scrollTopWindow();
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
    if (errorConseillerStatut) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: errorConseillerStatut,
        status: null, description: null
      }));
    }
  }, [errorConseiller, errorConseillerStatut]);

  useEffect(() => {
    if (conseiller !== undefined) {
      setMisesEnRelationNouvelleRupture(conseiller.misesEnRelation?.filter(miseEnRelation => miseEnRelation.statut === 'nouvelle_rupture')[0]);
      setMisesEnRelationFinalisee(conseiller.misesEnRelation?.filter(miseEnRelation => miseEnRelation.statut === 'finalisee'));
      setMisesEnRelationFinaliseeRupture(conseiller.misesEnRelation?.filter(miseEnRelation => miseEnRelation.statut === 'finalisee_rupture'));
      setMisesEnRelationTermineeNaturel(conseiller.misesEnRelation?.filter(miseEnRelation => miseEnRelation.statut === 'terminee_naturel'));
    }
  }, [conseiller]);

  return (
    <div className="fr-container conseillerDetails">
      <Spinner loading={loading} />
      <button
        onClick={() => window.close()}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </button>
      <div className="fr-col-12 fr-pt-6w">
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
      <div className="fr-col-12">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <h5 className="fr-h5 fr-mb-3v">ID - {conseiller?.idPG ?? ''}</h5>
        </div>
      </div>
      {conseiller &&
        <div className="fr-col-12 fr-grid-row" style={{ alignItems: 'baseline' }}>
          {(misesEnRelationFinalisee.length > 0 || misesEnRelationNouvelleRupture) &&
            <>
              <p className="fr-badge fr-mr-2w fr-badge--success" style={{ height: '20%' }}>Contrat en cours</p>
              {misesEnRelationFinalisee[0]?.statut === 'finalisee' &&
                <button className="fr-btn fr-btn--secondary fr-ml-md-auto fr-mt-2w fr-mt-md-0" onClick={() => setOpenModal(true)}>
                  Initier une rupture de contrat
                </button>
              }
              {openModal &&
                <PopinCreationNouvelleRupture setOpenModal={setOpenModal} updateStatut={updateStatut} />
              }
            </>
          }
          {conseiller?.statut === 'RUPTURE' &&
            <p className="fr-badge fr-badge--error fr-badge--no-icon" style={{ height: '20%' }}>Contrat termin&eacute;</p>
          }
          {misesEnRelationNouvelleRupture &&
            <>
              {misesEnRelationNouvelleRupture?.dossierIncompletRupture ?
                <p className="fr-badge fr-badge--new fr-mt-2w fr-mt-md-0" style={{ height: '20%' }}>Dossier incomplet</p> :
                <p className="fr-badge fr-badge--warning fr-mt-2w fr-mt-md-0" style={{ height: '20%' }}>Rupture en cours</p>
              }
              <button onClick={() => {
                updateStatut('finalisee');
              }}
              className="fr-btn fr-icon-error-line fr-btn--icon-left fr-btn--secondary fr-ml-md-auto fr-mt-2w fr-mt-md-0"
              title="Annuler la rupture de contrat">
                Annuler la rupture de contrat
              </button>
            </>
          }
        </div>
      }
      <InformationConseiller
        conseiller={conseiller}
        misesEnRelationFinalisee={misesEnRelationFinalisee}
        misesEnRelationFinaliseeRupture={misesEnRelationFinaliseeRupture}
        misesEnRelationNouvelleRupture={misesEnRelationNouvelleRupture}
        misesEnRelationTermineeNaturel={misesEnRelationTermineeNaturel}
        roleActivated={roleActivated}
      />
    </div>
  );
}

export default ConseillerDetails;
