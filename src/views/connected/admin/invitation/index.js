import React, { useState } from 'react';
import InvitationPrefet from './InvitationPrefet';
import InvitationAdmin from './InvitationAdmin';
import InvitationHub from './InvitationHub';

export default function Invation() {
  const [option, setOption] = useState('');
  const arrayOption = [
    { value: 'admin', label: 'Admin' },
    { value: 'prefet', label: 'Préfet' },
    { value: 'hub', label: 'Hub' }
  ];
  return (
    <>
      <div className="fr-form-group">
        <fieldset className="fr-fieldset fr-fieldset--inline">
          <legend className="fr-fieldset__legend fr-text--regular fr-my-3w" id="radio-inline-legend" style={{ color: '#6A6A6A' }}>
            Veuillez renseigner le r&ocirc;le et le mail de l&rsquo;administateur, puis envoyer une invitation &agrave; rejoindre le compte.
          </legend>
          <div className="fr-fieldset__content">
            {arrayOption.map((option, key) =>
              <div className="fr-radio-group" key={key}>
                <input type="radio" id={option.value} name="choix-invitation" onClick={() => setOption(option.value)}/>
                <label className="fr-label" htmlFor={option.value}>{option.label}
                </label>
              </div>
            )}
          </div>
        </fieldset>
      </div>
      <div className="fr-col-md-12 fr-col-lg-6">
        {['prefet'].includes(option) && <InvitationPrefet /> }
        {['admin'].includes(option) && <InvitationAdmin /> }
        {['hub'].includes(option) && <InvitationHub /> }
      </div>
    </>
  );
}
