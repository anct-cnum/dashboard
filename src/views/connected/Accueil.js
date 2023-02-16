import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Admin from './admin';
import Coordinateur from './coordinateur';
import GrandReseau from './grandReseau';
import Hub from './hub';
import Prefet from './prefet';
import Structure from './structure';

export default function Accueil() {

  const navigate = useNavigate();
  const roleActivated = useSelector(state => state.authentication?.roleActivated);


  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    } else if (location.pathname.startsWith('/accueil') && localStorage.getItem('user') !== '{}' && window.location.pathname.split('/').length > 2) {
      navigate('/accueil'); // pour ne pas partir en vue 404 si token présent après signInCallBack
    }
  });

  return (
    <div className="fr-container fr-my-10w">
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
      { roleActivated === 'grandReseau' &&
        <GrandReseau />
      }
    </div>
  );
}
