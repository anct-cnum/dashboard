import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { statistiquesService } from '../../../../../../services/statistiquesService';
import { useSelector } from 'react-redux';

export default function PreFetch() {
  const dateDebut = useSelector(state => state.statistiques?.dateDebut);
  const dateFin = useSelector(state => state.statistiques?.dateFin);
  const queryClient = useQueryClient();
    
  const preFetch = async () => await queryClient.prefetchQuery(['statsNationales', dateDebut, dateFin],
    () => statistiquesService.getStatistiquesNationale(dateDebut, dateFin));
    
  useEffect(() => {
    if (location.pathname.startsWith('/accueil')) {
      preFetch();
    }
  }, []);
    
  return null;
}
