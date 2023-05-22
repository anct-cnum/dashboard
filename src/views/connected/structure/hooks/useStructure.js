import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { structureActions } from '../../../../actions';

export function useStructure() {
  const userAuth = useSelector(state => state.authentication?.user);
  const structure = useSelector(state => state.structure?.structure);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(structureActions.getDetails(userAuth?.entity?.$id));
  }, [openModal]);

  return { structure, openModal, setOpenModal };
}
