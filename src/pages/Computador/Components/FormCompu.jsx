import { useState } from "react";
import { Save, ArrowLeft, Monitor, Calendar, FileText, CheckCircle2, Cpu, HardDrive, Hash, Building2, MapPin, Tag } from "lucide-react";

export default function RegistrarComputador() {
  const [form, setForm] = useState({
    serial: "",
    marca: "",
    modelo: "",
    procesador: "",
    ram: "",
    almacenamiento: "",
    estado: "operativo",
    fecha_adquisicion: "",
    id_ambiente_actual: "",
    observaciones: "",
  });
  const [animate, setAnimate] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useState(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const nuevoComputador = {
      id_computador: `PC-${Date.now()}`,
      ...form,
      fecha_registro: new Date().toISOString(),
    };

    try {
      if (window.storage) {
        const key = `computadores:${nuevoComputador.id_computador}`;
        await window.storage.set(key, JSON.stringify(nuevoComputador));
      } else {
        window._computadores = window._computadores || {};
        window._computadores[nuevoComputador.id_computador] = nuevoComputador;
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setForm({
          serial: "",
          marca: "",
          modelo: "",
          procesador: "",
          ram: "",
          almacenamiento: "",
          estado: "operativo",
          fecha_adquisicion: "",
          id_ambiente_actual: "",
          observaciones: "",
        });
      }, 3000);
    } catch (err) {
      console.error('Error guardando computador:', err);
      alert('Error al guardar el computador');
    }
  };

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'operativo': return 'from-green-500 to-emerald-600';
      case 'dañado': return 'from-red-500 to-pink-600';
      case 'en_mantenimiento': return 'from-yellow-500 to-orange-600';
      case 'fuera_de_servicio': return 'from-gray-500 to-slate-600';
      default: return 'from-blue-500 to-cyan-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div className="bg-green-500/20 backdrop-blur-xl border border-green-500/50 rounded-xl p-4 flex items-center gap-3 shadow-2xl shadow-green-500/20">
            <div className="p-2 bg-green-500 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">¡Computador Registrado!</p>
              <p className="text-green-200 text-sm">El equipo se ha agregado al inventario</p>
            </div>
          </div>
        </div>
      )}

      <div className={`mb-8 transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <button 
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-all duration-300"
        >
          <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-slate-700 transition-all duration-300 group-hover:-translate-x-1">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Volver</span>
        </button>

        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg shadow-blue-500/50">
            <Monitor className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Registrar Nuevo Computador
            </h1>
            <p className="text-slate-400 mt-1">Agrega un nuevo equipo al inventario del sistema</p>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
           style={{ transitionDelay: '200ms' }}>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Monitor className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Equipos</p>
            <p className="text-white text-xl font-bold">188</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Operativos</p>
            <p className="text-white text-xl font-bold">156</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/20 rounded-lg">
            <Calendar className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Este Mes</p>
            <p className="text-white text-xl font-bold">12</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-lg">
            <Building2 className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Ambientes</p>
            <p className="text-white text-xl font-bold">24</p>
          </div>
        </div>
      </div>

      <div
        className={`bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        style={{ transitionDelay: '400ms' }}
      >
        <div className="mb-6 pb-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-blue-400" />
            Información Básica
          </h2>
          <p className="text-slate-400 text-sm mt-1">Datos de identificación del equipo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Hash className="w-4 h-4 text-cyan-400" />
              Número de Serial
            </label>
            <div className="relative">
              <input
                type="text"
                name="serial"
                value={form.serial}
                onChange={handleChange}
                placeholder="Ej: SN123456789"
                required
                className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 font-mono"
              />
              <Cpu className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-600 group-hover:text-slate-500 transition-colors" />
            </div>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Building2 className="w-4 h-4 text-blue-400" />
              Marca
            </label>
            <input
              type="text"
              name="marca"
              value={form.marca}
              onChange={handleChange}
              placeholder="Ej: HP, Dell, Lenovo"
              required
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Monitor className="w-4 h-4 text-purple-400" />
              Modelo
            </label>
            <input
              type="text"
              name="modelo"
              value={form.modelo}
              onChange={handleChange}
              placeholder="Ej: EliteDesk 800 G5"
              required
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Calendar className="w-4 h-4 text-green-400" />
              Fecha de Adquisición
            </label>
            <input
              type="date"
              name="fecha_adquisicion"
              value={form.fecha_adquisicion}
              onChange={handleChange}
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            />
          </div>
        </div>

        <div className="mb-6 pb-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            Especificaciones Técnicas
          </h2>
          <p className="text-slate-400 text-sm mt-1">Hardware y características del equipo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Cpu className="w-4 h-4 text-orange-400" />
              Procesador
            </label>
            <input
              type="text"
              name="procesador"
              value={form.procesador}
              onChange={handleChange}
              placeholder="Ej: Intel Core i5-9500"
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Cpu className="w-4 h-4 text-green-400" />
              Memoria RAM
            </label>
            <input
              type="text"
              name="ram"
              value={form.ram}
              onChange={handleChange}
              placeholder="Ej: 16GB DDR4"
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <HardDrive className="w-4 h-4 text-blue-400" />
              Almacenamiento
            </label>
            <input
              type="text"
              name="almacenamiento"
              value={form.almacenamiento}
              onChange={handleChange}
              placeholder="Ej: 512GB SSD"
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            />
          </div>
        </div>

        <div className="mb-6 pb-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-pink-400" />
            Ubicación y Estado
          </h2>
          <p className="text-slate-400 text-sm mt-1">Asignación y condición actual</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              Estado del Equipo
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'operativo', label: 'Operativo' },
                { value: 'dañado', label: 'Dañado' },
                { value: 'en_mantenimiento', label: 'Mantenimiento' },
                { value: 'fuera_de_servicio', label: 'Fuera Servicio' }
              ].map((estado) => (
                <button
                  key={estado.value}
                  type="button"
                  onClick={() => setForm({ ...form, estado: estado.value })}
                  className={`p-3 rounded-xl font-medium transition-all duration-300 text-sm ${
                    form.estado === estado.value
                      ? `bg-gradient-to-r ${getEstadoColor(estado.value)} text-white shadow-lg scale-105`
                      : 'bg-slate-900/50 border border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                  }`}
                >
                  {estado.label}
                </button>
              ))}
            </div>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <MapPin className="w-4 h-4 text-pink-400" />
              Ambiente Actual
            </label>
            <input
              type="text"
              name="id_ambiente_actual"
              value={form.id_ambiente_actual}
              onChange={handleChange}
              placeholder="Ej: Sala 101, Oficina Admin"
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            />
          </div>

          <div className="md:col-span-2 group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <FileText className="w-4 h-4 text-cyan-400" />
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
              placeholder="Información adicional, configuraciones especiales, historial previo, etc."
              rows={4}
              className="w-full p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-slate-700/50">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex-1 px-6 py-3.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 border border-slate-600/50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="group flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Guardar Computador
          </button>
        </div>
      </div>

      <div className={`mt-8 bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
           style={{ transitionDelay: '600ms' }}>
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Monitor className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Consejos para el registro</h3>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• El número de serial es único para cada equipo - verifícalo en la etiqueta del fabricante</li>
              <li>• Completa las especificaciones técnicas para facilitar el soporte técnico</li>
              <li>• Asigna el ambiente actual para un mejor seguimiento de la ubicación</li>
              <li>• Usa las observaciones para notar configuraciones especiales o historial relevante</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}