import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Exports from './Exports';

export default function Structure() {

  return (
    <>
      <Routes>
        <Route path="/structure/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
