import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../actions';
import { formatNomConseiller } from '../../../utils/formatagesUtils';
import AccountCard from '../../../components/cards/AccountCard';

function MesInformations() {

  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication.user);
  const conseiller = useSelector(state => state.conseiller?.conseiller);


  useEffect(() => {
    dispatch(conseillerActions.get(userAuth?.entity?.$id));
  }, []);

  return (
    <>
      <h2 className="fr-h2" style={{ color: '#000091' }}>Mon profil</h2>
      <div className="fr-grid-row">
        <AccountCard email={userAuth?.name}/>
        <div className="fr-col-12 fr-my-3w fr-col-lg-6 fr-mb-lg-0w">
          <h2>Mes informations</h2>
          { conseiller &&
          <>
            <p>{formatNomConseiller(conseiller)}</p>
            {conseiller.telephonePro &&
              <p>T&eacute;l&eacute;phone professionnel : {conseiller.telephonePro}</p>
            }
          </>
          }
        </div>
      </div>
    </>
  );
}

export default MesInformations;
