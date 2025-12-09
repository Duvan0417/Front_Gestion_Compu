import { useEffect, useState } from "react";
import { Search, Eye, Edit, ListFilter, Monitor, Plus, Download, RefreshCw, CheckCircle2, AlertTriangle, Wrench, XCircle, MapPin, TrendingUp } from "lucide-react";
import { Sidebar } from "../../Components/Sidebar";

export default function ComputadoresListado() {
  const [computadores, setComputadores] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAnimate(true);
    const loadData = async () => {
      try {
        if (!window.storage) {
          console.warn("window.storage no existe, usando datos vacíos.");
          setLoading(false);
          return;
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        const keys = await window.storage.keys();
        const compKeys = keys.filter((k) => k.startsWith("computadores:"));
        const items = [];

        for (const k of compKeys) {
          const res = await window.storage.get([k]);
          const parsed = res[k] ? JSON.parse(res[k]) : null;
          if (parsed) items.push(parsed);
        }

        setComputadores(items);
      } catch (err) {
        console.error("Error cargando computadores", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filtrados = computadores.filter((c) => {
    const coincideEstado = filtroEstado ? c.estado === filtroEstado : true;
    const coincideBusqueda = busqueda
      ? c.serial?.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.marca?.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.modelo?.toLowerCase().includes(busqueda.toLowerCase())
      : true;
    return coincideEstado && coincideBusqueda;
  });

  // Calcular estadísticas
  const stats = {
    total: computadores.length,
    operativos: computadores.filter(c => c.estado === 'operativo').length,
    danados: computadores.filter(c => c.estado === 'dañado').length,
    mantenimiento: computadores.filter(c => c.estado === 'en_mantenimiento').length,
    fuera_servicio: computadores.filter(c => c.estado === 'fuera_de_servicio').length,
  };

  const getEstadoConfig = (estado) => {
    switch (estado) {
      case 'operativo':
        return {
          bg: 'bg-green-500/20',
          text: 'text-green-400',
          border: 'border-green-500/40',
          icon: CheckCircle2,
          label: 'Operativo'
        };
      case 'dañado':
        return {
          bg: 'bg-red-500/20',
          text: 'text-red-400',
          border: 'border-red-500/40',
          icon: XCircle,
          label: 'Dañado'
        };
      case 'en_mantenimiento':
        return {
          bg: 'bg-yellow-500/20',
          text: 'text-yellow-400',
          border: 'border-yellow-500/40',
          icon: Wrench,
          label: 'En Mantenimiento'
        };
      case 'fuera_de_servicio':
        return {
          bg: 'bg-gray-500/20',
          text: 'text-gray-400',
          border: 'border-gray-500/40',
          icon: AlertTriangle,
          label: 'Fuera de Servicio'
        };
      default:
        return {
          bg: 'bg-slate-500/20',
          text: 'text-slate-400',
          border: 'border-slate-500/40',
          icon: Monitor,
          label: estado || 'Sin estado'
        };
    }
  };

  const statsCards = [
    { label: 'Total Equipos', value: stats.total, color: 'from-blue-500 to-cyan-600', icon: Monitor },
    { label: 'Operativos', value: stats.operativos, color: 'from-green-500 to-emerald-600', icon: CheckCircle2 },
    { label: 'En Mantenimiento', value: stats.mantenimiento, color: 'from-yellow-500 to-orange-600', icon: Wrench },
    { label: 'Dañados', value: stats.danados, color: 'from-red-500 to-pink-600', icon: XCircle },
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
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg shadow-blue-500/50">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Gestión de Computadores
                </span>
              </h1>
              <p className="text-slate-400 ml-16">Inventario completo de equipos del sistema</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="group p-3 bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all duration-300 hover:scale-105 border border-slate-700/50">
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              </button>
              <button className="group px-6 py-3 bg-slate-800/50 hover:bg-slate-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 border border-slate-700/50">
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                Exportar
              </button>
              <button className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Nuevo Computador
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
                className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                placeholder="Buscar por serial, marca o modelo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="relative">
              <ListFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                className="w-full md:w-64 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl pl-12 pr-4 py-3.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 cursor-pointer"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="">Todos los estados</option>
                <option value="operativo">Operativo</option>
                <option value="dañado">Dañado</option>
                <option value="en_mantenimiento">En mantenimiento</option>
                <option value="fuera_de_servicio">Fuera de servicio</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className={`bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ transitionDelay: '600ms' }}>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mb-4" />
              <p className="text-slate-400">Cargando computadores...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50">
                  <tr>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Serial</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Marca</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Modelo</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Estado</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Ambiente</th>
                    <th className="p-4 text-center text-slate-300 font-semibold text-sm">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {filtrados.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-12">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="p-4 bg-slate-700/30 rounded-full mb-4">
                            <Monitor className="w-12 h-12 text-slate-500" />
                          </div>
                          <p className="text-slate-400 text-lg mb-2">No se encontraron computadores</p>
                          <p className="text-slate-500 text-sm">Intenta ajustar los filtros o agrega nuevos equipos</p>
                        </div>
                      </td>
                    </tr>
                  )}

                  {filtrados.map((c, index) => {
                    const estadoConfig = getEstadoConfig(c.estado);
                    const EstadoIcon = estadoConfig.icon;

                    return (
                      <tr
                        key={c.id_computador || index}
                        className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-all duration-300 group"
                        style={{
                          animation: `slideIn 0.5s ease-out ${index * 0.05}s both`
                        }}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                              <Monitor className="w-4 h-4 text-blue-400" />
                            </div>
                            <span className="text-white font-semibold font-mono text-sm">{c.serial}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-slate-300">{c.marca}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-slate-300">{c.modelo}</span>
                        </td>
                        <td className="p-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${estadoConfig.bg} ${estadoConfig.text} ${estadoConfig.border}`}>
                            <EstadoIcon className="w-4 h-4" />
                            <span className="text-xs font-semibold uppercase tracking-wide">{estadoConfig.label}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-slate-400">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{c.id_ambiente_actual || 'Sin asignar'}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-110" title="Ver detalles">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 hover:scale-110" title="Editar">
                              <Edit className="w-4 h-4" />
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

          {/* Footer */}
          {filtrados.length > 0 && (
            <div className="bg-slate-900/50 backdrop-blur-xl border-t border-slate-700/50 px-6 py-4 flex items-center justify-between">
              <p className="text-slate-400 text-sm">
                Mostrando <span className="text-white font-semibold">{filtrados.length}</span> de <span className="text-white font-semibold">{computadores.length}</span> computadores
              </p>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>Última sincronización: Hace 2 minutos</span>
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