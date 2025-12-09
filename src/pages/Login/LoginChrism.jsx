import React, { useState } from 'react';
import { Monitor, Server, Cpu, HardDrive, ArrowLeft } from 'lucide-react';

export default function ComputerManagementLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const handleSubmit = () => {
    console.log('Login attempt:', { username, password });
  };

  const handleRegister = () => {
    console.log('Register attempt:', { regName, regEmail, regUsername, regPassword });
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
          25% { transform: translate(30px, -40px) rotate(5deg); opacity: 0.8; }
          50% { transform: translate(-20px, -60px) rotate(-5deg); opacity: 1; }
          75% { transform: translate(-35px, -25px) rotate(3deg); opacity: 0.7; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(0, -20px) scale(1.1); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 50px rgba(59, 130, 246, 0.6), 0 0 90px rgba(59, 130, 246, 0.3);
            transform: scale(1.02);
          }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0.8; }
          50% { top: 100%; opacity: 0.3; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }
        .group:hover .group-hover-scale {
          transform: scale(1.15) rotate(10deg);
        }
        .input-focus:focus {
          transform: translateY(-2px);
        }

        /* Small tweaks for svg glow */
        .svg-glow {
          filter: drop-shadow(0 10px 30px rgba(30,76,255,0.12)) drop-shadow(0 6px 18px rgba(30,76,255,0.06));
        }
      `}</style>
      
      {/* Sección izquierda */}
      <div className="absolute left-0 top-0 w-7/12 h-full bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden shadow-2xl">
        
        {/* Partículas flotantes mejoradas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 w-3 h-3 rounded-full transition-all duration-700 ${showRegister ? 'bg-indigo-400' : 'bg-blue-400'}`} style={{animation: 'float 8s ease-in-out infinite', animationDelay: '0s'}}></div>
          <div className={`absolute top-1/2 left-1/3 w-2 h-2 rounded-full transition-all duration-700 ${showRegister ? 'bg-indigo-300' : 'bg-cyan-300'}`} style={{animation: 'float 10s ease-in-out infinite', animationDelay: '1s'}}></div>
          <div className={`absolute top-1/3 left-2/3 w-4 h-4 rounded-full transition-all duration-700 ${showRegister ? 'bg-indigo-400' : 'bg-blue-300'}`} style={{animation: 'float 9s ease-in-out infinite', animationDelay: '2s'}}></div>
          <div className={`absolute bottom-1/3 right-1/4 w-2.5 h-2.5 rounded-full transition-all duration-700 ${showRegister ? 'bg-indigo-300' : 'bg-cyan-400'}`} style={{animation: 'float 11s ease-in-out infinite', animationDelay: '1.5s'}}></div>
          <div className={`absolute bottom-1/4 left-1/2 w-3 h-3 rounded-full transition-all duration-700 ${showRegister ? 'bg-indigo-400' : 'bg-blue-400'}`} style={{animation: 'float 9.5s ease-in-out infinite', animationDelay: '0.5s'}}></div>
          <div className={`absolute top-1/5 right-1/3 w-2 h-2 rounded-full transition-all duration-700 ${showRegister ? 'bg-indigo-300' : 'bg-blue-300'}`} style={{animation: 'float 10.5s ease-in-out infinite', animationDelay: '3s'}}></div>
        </div>
        
        {/* SVG con gradiente ajustado al color exacto del formulario derecho y glow */}
        <svg
          className="absolute top-0 right-0 translate-x-12 h-full w-auto svg-glow"
          viewBox="0 0 500 760"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Gradiente EXACTO del login (muestreado de la imagen) */}
            {/* Estos stops vienen de la muestra que tomamos del panel derecho */}
            <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d4de1" />
              <stop offset="50%" stopColor="#2853dd" />
              <stop offset="100%" stopColor="#1b45d0" />
            </linearGradient>

            {/* Gradiente EXACTO del registro (indigo -> morado) */}
            <linearGradient id="gradIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#4f46e5', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: '#4338ca', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#6d28d9', stopOpacity: 1}} />
            </linearGradient>

            {/* Suave borde interno para que la curva parezca más integrada */}
            <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
              <feComposite operator="over" in="coloredBlur" in2="SourceGraphic"/>
            </filter>
          </defs>
          <path
            d="M 800 0 L 360 0 C 520 200 450 330 360 470 C 280 600 320 760 440 860 C 560 960 800 1000 800 1000 Z"
            fill={`url(#${showRegister ? 'gradIndigo' : 'gradBlue'})`}
            style={{transition: 'all 0.7s ease-in-out'}}
            filter="url(#innerGlow)"
          />
        </svg>

        {/* Logo mejorado */}
        <div className="absolute top-8 left-8 flex items-center gap-3 z-10" style={{animation: 'slideInLeft 0.8s ease-out'}}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xl transition-all duration-700 ease-in-out hover:scale-110 hover:rotate-6 relative overflow-hidden ${showRegister ? 'bg-gradient-to-br from-indigo-600 to-indigo-700' : 'bg-gradient-to-br from-blue-600 to-blue-700'}`}>
            <div className="absolute inset-0 animate-shimmer"></div>
            <Monitor className="w-7 h-7 text-white relative z-10" />
          </div>
          <div className="text-slate-800 leading-tight">
            <div className="font-bold text-xl tracking-tight">ComputerMGMT</div>
            <div className="text-xs text-slate-500 font-medium">Sistema de Gestión</div>
          </div>
        </div>

        {/* Iconos decorativos mejorados */}
        <div className="group">
          <div className={`absolute top-32 left-24 w-20 h-20 rounded-2xl flex items-center justify-center opacity-70 rotate-12 shadow-xl transition-all duration-700 ease-in-out cursor-pointer ${showRegister ? 'bg-gradient-to-br from-indigo-100 to-indigo-200' : 'bg-gradient-to-br from-blue-100 to-blue-200'}`} style={{animation: 'fadeInUp 1s ease-out 0.2s forwards, floatSlow 4s ease-in-out infinite'}}>
            <Server className={`w-10 h-10 transition-all duration-700 ease-in-out group-hover-scale ${showRegister ? 'text-indigo-600' : 'text-blue-600'}`} />
          </div>
        </div>
        
        <div className="group">
          <div className={`absolute top-52 left-52 w-16 h-16 rounded-xl flex items-center justify-center opacity-60 -rotate-6 shadow-lg transition-all duration-700 ease-in-out cursor-pointer ${showRegister ? 'bg-gradient-to-br from-indigo-100 to-indigo-200' : 'bg-gradient-to-br from-purple-100 to-purple-200'}`} style={{animation: 'fadeInUp 1s ease-out 0.4s forwards, floatSlow 5s ease-in-out infinite'}}>
            <Cpu className={`w-8 h-8 transition-all duration-700 ease-in-out group-hover-scale ${showRegister ? 'text-indigo-600' : 'text-purple-600'}`} />
          </div>
        </div>
        
        <div className="group">
          <div className={`absolute bottom-48 right-80 w-24 h-24 rounded-2xl flex items-center justify-center opacity-50 rotate-6 shadow-xl transition-all duration-700 ease-in-out cursor-pointer ${showRegister ? 'bg-gradient-to-br from-indigo-100 to-indigo-200' : 'bg-gradient-to-br from-cyan-100 to-cyan-200'}`} style={{animation: 'fadeInUp 1s ease-out 0.6s forwards, floatSlow 6s ease-in-out infinite'}}>
            <HardDrive className={`w-12 h-12 transition-all duration-700 ease-in-out group-hover-scale ${showRegister ? 'text-indigo-600' : 'text-cyan-600'}`} />
          </div>
        </div>
        
        <div className="group">
          <div className={`absolute bottom-32 right-96 w-16 h-16 rounded-lg flex items-center justify-center opacity-60 -rotate-12 shadow-lg transition-all duration-700 ease-in-out cursor-pointer ${showRegister ? 'bg-gradient-to-br from-indigo-50 to-indigo-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`} style={{animation: 'fadeInUp 1s ease-out 0.8s forwards, floatSlow 4.5s ease-in-out infinite'}}>
            <Monitor className={`w-8 h-8 transition-all duration-700 ease-in-out group-hover-scale ${showRegister ? 'text-indigo-500' : 'text-blue-500'}`} />
          </div>
        </div>

        {/* Círculos decorativos mejorados */}
        <div className={`absolute top-1/4 left-1/3 w-40 h-40 rounded-full opacity-30 blur-3xl transition-all duration-700 ease-in-out animate-gradient ${showRegister ? 'bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-200' : 'bg-gradient-to-br from-blue-200 via-cyan-200 to-indigo-200'}`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-25 blur-3xl transition-all duration-700 ease-in-out animate-gradient ${showRegister ? 'bg-gradient-to-br from-purple-200 via-indigo-300 to-indigo-200' : 'bg-gradient-to-br from-cyan-200 via-blue-300 to-blue-200'}`}></div>

        {/* Ilustración de computadora mejorada */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-96 h-96 mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative" style={{animation: 'fadeInUp 1s ease-out 1s forwards'}}>
                  {/* Monitor con efectos mejorados */}
                  <div className="w-80 h-52 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl shadow-2xl border-8 border-slate-700 relative overflow-hidden" style={{animation: 'pulseGlow 3s ease-in-out infinite'}}>
                    {/* Efecto de brillo en el borde */}
                    <div className="absolute inset-0 rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    </div>
                    
                    {/* Contenido de la pantalla */}
                    <div className={`absolute inset-4 rounded-lg transition-all duration-700 ease-in-out ${showRegister ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20' : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'}`}>
                      {/* Línea de escaneo */}
                      <div className={`absolute left-0 right-0 h-1 blur-sm transition-colors duration-700 ${showRegister ? 'bg-indigo-400/50' : 'bg-blue-400/50'}`} style={{animation: 'scan 3s ease-in-out infinite'}}></div>
                      
                      <div className="grid grid-cols-4 gap-2 p-4">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className={`h-8 rounded-md animate-pulse transition-all duration-700 ease-in-out hover:scale-105 ${showRegister ? 'bg-indigo-400/30 hover:bg-indigo-400/50' : 'bg-blue-400/30 hover:bg-blue-400/50'}`} style={{animationDelay: `${i * 0.15}s`, animationDuration: '2s'}}></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Reflejo en la pantalla */}
                    <div className="absolute top-4 left-4 right-4 h-16 bg-gradient-to-b from-white/5 to-transparent rounded-t-lg"></div>
                  </div>
                  
                  {/* Base del monitor mejorada */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-8 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-lg shadow-lg"></div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-3 bg-gradient-to-r from-transparent via-slate-600 to-transparent rounded-full shadow-xl"></div>
                </div>
              </div>
            </div>
            
            {/* Texto mejorado */}
            <div className="mt-12 space-y-3" style={{animation: 'fadeInUp 1s ease-out 1.2s forwards'}}>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900">
                Sistema de Gestión de Computadores
              </h2>
              <p className="text-slate-500 text-base font-medium">Administra y monitorea tu infraestructura tecnológica</p>
              <div className="flex justify-center gap-2 pt-2">
                <div className={`w-2 h-2 rounded-full transition-colors duration-700 ${showRegister ? 'bg-indigo-400' : 'bg-blue-400'}`} style={{animation: 'floatSlow 2s ease-in-out infinite'}}></div>
                <div className={`w-2 h-2 rounded-full transition-colors duration-700 ${showRegister ? 'bg-indigo-400' : 'bg-cyan-400'}`} style={{animation: 'floatSlow 2s ease-in-out infinite 0.3s'}}></div>
                <div className={`w-2 h-2 rounded-full transition-colors duration-700 ${showRegister ? 'bg-indigo-400' : 'bg-blue-400'}`} style={{animation: 'floatSlow 2s ease-in-out infinite 0.6s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor de formularios en el lado derecho */}
      <div className="absolute right-0 top-0 w-5/12 h-full overflow-hidden">
        
        {/* Login Form */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center px-16 transition-transform duration-700 ease-in-out animate-gradient ${showRegister ? '-translate-x-full' : 'translate-x-0'}`}
        >
          <div className="w-full max-w-sm">
            
            <div className="mb-12">
              <h1 className="text-white text-5xl font-bold mb-3 tracking-tight">Bienvenido</h1>
              <p className="text-blue-100 text-base">Ingresa tus credenciales para continuar</p>
            </div>

            <div className="space-y-6">
              
              <div>
                <label className="block text-white text-sm mb-2 font-semibold tracking-wide">Usuario</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  className="w-full px-5 py-4 rounded-xl bg-white/15 backdrop-blur-md text-white placeholder-blue-200/70 border-2 border-white/20 outline-none focus:bg-white/20 focus:border-white/50 transition-all duration-300 input-focus"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2 font-semibold tracking-wide">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full px-5 py-4 rounded-xl bg-white/15 backdrop-blur-md text-white placeholder-blue-200/70 border-2 border-white/20 outline-none focus:bg-white/20 focus:border-white/50 transition-all duration-300 input-focus"
                />
              </div>

              <div className="text-right">
                <a href="#" className="text-blue-100 text-sm hover:text-white transition-colors font-medium">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-white hover:bg-blue-50 text-blue-700 font-bold text-base rounded-xl transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-[1.03] active:scale-[0.97] relative overflow-hidden group"
              >
                <a href="/dashboard" className="relative z-10">Iniciar Sesión</a>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>

              <div className="text-center pt-3">
                <p className="text-white text-sm">
                  ¿No tienes una cuenta?{' '}
                  <button 
                    onClick={() => setShowRegister(true)}
                    className="text-blue-100 hover:text-white underline transition-colors font-semibold cursor-pointer bg-transparent border-none hover:scale-105 inline-block"
                  >
                    Regístrate aquí
                  </button>
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-20 text-xs">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                Política de Privacidad
              </a>
            </div>

            <div className="text-center mt-8 pt-8 border-t border-white/20">
              <p className="text-blue-100 text-xs mb-2 font-medium">¿Necesitas ayuda? Contáctanos</p>
              <a 
                href="mailto:soporte@computermgmt.edu" 
                className="text-white text-sm hover:text-blue-100 transition-colors font-semibold hover:scale-105 inline-block"
              >
                soporte@computermgmt.edu
              </a>
            </div>
          </div>
        </div>

        {/* Register Form */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 flex items-center justify-center px-16 transition-transform duration-700 ease-in-out animate-gradient ${showRegister ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="w-full max-w-sm">
            
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-indigo-100 transition-all duration-300 bg-white/15 hover:bg-white/25 backdrop-blur-md px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </button>
            
            <div className="mb-8 text-center">
              <h1 className="text-white text-4xl font-bold mb-3 tracking-tight">Crear Cuenta</h1>
              <p className="text-indigo-100 text-base">Completa el formulario para registrarte</p>
            </div>

            <div className="space-y-4">
              
              <div>
                <label className="block text-white text-sm mb-2 font-semibold tracking-wide">Nombre Completo</label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ingresa tu nombre completo"
                  className="w-full px-5 py-3.5 rounded-xl bg-white/15 backdrop-blur-md text-white placeholder-indigo-200/70 border-2 border-white/20 outline-none focus:bg-white/20 focus:border-white/50 transition-all duration-300 input-focus"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2 font-semibold tracking-wide">Correo Electrónico</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full px-5 py-3.5 rounded-xl bg-white/15 backdrop-blur-md text-white placeholder-indigo-200/70 border-2 border-white/20 outline-none focus:bg-white/20 focus:border-white/50 transition-all duration-300 input-focus"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2 font-semibold tracking-wide">Usuario</label>
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="Elige un nombre de usuario"
                  className="w-full px-5 py-3.5 rounded-xl bg-white/15 backdrop-blur-md text-white placeholder-indigo-200/70 border-2 border-white/20 outline-none focus:bg-white/20 focus:border-white/50 transition-all duration-300 input-focus"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2 font-semibold tracking-wide">Contraseña</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Crea una contraseña segura"
                  className="w-full px-5 py-3.5 rounded-xl bg-white/15 backdrop-blur-md text-white placeholder-indigo-200/70 border-2 border-white/20 outline-none focus:bg-white/20 focus:border-white/50 transition-all duration-300 input-focus"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2 font-semibold tracking-wide">Confirmar Contraseña</label>
                <input
                  type="password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Confirma tu contraseña"
                  className="w-full px-5 py-3.5 rounded-xl bg-white/15 backdrop-blur-md text-white placeholder-indigo-200/70 border-2 border-white/20 outline-none focus:bg-white/20 focus:border-white/50 transition-all duration-300 input-focus"
                />
              </div>

              <button
                onClick={handleRegister}
                className="w-full py-4 bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-base rounded-xl transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-[1.03] active:scale-[0.97] mt-4 relative overflow-hidden group"
              >
                <span className="relative z-10">Registrarse</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>

              <div className="text-center pt-3">
                <p className="text-white text-sm">
                  ¿Ya tienes cuenta?{' '}
                  <button 
                    onClick={() => setShowRegister(false)}
                    className="text-indigo-100 hover:text-white underline transition-colors font-semibold cursor-pointer bg-transparent border-none hover:scale-105 inline-block"
                  >
                    Iniciar Sesión
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
