import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Exports from './Exports';
import Informations from './Informations';

export default function Hub() {

  return (
    <>
      <p>Vous pouvez accéder à la route : <Link to="/hub_coop/informations">Test accès hub uniquement</Link></p>
      <Routes>
        <Route path="/hub_coop/informations" element={<Informations />} /> {/* Routes spécifiques avec /hub */}
        <Route path="/hub_coop/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
