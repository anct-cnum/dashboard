import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { alerteEtSpinnerActions } from '../../../../actions';

export function useErrors() {
  const dispatch = useDispatch();
  const errorMisesEnRelation = useSelector(state => state?.misesEnRelation?.error);
  const errorStructure = useSelector(state => state?.structure?.error);

  const errorMessages = {
    errorStructure: 'La structure n\'a pas pu être chargée !',
    errorMisesEnRelation: 'Les mises en relation n\'ont pas pu être chargées !',
  };

  const getErrorMessage = detectedError => {
    return errorMessages[detectedError];
  };

  useEffect(() => {
    const errors = [errorStructure, errorMisesEnRelation];
    const detectedErrors = errors.filter(error => error !== false);

    if (detectedErrors.length > 0) {
      scrollTopWindow();
      dispatch(
        alerteEtSpinnerActions.getMessageAlerte({
          type: 'error',
          message: getErrorMessage(detectedErrors[0]),
          status: null,
          description: null,
        })
      );
    }
  }, [errorMisesEnRelation, errorStructure, dispatch]);

  return {
    handleErrors: getErrorMessage,
  };
}
