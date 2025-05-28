import React, { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Bell, User, Edit3, LogOut } from "lucide-react";

// Имитация useAuthStore для демонстрации
const useAuthStore = {
  getState: () => ({
    token: "demo-token",
    logout: () => console.log("User logged out")
  })
};

const ContractorProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data для демонстрации
  const mockProfile = {
    profileImg: "/api/placeholder/64/64",
    user_data: {
      accountName: "Мастер Иван",
      email: "ivan@example.com"
    },
    shortDescription: "Качественный ремонт по доступным ценам",
    fullDescription: "Более 10 лет опыта в сфере ремонта. Выполняю все виды отделочных работ: покраска, поклейка обоев, укладка плитки, установка сантехники. Гарантия на все работы.",
    tags: [
      { id: 1, action: "Отделка" },
      { id: 2, action: "Сантехника" },
      { id: 3, action: "Электрика" },
      { id: 4, action: "Плитка" }
    ],
    gallery: [
      { img: "/api/placeholder/128/128" },
      { img: "/api/placeholder/128/128" },
      { img: "/api/placeholder/128/128" },
      { img: "/api/placeholder/128/128" }
    ]
  };

  const fetchProfile = async () => {
    try {
      // В реальном приложении здесь будет API запрос
      // const res = await fetch("http://185.47.167.143:8000/api/contractor/get-info", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // const data = await res.json();
      
      // Имитация загрузки
      setTimeout(() => {
        setProfile(mockProfile);
      }, 500);
    } catch (err) {
      console.error("Ошибка при загрузке профиля:", err);
      alert("Не удалось загрузить данные подрядчика");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProfile();
    setRefreshing(false);
  };

  const handleLogout = () => {
    if (window.confirm("Вы уверены, что хотите выйти из аккаунта?")) {
      useAuthStore.getState().logout();
    }
  };

  const handleNavigation = (screen) => {
    console.log(`Navigate to ${screen}`);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-yellow-300 px-4 pt-20 pb-4 rounded-b-3xl">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => handleNavigation("back")} className="p-1">
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <div className="absolute left-0 right-0 flex justify-center z-0">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
              <span className="font-bold text-black text-xl">RemoPro</span>
            </div>
          </div>
          <button className="p-1" onClick={() => handleNavigation("ContractorNotification")}>
            <Bell className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="flex items-center mt-4 space-x-4">
          <div className="w-16 h-16 rounded-lg bg-gray-200 flex justify-center items-center relative overflow-hidden">
            {profile.profileImg ? (
              <img
                src={profile.profileImg}
                alt="Profile"
                className="w-16 h-16 rounded-lg object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>

          <div className="flex-1 flex ml-3 justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-black">{profile.user_data.accountName}</h2>
              <p className="text-sm text-black">Подрядчик</p>
            </div>
            <button
              onClick={() => handleNavigation("EditContractorProfile")}
              className="self-end mb-4 flex items-center"
            >
              <span className="text-sm font-medium text-black mr-1">Редактировать</span>
              <Edit3 className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 pb-20">
        {/* Email */}
        <label className="text-xs text-gray-400 mb-1 block">Email</label>
        <div className="bg-white border border-gray-300 rounded-2xl px-3 py-3 mb-4">
          <p className="text-base font-medium text-black">{profile.user_data.email}</p>
        </div>

        {/* Short Description */}
        <label className="text-xs text-gray-400 mb-1 block">Краткое описание</label>
        <div className="bg-white border border-gray-300 rounded-2xl px-3 py-3 mb-4">
          <p className="text-base font-medium">{profile.shortDescription}</p>
        </div>

        {/* Full Description */}
        <label className="text-xs text-gray-400 mb-1 block">Полное описание</label>
        <div className="bg-white border border-gray-300 rounded-2xl px-3 py-3 mb-4">
          <p className="text-base font-medium">{profile.fullDescription}</p>
        </div>

        {/* Categories */}
        <label className="text-xs text-gray-400 mb-1 block">Категории работ</label>
        <div className="flex flex-wrap mb-4">
          {profile.tags.length > 0 ? (
            profile.tags.map((cat, idx) => (
              <div
                key={cat.id || idx}
                className="bg-black px-4 py-2 rounded-full mr-2 mb-2"
              >
                <span className="text-white text-sm font-medium">{cat.action}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">Категории не указаны</p>
          )}
        </div>

        {/* Gallery */}
        <label className="text-xs text-gray-400 mb-1 block">Галерея</label>
        {profile.gallery.length > 0 ? (
          <div className="flex overflow-x-auto space-x-3 mb-4 pb-2">
            {profile.gallery.map((img, index) => (
              <img
                key={index}
                src={img.img}
                alt={`Gallery ${index + 1}`}
                className="w-32 h-32 rounded-xl flex-shrink-0 object-cover"
              />
            ))}
          </div>
        ) : (
          <button
            className="border border-black rounded-xl py-3 px-4 flex items-center justify-center mb-4"
            onClick={() => handleNavigation("EditContractorProfile")}
          >
            <span className="text-black font-medium">Перейти в редактирование профиля</span>
          </button>
        )}

        {/* Logout Button */}
        <div className="pb-6">
          <button
            className="w-full bg-red-500 py-3 rounded-xl flex items-center justify-center mt-4 hover:bg-red-600 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-semibold text-base">Выйти из аккаунта</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractorProfileScreen;