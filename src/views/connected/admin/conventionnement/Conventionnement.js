import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

function Conventionnement({ structure, typeConvention }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const formatAvisPrefet = avisPrefet => {
    switch (avisPrefet) {
      case 'POSITIF':
        return <div className="square-icone-checkbox"><span className="fr-icon-checkbox-circle-fill" aria-hidden="true" /></div>;
      case 'NÉGATIF':
        return <div className="square-icone-close"><span className="fr-icon-close-circle-fill" aria-hidden="true" /></div>;
      default:
        return '';
    }
  };

  return (
    <>
      <td className="uppercase-letter">
        <span className="fr-text--bold">{structure?.nom}</span><br />
        <span>ID {structure?.idPG}</span>
      </td>
      <td>
        {structure?.createdAt ?
          <span>{dayjs(structure.createdAt).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{structure?.nombreConseillersSouhaites ? structure.nombreConseillersSouhaites : '-'}</td>
      {typeConvention === 'conventionnement' &&
        <td>{formatAvisPrefet(structure?.prefet?.avisPrefet)}</td>
      }
      <td>
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <span className="fr-mr-2w">Conventionnement initial</span>
          {structure?.prefet?.idStructureTransfert &&
            <>
              <div
                className="fr-mt-1w"
                data-tooltip-content="Transfert de poste"
                data-tooltip-float="true"
                data-tooltip-id={`tooltip-conventionnement-${structure?.idPG}`}
              >
                <i className="ri-arrow-left-right-line" style={{ fontSize: '1.9rem' }}></i>
              </div>
              <Tooltip variant="light" id={`tooltip-conventionnement-${structure?.idPG}`} className="infobulle" />
            </>
          }
        </div>
      </td>
      <td>
        <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left" to={{
          pathname: `/${roleActivated}/demandes/convention/${structure?._id}`,
          search: `?type=conventionnement`,
        }}
        state={{ 'origin': `/${roleActivated}/demandes/conventions`, typeConvention }}>
          D&eacute;tails
        </Link>
      </td>
    </>
  );
}

Conventionnement.propTypes = {
  structure: PropTypes.object,
  typeConvention: PropTypes.string,
};

export default Conventionnement;
