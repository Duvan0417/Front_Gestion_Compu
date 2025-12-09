import { useState } from "react";
import { Save, ArrowLeft, Wrench, Monitor, Calendar, FileText, AlertCircle, CheckCircle2, Cpu } from "lucide-react";

export default function RegistrarMantenimiento() {
  const [form, setForm] = useState({
    id_computador: "",
    tipo_mantenimiento: "",
    descripcion: "",
    fecha_ingreso: "",
    fecha_salida: "",
    prioridad: "media",
  });
  const [animate, setAnimate] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useState(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mantenimiento registrado:", form);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setForm({
        id_computador: "",
        tipo_mantenimiento: "",
        descripcion: "",
        fecha_ingreso: "",
        fecha_salida: "",
        prioridad: "media",
      });
    }, 3000);
  };

  const getPrioridadColor = (prioridad) => {
    switch(prioridad) {
      case 'alta': return 'from-red-500 to-pink-600';
      case 'media': return 'from-yellow-500 to-orange-600';
      case 'baja': return 'from-green-500 to-emerald-600';
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
              <p className="text-white font-semibold">¡Mantenimiento Registrado!</p>
              <p className="text-green-200 text-sm">El registro se ha guardado correctamente</p>
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
          <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg shadow-yellow-500/50">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Registrar Mantenimiento
            </h1>
            <p className="text-slate-400 mt-1">Complete los detalles del mantenimiento a realizar</p>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
           style={{ transitionDelay: '200ms' }}>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Monitor className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Equipos en Sistema</p>
            <p className="text-white text-xl font-bold">188</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/20 rounded-lg">
            <Wrench className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">En Mantenimiento</p>
            <p className="text-white text-xl font-bold">23</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Este Mes</p>
            <p className="text-white text-xl font-bold">67</p>
          </div>
        </div>
      </div>

      <div
        className={`bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        style={{ transitionDelay: '400ms' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Monitor className="w-4 h-4 text-blue-400" />
              ID del Computador
            </label>
            <div className="relative">
              <input
                type="text"
                name="id_computador"
                value={form.id_computador}
                onChange={handleChange}
                placeholder="Ej: PC-001"
                className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
              />
              <Cpu className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-600 group-hover:text-slate-500 transition-colors" />
            </div>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Wrench className="w-4 h-4 text-yellow-400" />
              Tipo de Mantenimiento
            </label>
            <select
              name="tipo_mantenimiento"
              value={form.tipo_mantenimiento}
              onChange={handleChange}
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="">Seleccione tipo</option>
              <option value="preventivo">Preventivo</option>
              <option value="correctivo">Correctivo</option>
              <option value="predictivo">Predictivo</option>
              <option value="actualizacion">Actualización</option>
            </select>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <AlertCircle className="w-4 h-4 text-orange-400" />
              Prioridad
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['baja', 'media', 'alta'].map((nivel) => (
                <button
                  key={nivel}
                  type="button"
                  onClick={() => setForm({ ...form, prioridad: nivel })}
                  className={`p-3 rounded-xl font-medium transition-all duration-300 ${
                    form.prioridad === nivel
                      ? `bg-gradient-to-r ${getPrioridadColor(nivel)} text-white shadow-lg scale-105`
                      : 'bg-slate-900/50 border border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                  }`}
                >
                  {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Calendar className="w-4 h-4 text-green-400" />
              Fecha de Ingreso
            </label>
            <input
              type="date"
              name="fecha_ingreso"
              value={form.fecha_ingreso}
              onChange={handleChange}
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
            />
          </div>

          <div className="group md:col-span-2">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Calendar className="w-4 h-4 text-purple-400" />
              Fecha de Salida Estimada
            </label>
            <input
              type="date"
              name="fecha_salida"
              value={form.fecha_salida}
              onChange={handleChange}
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
            />
          </div>

          <div className="md:col-span-2 group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <FileText className="w-4 h-4 text-cyan-400" />
              Descripción del Mantenimiento
            </label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Describa detalladamente el mantenimiento a realizar, problemas detectados, componentes a revisar, etc."
              rows={5}
              className="w-full p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 resize-none"
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
            className="group flex-1 px-6 py-3.5 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white rounded-xl font-medium shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Guardar Mantenimiento
          </button>
        </div>
      </div>

      <div className={`mt-8 bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
           style={{ transitionDelay: '600ms' }}>
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Consejos para el registro</h3>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Verifica que el ID del computador sea correcto antes de guardar</li>
              <li>• Describe detalladamente los problemas o tareas a realizar</li>
              <li>• La prioridad ayuda a organizar la cola de mantenimientos</li>
              <li>• Establece fechas realistas para evitar retrasos</li>
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