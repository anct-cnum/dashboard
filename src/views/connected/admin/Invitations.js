import React from 'react';
import { useSelector } from 'react-redux';
import Invitation from './invitation';
import { Oval } from 'react-loader-spinner';

export default function Invitations() {
  const { error, success, loading } = useSelector(state => state.invitations);
  
  return (
    <div className="fr-container fr-my-10w">
      {success &&
        <div className="fr-alert fr-alert--success" style={{ marginBottom: '2rem' }} >
          <p className="fr-alert__title">
            {success}
          </p>
        </div>
      }
      {error &&
        <div className="fr-alert fr-alert--error" style={{ marginBottom: '2rem' }}>
          <p className="fr-alert__title">
            {error}
          </p>
        </div>
      }
      <div className="spinnerCustom">
        <Oval
          height={100}
          width={100}
          color="#060091"
          secondaryColor="white"
          visible={loading === true}
        />
      </div>
      <Invitation />
    </div>
  );
}
