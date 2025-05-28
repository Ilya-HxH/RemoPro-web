import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit3, Camera, LogOut, Globe } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { BACKEND_URL } from '../../utils/config';

const UserProfileScreen = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuthStore();
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    accountName: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/user/get-info`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        const profileData = data.profile;
        
        setProfile(profileData);
        setFormData({
          fullName: profileData.fullName || '',
          phone: profileData.userId.phone || '',
          accountName: profileData.userId.accountName || ''
        });
      } catch (error) {
        console.error('Ошибка при получении профиля:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleSave = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/user/update-info`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          account_name: formData.accountName,
        }),
      });

      if (!response.ok) throw new Error('Ошибка обновления профиля');

      alert('Профиль обновлён успешно');
      setEditMode(false);
      
      // Обновляем данные профиля
      const updatedProfile = { ...profile };
      updatedProfile.fullName = formData.fullName;
      updatedProfile.userId.phone = formData.phone;
      updatedProfile.userId.accountName = formData.accountName;
      setProfile(updatedProfile);
    } catch (error) {
      alert('Не удалось обновить профиль');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Не удалось загрузить профиль</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-yellow-300 rounded-2xl p-6">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
              {profile.profileImg ? (
                <img
                  src={`${BACKEND_URL}${profile.profileImg}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <button className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
              <Camera className="w-3 h-3 text-gray-600" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-black">{profile.userId.accountName}</h1>
                <p className="text-sm text-black">
                  {profile.userId.role?.roleTag === 'ROLE_CLIENT' ? 'Клиент' : 'Исполнитель'}
                </p>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className="flex items-center space-x-1 text-black hover:bg-black hover:text-white px-3 py-1 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">Редактировать</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-black">Личная информация</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Email</label>
            <div className="border border-gray-300 rounded-lg px-3 py-3 bg-gray-50">
              <span className="text-base text-gray-700">{profile.userId.email}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Имя пользователя</label>
            {editMode ? (
              <input
                type="text"
                value={formData.accountName}
                onChange={(e) => setFormData(prev => ({ ...prev, accountName: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <div className="border border-gray-300 rounded-lg px-3 py-3">
                <span className="text-base text-black">{profile.userId.accountName}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Телефон</label>
            {editMode ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <div className="border border-gray-300 rounded-lg px-3 py-3">
                <span className="text-base text-black">{profile.userId.phone}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Язык</label>
            <div className="border border-gray-300 rounded-lg px-3 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-base text-black">Русский</span>
              <Globe className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {editMode ? (
          <div className="flex space-x-4 pt-4">
            <button
              onClick={() => setEditMode(false)}
              className="flex-1 py-2 border border-black rounded-lg text-black font-medium hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Сохранить
            </button>
          </div>
        ) : (
          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Выйти из аккаунта</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileScreen;