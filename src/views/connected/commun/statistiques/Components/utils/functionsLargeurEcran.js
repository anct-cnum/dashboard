import { useState, useEffect } from 'react';

export default function largeurEcran() {

  const hasEcran = typeof window !== 'undefined';

  function getLargeur() {
    return hasEcran ? window.innerWidth : null;
  }

  const [largeur, setLargeurEcran] = useState(getLargeur());

  function handleResize() {
    setLargeurEcran(getLargeur());
  }

  useEffect(() => {
    if (hasEcran) {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasEcran]);
  
  return largeur;
}
