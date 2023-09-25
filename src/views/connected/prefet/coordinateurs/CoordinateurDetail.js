import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../components/Spinner';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { coordinateurActions, alerteEtSpinnerActions } from '../../../../actions';
import dayjs from 'dayjs';
import StructureContactCards from '../../../../components/cards/StructureContactCards';
import ModalConfirmationAvis from './ModalConfirmationAvis';
import { validQueryParamsObjectId } from '../../../../utils/formatagesUtils';

function CoordinateurDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { idStructure } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const idDemandeCoordinateur = queryParams.get('demande');
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const structure = useSelector(state => state.coordinateur?.coordinateur);
  const loading = useSelector(state => state.coordinateur?.loading);
  const successAvisPrefet = useSelector(state => state.coordinateur?.successAvisPrefet);
  const errorCoordinateur = useSelector(state => state.coordinateur?.error);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [openModalAvis, setOpenModalAvis] = useState(false);
  const [avisPrefet, setAvisPrefet] = useState('');

  useEffect(() => {
    if (!errorCoordinateur && validQueryParamsObjectId(idDemandeCoordinateur)) {
      scrollTopWindow();
      if (structure?._id !== idStructure) {
        dispatch(coordinateurActions.getDemandeCoordinateur(idStructure, idDemandeCoordinateur));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: errorCoordinateur ?? 'La demande n\'a pas pu être chargée !',
        status: null, description: null
      }));
    }
  }, [errorCoordinateur]);

  useEffect(() => {
    if (successAvisPrefet !== undefined && successAvisPrefet !== false) {
      window.location.href = '/prefet/demandes/coordinateurs';
    }
  }, [successAvisPrefet]);

  return (
    <div className="coordinateurDetails">
      <Spinner loading={loading} />
      <Link
        to={location?.state?.origin} state={{ currentPage }}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </Link>
      {openModalAvis &&
        <ModalConfirmationAvis setOpenModal={setOpenModalAvis} structure={structure} avisPrefet={avisPrefet} />
      }
      <div className="fr-col-12 fr-pt-6w">
        <h1 className="fr-h1 fr-mb-1w" style={{ color: '#000091' }}>{structure?.nom ?? '-'}</h1>
      </div>
      <div className="fr-col-12 fr-mb-4w">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <span className="fr-text--xl fr-text--bold" style={{ marginBottom: '0' }}>ID - {structure?.idPG ?? ''}</span>
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
      <h2>Candidature</h2>
      <div className="fr-card">
        <div className="fr-card__body">
          <div className="fr-card__header fr-mt-4w">
            <h3 className="fr-card__title fr-h3">
              Recrutement coordinateur
            </h3>
            <p className="fr-card__desc fr-text--lg fr-text--regular">
              Date de candidature&nbsp;:&nbsp;
              {structure?.demandesCoordinateur[0]?.dossier.dateDeCreation ?
                <span>le&nbsp;{dayjs(structure?.demandesCoordinateur[0]?.dossier.dateDeCreation).format('DD/MM/YYYY')}</span> :
                <span>Non renseign&eacute;e</span>
              }
            </p>
          </div>
          <div className="fr-card__content">
            <div className="fr-container questionnaire">
              <h6 className="fr-text--bold fr-mb-4w">R&eacute;ponses au questionnaire D&eacute;marches simplifi&eacute;es</h6>
              {structure?.questionnaire?.map((question, idx) =>
                <div key={idx}>
                  <p className="fr-text--bold">{question.enoncer}</p>
                  {question.files?.length > 0 ?
                    question.files?.map((file, idx) =>
                      <div key={idx} className="fr-mb-4w">
                        <a href={file?.url} target="_blank" rel="noopener noreferrer">{file?.filename}</a>
                      </div>
                    ) :
                    <p>{question.reponse}</p>
                  }
                  {idx + 1 < structure?.questionnaire?.length &&
                    <hr />
                  }
                </div>
              )}
            </div>
          </div>
          {!structure?.demandesCoordinateur[0]?.avisPrefet &&
            <div className="fr-card__footer">
              <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                <li>
                  <button onClick={() => {
                    setAvisPrefet('défavorable');
                    setOpenModalAvis(true);
                  }}
                  className="fr-btn fr-btn--secondary"
                  >
                    Avis D&eacute;favorable
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setAvisPrefet('favorable');
                      setOpenModalAvis(true);
                    }}
                    className="fr-btn"
                  >
                    Avis Favorable
                  </button>
                </li>
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default CoordinateurDetails;
