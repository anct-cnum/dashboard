import React from 'react';
import { useSelector } from 'react-redux';
import Admin from './admin';
import Coordinateur from './coordinateur';
import GrandReseau from './grandReseau';
import Hub from './hub';
import Prefet from './prefet';
import Structure from './structure';

export default function Accueil() {

  const roleActivated = useSelector(state => state.authentication?.roleActivated);


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
