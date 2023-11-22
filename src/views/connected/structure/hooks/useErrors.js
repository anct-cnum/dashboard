import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { alerteEtSpinnerActions } from '../../../../actions';

export function useErrors() {
  const dispatch = useDispatch();
  const errorMisesEnRelation = useSelector(state => state?.misesEnRelation?.error);
  const errorStructure = useSelector(state => state?.structure?.error);

  useEffect(() => {
    if (errorStructure || errorMisesEnRelation) {
      scrollTopWindow();
      const errorMessage = errorMisesEnRelation || errorStructure;

      dispatch(
        alerteEtSpinnerActions.getMessageAlerte({
          type: 'error',
          message: errorMessage,
          status: null,
          description: null,
        })
      );
    }
  }, [errorMisesEnRelation, errorStructure, dispatch]);

  const handleErrors = () => {
    if (errorStructure || errorMisesEnRelation) {
      return errorMisesEnRelation || errorStructure;
    }
    return null;
  };

  return {
    handleErrors
  };
}
