import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { structureActions } from '../../../../actions';

function StructureDetails() {

  const dispatch = useDispatch();
  const { idStructure } = useParams();
  const structure = useSelector(state => state.structure?.structure);
  const [displaySiretForm, setDisplaySiretForm] = useState(false);

  useEffect(() => {
    if (structure?._id !== idStructure) {
      dispatch(structureActions.get(idStructure));
    }
  }, [structure]);

  return (
    <div className="fr-container conseillerDetails">
      <div className="fr-grid-row fr-grid-row--bottom fr-pt-12w fr-pb-9w">
        <div className="fr-grid-row fr-mt-6w fr-mb-4w">
          <div className="fr-col-12 titreCol">
            <h1>Information Structure</h1>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-col-6">
            <div className="fr-mb-3w">
              <strong>Id</strong><br/>
              <span>{structure?.idPG ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Siret</strong><br/>
              <button onClick={() => setDisplaySiretForm(true)} className="fr-grid-row fr-text--md">
                <span>{structure?.siret ?? '-'}</span>
                <span className="fr-icon-edit-line"></span>
              </button>
            </div>
            <div className="fr-mb-3w">
              <strong>Code Postal</strong><br/>
              <span>{structure?.codePostal ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Adresse</strong><br/>
              <span>{structure?.type ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Type</strong><br/>
              <span>{structure?.type ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Date d&lsquo;inscription</strong><br/>
              {structure?.createdAt ?
                <span>{dayjs(structure?.createdAt).format('DD/MM/YYYY')}</span> : <span>-</span>
              }
            </div>
          </div>
          <div className="fr-col-3">
            <div className="fr-mb-3w">
              <strong>Email</strong><br/>
              {structure?.contact?.email &&
              <a className="email"href={'mailto:' + structure?.contact?.email}>
                {structure?.contact?.email}
              </a>
              }
              {!structure?.contact?.email &&
              <span>-</span>
              }
            </div>
            <div className="fr-mb-3w">
              <strong>Nom</strong><br/>
              <div className="fr-grid-row">
                <span>{structure?.contact?.nom ?? '-'}&nbsp;</span>
                <span>{structure?.contact?.prenom ?? ''}</span>
              </div>
            </div>
            <div className="fr-mb-3w">
              <strong>Fonction</strong><br/>
              <span>{structure?.contact?.fonction ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Raison social</strong><br/>
              <span>{structure?.insee?.entreprise?.raison_sociale ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Zone rural</strong><br/>
              <span>{structure?.qpvStatut ?? '-'}</span>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-5w fr-mb-2w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }}/>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-6w fr-mb-4w">
          <div className="fr-col-12 titreCol">
            <h1>Activit&eacute;</h1>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-col-5">
            <div className="fr-mb-3w">
              <strong>Nombre de cra total cumul&eacute;s</strong><br/>
              <span>-</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StructureDetails;
