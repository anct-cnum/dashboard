import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../actions';
import { formatNomConseiller } from '../../../utils/formatagesUtils';

function MesInformations() {

  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication.user);
  const conseiller = useSelector(state => state.conseiller?.conseiller);


  useEffect(() => {
    dispatch(conseillerActions.get(userAuth?.entity.$id));
  }, []);

  return (
    <div className="fr-grid-row">
      <div className="fr-col-12 fr-col-lg-6 fr-mb-3w fr-mb-lg-0w">
        <h2>Mon compte</h2>
        <p>Email : <b>{userAuth?.name}</b></p>
      </div>
      <div className="fr-col-12 fr-mb-3w fr-col-lg-6 fr-mb-lg-0w">
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
  );
}

export default MesInformations;
