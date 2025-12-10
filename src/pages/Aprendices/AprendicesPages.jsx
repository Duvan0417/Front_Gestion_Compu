import { useEffect, useState } from "react";
import { Search, Eye, Edit, UserPlus, Users, MapPin, GraduationCap, UserCheck, TrendingUp, RefreshCw, Download, Mail, Phone } from "lucide-react";
import { Sidebar } from "../../Components/Sidebar";

export default function AprendicesListado() {
  const [aprendices, setAprendices] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroUbicacion, setFiltroUbicacion] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAnimate(true);
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const keys = Object.keys(window.storage || {});
        const data = keys
          .filter((k) => k.startsWith("aprendices:"))
          .map((k) => JSON.parse(window.storage[k]));
        setAprendices(data);
      } catch (err) {
        console.error("Error cargando aprendices", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtrados = aprendices.filter((a) => {
    const cumpleBusqueda = busqueda
      ? a.nombre_aprendiz?.toLowerCase().includes(busqueda.toLowerCase())
      : true;
    const cumpleUbicacion = filtroUbicacion ? a.ubicacion === filtroUbicacion : true;
    return cumpleBusqueda && cumpleUbicacion;
  });

  // Estadísticas
  const ubicaciones = [...new Set(aprendices.map(a => a.ubicacion))].filter(Boolean);
  const conUsuario = aprendices.filter(a => a.id_user).length;
  const sinUsuario = aprendices.length - conUsuario;

  const statsCards = [
    { label: 'Total Aprendices', value: aprendices.length, color: 'from-purple-500 to-pink-600', icon: Users },
    { label: 'Con Usuario', value: conUsuario, color: 'from-green-500 to-emerald-600', icon: UserCheck },
    { label: 'Sin Usuario', value: sinUsuario, color: 'from-orange-500 to-amber-600', icon: GraduationCap },
    { label: 'Ubicaciones', value: ubicaciones.length, color: 'from-blue-500 to-cyan-600', icon: MapPin },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Header */}
        <div className={`mb-8 transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg shadow-purple-500/50">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                  Gestión de Aprendices
                </span>
              </h1>
              <p className="text-slate-400 ml-16">Administración de estudiantes y ubicaciones</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="group p-3 bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all duration-300 hover:scale-105 border border-slate-700/50">
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              </button>
              <button className="group px-6 py-3 bg-slate-800/50 hover:bg-slate-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 border border-slate-700/50">
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                Exportar
              </button>
              <button className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <a href="/aprendices/registro">Registrar Aprendiz</a>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-5 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl cursor-pointer ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filtros */}
          <div className={`flex flex-col md:flex-row gap-4 transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '400ms' }}>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                placeholder="Buscar por nombre de aprendiz..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                className="w-full md:w-72 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl pl-12 pr-4 py-3.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 cursor-pointer"
                value={filtroUbicacion}
                onChange={(e) => setFiltroUbicacion(e.target.value)}
              >
                <option value="">Todas las ubicaciones</option>
                <option value="SENA - Edificio A">SENA - Edificio A</option>
                <option value="SENA - Edificio B">SENA - Edificio B</option>
                <option value="SENA - Laboratorio 1">Laboratorio 1</option>
                <option value="SENA - Laboratorio 2">Laboratorio 2</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className={`bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ transitionDelay: '600ms' }}>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <RefreshCw className="w-12 h-12 text-purple-400 animate-spin mb-4" />
              <p className="text-slate-400">Cargando aprendices...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50">
                  <tr>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">ID</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Nombre</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Ubicación</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Usuario Asociado</th>
                    <th className="p-4 text-center text-slate-300 font-semibold text-sm">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {filtrados.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="p-4 bg-slate-700/30 rounded-full mb-4">
                            <GraduationCap className="w-12 h-12 text-slate-500" />
                          </div>
                          <p className="text-slate-400 text-lg mb-2">No se encontraron aprendices</p>
                          <p className="text-slate-500 text-sm">Intenta ajustar los filtros o registra nuevos estudiantes</p>
                        </div>
                      </td>
                    </tr>
                  )}

                  {filtrados.map((a, index) => (
                    <tr
                      key={a.id_aprendiz || index}
                      className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-all duration-300 group"
                      style={{
                        animation: `slideIn 0.5s ease-out ${index * 0.05}s both`
                      }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                            <GraduationCap className="w-4 h-4 text-purple-400" />
                          </div>
                          <span className="text-white font-semibold font-mono text-sm">{a.id_aprendiz}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">{a.nombre_aprendiz}</p>
                          {a.email && (
                            <div className="flex items-center gap-1 mt-1">
                              <Mail className="w-3 h-3 text-slate-500" />
                              <span className="text-slate-500 text-xs">{a.email}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          <span className="text-slate-300 text-sm">{a.ubicacion}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {a.id_user ? (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30">
                            <UserCheck className="w-4 h-4" />
                            <span className="text-xs font-semibold">{a.id_user}</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
                            <Users className="w-4 h-4" />
                            <span className="text-xs font-semibold">Sin usuario</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-110"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 hover:scale-110"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          {filtrados.length > 0 && (
            <div className="bg-slate-900/50 backdrop-blur-xl border-t border-slate-700/50 px-6 py-4 flex items-center justify-between">
              <p className="text-slate-400 text-sm">
                Mostrando <span className="text-white font-semibold">{filtrados.length}</span> de <span className="text-white font-semibold">{aprendices.length}</span> aprendices
              </p>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>Última actualización: Hace 3 minutos</span>
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}