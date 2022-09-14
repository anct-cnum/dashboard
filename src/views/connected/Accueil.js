import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Admin from './admin';
import Coordinateur from './coordinateur';
import Hub from './hub';
import Prefet from './prefet';
import Structure from './structure';

export default function Accueil() {

  const navigate = useNavigate();
  const roleActivated = useSelector(state => state.authentication.roleActivated);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  });

  return (
    <div className="fr-container fr-my-10w">
      <p>Bienvenue, vous avez le profil {roleActivated} activé</p>
      {/* routes distinctes en fonction des rôles dans les composants */}
      { roleActivated === 'admin' &&
        <Admin />
      }
      { roleActivated === 'prefet' &&
        <Prefet />
      }
      { roleActivated === 'hub_coop' &&
        <Hub />
      }
      { roleActivated === 'structure' &&
        <Structure />
      }
      { roleActivated === 'coordinateur_coop' &&
        <Coordinateur />
      }
    </div>
  );
}
