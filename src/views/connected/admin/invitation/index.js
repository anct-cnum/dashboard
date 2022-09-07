import React, { useState } from 'react';
import InvitationPrefet from './InvitationPrefet';
import InvitationAdmin from './InvitationAdmin';

export default function Invation() {
  const [option, setOption] = useState('');
  const arrayOption = [
    { value: 'admin', label: 'Admin' },
    { value: 'prefet-region', label: 'Préfet par région' },
    { value: 'prefet-departement', label: 'Préfet par département' }
  ];
  return (
    <>
      <div className="fr-form-group">
        <fieldset className="fr-fieldset fr-fieldset--inline">
          <legend className="fr-fieldset__legend fr-text--regular" id="radio-inline-legend">
          L&eacute;gende pour l&rsquo;ensemble de champs
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
      {['prefet-region', 'prefet-departement'].includes(option) && <InvitationPrefet option={option} /> }
      {['admin'].includes(option) && <InvitationAdmin/> }
    </>
  );
}
