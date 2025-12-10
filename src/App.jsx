import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginChrism  from './pages/Login/LoginChrism'
import Mantenimiento  from './pages/Mantenimiento/MantenimientoPage'
import Aprendices  from './pages/Aprendices/AprendicesPages'
import Dañados  from './pages/Dañados/DañadosPages'
import FormMantenimiento  from './pages/Mantenimiento/Componentes/FormManteni'
import Computadores  from './pages/Computador/ComputadoresPage'
import DashboardPage  from './pages/Dashboard/DashboardPage'
import FormDañados  from './pages/Dañados/Components/FormDañados'
import FormCompu  from './pages/Computador/Components//FormCompu'
import FormAprendices  from './pages/Aprendices/Components/FormApren'


export default function App(){
return (
<Router>
      <div className="app-container">
        <Routes>
          {/* Redirige la raíz (/) a /inicio */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<LoginChrism />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/computadores" element={< Computadores />} />
          <Route path="/aprendices" element={< Aprendices />} />
          <Route path="/aprendices/registro" element={< FormAprendices />} />
          <Route path="/dañados" element={< Dañados />} />
          <Route path="/mantenimiento/registro" element={< FormMantenimiento />} />
          <Route path="/dañados/registro" element={< FormDañados />} />
          <Route path="/mantenimiento" element={< Mantenimiento />} />
          <Route path="/computadores/nuevo" element={< FormCompu />} />
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </div>
    </Router>
)
}