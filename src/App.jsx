import React from "react";
import { AuthProvider } from "./services/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Login } from './pages/login'
import { Inicio } from './pages/inicio'
import { Clientes } from "./pages/Clientes/clientelista";
import { ConductoresLista } from "./pages/Conductores/conductoresLista";

0
function App() {
  

  return (
    <Router>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/conductores" element={<ConductoresLista />} />

          <Route path="/clientes" element={<Clientes />} />

          {/* Otras rutas */}
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
