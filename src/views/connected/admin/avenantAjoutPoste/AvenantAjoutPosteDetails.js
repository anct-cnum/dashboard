import React, { useState } from 'react';
import dayjs from 'dayjs';
import { pluralize } from '../../../../utils/formatagesUtils';
import PropTypes from 'prop-types';
import ModalValidationAvenantAjoutPoste from '../modals/ModalValidationAvenantAjoutPoste';
import ModalRefusAvenantAjoutPoste from '../modals/ModalRefusAvenantAjoutPoste';

function AvenantAjoutPosteDetails({ avenant, idDemandeCoselec }) {

  const [openModalValidation, setOpenModalValidation] = useState(false);
  const [openModalRefus, setOpenModalRefus] = useState(false);
  const demandesCoselec = avenant?.demandesCoselec?.find(demande => demande.id === idDemandeCoselec);


  const formatAvisPrefet = avisPrefet => {
    switch (avisPrefet) {
      case 'favorable':
        return <p className="fr-badge fr-badge--success">avis pr&eacute;fet favorable</p>;
      case 'défavorable':
        return <p className="fr-badge fr-badge--error">avis pr&eacute;fet d&eacute;favorable</p>;
      default:
        return <p className="fr-badge fr-badge--new">en attente de l&apos;avis pr&eacute;fet</p>;
    }
  };

  return (
    <div className="fr-card card-add">
      {openModalValidation &&
        <ModalValidationAvenantAjoutPoste
          idStructure={avenant?._id}
          nomStructure={avenant?.nom}
          demandesCoselec={demandesCoselec}
          nombreConseillersCoselec={avenant.nombreConseillersCoselec}
          setOpenModal={setOpenModalValidation}
        />
      }
      {openModalRefus &&
        <ModalRefusAvenantAjoutPoste
          idStructure={avenant?._id}
          nomStructure={avenant?.nom}
          demandesCoselec={demandesCoselec}
          nombreConseillersCoselec={avenant.nombreConseillersCoselec}
          setOpenModal={setOpenModalRefus}
        />
      }
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title fr-h3">
            {demandesCoselec?.nombreDePostesAccordes ?
              <>
                  Demande de {demandesCoselec?.nombreDePostesAccordes}{pluralize(
                  ' poste supplémentaire ',
                  ' poste supplémentaire ',
                  ' postes de supplémentaires ',
                  demandesCoselec?.nombreDePostesAccordes
                )}
              </> :
              <>
                  Demande de {demandesCoselec?.nombreDePostesSouhaites}{pluralize(
                  ' poste supplémentaire ',
                  ' poste supplémentaire ',
                  ' postes supplémentaires ',
                  demandesCoselec?.nombreDePostesSouhaites
                )}
              </>
            }
          </h3>
          <p className="fr-card__desc fr-text--lg fr-text--regular">
            Demande initi&eacute;e&nbsp;
            {demandesCoselec?.emetteurAvenant?.date ?
              <span>le&nbsp;{dayjs(demandesCoselec.emetteurAvenant.date).format('DD/MM/YYYY')}</span> :
              <span>&agrave; une date inconnue</span>
            }
          </p>
          <div className="fr-card__desc" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className="fr-text--lg" style={{ color: '#000091', width: '54%' }}>
              <strong className="fr-text--bold">
                {demandesCoselec?.nombreDePostesAccordes &&
                  <>
                    {demandesCoselec?.nombreDePostesAccordes}{pluralize(
                      ' poste attribué a cette structure',
                      ' poste attribué a cette structure',
                      ' postes attribués a cette structure',
                      demandesCoselec?.nombreDePostesAccordes
                    )}
                  </>
                }
              </strong>
            </p>
            <a className="fr-btn fr-btn--tertiary-no-outline" href={avenant?.url} target="_blank" rel="noopener noreferrer">
                Voir le dossier D&eacute;marche Simplifi&eacute;e
            </a>
          </div>
          <hr className="fr-card__desc" style={{ marginLeft: '-2rem', marginRight: '-2rem' }}/>
          <div className="fr-card__desc fr-container--fluid">
            <div className=" fr-grid-row" style={{ justifyContent: 'space-between' }}>
              <div className="fr-card fr-card--no-border display-card-info">
                <div className="fr-card__body">
                  <div className="fr-card__content">
                    <p className="fr-text--bold" style={{ marginBottom: '0px' }}>
                      Motif de la structure&nbsp;:
                    </p>
                    <p className="fr-card__desc">{demandesCoselec?.motif ?? 'Non renseigné'}</p>
                  </div>
                </div>
              </div>
              {demandesCoselec?.prefet?.commentaire &&
              <div className={`fr-card fr-card--no-border
              ${demandesCoselec?.prefet?.avis === 'favorable' ? 'display-card-accept' : 'display-card-decline'}`}>
                <div className="fr-card__body">
                  <div className="fr-card__content">
                    <p className="fr-text--bold" style={{ marginBottom: '0px' }}>
                      Commentaire pr&eacute;fet&nbsp;:
                    </p>
                    <p className="fr-card__desc">{demandesCoselec?.prefet?.commentaire}</p>
                    <p className={`fr-card__desc fr-text--bold
                    ${demandesCoselec?.prefet?.avis === 'favorable' ? 'display-card-text-accept' : 'display-card-text-decline'}`}>
                      {demandesCoselec?.prefet?.avis === 'favorable' ? 'Avis favorable' : 'Avis défavorable'}
                    </p>
                  </div>
                </div>
              </div>}
            </div>
          </div>
          <div className="fr-card__start fr-mb-0" style={{ textAlign: 'end' }}>
            {formatAvisPrefet(demandesCoselec?.prefet?.avis)}
          </div>
        </div>
        <div className="fr-card__footer">
          <hr/>
          <ul className="fr-btns-group fr-btns-group--icon-left fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-grid-row--center">
            {demandesCoselec?.statut === 'en_cours' &&
              <>
                <li>
                  <button className="fr-btn fr-btn--secondary" onClick={() => setOpenModalRefus(true)}>
                    Refuser la demande
                  </button>
                </li>
                <li>
                  <button className="fr-btn" onClick={() => setOpenModalValidation(true)}>
                    Valider la demande
                  </button>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

AvenantAjoutPosteDetails.propTypes = {
  avenant: PropTypes.object,
  idDemandeCoselec: PropTypes.string,
};

export default AvenantAjoutPosteDetails;
