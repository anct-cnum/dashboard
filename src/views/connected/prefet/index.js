import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Exports from './Exports';

export default function Prefet() {

  return (
    <>
      <Routes>
        <Route path="/prefet/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
