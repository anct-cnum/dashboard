import React from 'react';
import { useLocation } from 'react-router-dom';

function Page404() {

  const location = useLocation();

  return (
    <>
      { location.pathname !== '/accueil' &&
        <div className="fr-my-5w">
          <p><strong>D&eacute;sol&eacute; mais cette page n&rsquo;existe pas !</strong></p>
        </div>
      }
    </>
  );
}

export default Page404;
