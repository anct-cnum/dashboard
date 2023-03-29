import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InformationCard from './cards/InformationCard';
import SelectAdvisorCard from './cards/SelectAdvisorCard';
import CompleteApplicationCard from './cards/CompleteApplicationCard';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import {
  alerteEtSpinnerActions,
  reconventionnementActions,
  structureActions,
  miseEnRelationAction
} from '../../../actions';
import PopinRecapReconvention from './popins/popinRecapReconvention';
import Spinner from '../../../components/Spinner';

function DemandeReconventionnement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reconventionnement = useSelector(state => state.reconventionnement?.reconventionnement);
  const misesEnRelation = useSelector(state => state.misesEnRelation?.misesEnRelation);
  const loading = useSelector(state => state.reconventionnement?.loading);
  const errorReconventionnement = useSelector(state => state.reconventionnement?.error);
  const user = useSelector(state => state.authentication?.user);
  const structure = useSelector(state => state.structure?.structure);
  const idDossier = structure?.dossierDemarcheSimplifiee?.numero;
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const [misesEnRelationARenouveller, setMisesEnRelationARenouveller] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [nombreDePostes, setNombreDePostes] = useState(
    structure?.conventionnement?.nombreDePostes ?? 0
  );

  useEffect(() => {
    if (!errorReconventionnement) {
      scrollTopWindow();
      if (idDossier) {
        dispatch(reconventionnementActions.get(idDossier));
      }
    } else {
      dispatch(
        alerteEtSpinnerActions.getMessageAlerte({
          type: 'error',
          message: errorReconventionnement ?? 'Le dossier de reconventionnement n\'a pas pu être chargé !',
          status: null,
          description: null,
        })
      );
    }
  }, [errorReconventionnement, idDossier]);

  useEffect(() => {
    dispatch(structureActions.getDetails(user?.entity?.$id));
  }, [user, reconventionnement]);

  useEffect(() => {
    if (structure?._id) {
      dispatch(miseEnRelationAction.getMisesEnRelationARenouveller(structure?._id));
    }
  }, [structure?._id, reconventionnement]);

  useEffect(() => {
    if (misesEnRelation) {
      setMisesEnRelationARenouveller(misesEnRelation);
    }
  }, [misesEnRelation]);


  useEffect(() => {
    if (structure?.conventionnement?.dossierReconventionnement?.nbPostesAttribues !== undefined) {
      setNombreDePostes(structure.conventionnement?.dossierReconventionnement.nbPostesAttribues);
    }
  }, [structure?.conventionnement?.dossierReconventionnement]);

  const handleSelectAdvisor = e => {
    const { checked } = e.target;
    const value = JSON.parse(e.target.value);
    if (checked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      setCheckedItems(checkedItems.filter(item => item?.miseEnRelationId !== value?.miseEnRelationId));
    }
  };

  useEffect(() => {
    setCheckedItems(
      misesEnRelationARenouveller
      ?.filter(conseiller => conseiller?.reconventionnement)
    );
  }, [misesEnRelationARenouveller]);

  const handleSave = async () => {
    scrollTopWindow();
    dispatch(
      reconventionnementActions.update(structure?._id, 'enregistrer', checkedItems, nombreDePostes)
    );
    navigate('/structure/postes');
  };

  const handleSend = () => {
    scrollTopWindow();
    dispatch(reconventionnementActions.update(structure?._id, 'envoyer', checkedItems, nombreDePostes));
    navigate('/structure/postes');
  };

  return (
    <>
      {openModal && (
        <PopinRecapReconvention
          checkedItems={checkedItems}
          structure={structure}
          setOpenModal={setOpenModal}
          handleSend={handleSend}
        />
      )}
      <div className="fr-container">
        <Spinner loading={loading} />
        <h2 className="fr-mb-1w" style={{ color: '#000091' }}>
          Demande de reconventionnement
        </h2>
        <p>
          Veuillez nous indiquer le nombre de postes que vous souhaitez ainsi que le(s) conseiller(s) que
          vous souhaitez renouveler pour ce nouveau conventionnement.
        </p>
        <InformationCard />
        <div className="fr-input-group">
          <label className="fr-label" htmlFor="text-input-groups1">
            <h5>Nombre de postes</h5>
            <span>Renseignez le nombre de poste total que vous souhaitez&nbsp;:</span>
          </label>
          <input
            className="fr-input"
            type="number"
            min="0"
            id="text-input-groups1"
            value={nombreDePostes}
            onChange={e => setNombreDePostes(Number(e.target.value))}
            name="text-input-groups1"
            style={{ width: '450px' }}
          />
        </div>
        <div className="fr-col-12 fr-mt-7w fr-mb-2w">
          <hr style={{ borderWidth: '0.5px' }} />
        </div>
        <div className="container fr-mb-6w">
          <h5 className="fr-text--bold">Renouvellement de postes</h5>
          <p>S&eacute;lectionez les conseillers que vous souhaitez renouveller.</p>
          {misesEnRelationARenouveller &&
            misesEnRelationARenouveller.map((miseEnrealation, idx) => (
              <SelectAdvisorCard
                handleSelectAdvisor={handleSelectAdvisor}
                roleActivated={roleActivated}
                miseEnrealation={miseEnrealation}
                checkedItems={checkedItems}
                key={idx}
              />
            ))}
        </div>
        <div className="fr-col-12 fr-mb-1w">
          <hr style={{ borderWidth: '0.5px' }} />
        </div>
        <h5>Compl&eacute;tez votre dossier D&eacute;marche Simplifi&eacute;e</h5>
        <p>
          Renseignez les informations concernant votre structure et les pi&egrave;ces justificatives
          demand&eacute;s avant de pouvoir envoyer votre demande.
        </p>
        <CompleteApplicationCard url={reconventionnement?.url} structure={structure} />
        {structure?.conventionnement?.statut === 'ENREGISTRÉ' && (
          <>
            <div className="fr-col-12 fr-mt-6w fr-mb-2w">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
            <h5>R&eacute;capitulatif de votre demande</h5>
            <p>
              Vous allez faire une demande pour&nbsp;
              <span className="fr-text fr-text--bold">
                {nombreDePostes} postes
                subventionn&eacute;s,{' '}
              </span>
              dont&nbsp;:
            </p>
            <ul>
              <li>
                <p className="fr-text--bold">
                  {checkedItems?.filter(item => item.statut === 'finalisee' || item.statut === 'nouvelle_rupture').length} postes occup&eacute;s
                </p>
              </li>
              <li>
                <p className="fr-text--bold">
                  {nombreDePostes -
                    checkedItems?.filter(item => item.statut === 'finalisee').length}{' '}
                  postes vacants
                </p>
              </li>
            </ul>
          </>
        )}
        <ul className="fr-btns-group fr-btns-group--inline fr-mt-5w">
          <li>
            <button className="fr-btn fr-btn--secondary" disabled={nombreDePostes === 0} onClick={handleSave}>
              Enregistrer et revenir plus tard
            </button>
          </li>
          <li>
            <button className="fr-btn" disabled={nombreDePostes === 0} onClick={() => setOpenModal(true)}>
              Envoyer ma demande
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default DemandeReconventionnement;
