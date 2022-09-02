import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Exports from './Exports';

export default function Coordinateur() {

  return (
    <>
      <Routes>
        <Route path="/coordinateur_coop/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
