import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../components/Spinner';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { coordinateurActions, alerteEtSpinnerActions } from '../../../../actions';
import dayjs from 'dayjs';
import StructureContactCards from '../../../../components/cards/StructureContactCards';

function CoordinateurDetails() {
  const dispatch = useDispatch();
  const { idStructure } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const idDemandeCoordinateur = queryParams.get('demande');
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const coordinateur = useSelector(state => state.coordinateur?.coordinateur);
  const loading = useSelector(state => state.coordinateur?.loading);
  const errorCoordinateur = useSelector(state => state.coordinateur?.error);

  useEffect(() => {
    if (!errorCoordinateur) {
      // scrollTopWindow();
      if (coordinateur?._id !== idStructure) {
        dispatch(coordinateurActions.getDemandeCoordinateur(idStructure, idDemandeCoordinateur));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: errorCoordinateur ?? 'La demande n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorCoordinateur]);

  return (
    <div className="coordinateurDetails">
      <Spinner loading={loading} />
      <button
        onClick={() => window.close()}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </button>
      <div className="fr-col-12 fr-pt-6w">
        <h1 className="fr-h1 fr-mb-1w" style={{ color: '#000091' }}>{coordinateur?.nom ?? '-'}</h1>
      </div>
      <div className="fr-col-12 fr-mb-4w">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <span className="fr-text--xl fr-text--bold" style={{ marginBottom: '0' }}>ID - {coordinateur?.idPG ?? ''}</span>
          <button className="fr-btn fr-icon-eye-line fr-btn--icon-left fr-ml-auto"
            onClick={() => window.open(`/${roleActivated}/structure/${coordinateur?._id}`)}>
            D&eacute;tails structure
          </button>
        </div>
      </div>
      <StructureContactCards structure={coordinateur} />
      <div className="fr-grid-row fr-mt-7w fr-mb-2w fr-col-12">
        <div className="fr-col-12">
          <hr style={{ borderWidth: '0.5px' }} />
        </div>
      </div>
      <h2>Candidature</h2>
      <div className="fr-card">
        <div className="fr-card__body">
          <div className="fr-card__header fr-mt-4w">
            <h3 className="fr-card__title fr-h3">
              Recrutement coordinateur
            </h3>
            <p className="fr-card__desc fr-text--lg fr-text--regular">
              Date de candidature:&nbsp;
              {coordinateur?.demandesCoordinateur[0]?.dossier.dateDeCreation ?
                <span>le&nbsp;{dayjs(coordinateur?.demandesCoordinateur[0]?.dossier.dateDeCreation).format('DD/MM/YYYY')}</span> :
                <span>&agrave; une date inconnue</span>
              }
            </p>
          </div>
          <div className="fr-card__content">
            <div style={{ backgroundColor: '#E8EDFF' }}>
              <div className="fr-container questionnaire" style={{ padding: '5rem' }}>
                <h6 className="fr-text--bold fr-mb-4w">R&eacute;ponses au questionnaire D&eacute;marches simplifi&eacute;es</h6>
                {coordinateur?.questionnaire.map((question, idx) =>
                  <div key={idx}>
                    <p className="fr-text--bold">{question?.question}</p>
                    <p>{question?.reponse}</p>
                    <hr />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="fr-card__footer">
            <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
              <li>
                <button className="fr-btn fr-btn--secondary">
                  Candidature non recevable
                </button>
              </li>
              <li>
                <button className="fr-btn">
                  Candidature recevable
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoordinateurDetails;
