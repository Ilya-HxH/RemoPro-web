import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, Home, Briefcase, ClipboardList, MessageSquare, Search } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const ContractorHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const navItems = [
    { path: '/contractor/home', label: 'Главная', icon: Home },
    { path: '/contractor/projects', label: 'Проекты / Заявки', icon: Briefcase },
    { path: '/orders', label: 'Каталог', icon: ClipboardList },
    { path: '/contractor/chat', label: 'Чаты', icon: MessageSquare },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-yellow-300 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 mr-4">
            <Link to="/contractor/home" className="text-xl font-bold text-black">
              RemoPro
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'border-b-2 border-black text-black'
                    : 'text-black hover:border-b-2 hover:border-black'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-black rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Поиск..."
              />
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/contractor/notifications')}
              className="p-2 text-black hover:bg-black hover:text-white rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="relative group">
              <button className="p-2 text-black hover:bg-black hover:text-white rounded-lg transition-colors">
                <User className="w-5 h-5" />
              </button>
              
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/contractor/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Профиль
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Выйти
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </header>
  );
};

export default ContractorHeader;