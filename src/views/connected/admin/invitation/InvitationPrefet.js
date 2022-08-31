import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Departement from '../../../../data/departements-region.json';
import Region from '../../../../data/code_region.json';
import { InvitationActions } from '../../../../actions/invitationAction';

export default function InvitationPrefet({ option }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [localite, setLocalite] = useState({});
  const checkEmail = email => email.endsWith('.gouv.fr');

  const checkEmailNotExist = email => !emails.includes(email);

  const handleSubmit = () => {
    return console.log({ emails, ...localite });
  };
  //   const handleSubmit = () => dispatch(InvitationActions.inviteAccountsPrefet({ emails, ...localite }));
  const handleChange = e => setEmail(e.target.value);
  const handleRemoveEmail = email => setEmails(emails.filter(item => item !== email));

  const handleAddEmail = () => {
    setEmails([...emails, email]);
    setEmail('');
  };

  useEffect(() => {
    if (option === 'prefet-departement') {
      setLocalite({ departement: Departement[0].num_dep });
    }
    if (option === 'prefet-region') {
      setLocalite({ region: Region[0].code });
    }
  }, [option]);

  return (
    <div style={{ width: '50%' }}>
      {option === 'prefet-departement' && <div>
        <label className="fr-label">Adresse préfecture par département : </label>
        <span>
          <select className="fr-select" onChange={e => setLocalite({ departement: e.target.value })}>
            {Departement.map((region, idx) =>
              <option key={idx} value={region.num_dep}>{region.num_dep} - {region.dep_name}</option>
            )}
          </select>
        </span>
      </div>}
      {option === 'prefet-region' && <div>
        <label className="fr-label">Adresse préfecture par région :</label>
        <span>
          <select className="fr-select" onChange={e => setLocalite({ departement: e.target.value }) }>
            {Region.map((region, idx) =>
              <option key={idx} value={region.code}>{region.code} - {region.nom}</option>
            )}
          </select>
        </span>
      </div>}
      <div className="fr-my-3w">
        <label className="fr-label">Adresse email à ajouter</label>
        <ul>
          {emails.map((email, idx) =>
            <li key={idx}>
              {email}
              <button
                className="fr-btn fr-fi-delete-line fr-btn--icon-left fr-btn--secondary fr-btn--sm fr-ml-1w"
                onClick={handleRemoveEmail.bind(this, email)}>
                        Retirer
              </button>
            </li>)}
        </ul>
        <input name="email"
          type="text"
          value={email}
          onChange={handleChange}
          className="fr-input" />
        { email && !checkEmail(email) &&
            <span>L&apos;adresse email doit être du nom de domaine <strong>gouv.fr</strong>.</span>
        }
        { email && !checkEmailNotExist(email) &&
            <span>L&apos;adresse email a déjà été ajoutée.</span>
        }
        <button className="fr-btn fr-mt-1w"
          onClick={handleAddEmail}
          disabled={ !email || !checkEmail(email) || !checkEmailNotExist(email)}>
                Ajouter l&apos;utilisateur
        </button>
      </div>
      <button style={{ float: 'right' }} className="fr-btn fr-fi-checkbox-line fr-btn--icon-left" onClick={handleSubmit} disabled={emails.length === 0}>
          Valider
      </button>
    </div>
  );
}
InvitationPrefet.propTypes = {
  option: PropTypes.string,
};


