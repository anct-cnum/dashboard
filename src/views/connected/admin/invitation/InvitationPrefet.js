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
      return;
    }
    dispatch(InvitationsActions.inviteAccountPrefet({ email, ...localite }));
    setActiveMessage(false);
    scrollTopWindow();
    setTimeout(() => {
      dispatch(InvitationsActions.resetInvitation());
    }, 10000);
  };

  useEffect(() => {
    setEmail('');
    setActiveMessage(false);
    if (option === 'prefet-departement') {
      setLocalite({ departement: Departement[0].num_dep });
    }
    if (option === 'prefet-region') {
      setLocalite({ region: Region[0].code });
    }
  }, [option]);

  return (
    <div>
      <div className="fr-my-3w fr-my-md-6w">
        {option === 'prefet-departement' &&
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
        }
        {option === 'prefet-region' &&
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
        }
        <div className={`fr-input-group ${email && !valideInputEmail(email) && activeMessage ? 'fr-input-group--error' : ''}`}>
          <label className="fr-label" htmlFor="email-prefet-input">
                Adresse mail &agrave; ajouter :
          </label>
          <input
            className={`fr-input ${email && !valideInputEmail(email) && activeMessage ? 'fr-input--error' : ''}`}
            aria-describedby="email-prefet-error"
            type="text"
            id="email-prefet-input"
            name="email"
            value={email}
            onChange={handleChange} />
          {email && !checkEmail(email) &&
              <p className="fr-error-text">
                  L&apos;adresse email doit &ecirc;tre du nom de domaine&nbsp;<strong>gouv.fr</strong>.
              </p>
          }
          {email && !valideInputEmail(email) && activeMessage &&
                <p id="email-prefet-error" className="fr-error-text">
                    Le format de l&rsquo;email saisi est invalide.
                </p>
          }
        </div>
        <button onClick={() => setEmail('')}
          disabled={email.length === 0 ? 'disabled' : ''}
          className="fr-btn"
        >
        Annuler
        </button>
        <button
          style={{ float: 'right' }}
          className="fr-btn fr-fi-checkbox-line fr-btn--icon-left"
          onClick={handleSubmit}
        >
        Valider
        </button>
      </div>
    </div>

  );
}
InvitationPrefet.propTypes = {
  option: PropTypes.string,
};
