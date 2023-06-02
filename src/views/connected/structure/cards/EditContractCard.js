import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';
import dayjs from 'dayjs';

const EditContractCard = ({ conseiller, roleActivated, setOpenModalContrat, setMiseEnrelationId }) => {

  useEffect(() => {
    if (conseiller?.miseEnrelationId) {
      setMiseEnrelationId(conseiller?.miseEnrelationId);
    }
  }, [conseiller.miseEnrelationId]);

  return (
    <>
      <div className="fr-col-12 fr-mt-2w fr-p-3w card-banner-top">
        <div className="fr-card__body fr-p-0">
          <div>
            <div className="fr-grid-row responsive__wide-card" style={{ alignItems: 'center' }}>
              <div className="fr-col-2 card__text">
                <div>
                  <span className="fr-text--md fr-text--bold">{conseiller ? formatNomConseiller(conseiller) : ''}</span>
                  <br />
                  <span className="fr-text--regular fr-text--md info__color">ID - {conseiller?.idPG}</span>
                </div>
              </div>
              <div className="fr-col-2 card__text">
                <div>
                  <span className="fr-text--md" style={{ fontWeight: '500' }}>
                    Type de contrat
                  </span>
                  <br />
                  <span className="fr-text--regular fr-text--md info__color">{conseiller?.typeDeContrat ?? '-'}</span>
                </div>
              </div>
              <div className="fr-col-2 card__text">
                <div>
                  <span className="fr-text--md" style={{ fontWeight: '500' }}>
                    D&eacute;but de contrat
                  </span>
                  <br />
                  <span className="fr-text--regular fr-text--md info__color">
                    {conseiller?.dateDebutDeContrat ? dayjs(conseiller?.dateDebutDeContrat).format('DD/MM/YYYY') : '-'}
                  </span>
                </div>
              </div>
              <div className="fr-col-2 card__text">
                <div>
                  <span className="fr-text--md" style={{ fontWeight: '500' }}>
                    Fin de contrat
                  </span>
                  <br />
                  <span className="fr-text--regular fr-text--md info__color">
                    {conseiller?.dateFinDeContrat ? dayjs(conseiller?.dateFinDeContrat).format('DD/MM/YYYY') : '-'}
                  </span>
                </div>
              </div>
              <div className="fr-col-2 card__text">
                <p className="fr-badge fr-badge--success">En activit&eacute;</p>
              </div>
              <div className="fr-col-2">
                <button
                  className="fr-btn fr-icon-eye-line fr-mx-3w card__button"
                  title="D&eacute;tail"
                  onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}
                />
                <button
                  className="fr-btn fr-icon-line-chart-line card__button"
                  title="Statistiques"
                  onClick={() => window.open(`/statistiques-conseiller/${conseiller?._id}`)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* banniere */}
      <div className="fr-col-12 fr-py-2w card-banner-bottom-edit">
        <div className="fr-container notice responsive__banner__edit">
          <div className="fr-col-8 text">
            <div>
              <span className="fr-icon-info-fill icon__color" aria-hidden="true"></span>
              <span className="fr-text--md fr-text--bold fr-ml-2w title__color">
                {conseiller ? `Nouveau contrat de ${formatNomConseiller(conseiller)} en attente de renouvellement` : ''}
              </span>
            </div>
          </div>
          <div className="fr-col-4 buttons">
            <button
              className="fr-btn fr-btn--icon-left fr-icon-edit-line fr-ml-6w card__button"
              title="D&eacute;tail"
              onClick={() => setOpenModalContrat(true)}
            >
              &Eacute;diter son nouveau contrat
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

EditContractCard.propTypes = {
  conseiller: propTypes.object,
  roleActivated: propTypes.string,
  setOpenModalContrat: propTypes.func,
  setMiseEnrelationId: propTypes.func,
  handleOpenModalContrat: propTypes.func,
};

export default EditContractCard;
