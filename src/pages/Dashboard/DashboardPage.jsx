import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Monitor, Cpu, HardDrive, AlertTriangle, CheckCircle, Clock, TrendingUp, Users, Settings, Calendar, Wrench, Activity } from 'lucide-react';
import { Sidebar } from "../../Components/Sidebar";

const ComputerManagementDashboard = () => {
  const [animate, setAnimate] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedTab, setSelectedTab] = useState('computadores');

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Datos simulados basados en el modelo
  const computersStatus = [
    { name: 'Operativos', value: 145, color: '#10b981' },
    { name: 'Mantenimiento', value: 23, color: '#f59e0b' },
    { name: 'Averiados', value: 12, color: '#ef4444' },
    { name: 'En Reparación', value: 8, color: '#8b5cf6' },
  ];

  const maintenanceHistory = [
    { mes: 'Ene', preventivo: 45, correctivo: 12 },
    { mes: 'Feb', preventivo: 52, correctivo: 18 },
    { mes: 'Mar', preventivo: 48, correctivo: 15 },
    { mes: 'Abr', preventivo: 61, correctivo: 22 },
    { mes: 'May', preventivo: 55, correctivo: 19 },
    { mes: 'Jun', preventivo: 67, correctivo: 25 },
  ];

  const componentUsage = [
    { componente: 'CPU Intel i7', cantidad: 78 },
    { componente: 'RAM 16GB', cantidad: 65 },
    { componente: 'SSD 512GB', cantidad: 92 },
    { componente: 'GPU RTX 3060', cantidad: 34 },
    { componente: 'Motherboard ASUS', cantidad: 56 },
  ];

  const userActivity = [
    { semana: 'S1', consultas: 156, modificaciones: 42 },
    { semana: 'S2', consultas: 189, modificaciones: 58 },
    { semana: 'S3', consultas: 176, modificaciones: 51 },
    { semana: 'S4', consultas: 203, modificaciones: 67 },
  ];

  const stats = [
    {
      title: 'Total Computadores',
      value: '188',
      change: '+12 este mes',
      icon: Monitor,
      color: 'from-blue-500 to-cyan-600',
      bgGlow: 'bg-blue-500/10'
    },
    {
      title: 'En Mantenimiento',
      value: '23',
      change: '12% del total',
      icon: Wrench,
      color: 'from-orange-500 to-amber-600',
      bgGlow: 'bg-orange-500/10'
    },
    {
      title: 'Componentes Stock',
      value: '1,247',
      change: '+156 este mes',
      icon: Cpu,
      color: 'from-violet-500 to-purple-600',
      bgGlow: 'bg-violet-500/10'
    },
    {
      title: 'Usuarios Activos',
      value: '47',
      change: '8 conectados ahora',
      icon: Users,
      color: 'from-emerald-500 to-teal-600',
      bgGlow: 'bg-emerald-500/10'
    },
  ];

  const recentComputers = [
    { id: 'PC-001', serial: 'SN-2024-001', estado: 'Operativo', usuario: 'Juan Pérez', ubicacion: 'Piso 3 - Oficina 301' },
    { id: 'PC-002', serial: 'SN-2024-002', estado: 'Mantenimiento', usuario: 'María García', ubicacion: 'Piso 2 - Lab A' },
    { id: 'PC-003', serial: 'SN-2024-003', estado: 'Operativo', usuario: 'Carlos López', ubicacion: 'Piso 1 - Recepción' },
    { id: 'PC-004', serial: 'SN-2024-004', estado: 'Averiado', usuario: 'Ana Martínez', ubicacion: 'Piso 4 - Sala 402' },
  ];

  const recentMaintenance = [
    { tipo: 'Preventivo', equipo: 'PC-045', tecnico: 'Roberto Díaz', fecha: 'Hace 2 horas', color: 'text-green-400' },
    { tipo: 'Correctivo', equipo: 'PC-078', tecnico: 'Laura Sánchez', fecha: 'Hace 4 horas', color: 'text-orange-400' },
    { tipo: 'Preventivo', equipo: 'PC-012', tecnico: 'Miguel Torres', fecha: 'Hace 6 horas', color: 'text-green-400' },
    { tipo: 'Correctivo', equipo: 'PC-156', tecnico: 'Sofia Ramírez', fecha: 'Hace 1 día', color: 'text-orange-400' },
  ];

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Operativo': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Mantenimiento': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Averiado': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Header */}
        <div className={`mb-8 transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Sistema de Gestión de Computadores
              </h1>
              <p className="text-slate-400">Panel de control y monitoreo en tiempo real</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105 transition-all duration-300">
                Nuevo Computador
              </button>
              <button className="p-3 bg-slate-800/50 text-slate-300 rounded-xl hover:bg-slate-700 hover:text-white transition-all duration-300">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 bg-slate-800/30 backdrop-blur-xl p-2 rounded-xl border border-slate-700/50">
            {['computadores', 'componentes', 'mantenimiento', 'usuarios'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${selectedTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-6 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl cursor-pointer ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 ${stat.bgGlow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.change}</p>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)', backgroundSize: '200% 100%' }}>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Estado de Computadores */}
          <div className={`bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transform transition-all duration-1000 hover:shadow-2xl hover:shadow-blue-500/10 ${animate ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Estado de Equipos</h2>
              <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={computersStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                  animationBegin={300}
                >
                  {computersStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              {computersStatus.map((status, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: status.color }} />
                    <span className="text-slate-300 text-sm">{status.name}</span>
                  </div>
                  <span className="text-white font-bold">{status.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Historial de Mantenimiento */}
          <div className={`lg:col-span-2 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transform transition-all duration-1000 hover:shadow-2xl hover:shadow-cyan-500/10 ${animate ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Historial de Mantenimientos</h2>
              <Wrench className="w-5 h-5 text-cyan-400" />
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={maintenanceHistory}>
                <defs>
                  <linearGradient id="colorPreventivo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCorrectivo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="mes" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="preventivo"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPreventivo)"
                  animationDuration={2000}
                />
                <Area
                  type="monotone"
                  dataKey="correctivo"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCorrectivo)"
                  animationDuration={2000}
                  animationBegin={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Componentes más utilizados */}
          <div className={`bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transform transition-all duration-1000 hover:shadow-2xl hover:shadow-purple-500/10 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Componentes Top</h2>
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={componentUsage} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="componente" type="category" stroke="#94a3b8" width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '12px'
                  }}
                />
                <Bar
                  dataKey="cantidad"
                  fill="#8b5cf6"
                  radius={[0, 8, 8, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Lista de Computadores Recientes */}
          <div className={`bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transform transition-all duration-1000 hover:shadow-2xl hover:shadow-green-500/10 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Equipos Recientes</h2>
              <Monitor className="w-5 h-5 text-green-400" />
            </div>
            <div className="space-y-3">
              {recentComputers.map((computer, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 hover:translate-x-2 cursor-pointer border border-slate-600/30"
                  style={{
                    animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-sm">{computer.id}</span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(computer.estado)}`}>
                      {computer.estado}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mb-1">Serial: {computer.serial}</p>
                  <p className="text-slate-500 text-xs">👤 {computer.usuario}</p>
                  <p className="text-slate-500 text-xs">📍 {computer.ubicacion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actividad de Mantenimiento Reciente */}
          <div className={`bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transform transition-all duration-1000 hover:shadow-2xl hover:shadow-orange-500/10 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Actividad Reciente</h2>
              <Clock className="w-5 h-5 text-orange-400 animate-pulse" />
            </div>
            <div className="space-y-3">
              {recentMaintenance.map((maintenance, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 hover:translate-x-2 cursor-pointer"
                  style={{
                    animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-bold text-sm ${maintenance.color}`}>{maintenance.tipo}</span>
                    <span className="text-slate-500 text-xs">{maintenance.fecha}</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-1">🖥️ {maintenance.equipo}</p>
                  <p className="text-slate-500 text-xs">🔧 {maintenance.tecnico}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ComputerManagementDashboard;