import { Routes, Route, NavLink } from 'react-router-dom'
import Medicamentos from './pages/Medicamentos.jsx'
import CadastrarMedicamento from './pages/CadastrarMedicamento.jsx'
import RegistrarDose from './pages/RegistrarDose.jsx'
import Historico from './pages/Historico.jsx'
import CadastrarIdoso from './pages/CadastrarIdoso.jsx'

export default function App() {
  return (
    <>
      <nav>
        <span className="brand">CareSenior</span>
        <NavLink to="/">Medicamentos</NavLink>
        <NavLink to="/cadastrar">Cadastrar</NavLink>
        <NavLink to="/registrar-dose">Registrar Dose</NavLink>
        <NavLink to="/historico">Histórico</NavLink>
        <NavLink to="/cadastrar-idoso">Cadastrar Idoso</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Medicamentos />} />
          <Route path="/cadastrar" element={<CadastrarMedicamento />} />
          <Route path="/registrar-dose" element={<RegistrarDose />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/cadastrar-idoso" element={<CadastrarIdoso />} />
        </Routes>
      </main>
    </>
  )
}
