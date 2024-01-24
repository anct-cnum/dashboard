import { handleApiError, roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const reconventionnementService = {
  update,
};

function update(structureId, action, misesEnRelations, nombreDePostes, motif) {
  return API.patch(`${apiUrlRoot}/reconventionnement?structureId=${structureId}&action=${action}
  &nombreDePostes=${nombreDePostes}&motif=${motif}&role=${roleActivated()}`, { misesEnRelations })
  .then(response => response.data)
  .catch(handleApiError);
}
