import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, alerteEtSpinnerActions } from '../../../../actions';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';
import Spinner from '../../../../components/Spinner';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import InformationConseiller from '../../../../components/InformationConseiller';

function PreselectionConseillerDetails() {

  const dispatch = useDispatch();
  const { idConseiller } = useParams();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const errorPreselection = useSelector(state => state.conseiller?.errorPreselection);
  const successPreselection = useSelector(state => state.conseiller?.successPreselection);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const loading = useSelector(state => state.conseiller?.loading);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const currentPage = useSelector(state => state.pagination?.currentPage);

  const [misesEnRelationFinalisee, setMisesEnRelationFinalisee] = useState([]);
  const [misesEnRelationFinaliseeRupture, setMisesEnRelationFinaliseeRupture] = useState([]);

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
    if (conseiller !== undefined) {
      setMisesEnRelationFinalisee(conseiller.misesEnRelation?.filter(miseEnRelation => miseEnRelation.statut === 'finalisee'));
      setMisesEnRelationFinaliseeRupture(conseiller.misesEnRelation?.filter(miseEnRelation => miseEnRelation.statut === 'finalisee_rupture'));
    }
  }, [conseiller]);

  const preSelectionnerCandidat = () => {
    dispatch(conseillerActions.preSelectionner(conseiller._id));
    scrollTopWindow();
  };

  useEffect(() => {
    if (successPreselection !== undefined && successPreselection !== false) {
      window.location.href = '/structure/candidats/interessee';
    }
  }, [successPreselection]);

  return (
    <div className="fr-container conseillerDetails">
      <Spinner loading={loading} />
      <Link
        to={location?.state?.origin ?? '/structure/candidats/nouvelle'} state={{ currentPage }}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </Link>
      {(errorPreselection !== undefined && errorPreselection !== false) &&
      <div className="fr-alert fr-alert--info fr-mt-3w">
        <p>{errorPreselection}</p>
      </div>
      }
      <div className="fr-col-12 fr-pt-6w">
        <h1 className="fr-h1 fr-mb-2v" style={{ color: '#000091' }}>{conseiller ? formatNomConseiller(conseiller) : ''}</h1>
      </div>
      <div className="fr-col-12">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <h5 className="fr-h5 fr-mb-3v">ID - {conseiller?.idPG ?? ''}</h5>
        </div>
      </div>
      {conseiller &&
        <div className="fr-col-12 fr-grid-row" style={{ alignItems: 'baseline' }}>
          {Object.keys(misesEnRelationFinalisee || {}).length > 0 &&
            <p className="fr-badge fr-mr-2w fr-badge--success" style={{ height: '20%' }}>Contrat en cours</p>
          }
          {conseiller?.statut === 'RUPTURE' &&
            <p className="fr-badge fr-badge--error fr-badge--no-icon" style={{ height: '20%' }}>Contrat termin&eacute;</p>
          }
          {misesEnRelationFinalisee?.statut === 'nouvelle_rupture' &&
          <>
            {misesEnRelationFinalisee?.dossierIncompletRupture ?
              <p className="fr-badge fr-badge--new fr-mt-2w fr-mt-md-0" style={{ height: '20%' }}>Dossier incomplet</p> :
              <p className="fr-badge fr-badge--warning fr-mt-2w fr-mt-md-0" style={{ height: '20%' }}>Rupture en cours</p>
            }
          </>
          }
          <button onClick={preSelectionnerCandidat}
            className="fr-btn fr-ml-md-auto"
            title="Pr&eacute;selectionner ce candidat">
            Pr&eacute;selectionner ce candidat
          </button>
        </div>
      }
      <InformationConseiller
        conseiller={conseiller}
        misesEnRelationFinalisee={misesEnRelationFinalisee}
        misesEnRelationFinaliseeRupture={misesEnRelationFinaliseeRupture}
        roleActivated={roleActivated}
      />
    </div>
  );
}

export default PreselectionConseillerDetails;
