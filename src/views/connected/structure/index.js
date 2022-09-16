import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import Candidats from './Candidats';
import CandidatDetails from './CandidatDetails';

export default function Structure() {

  return (
    <>
      <Routes>
        <Route path="/structure/informations" element={<MesInformations />} />
        <Route path="/structure/candidats/:filter" element={<Candidats />} /> {/* Routes spécifiques avec /structure */}
        <Route path="/structure/candidat/:id" element={<CandidatDetails />} />
        <Route path="/structure/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
