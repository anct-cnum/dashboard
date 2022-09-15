import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Departement from '../../../../datas/departements-region.json';
import Region from '../../../../datas/code_region.json';
import { InvitationsActions } from '../../../../actions/invitationsActions';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { valideInputEmail } from '../../../../utils/formatagesUtils';

export default function InvitationPrefet({ option }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [localite, setLocalite] = useState({});
  const [activeMessage, setActiveMessage] = useState(false);

  const handleChange = e => setEmail(e.target.value);
  const checkEmail = email => email.endsWith('.gouv.fr');
  const handleSubmit = () => {
    if (!valideInputEmail(email)) {
      setActiveMessage(true);
    }
    dispatch(InvitationsActions.inviteAccountPrefet({ email, ...localite }));
    setActiveMessage(false);
    scrollTopWindow();
    setTimeout(() => {
      dispatch(InvitationsActions.resetInvitation());
    }, 10000);
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
      {option === 'prefet-departement' && (
        <div>
          <label className="fr-label">
            Adresse pr&eacute;fecture par d&eacute;partement :
          </label>
          <span>
            <select
              className="fr-select"
              onChange={e => setLocalite({ departement: e.target.value })}
            >
              {Departement.map((region, idx) => (
                <option key={idx} value={region.num_dep}>
                  {region.num_dep} - {region.dep_name}
                </option>
              ))}
            </select>
          </span>
        </div>
      )}
      {option === 'prefet-region' && (
        <div>
          <label className="fr-label">Adresse pr&eacute;fecture par région :</label>
          <span>
            <select
              className="fr-select"
              onChange={e => setLocalite({ region: e.target.value })}
            >
              {Region.map((region, idx) => (
                <option key={idx} value={region.code}>
                  {region.code} - {region.nom}
                </option>
              ))}
            </select>
          </span>
        </div>
      )}
      <div className="fr-my-3w">
        <label className="fr-label">Adresse mail à ajouter</label>
        <input
          name="email"
          type="text"
          value={email}
          onChange={handleChange}
          className="fr-input"
        />
        {email && !checkEmail(email) && (
          <span>
            L&apos;adresse email doit &ecirc;tre du nom de domaine
            <strong>gouv.fr</strong>.
          </span>
        )}
        { email && !valideInputEmail(email) && activeMessage &&
          <div className="invalid">Le format de l&rsquo;email saisi est invalide.</div>
        }
      </div>
      <button
        style={{ float: 'right' }}
        className="fr-btn fr-fi-checkbox-line fr-btn--icon-left"
        onClick={handleSubmit}
        disabled={!email || !checkEmail(email)}
      >
        Valider
      </button>
    </div>
  );
}
InvitationPrefet.propTypes = {
  option: PropTypes.string,
};
