import { useEffect, useState } from "react";
import { Search, Eye, Edit, Wrench, Filter, Clock, CheckCircle2, Calendar, AlertTriangle, TrendingUp, RefreshCw, Download, Plus, User, FileText } from "lucide-react";
import { Sidebar } from "../../Components/Sidebar";

export default function MantenimientosVista() {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAnimate(true);
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));

        // Datos de ejemplo - Aquí cargarías desde window.storage
        const datosEjemplo = [
          {
            id: 1,
            id_computador: "PC-001",
            tipo: "preventivo",
            descripcion: "Limpieza general y actualización de sistema operativo",
            fecha_ingreso: "2024-12-01",
            fecha_salida: "2024-12-05",
            estado: "en_proceso",
            prioridad: "media",
            tecnico: "Roberto Díaz"
          },
          {
            id: 2,
            id_computador: "PC-045",
            tipo: "correctivo",
            descripcion: "Reemplazo de disco duro dañado y recuperación de datos",
            fecha_ingreso: "2024-12-03",
            fecha_salida: "2024-12-08",
            estado: "en_proceso",
            prioridad: "alta",
            tecnico: "Laura Sánchez"
          },
          {
            id: 3,
            id_computador: "PC-078",
            tipo: "preventivo",
            descripcion: "Mantenimiento preventivo trimestral",
            fecha_ingreso: "2024-11-28",
            fecha_salida: "2024-12-02",
            estado: "completado",
            prioridad: "baja",
            tecnico: "Miguel Torres"
          },
          {
            id: 4,
            id_computador: "PC-156",
            tipo: "actualizacion",
            descripcion: "Actualización de RAM de 8GB a 16GB",
            fecha_ingreso: "2024-12-04",
            fecha_salida: "2024-12-06",
            estado: "pendiente",
            prioridad: "media",
            tecnico: "Sofia Ramírez"
          },
          {
            id: 5,
            id_computador: "PC-089",
            tipo: "correctivo",
            descripcion: "Reparación de fuente de poder y revisión de placa madre",
            fecha_ingreso: "2024-12-02",
            fecha_salida: "2024-12-10",
            estado: "en_proceso",
            prioridad: "alta",
            tecnico: "Roberto Díaz"
          }
        ];

        setMantenimientos(datosEjemplo);
      } catch (err) {
        console.error("Error cargando mantenimientos", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtrados = mantenimientos.filter((m) => {
    const matchEstado = filtroEstado ? m.estado === filtroEstado : true;
    const matchTipo = filtroTipo ? m.tipo === filtroTipo : true;
    const matchBusqueda = busqueda
      ? m.id_computador?.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.descripcion?.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.tecnico?.toLowerCase().includes(busqueda.toLowerCase())
      : true;
    return matchEstado && matchTipo && matchBusqueda;
  });

  // Estadísticas
  const stats = {
    total: mantenimientos.length,
    en_proceso: mantenimientos.filter(m => m.estado === 'en_proceso').length,
    pendientes: mantenimientos.filter(m => m.estado === 'pendiente').length,
    completados: mantenimientos.filter(m => m.estado === 'completado').length,
  };

  const getEstadoConfig = (estado) => {
    switch (estado) {
      case 'pendiente':
        return {
          bg: 'bg-yellow-500/20',
          text: 'text-yellow-400',
          border: 'border-yellow-500/40',
          icon: Clock,
          label: 'Pendiente'
        };
      case 'en_proceso':
        return {
          bg: 'bg-blue-500/20',
          text: 'text-blue-400',
          border: 'border-blue-500/40',
          icon: Wrench,
          label: 'En Proceso'
        };
      case 'completado':
        return {
          bg: 'bg-green-500/20',
          text: 'text-green-400',
          border: 'border-green-500/40',
          icon: CheckCircle2,
          label: 'Completado'
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          text: 'text-gray-400',
          border: 'border-gray-500/40',
          icon: AlertTriangle,
          label: estado
        };
    }
  };

  const getTipoConfig = (tipo) => {
    switch (tipo) {
      case 'preventivo':
        return { color: 'text-green-400', label: 'Preventivo' };
      case 'correctivo':
        return { color: 'text-red-400', label: 'Correctivo' };
      case 'predictivo':
        return { color: 'text-blue-400', label: 'Predictivo' };
      case 'actualizacion':
        return { color: 'text-purple-400', label: 'Actualización' };
      default:
        return { color: 'text-gray-400', label: tipo };
    }
  };

  const getPrioridadConfig = (prioridad) => {
    switch (prioridad) {
      case 'alta':
        return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/40' };
      case 'media':
        return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/40' };
      case 'baja':
        return { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/40' };
      default:
        return { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/40' };
    }
  };

  const calcularDiasRestantes = (fechaSalida) => {
    const hoy = new Date();
    const salida = new Date(fechaSalida);
    const diferencia = Math.ceil((salida - hoy) / (1000 * 60 * 60 * 24));
    return diferencia;
  };

  const statsCards = [
    { label: 'Total Mantenimientos', value: stats.total, color: 'from-orange-500 to-amber-600', icon: Wrench },
    { label: 'En Proceso', value: stats.en_proceso, color: 'from-blue-500 to-cyan-600', icon: Wrench },
    { label: 'Pendientes', value: stats.pendientes, color: 'from-yellow-500 to-orange-600', icon: Clock },
    { label: 'Completados', value: stats.completados, color: 'from-green-500 to-emerald-600', icon: CheckCircle2 },
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
                <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg shadow-orange-500/50 animate-pulse">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  Equipos en Mantenimiento
                </span>
              </h1>
              <p className="text-slate-400 ml-16">Seguimiento y gestión de mantenimientos activos</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="group p-3 bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all duration-300 hover:scale-105 border border-slate-700/50">
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              </button>
              <button className="group px-6 py-3 bg-slate-800/50 hover:bg-slate-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 border border-slate-700/50">
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                Exportar
              </button>
              <button className="group px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-medium shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <a href="/mantenimiento/registro">Nuevo Mantenimiento</a>
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
                className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                placeholder="Buscar por equipo, técnico o descripción..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                className="w-full md:w-56 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl pl-12 pr-4 py-3.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 cursor-pointer"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En Proceso</option>
                <option value="completado">Completado</option>
              </select>
            </div>

            <div className="relative">
              <Wrench className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                className="w-full md:w-56 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl pl-12 pr-4 py-3.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 cursor-pointer"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="">Todos los tipos</option>
                <option value="preventivo">Preventivo</option>
                <option value="correctivo">Correctivo</option>
                <option value="predictivo">Predictivo</option>
                <option value="actualizacion">Actualización</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className={`bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ transitionDelay: '600ms' }}>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <RefreshCw className="w-12 h-12 text-orange-400 animate-spin mb-4" />
              <p className="text-slate-400">Cargando mantenimientos...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50">
                  <tr>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Equipo</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Tipo</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Descripción</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Técnico</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Fechas</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Estado</th>
                    <th className="p-4 text-left text-slate-300 font-semibold text-sm">Prioridad</th>
                    <th className="p-4 text-center text-slate-300 font-semibold text-sm">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {filtrados.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-12">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="p-4 bg-slate-700/30 rounded-full mb-4">
                            <Wrench className="w-12 h-12 text-slate-500" />
                          </div>
                          <p className="text-slate-400 text-lg mb-2">No hay mantenimientos registrados</p>
                          <p className="text-slate-500 text-sm">Los mantenimientos que registres aparecerán aquí</p>
                        </div>
                      </td>
                    </tr>
                  )}

                  {filtrados.map((m, index) => {
                    const estadoConfig = getEstadoConfig(m.estado);
                    const tipoConfig = getTipoConfig(m.tipo);
                    const prioridadConfig = getPrioridadConfig(m.prioridad);
                    const EstadoIcon = estadoConfig.icon;
                    const diasRestantes = calcularDiasRestantes(m.fecha_salida);

                    return (
                      <tr
                        key={m.id || index}
                        className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-all duration-300 group"
                        style={{
                          animation: `slideIn 0.5s ease-out ${index * 0.05}s both`
                        }}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-500/20 rounded-lg border border-orange-500/30">
                              <Wrench className="w-4 h-4 text-orange-400" />
                            </div>
                            <span className="text-white font-semibold font-mono text-sm">{m.id_computador}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`${tipoConfig.color} font-medium text-sm`}>
                            {tipoConfig.label}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-start gap-2 max-w-xs">
                            <FileText className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                            <p className="text-slate-300 text-sm line-clamp-2">{m.descripcion}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-400" />
                            <span className="text-slate-300 text-sm">{m.tecnico}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-slate-400 text-xs">
                              <Calendar className="w-3 h-3" />
                              <span>Ingreso: {new Date(m.fecha_ingreso).toLocaleDateString('es-ES')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-xs">
                              <Clock className="w-3 h-3" />
                              <span>Salida: {new Date(m.fecha_salida).toLocaleDateString('es-ES')}</span>
                            </div>
                            {m.estado !== 'completado' && (
                              <span className={`text-xs font-semibold ${diasRestantes < 0 ? 'text-red-400' : diasRestantes <= 2 ? 'text-yellow-400' : 'text-green-400'}`}>
                                {diasRestantes < 0 ? `Retrasado ${Math.abs(diasRestantes)}d` : diasRestantes === 0 ? 'Hoy' : `${diasRestantes} días`}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${estadoConfig.bg} ${estadoConfig.text} ${estadoConfig.border}`}>
                            <EstadoIcon className={`w-4 h-4 ${m.estado === 'en_proceso' ? 'animate-spin' : ''}`} />
                            <span className="text-xs font-semibold uppercase tracking-wide">{estadoConfig.label}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border ${prioridadConfig.bg} ${prioridadConfig.text} ${prioridadConfig.border}`}>
                            <span className="text-xs font-semibold uppercase">{m.prioridad}</span>
                          </div>
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
                Mostrando <span className="text-white font-semibold">{filtrados.length}</span> de <span className="text-white font-semibold">{mantenimientos.length}</span> mantenimientos
              </p>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>Última actualización: Hace 1 minuto</span>
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