import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Exports from './Exports';

export default function Hub() {

  return (
    <>
      <Routes>
        <Route path="/hub_coop/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
