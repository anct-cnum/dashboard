import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StructureContactForm from '../../../../components/StructureContactForm';


function ContactStructure() {
  const structure = useSelector(state => state.structure);
  const [formInformationContact, setFormInformationContact] = useState(false);

  return (
    <>
      <h2>
        Correspondant principal
      </h2>
      {formInformationContact === false &&
        <div className="">
          <p>Nom : {structure?.structure?.contact?.nom}</p>
          <p>Pr&eacute;nom  : {structure?.structure?.contact?.prenom}</p>
          <p>Fonction : {structure?.structure?.contact?.fonction}</p>
          <p>T&eacute;l&eacute;phone : {structure?.structure?.contact?.telephone}</p>
          <div className="fr-mt-5w fr-mb-5w">
            <button className="fr-btn" onClick={() => setFormInformationContact(true)}>
              Modifier les informations de contact
              <span className="fr-fi-edit-line fr-ml-4v" aria-hidden="true" />
            </button>
          </div>
        </div>
      }
      {formInformationContact === true &&
        <StructureContactForm structure={structure?.structure} setForm={setFormInformationContact} />
      }
    </>
  );
}

export default ContactStructure;
