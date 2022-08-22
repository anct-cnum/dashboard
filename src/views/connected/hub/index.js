import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Exports from './Exports';
import Informations from './Informations';

export default function Hub() {

  return (
    <>
      <Routes>
        <Route path="/hub_coop/informations" element={<Informations />} /> {/* Routes spécifiques avec /hub */}
        <Route path="/hub_coop/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
