import { handleApiError, roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const reconventionnementService = {
  update,
};

function update(structureId, etat, misesEnRelations, nombreDePostes, motif) {
  return API.patch(`${apiUrlRoot}/reconventionnement?structureId=${structureId}&etat=${etat}
  &nombreDePostes=${nombreDePostes}&motif=${motif}&role=${roleActivated()}`, { misesEnRelations })
  .then(response => response.data)
  .catch(handleApiError);
}
