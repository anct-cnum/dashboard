import React from 'react';
import PropTypes from 'prop-types';
import { formatNomContactStructure, formatNumeroTelephone } from '../../utils/formatagesUtils';

export default function StructureContactCards({ structure }) {

  return (
    <>
      <div className="color-text color-title-subpart">
        <div className="fr-card">
          <div className="fr-card__body fr-p-0">
            <div className="fr-container fr-mt-3w">
              <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--bottom">
                <div className="fr-col-12 fr-col-lg-3">
                  <div className="fr-mb-3w">
                    <strong>Contact de la structure</strong><br />
                    <span className="fr-text--regular fr-text--md">
                      {structure ? formatNomContactStructure(structure) : ''}
                    </span>
                  </div>
                </div>
                <div className="fr-col-12 fr-col-md-3">
                  <div className="fr-mb-3w">
                    <strong>Fonction</strong><br />
                    <span className="fr-text--regular fr-text--md" title={structure?.contact?.fonction ?? ''}>
                      {structure?.contact?.fonction ?
                        <>
                          {structure?.contact?.fonction?.length > 28 ?
                            `${structure?.contact?.fonction.substring(0, 28)}...` : structure?.contact?.fonction
                          }
                        </> : '-'
                      }
                    </span>
                  </div>
                </div>
                <div className="fr-col-12 fr-col-md-3">
                  <div className="fr-mb-3w">
                    <strong>T&eacute;l&eacute;phone</strong><br />
                    <span className="fr-text--regular fr-text--md">
                      {formatNumeroTelephone(structure?.contact?.telephone)}
                    </span>
                  </div>
                </div>
                <div className="fr-col-12 fr-col-md-3">
                  <div className="fr-mb-3w">
                    <strong>Email</strong><br />
                    <span className="fr-text--regular fr-text--md" title={structure?.contact?.email ?? ''}>
                      {structure?.contact?.email ?
                        <>
                          {structure?.contact?.email?.length > 30 ?
                            `${structure?.contact?.email.substring(0, 30)}...` : structure?.contact?.email
                          }
                        </> : '-'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

StructureContactCards.propTypes = {
  structure: PropTypes.object
};
