import { useState } from "react";
import { Save, ArrowLeft, GraduationCap, Mail, Phone, MapPin, FileText, CheckCircle2, User, Calendar, Hash, Building2, CreditCard } from "lucide-react";

export default function RegistrarAprendiz() {
  const [form, setForm] = useState({
    id_aprendiz: "",
    nombre_aprendiz: "",
    email: "",
    telefono: "",
    documento: "",
    tipo_documento: "CC",
    fecha_nacimiento: "",
    programa_formacion: "",
    ficha: "",
    ubicacion: "",
    id_user: "",
    fecha_ingreso: new Date().toISOString().split('T')[0],
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
    
    const nuevoAprendiz = {
      ...form,
      id_aprendiz: form.id_aprendiz || `APR-${Date.now()}`,
      fecha_registro: new Date().toISOString(),
    };

    try {
      if (window.storage) {
        const key = `aprendices:${nuevoAprendiz.id_aprendiz}`;
        await window.storage.set(key, JSON.stringify(nuevoAprendiz));
      } else {
        window._aprendices = window._aprendices || {};
        window._aprendices[nuevoAprendiz.id_aprendiz] = nuevoAprendiz;
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setForm({
          id_aprendiz: "",
          nombre_aprendiz: "",
          email: "",
          telefono: "",
          documento: "",
          tipo_documento: "CC",
          fecha_nacimiento: "",
          programa_formacion: "",
          ficha: "",
          ubicacion: "",
          id_user: "",
          fecha_ingreso: new Date().toISOString().split('T')[0],
          observaciones: "",
        });
      }, 3000);
    } catch (err) {
      console.error('Error guardando aprendiz:', err);
      alert('Error al guardar el aprendiz');
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
              <p className="text-white font-semibold">¡Aprendiz Registrado!</p>
              <p className="text-green-200 text-sm">El estudiante se ha agregado al sistema</p>
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
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg shadow-purple-500/50">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Registrar Nuevo Aprendiz
            </h1>
            <p className="text-slate-400 mt-1">Agrega un nuevo estudiante al sistema</p>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
           style={{ transitionDelay: '200ms' }}>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <GraduationCap className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Aprendices</p>
            <p className="text-white text-xl font-bold">342</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Activos</p>
            <p className="text-white text-xl font-bold">298</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Building2 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Programas</p>
            <p className="text-white text-xl font-bold">18</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-pink-500/20 rounded-lg">
            <MapPin className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Ubicaciones</p>
            <p className="text-white text-xl font-bold">6</p>
          </div>
        </div>
      </div>

      <div
        className={`bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        style={{ transitionDelay: '400ms' }}
      >
        <div className="mb-6 pb-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-purple-400" />
            Información Personal
          </h2>
          <p className="text-slate-400 text-sm mt-1">Datos de identificación del aprendiz</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="group md:col-span-2">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <User className="w-4 h-4 text-purple-400" />
              Nombre Completo
            </label>
            <input
              type="text"
              name="nombre_aprendiz"
              value={form.nombre_aprendiz}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez García"
              required
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <CreditCard className="w-4 h-4 text-blue-400" />
              Tipo de Documento
            </label>
            <select
              name="tipo_documento"
              value={form.tipo_documento}
              onChange={handleChange}
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="PAS">Pasaporte</option>
            </select>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Hash className="w-4 h-4 text-cyan-400" />
              Número de Documento
            </label>
            <input
              type="text"
              name="documento"
              value={form.documento}
              onChange={handleChange}
              placeholder="Ej: 1234567890"
              required
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 font-mono"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Calendar className="w-4 h-4 text-green-400" />
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={form.fecha_nacimiento}
              onChange={handleChange}
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Hash className="w-4 h-4 text-orange-400" />
              ID de Aprendiz (Opcional)
            </label>
            <input
              type="text"
              name="id_aprendiz"
              value={form.id_aprendiz}
              onChange={handleChange}
              placeholder="Se generará automáticamente si se deja vacío"
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 font-mono"
            />
          </div>
        </div>

        <div className="mb-6 pb-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            Información de Contacto
          </h2>
          <p className="text-slate-400 text-sm mt-1">Medios de comunicación</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Mail className="w-4 h-4 text-cyan-400" />
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="aprendiz@sena.edu.co"
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Phone className="w-4 h-4 text-green-400" />
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Ej: 3001234567"
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
            />
          </div>
        </div>

        <div className="mb-6 pb-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-pink-400" />
            Información Académica
          </h2>
          <p className="text-slate-400 text-sm mt-1">Programa de formación y ubicación</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Building2 className="w-4 h-4 text-blue-400" />
              Programa de Formación
            </label>
            <input
              type="text"
              name="programa_formacion"
              value={form.programa_formacion}
              onChange={handleChange}
              placeholder="Ej: Técnico en Sistemas"
              required
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Hash className="w-4 h-4 text-purple-400" />
              Número de Ficha
            </label>
            <input
              type="text"
              name="ficha"
              value={form.ficha}
              onChange={handleChange}
              placeholder="Ej: 2468135"
              required
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 font-mono"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <MapPin className="w-4 h-4 text-pink-400" />
              Ubicación
            </label>
            <select
              name="ubicacion"
              value={form.ubicacion}
              onChange={handleChange}
              required
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="">Seleccione ubicación</option>
              <option value="SENA - Edificio A">SENA - Edificio A</option>
              <option value="SENA - Edificio B">SENA - Edificio B</option>
              <option value="SENA - Laboratorio 1">SENA - Laboratorio 1</option>
              <option value="SENA - Laboratorio 2">SENA - Laboratorio 2</option>
              <option value="SENA - Sala de Cómputo 1">SENA - Sala de Cómputo 1</option>
              <option value="SENA - Sala de Cómputo 2">SENA - Sala de Cómputo 2</option>
            </select>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <Calendar className="w-4 h-4 text-yellow-400" />
              Fecha de Ingreso
            </label>
            <input
              type="date"
              name="fecha_ingreso"
              value={form.fecha_ingreso}
              onChange={handleChange}
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <User className="w-4 h-4 text-green-400" />
              ID de Usuario (Opcional)
            </label>
            <input
              type="text"
              name="id_user"
              value={form.id_user}
              onChange={handleChange}
              placeholder="ID del usuario asociado"
              className="w-full p-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 font-mono"
            />
          </div>

          <div className="group md:col-span-2">
            <label className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
              <FileText className="w-4 h-4 text-cyan-400" />
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
              placeholder="Información adicional, notas especiales, condiciones médicas relevantes, etc."
              rows={4}
              className="w-full p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 resize-none"
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
            className="group flex-1 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Guardar Aprendiz
          </button>
        </div>
      </div>

      <div className={`mt-8 bg-purple-500/10 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6 transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
           style={{ transitionDelay: '600ms' }}>
        <div className="flex items-start gap-4">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <GraduationCap className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Guía de registro</h3>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Verifica que el número de documento sea correcto y único</li>
              <li>• El correo debe ser válido para notificaciones del sistema</li>
              <li>• El número de ficha identifica el grupo de formación</li>
              <li>• La ubicación ayuda a organizar la asignación de recursos</li>
              <li>• El ID de usuario se asigna cuando el aprendiz tiene acceso al sistema</li>
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