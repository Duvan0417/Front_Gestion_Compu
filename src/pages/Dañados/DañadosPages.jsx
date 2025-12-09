import { useEffect, useState } from "react";
import { AlertCircle, Wrench, FilePlus, Eye, Search, Filter, TrendingUp, Clock, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { Sidebar } from "../../Components/Sidebar";

export default function ComputadoresDanadosListado() {
  const [danos, setDanos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAnimate(true);
    (async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular carga
        const raw = window.storage ? await window.storage.get(['comput_danados:items']) : null;
        const items = raw ? raw['comput_danados:items'] || {} : (window._comput_danados || {});
        setDanos(Object.values(items));
      } catch (err) {
        console.error('Error cargando computadores dañados', err);
        setDanos(window._comput_danados ? Object.values(window._comput_danados) : []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtrados = danos.filter(d => {
    const matchEstado = filtroEstado ? d.estado === filtroEstado : true;
    const matchBusqueda = busqueda ? (
      d.descripcion_falla?.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.id_computador?.toLowerCase().includes(busqueda.toLowerCase())
    ) : true;
    return matchEstado && matchBusqueda;
  });

  // Calcular estadísticas
  const stats = {
    total: danos.length,
    pendientes: danos.filter(d => d.estado === 'pendiente').length,
    en_reparacion: danos.filter(d => d.estado === 'en_reparacion').length,
    reparados: danos.filter(d => d.estado === 'reparado').length,
  };

  const getEstadoConfig = (estado) => {
    switch (estado) {
      case 'pendiente':
        return {
          bg: 'bg-yellow-500/20',
          text: 'text-yellow-400',
          border: 'border-yellow-500/40',
          icon: AlertTriangle,
          label: 'Pendiente'
        };
      case 'en_reparacion':
        return {
          bg: 'bg-blue-500/20',
          text: 'text-blue-400',
          border: 'border-blue-500/40',
          icon: Loader2,
          label: 'En Reparación'
        };
      case 'reparado':
        return {
          bg: 'bg-green-500/20',
          text: 'text-green-400',
          border: 'border-green-500/40',
          icon: CheckCircle2,
          label: 'Reparado'
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          text: 'text-gray-400',
          border: 'border-gray-500/40',
          icon: AlertCircle,
          label: estado
        };
    }
  };

  const statsCards = [
    { label: 'Total Reportes', value: stats.total, color: 'from-red-500 to-pink-600', icon: AlertCircle },
    { label: 'Pendientes', value: stats.pendientes, color: 'from-yellow-500 to-orange-600', icon: Clock },
    { label: 'En Reparación', value: stats.en_reparacion, color: 'from-blue-500 to-cyan-600', icon: Wrench },
    { label: 'Reparados', value: stats.reparados, color: 'from-green-500 to-emerald-600', icon: CheckCircle2 },
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
                <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-lg shadow-red-500/50 animate-pulse">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <span className="bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Computadores Dañados
                </span>
              </h1>
              <p className="text-slate-400 ml-16">Gestión y seguimiento de equipos con fallas reportadas</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="group px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white rounded-xl font-medium shadow-lg shadow-red-500/50 hover:shadow-red-500/70 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <FilePlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Reportar Daño
              </button>
              <button className="group px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white rounded-xl font-medium shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Wrench className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Mantenimiento
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
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                placeholder="Buscar por ID de computador o descripción de falla..."
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={filtroEstado}
                onChange={e => setFiltroEstado(e.target.value)}
                className="w-full md:w-64 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl pl-12 pr-4 py-3.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 cursor-pointer"
              >
                <option value="">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_reparacion">En reparación</option>
                <option value="reparado">Reparado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className={`bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ transitionDelay: '600ms' }}>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
              <p className="text-slate-400">Cargando reportes...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50">
                  <tr>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Computador</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Descripción de Falla</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Fecha Reporte</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Estado</th>
                    <th className="p-4 text-center text-slate-300 font-semibold text-sm">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="p-4 bg-slate-700/30 rounded-full mb-4">
                            <AlertCircle className="w-12 h-12 text-slate-500" />
                          </div>
                          <p className="text-slate-400 text-lg mb-2">No hay reportes de daños</p>
                          <p className="text-slate-500 text-sm">Los reportes que crees aparecerán aquí</p>
                        </div>
                      </td>
                    </tr>
                  )}

                  {filtrados.map((d, index) => {
                    const estadoConfig = getEstadoConfig(d.estado);
                    const EstadoIcon = estadoConfig.icon;

                    return (
                      <tr
                        key={d.id_daño || d.id_reporte || d.id || index}
                        className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-all duration-300 group"
                        style={{
                          animation: `slideIn 0.5s ease-out ${index * 0.05}s both`
                        }}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                              <AlertCircle className="w-4 h-4 text-blue-400" />
                            </div>
                            <span className="text-white font-semibold">{d.id_computador}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-slate-300 max-w-md line-clamp-2">{d.descripcion_falla}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{new Date(d.fecha_reporte).toLocaleString('es-ES', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${estadoConfig.bg} ${estadoConfig.text} ${estadoConfig.border}`}>
                            <EstadoIcon className={`w-4 h-4 ${d.estado === 'en_reparacion' ? 'animate-spin' : ''}`} />
                            <span className="text-xs font-semibold uppercase tracking-wide">{estadoConfig.label}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <button
                              className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-110"
                              title="Ver detalle"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg border border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:scale-110"
                              title="Marcar como reparado"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer con info */}
          {filtrados.length > 0 && (
            <div className="bg-slate-900/50 backdrop-blur-xl border-t border-slate-700/50 px-6 py-4 flex items-center justify-between">
              <p className="text-slate-400 text-sm">
                Mostrando <span className="text-white font-semibold">{filtrados.length}</span> de <span className="text-white font-semibold">{danos.length}</span> reportes
              </p>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>Última actualización: Hace 5 minutos</span>
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
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </div>
  );
}