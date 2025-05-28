// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../../store/authStore';
// import { BACKEND_URL } from '../../utils/config';

// const LoginScreen = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   const navigate = useNavigate();
//   const setAuth = useAuthStore(state => state.setAuth);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Неверный логин или пароль');
//       }

//       const data = await response.json();
//       setAuth({ 
//         role: data.role, 
//         username: data.username, 
//         token: data.token 
//       });

//       // Перенаправляем на главную страницу
//       navigate('/home');
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-black mb-8">RemoPro</h1>
//           <h2 className="text-xl font-semibold text-gray-900 mb-6">
//             Войти в RemoPro
//           </h2>
//         </div>

//         <div className="bg-white py-8 px-4 shadow-sm border border-gray-200 rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
//                 {error}
//               </div>
//             )}

//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="username"
//                   name="username"
//                   type="email"
//                   required
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
//                   placeholder="Введите Email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Пароль
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
//                   placeholder="Введите Пароль"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Вход...' : 'Войти'}
//               </button>
//             </div>

//             <div className="text-center">
//               <span className="text-gray-400">Или</span>
//             </div>

//             <div className="space-y-3">
//               <button
//                 type="button"
//                 className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Continue with Google
//               </button>

//               <button
//                 type="button"
//                 className="w-full flex justify-center py-3 px-4 border border-black rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//               >
//                 Continue with Apple
//               </button>
//             </div>
//           </form>

//           <div className="mt-8 text-center">
//             <p className="text-gray-300">Нет аккаунта RemoPro?</p>
//             <Link
//               to="/register"
//               className="mt-2 inline-block px-6 py-2 border border-black rounded-md text-black font-semibold hover:bg-black hover:text-white transition-colors"
//             >
//               Зарегистрироваться
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginScreen;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { BACKEND_URL } from '../../utils/config';

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // ОТКЛЮЧЕНО ДЛЯ ТЕСТИРОВАНИЯ - закомментированный код ниже
    /*
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Неверный логин или пароль');
      }

      const data = await response.json();
      setAuth({ 
        role: data.role, 
        username: data.username, 
        token: data.token 
      });

      // Перенаправляем на главную страницу
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    */

    // ВРЕМЕННАЯ ЛОГИКА ДЛЯ ТЕСТИРОВАНИЯ
    setTimeout(() => {
      // Имитируем успешный вход с моковыми данными
      setAuth({ 
        role: 'ROLE_CLIENT', // или 'ROLE_CONTRACTOR'
        username: formData.username || 'test@example.com', 
        token: 'mock-token-123' 
      });

      // Перенаправляем на главную страницу
      navigate('/home');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-8">RemoPro</h1>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Войти в RemoPro
          </h2>
        </div>

        <div className="bg-white py-8 px-4 shadow-sm border border-gray-200 rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="email"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                  placeholder="Введите Email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                  placeholder="Введите Пароль"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Вход...' : 'Войти'}
              </button>
            </div>

            <div className="text-center">
              <span className="text-gray-400">Или</span>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  // Тестовый вход через Google
                  setAuth({ 
                    role: 'ROLE_CLIENT',
                    username: 'google-user@gmail.com', 
                    token: 'mock-google-token' 
                  });
                  navigate('/home');
                }}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => {
                  // Тестовый вход через Apple
                  setAuth({ 
                    role: 'ROLE_CONTRACTOR',
                    username: 'apple-user@icloud.com', 
                    token: 'mock-apple-token' 
                  });
                  navigate('/contractor/home');
                }}
                className="w-full flex justify-center py-3 px-4 border border-black rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Continue with Apple
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-300">Нет аккаунта RemoPro?</p>
            <Link
              to="/register"
              className="mt-2 inline-block px-6 py-2 border border-black rounded-md text-black font-semibold hover:bg-black hover:text-white transition-colors"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;