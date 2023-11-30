import React from 'react';
import propType from 'prop-types';
import StructureContactForm from '../../../../components/StructureContactForm';
import { formatNomContactStructure, formatNumeroTelephone } from '../../../../utils/formatagesUtils';

const StructureInformationsCard = ({ structure, formInformationContact, setFormInformationContact }) => {

  return (
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w color-text color-title-subpart">
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row" style={{ alignItems: 'center' }}>
            <div className="fr-col-xl-3 fr-col-md-12 fr-col-12">
              <div className="">
                <strong className="fr-text--md fr-text--bold">Contact de la structure</strong>
                <br />
                <span className="fr-text--regular fr-text--md" title={structure ? formatNomContactStructure(structure) : ''}>
                  {structure ?
                    <>
                      {formatNomContactStructure(structure).length > 28 ?
                        `${formatNomContactStructure(structure).substring(0, 28)}...` : formatNomContactStructure(structure)
                      }
                    </> : '-'
                  }
                </span>
              </div>
            </div>
            <div className="fr-col-xl-2 fr-col-md-6 fr-col-12  fonction-structure">
              <div>
                <strong className="fr-text--md fr-text--bold">
                  Fonction
                </strong>
                <br />
                <span className="fr-text--regular fr-text--md" title={structure?.contact?.fonction ?? ''}>
                  {structure?.contact?.fonction ?
                    <>
                      {structure?.contact?.fonction?.length > 19 ?
                        `${structure?.contact?.fonction.substring(0, 19)}...` : structure?.contact?.fonction
                      }
                    </> : '-'
                  }
                </span>
              </div>
            </div>
            <div className="fr-col-xl-2 fr-col-md-6 fr-col-12 ">
              <div>
                <strong className="fr-text--md fr-text--bold">
                  T&eacute;l&eacute;phone
                </strong>
                <br />
                <span className="fr-text--regular fr-text--md">
                  {formatNumeroTelephone(structure?.contact?.telephone)}
                </span>
              </div>
            </div>
            <div className="fr-col-xl-3 fr-col-12 fr-col-md-6 ">
              <div>
                <strong className="fr-text--md fr-text--bold">
                  Email
                </strong>
                <br />
                <span className="fr-text--regular fr-text--md" title={structure?.contact?.email ?? ''}>
                  {structure?.contact?.email ?
                    <>
                      {structure?.contact?.email?.length > 36 ?
                        `${structure?.contact?.email.substring(0, 36)}...` : structure?.contact?.email
                      }
                    </> : '-'
                  }
                </span>
              </div>
            </div>
            <div className="fr-ml-auto">
              <button className="fr-btn fr-btn--tertiary-no-outline" onClick={() => setFormInformationContact(true)}>
                <i className="ri-edit-line fr-mr-1w"></i>Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
      {formInformationContact === true &&
        <StructureContactForm structure={structure} setForm={setFormInformationContact} />
      }
    </div>
  );
};

StructureInformationsCard.propTypes = {
  structure: propType.object,
  formInformationContact: propType.bool,
  setFormInformationContact: propType.func
};

export default StructureInformationsCard;
