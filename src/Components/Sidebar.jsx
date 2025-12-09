import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Laptop, 
  Users, 
  School, 
  Wrench, 
  MessageSquare, 
  Menu 
} from "lucide-react";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  // Función para marcar menú activo
  const isActive = (path) =>
    location.pathname === path ? "bg-gray-800" : "";

  return (
    <div
      className={`bg-black text-gray-200 h-screen p-4 border-r border-gray-800 transition-all duration-300 
      ${open ? "w-64" : "w-20"}`}
    >
      {/* Botón abrir/cerrar */}
      <button onClick={() => setOpen(!open)} className="mb-6">
        <Menu className="text-white" />
      </button>

      {/* Opciones del menú */}
      <nav className="space-y-4 text-sm">
        
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition ${isActive("/dashboard")}`}
        >
          <LayoutDashboard />
          {open && <span>Dashboard</span>}
        </Link>

        <Link
          to="/computadores"
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition ${isActive("/computadores")}`}
        >
          <Laptop />
          {open && <span>Computadores</span>}
        </Link>

        <Link
          to="/aprendices"
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition ${isActive("/aprendices")}`}
        >
          <School />
          {open && <span>Aprendices</span>}
        </Link>

        <Link
          to="/usuarios"
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition ${isActive("/usuarios")}`}
        >
          <Users />
          {open && <span>Usuarios</span>}
        </Link>

        <Link
          to="/mantenimiento"
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition ${isActive("/mantenimiento")}`}
        >
          <Wrench />
          {open && <span>Mantenimiento</span>}
        </Link>

        <Link
          to="/dañados"
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition ${isActive("/dañados")}`}
        >
          <MessageSquare />
          {open && <span>Dañados</span>}
        </Link>
      </nav>
    </div>
  );
};
