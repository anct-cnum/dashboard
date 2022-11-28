import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Departement from '../../../../datas/departements-region.json';
import Region from '../../../../datas/code_region.json';
import { InvitationsActions } from '../../../../actions/invitationsActions';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { valideInputEmail } from '../../../../utils/formatagesUtils';

export default function InvitationPrefet() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [localiteDep, setLocaliteDep] = useState('');
  const [localiteReg, setLocaliteReg] = useState('');
  const [activeMessage, setActiveMessage] = useState(false);

  const handleChange = e => setEmail(e.target.value.trim());
  const checkEmail = email => email.endsWith('.gouv.fr');
  const handleSubmit = () => {
    if (!valideInputEmail(email)) {
      setActiveMessage(true);
      return;
    }
    dispatch(InvitationsActions.inviteAccountPrefet({ email, ...(localiteDep !== '') ? { ...(localiteDep) } : { ...(localiteReg) } }));
    setActiveMessage(false);
    scrollTopWindow();
    setTimeout(() => {
      dispatch(InvitationsActions.resetInvitation());
    }, 10000);
  };

  useEffect(() => {
    setEmail('');
    setActiveMessage(false);
  }, []);

  return (
    <div>
      <div className="fr-my-3w fr-my-md-6w">
        <div>
          <span>
            <select
              className="fr-select"
              onChange={e => {
                setLocaliteDep({ departement: e.target.value });
                setLocaliteReg('');
              }}
              value={localiteDep.departement ?? ''}
            >
              <option value="" disabled hidden>S&eacute;lectionner un d&eacute;partement</option>
              {Departement.map((departement, idx) => (
                <option key={idx} value={departement.num_dep}>
                  {departement.num_dep} - {departement.dep_name}
                </option>
              ))}
            </select>
          </span>
        </div>
        <div>
          <span>
            <select
              className="fr-select fr-mt-3w"
              onChange={e => {
                setLocaliteReg({ region: e.target.value });
                setLocaliteDep('');
              }}
              value={localiteReg.region ?? ''}
            >
              <option value="" disabled hidden>Ou s&eacute;lectionner une r&eacute;gion</option>
              {Region.map((region, idx) => (
                <option key={idx} value={region.code}>
                  {region.code} - {region.nom}
                </option>
              ))}
            </select>
          </span>
        </div>
        <div className={`fr-input-group fr-mt-3w ${email && !valideInputEmail(email) && activeMessage ? 'fr-input-group--error' : ''}`}>
          <input
            className={`fr-input ${email && !valideInputEmail(email) && activeMessage ? 'fr-input--error' : ''}`}
            aria-describedby="email-prefet-error"
            placeholder="Email"
            type="text"
            id="email-prefet-input"
            name="email"
            value={email}
            onChange={handleChange} />
          {email && !checkEmail(email) &&
              <p className="fr-error-text">
                L&apos;adresse email doit &ecirc;tre du nom de domaine&nbsp;<strong>.gouv.fr</strong>.
              </p>
          }
          {email && !valideInputEmail(email) && activeMessage &&
                <p id="email-prefet-error" className="fr-error-text">
                  Le format de l&rsquo;email saisi est invalide.
                </p>
          }
          {email === '' && activeMessage &&
                  <p id="username-error" className="fr-error-text">
                    Veuillez saisir une adresse email.
                  </p>
          }
        </div>
        <button onClick={() => setEmail('')}
          disabled={email.length === 0 ? 'disabled' : ''}
          className="fr-btn fr-btn--secondary"
        >
          Annuler
        </button>
        <button
          className="fr-btn fr-ml-2w"
          onClick={handleSubmit}
          {...!email || !valideInputEmail(email) || !checkEmail(email) || (localiteDep === '' && localiteReg === '') ? { 'disabled': true } : {}}
        >
          Envoyer
        </button>
      </div>
    </div>

  );
}
InvitationPrefet.propTypes = {
  option: PropTypes.string,
};
