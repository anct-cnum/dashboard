import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InformationCard from './cards/InformationCard';
import SelectAdvisorCard from './cards/SelectAdvisorCard';
import CompleteApplicationCard from './cards/CompleteApplicationCard';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import {
  alerteEtSpinnerActions,
  conventionActions,
  reconventionnementActions,
  structureActions,
  miseEnRelationAction
} from '../../../actions';
import PopinRecapReconvention from './popins/popinRecapReconvention';
import PopinRedirectionDemarcheSimplifiee from './popins/popinRedirectionDemarcheSimplifiee';
import Spinner from '../../../components/Spinner';
import { pluralize, validTypeDeContratWithoutEndDate } from '../../../utils/formatagesUtils';
import { StatutConventionnement } from '../../../utils/enumUtils';

function DemandeReconventionnement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reconventionnement = useSelector(state => state.reconventionnement?.reconventionnement);
  const misesEnRelation = useSelector(state => state.misesEnRelation?.misesEnRelation);
  const errorMisesEnRelation = useSelector(state => state?.misesEnRelation?.error);
  const loadingMisesEnRelation = useSelector(state => state.misesEnRelations?.loading);
  const loadingStructure = useSelector(state => state.structure?.loading);
  const errorStructure = useSelector(state => state?.structure?.error);
  const loadingReconventionnement = useSelector(state => state.reconventionnement?.loading);
  const errorReconventionnement = useSelector(state => state.reconventionnement?.error);
  const user = useSelector(state => state.authentication?.user);
  const structure = useSelector(state => state.structure?.structure);
  const idDossier = structure?.dossierDemarcheSimplifiee?.numero;
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const [misesEnRelationARenouveller, setMisesEnRelationARenouveller] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalRedirection, setOpenModalRedirection] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [nombreDePostes, setNombreDePostes] = useState(0);

  const errorMessages = {
    errorStructure: 'La structure n\'a pas pu être chargée !',
    errorMisesEnRelation: 'Les mises en relation n\'ont pas pu être chargées !',
    errorReconventionnement: 'Le dossier de reconventionnement n\'a pas pu être chargé !'
  };

  const getErrorMessage = detectedError => {
    return errorMessages[detectedError];
  };

  useEffect(() => {
    const errors = [errorStructure, errorMisesEnRelation, errorReconventionnement];
    const detectedErrors = errors.filter(error => error !== false);

    if (detectedErrors.length > 0) {
      scrollTopWindow();
      dispatch(
        alerteEtSpinnerActions.getMessageAlerte({
          type: 'error',
          message: getErrorMessage(detectedErrors[0]),
          status: null,
          description: null,
        })
      );
    }
  }, [errorMisesEnRelation, errorStructure, errorReconventionnement]);

  useEffect(() => {
    if (!errorReconventionnement) {
      scrollTopWindow();
      if (structure) {
        dispatch(conventionActions.get(structure?._id));
      }
    }
  }, [idDossier]);

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
    if (structure?.conventionnement?.dossierReconventionnement?.nbPostesAttribuees !== undefined) {
      setNombreDePostes(structure.conventionnement?.dossierReconventionnement.nbPostesAttribuees);
    }
  }, [structure?.conventionnement?.dossierReconventionnement]);

  const calcNombreDePostes = () => structure?.conseillersRecruterConventionnement?.length + structure?.conseillersValiderConventionnement?.length;

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
      ?.filter(conseiller => conseiller?.reconventionnement || validTypeDeContratWithoutEndDate(conseiller?.typeDeContrat))
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
          calcNombreDePostes={calcNombreDePostes}
          structure={structure}
          setOpenModal={setOpenModal}
          handleSend={handleSend}
          nombreDePostes={nombreDePostes}
        />
      )}
      {openModalRedirection &&
        <PopinRedirectionDemarcheSimplifiee setOpenModalRedirection={setOpenModalRedirection} lienDossier={structure?.urlDossierReconventionnement} />
      }
      <div className="fr-container">
        <Spinner loading={loadingMisesEnRelation || loadingReconventionnement || loadingStructure} />
        <h2 className="fr-mb-1w" style={{ color: '#000091' }}>
          Demande de reconventionnement
        </h2>
        <p>
          Veuillez nous indiquer le nombre de postes que vous souhaitez ainsi que le(s) conseiller(s) que
          vous souhaitez renouveler pour ce nouveau conventionnement.
        </p>
        <InformationCard />
        <div className="fr-input-group">
          <h5>Nombre de postes</h5>
          <label className="fr-label" htmlFor="text-input-groups1">
            <span>Renseignez le nombre de postes total que vous souhaitez&nbsp;:</span>
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
          <h5>Renouvellement de postes</h5>
          <p>S&eacute;lectionez les conseillers que vous souhaitez renouveller.</p>
          {misesEnRelationARenouveller &&
            misesEnRelationARenouveller.map((miseEnRelation, idx) => (
              <SelectAdvisorCard
                handleSelectAdvisor={handleSelectAdvisor}
                roleActivated={roleActivated}
                miseEnRelation={miseEnRelation}
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
        <CompleteApplicationCard structure={structure} setOpenModalRedirection={setOpenModalRedirection} />
        {structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_INITIÉ && (
          <>
            <div className="fr-col-12 fr-mt-6w fr-mb-2w">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
            <h5>R&eacute;capitulatif de votre demande</h5>
            <>
              <p>
                Vous allez faire une demande pour{' '}
                <span className="fr-text fr-text--bold">
                  {structure?.posteValiderCoselec}{' '}
                  {pluralize(
                    'poste subventionné',
                    'poste subventionné',
                    'postes subventionnés',
                    true
                  )},{' '}
                </span>
                dont:
              </p>
              <ul>
                <li>
                  <p className="fr-text--bold fr-mb-1w">
                    {calcNombreDePostes()}{' '}
                    {pluralize(
                      'poste occupé',
                      'poste occupé',
                      'postes occupés',
                      true
                    )}
                  </p>
                </li>
                <li>
                  <p className="fr-text--bold">
                    {structure?.posteValiderCoselec - calcNombreDePostes()}{' '}
                    {pluralize(
                      'poste vacant',
                      'poste vacant',
                      'postes vacants',
                      true
                    )}
                  </p>
                </li>
              </ul>
            </>
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
