import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import SpecificTemplatePage from './pages/SpecificTempaltepage/SpecificTemplatePage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/template/:id" element={<SpecificTemplatePage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
