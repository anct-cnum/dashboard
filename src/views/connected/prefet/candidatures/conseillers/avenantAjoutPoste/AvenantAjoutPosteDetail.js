import React from 'react';
import dayjs from 'dayjs';
import { pluralize } from '../../../../../../utils/formatagesUtils';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { conventionActions } from '../../../../../../actions';
import { StatutCoselec } from '../../../../../../utils/enumUtils';

function AvenantAjoutPosteDetail({ structure, idDemandeCoselec }) {
  const dispatch = useDispatch();

  const demandesCoselec = structure?.demandesCoselec?.find(demande => demande.id === idDemandeCoselec);

  const refusAvenantAjoutPoste = () => {
    dispatch(conventionActions.updateAvenantAjoutPoste(structure._id, StatutCoselec.NÉGATIF));
  };

  return (
    <div className="fr-card fr-mt-8w">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <div className="fr-card__header">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row-reverse',
            }}>
              <h3 className="fr-card__title fr-h3">
                Demande de&nbsp;{pluralize(
                  'poste supplémentaire',
                  'poste supplémentaire',
                  'postes supplémentaires',
                  demandesCoselec?.nombreDePostesSouhaites,
                  true
                )}
              </h3>
              {demandesCoselec?.avisPrefet === 'défavorable' &&
                <p className="fr-badge fr-badge--error">Avis d&eacute;favorable</p>
              }
              {demandesCoselec?.avisPrefet === 'favorable' &&
                <p className="fr-badge fr-badge--success">Avis favorable</p>
              }
              {!demandesCoselec?.avisPrefet &&
                <p className="fr-badge fr-badge--new">En attente d&rsquo;avis</p>
              }
            </div>
            <p className="fr-card__desc fr-text--lg fr-text--regular">
              Demande initi&eacute;e le&nbsp;
              {demandesCoselec?.emetteurAvenant?.date ?
                <span>le&nbsp;{dayjs(demandesCoselec.emetteurAvenant.date).format('DD/MM/YYYY')}</span> :
                <span>&agrave; une date inconnue</span>
              }
            </p>
            <p className="fr-card__desc fr-text--lg" style={{ color: '#000091' }}>
              <strong className="fr-text--bold">
                {pluralize(
                  'poste attribué à cette structure',
                  'poste attribué à cette structure',
                  'postes attribués à cette structure',
                  structure?.nombreConseillersCoselec,
                  true
                )}
              </strong>
            </p>
          </div>
          <div className="fr-col-12" style={{ position: 'absolute', left: '0', top: '175px' }} >
            <hr style={{ borderWidth: '0.5px' }} />
          </div>
          <div className="fr-card__desc fr-text--md" style={{ display: 'flex', marginTop: '3.7rem', gap: '24px' }}>
            <div className="motif-structure">
              <strong>Motif de la structure:</strong>
              <span className="fr-mt-1w">{demandesCoselec?.motif ?? 'Non renseigné'}</span>
            </div>
            {demandesCoselec?.commentaire &&
              <div className="commentaire-prefet">
                <strong>Commentaire pr&eacute;fet:</strong>
                <span className="fr-mt-1w">{demandesCoselec.commentaire}</span>
              </div>
            }
          </div>
        </div>
        {demandesCoselec?.statut === 'en_cours' &&
          <div className="fr-card__footer" style={{ paddingTop: '0' }}>
            <hr style={{ borderWidth: '0.5px' }} />
            <ul className="fr-btns-group fr-btns-group--icon-left fr-btns-group--inline-reverse fr-btns-group--center fr-btns-group--inline-lg">
              {!demandesCoselec?.avisPrefet ?
                <>
                  <li>
                    <button className="fr-btn fr-btn--secondary" onClick={refusAvenantAjoutPoste}>
                      Avis d&eacute;favorable
                    </button>
                  </li>
                  <li>
                    <button className="fr-btn">
                      Avis favorable
                    </button>
                  </li>
                </> :
                <button className="fr-btn">
                  Modifier en avis {demandesCoselec?.avisPrefet}
                </button>
              }
            </ul>
          </div>
        }
      </div>
    </div>
  );
}

AvenantAjoutPosteDetail.propTypes = {
  structure: PropTypes.object,
  idDemandeCoselec: PropTypes.string,
};

export default AvenantAjoutPosteDetail;
