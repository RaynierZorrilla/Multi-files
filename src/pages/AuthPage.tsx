import { useState, useEffect } from 'react';
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';
import { useLogin, useSignup } from '../hooks';
import { useAuth } from '../contexts/AuthContext';

export const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const { login, isLoggingIn } = useLogin();
  const { signup, isSigningUp } = useSignup();
  const { isAuthenticated } = useAuth();

  // Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (isSignUp) {
      // Validar que las contraseñas coincidan
      if (formData.password !== formData.confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }

      // Validar longitud mínima de contraseña
      if (formData.password.length < 6) {
        setPasswordError('Password must be at least 6 characters long');
        return;
      }

      signup({
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName || undefined,
      });
    } else {
      login({
        email: formData.email,
        password: formData.password,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 md:w-[500px] md:h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 md:w-[500px] md:h-[500px] bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[500px] md:h-[500px] bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className={`w-full ${isSignUp ? 'max-w-md md:max-w-lg lg:max-w-xl' : 'max-w-md md:max-w-lg lg:max-w-xl'}`}>
          <div className={`backdrop-blur-xl bg-white/10 dark:bg-white/10 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden ${
            isSignUp ? 'p-8 md:p-12 lg:p-14' : 'p-8 md:p-12 lg:p-16'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              <div className={`text-center ${isSignUp ? 'mb-8 md:mb-10' : 'mb-8 md:mb-12'}`}>
                <div className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-blue-500/50 ${
                  isSignUp ? 'w-20 h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 mb-6' : 'w-20 h-20 md:w-24 md:h-24 mb-6'
                }`}>
                  {isSignUp ? (
                    <UserPlus className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 text-white" />
                  ) : (
                    <LogIn className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  )}
                </div>
                <h2 className={`font-bold text-white ${
                  isSignUp ? 'text-4xl md:text-5xl lg:text-6xl mb-3' : 'text-4xl md:text-5xl lg:text-6xl mb-3'
                }`}>
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className={`text-blue-200/80 ${isSignUp ? 'text-lg md:text-xl' : 'text-lg md:text-xl'}`}>
                  {isSignUp ? 'Sign up to get started' : 'Sign in to continue'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className={isSignUp ? 'space-y-6 md:space-y-7' : 'space-y-6 md:space-y-7'}>
                {isSignUp && (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 md:pl-6 flex items-center pointer-events-none">
                      <User className="h-6 w-6 md:h-7 md:w-7 text-blue-300/70" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full pl-14 md:pl-16 pr-5 md:pr-6 py-4 md:py-5 text-base md:text-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 md:pl-6 flex items-center pointer-events-none">
                    <Mail className="h-6 w-6 md:h-7 md:w-7 text-blue-300/70" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full pl-14 md:pl-16 pr-5 md:pr-6 py-4 md:py-5 text-base md:text-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 md:pl-6 flex items-center pointer-events-none">
                    <Lock className="h-6 w-6 md:h-7 md:w-7 text-blue-300/70" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full pl-14 md:pl-16 pr-5 md:pr-6 py-4 md:py-5 text-base md:text-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {isSignUp && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-5 md:pl-6 flex items-center pointer-events-none">
                        <Lock className="h-6 w-6 md:h-7 md:w-7 text-blue-300/70" />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="w-full pl-14 md:pl-16 pr-5 md:pr-6 py-4 md:py-5 text-base md:text-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    {passwordError && (
                      <p className="text-red-400 text-sm mt-1">{passwordError}</p>
                    )}
                  </>
                )}

                {!isSignUp && (
                  <div className="flex items-center justify-between text-base md:text-lg">
                    <label className="flex items-center text-blue-200/80 cursor-pointer">
                      <input type="checkbox" className="mr-2 rounded w-4 h-4 md:w-5 md:h-5" />
                      Remember me
                    </label>
                    <a href="#" className="text-cyan-300 hover:text-cyan-200 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn || isSigningUp}
                  className="w-full py-4 md:py-5 text-base md:text-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoggingIn || isSigningUp
                    ? (isSignUp ? 'Creating Account...' : 'Signing In...')
                    : (isSignUp ? 'Create Account' : 'Sign In')}
                </button>
              </form>

              <div className="mt-8 md:mt-10 text-center">
                <p className="text-base md:text-lg text-blue-200/80">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>

              <div className="mt-8 md:mt-10 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm md:text-base">
                  <span className="px-4 bg-transparent text-blue-200/60">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 md:mt-8 grid grid-cols-3 gap-3 md:gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center py-4 md:py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      className="text-white"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-4 md:py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      className="text-white"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-4 md:py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                      className="text-white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

