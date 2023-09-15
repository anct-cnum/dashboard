import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, structureActions } from '../../../actions';
import Spinner from '../../../components/Spinner';

function RecrutementCoordinateur() {
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication?.user);
  const structure = useSelector(state => state.structure?.structure);
  const loading = useSelector(state => state.structure?.loading);
  const errorStructure = useSelector(state => state.structure?.error);

  useEffect(() => {
    if (!errorStructure) {
      if (structure?._id !== userAuth?.entity?.$id) {
        dispatch(structureActions.get(userAuth?.entity?.$id));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'La structure n\'a pas pu être chargée !',
        status: null, description: null
      }));
    }
  }, [errorStructure]);

  return (
    <div className="fr-container">
      <Spinner loading={loading} />
      <h1 className="fr-h1" style={{ color: '#000091' }}>Recrutement d&rsquo;un conseiller num&eacute;rique coordinateur</h1>
      <p className="fr-mt-6w" style={{ width: '65%' }}>
        <strong>
          Pour accueillir un conseiller num&eacute;rique coordinateur, plusieurs &eacute;tapes vous attendent.
          Chacune d&rsquo;entre elles est d&eacute;taill&eacute;e ci-dessous :
        </strong>
      </p>
      <ol>
        <li className="fr-mb-2w" style={{ width: '68%' }}>
          Compl&eacute;ter le formulaire de motivation de votre candidature sur D&eacute;marches simplifi&eacute;es en cliquant
          sur le bouton &laquo; Compl&eacute;ter le formulaire de motivation &raquo;. Celui-ci permettra au pr&eacute;fet de
          donner un avis et &agrave; l&rsquo;ANCT de valider ou refuser votre demande.
        </li>
        <li className="fr-mb-2w">
          Concertation territoriale : le pr&eacute;fet donne son avis.
        </li>
        <li className="fr-mb-2w">
          L&rsquo;ANCT valide ou refuse la candidature.
        </li>
        <li className="fr-mb-2w">
          Une notification vous est envoy&eacute;e d&egrave;s sa validation.
        </li>
      </ol>
      <span>
        Si votre demande est accept&eacute;e, vous pourrez proc&eacute;der &agrave; l&rsquo;&eacute;tape de pr&eacute;s&eacute;lection du candidat.
      </span>
      <p className="fr-mt-2w" style={{ width: '70%' }}>
        Si votre futur conseiller coordinateur est d&eacute;j&agrave; embauch&eacute; au sein de votre structure, il vous suffira de
        cliquer sur le bouton &laquo; Attribuer un r&ocirc;le de coordinateur &raquo; en s&eacute;lectionnant le nom et pr&eacute;nom de la
        personne parmi la liste.
      </p>
      <span>
        <strong>Pour tout savoir sur le recrutement d&rsquo;un coordinateur&nbsp;:&nbsp;
          <a
            style={{ color: '#000091' }}
            href="https://cdn.conseiller-numerique.gouv.fr/Appel_a_candidatures_conseiller_numeriques_coordinateurs.pdf"
            target="_blank"
            rel="noopener noreferrer">
            consulter la circulaire
          </a>
        </strong>
      </span>
      <div className="fr-grid-row fr-grid-row--center fr-mt-5w fr-pb-6w">
        {structure?.demandesCoordinateur?.length > 0 ?
          <a
            href={`https://www.demarches-simplifiees.fr/dossiers/${structure?.demandesCoordinateur[0]?.dossier?.numero}`}
            className="fr-btn"
            target="_blank"
            rel="noopener noreferrer"
            title="Consulter votre dossier D&eacute;marche Simplifi&eacute;e"
          >
            Consulter votre dossier D&eacute;marche Simplifi&eacute;e
          </a> :
          <a
            href={`${process.env.REACT_APP_DEMARCHES_SIMPLIFIEES_RECRUTEMENT_COORDINATEUR}?champ_Q2hhbXAtMzI3MTEzNw=${structure?.idPG}`}
            className="fr-btn"
            target="_blank"
            rel="noopener noreferrer"
            title="Compl&eacute;ter le formulaire de motivation"
          >
            Compl&eacute;ter le formulaire de motivation
          </a>
        }
      </div>
    </div>
  );
}

export default RecrutementCoordinateur;
