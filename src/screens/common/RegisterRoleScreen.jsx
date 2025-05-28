import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Square } from 'lucide-react';

const RegisterRoleScreen = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const roles = [
    { 
      label: 'Стать клиентом',
      value: 'client',
      description: 'Создавайте проекты и находите исполнителей'
    },
    { 
      label: 'Стать подрядчиком',
      value: 'contractor',
      description: 'Находите клиентов и выполняйте проекты'
    },
    { 
      label: 'Продвигать мой магазин на Satu',
      value: 'satu',
      description: 'Развивайте свой бизнес на платформе Satu'
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(selectedRole === role ? null : role);
  };

  const handleContinue = () => {
    if (selectedRole === 'client') {
      console.log('Navigate to register-client');
    } else if (selectedRole === 'contractor') {
      console.log('Navigate to register-contractor');
    } else if (selectedRole === 'satu') {
      console.log('Navigate to register-satu');
    }
  };

  const handleLogin = () => {
    console.log('Navigate to login');
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center pb-8">
          <div className="text-black font-bold text-2xl">
            RemoPro
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="space-y-3 mb-6">
            {roles.map((role) => {
              const isSelected = selectedRole === role.value;
              return (
                <button
                  key={role.value}
                  onClick={() => handleRoleSelect(role.value)}
                  className={`w-full rounded-lg px-4 py-4 flex justify-between items-center text-left transition-all duration-200 ${
                    isSelected 
                      ? 'bg-gray-100 border-2 border-gray-300' 
                      : 'border border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-700">
                    {role.label}
                  </span>
                  
                  <div className="ml-4">
                    {isSelected ? (
                      <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            disabled={!selectedRole}
            onClick={handleContinue}
            className={`w-full py-3 rounded-lg font-medium text-sm transition-colors ${
              selectedRole
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Создать аккаунт
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Уже есть аккаунт?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-black font-semibold hover:underline"
              >
                Войти
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRoleScreen;