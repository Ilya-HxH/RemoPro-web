import React from 'react';
import { useAuthStore } from '../store/authStore';
import ClientHeader from '../components/ClientHeader';
import ContractorHeader from '../components/ContractorHeader';

const Layout = ({ children }) => {
  const role = useAuthStore(state => state.role);

  // Если пользователь не авторизован, не показываем хедер
  if (!role) {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {role === 'ROLE_CLIENT' && <ClientHeader />}
      {role === 'ROLE_CONTRACTOR' && <ContractorHeader />}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;