import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { structureActions } from '../actions/structureActions';

function StructureContactForm({ setForm, structure }) {
  const dispatch = useDispatch();
  const [infoForm, setInfoForm] = useState(structure?.contact);

  const handleForm = event => {
    const { name, value } = event.target;
    setInfoForm({
      ...infoForm,
      [name]: value
    });
  };
  const updateInfo = () => {
    dispatch(structureActions.patch({ id: structure?._id, contact: infoForm }));
    setForm(false);
  };
  return (
    <div>
      <div className="fr-my-3w fr-col-lg-10 fr-col-md-10 fr-col-12">
        <label className="fr-label">Nom</label>
        <input className="fr-input" type="text" name="nom" value={infoForm?.nom} onChange={handleForm} />
        <label className="fr-label fr-mt-5v">Prénom</label>
        <input className="fr-input" type="text" name="prenom" value={infoForm?.prenom} onChange={handleForm} />
        <label className="fr-label fr-mt-5v">Fonction</label>
        <input className="fr-input" type="text" name="fonction" value={infoForm?.fonction} onChange={handleForm} />
        <label className="fr-label fr-mt-5v">Téléphone</label>
        <input className="fr-input" type="text" name="telephone" maxLength="20" value={infoForm?.telephone} onChange={handleForm}/>
      </div>
      <div className="fr-col-lg-10 fr-col-md-10 fr-col-12">
        <button onClick={() => setForm(false)} className="fr-btn">Annuler</button>
        <button style={{ float: 'right' }} className="fr-btn" onClick={updateInfo}>Valider</button>
      </div>
    </div>
  );
}

StructureContactForm.propTypes = {
  setForm: PropTypes.func,
  structure: PropTypes.object
};
export default StructureContactForm;

