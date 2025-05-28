import React, { useState, useEffect } from "react";
import { User, Edit3, Plus, X, Search } from "lucide-react";

// Mock config
const BACKEND_URL = "http://185.47.167.143:8000";

// Mock auth store
const useAuthStore = {
  getState: () => ({
    token: "demo-token"
  })
};

const EditContractorProfileScreen = () => {
  const [accountName, setAccountName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [gallery, setGallery] = useState([]);
  const [logo, setLogo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [logoModalVisible, setLogoModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allServerCategories, setAllServerCategories] = useState([]);

  // Mock data
  const mockData = {
    user_data: { accountName: "Мастер Иван" },
    shortDescription: "Качественный ремонт по доступным ценам",
    fullDescription: "Более 10 лет опыта в сфере ремонта",
    tags: [
      { id: 1, action: "Отделка" },
      { id: 2, action: "Сантехника" }
    ],
    gallery: [
      { id: 1, img: "/api/placeholder/128/128" },
      { id: 2, img: "/api/placeholder/128/128" }
    ],
    profileImg: "/api/placeholder/80/80"
  };

  const mockCategories = [
    { id: 1, action: "Электрика" },
    { id: 2, action: "Сантехника" },
    { id: 3, action: "Отделка" },
    { id: 4, action: "Демонтаж" },
    { id: 5, action: "Плитка" },
    { id: 6, action: "Покраска" },
    { id: 7, action: "Стяжка пола" },
    { id: 8, action: "Гипсокартон" },
    { id: 9, action: "Двери и окна" },
    { id: 10, action: "Обои" }
  ];

  const filteredCategories = searchText
    ? allServerCategories.filter((cat) =>
        cat.action.toLowerCase().includes(searchText.toLowerCase())
      )
    : allServerCategories.slice(0, 6);

  useEffect(() => {
    // В реальном приложении здесь будут API запросы
    setAllServerCategories(mockCategories);
    setAccountName(mockData.user_data.accountName || "");
    setShortDesc(mockData.shortDescription || "");
    setFullDesc(mockData.fullDescription || "");
    setCategories(mockData.tags || []);
    
    const galleryImages = mockData.gallery?.map((img) => ({
      id: img.id,
      uri: img.img,
      isNew: false,
    })) || [];
    setGallery(galleryImages);

    if (mockData.profileImg) {
      setLogo({ uri: mockData.profileImg });
    }
  }, []);

  const handleImagePick = (callback) => {
    // В реальном приложении здесь будет ImagePicker
    const mockImage = {
      uri: "/api/placeholder/128/128",
      fileName: "image.jpg"
    };
    callback(mockImage);
  };

  const deleteImage = async (imgUri, index, id) => {
    try {
      if (id) {
        // В реальном приложении здесь будет API запрос на удаление
        console.log(`Delete image with id: ${id}`);
      }
      setGallery((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Ошибка при удалении изображения:", err);
      alert("Не удалось удалить фотографию");
    }
  };

  const handleLogoPick = () => {
    handleImagePick((image) => {
      setLogo(image);
      setLogoModalVisible(false);
    });
  };

  const removeLogo = () => {
    setLogo(null);
    setLogoModalVisible(false);
  };

  const handleSave = async () => {
    try {
      // В реальном приложении здесь будут API запросы для:
      // 1. Загрузки логотипа
      // 2. Загрузки галереи
      // 3. Обновления информации профиля
      
      console.log("Saving profile:", {
        accountName,
        shortDescription: shortDesc,
        fullDescription: fullDesc,
        tags: categories,
        logo,
        gallery
      });

      alert("Профиль подрядчика обновлён");
      // В реальном приложении: navigation.goBack();
    } catch (err) {
      console.error("Ошибка:", err);
      alert("Не удалось сохранить изменения");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 pt-16 pb-20">
        <h1 className="text-2xl font-bold mb-6">Редактирование профиля</h1>

        {/* Logo Section */}
        <button
          onClick={() => setLogoModalVisible(true)}
          className="w-20 h-20 bg-gray-200 rounded-xl flex justify-center items-center relative mb-6 hover:bg-gray-300 transition-colors"
        >
          {logo ? (
            <img src={logo.uri} alt="Logo" className="w-20 h-20 rounded-xl object-cover" />
          ) : (
            <User className="w-8 h-8 text-gray-400" />
          )}
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
            <Edit3 className="w-3 h-3 text-black" />
          </div>
        </button>

        {/* Logo Modal */}
        {logoModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-80 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-center">Выберите действие</h3>
              <button
                onClick={handleLogoPick}
                className="w-full bg-black text-white rounded-xl py-3 font-medium hover:bg-gray-800 transition-colors"
              >
                Выбрать из галереи
              </button>
              <button
                onClick={removeLogo}
                className="w-full bg-gray-200 text-black rounded-xl py-3 font-medium hover:bg-gray-300 transition-colors"
              >
                Удалить фото
              </button>
              <button
                onClick={() => setLogoModalVisible(false)}
                className="w-full py-2 text-gray-500"
              >
                Отмена
              </button>
            </div>
          </div>
        )}

        {/* Basic Information */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Имя аккаунта</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Краткое описание</label>
            <input
              type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Полное описание</label>
            <textarea
              value={fullDesc}
              onChange={(e) => setFullDesc(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-6">
          <label className="text-xs text-gray-400 mb-2 block">Галерея фотографий</label>
          <div className="flex flex-wrap gap-3 mb-4">
            {gallery.map((img, idx) => (
              <div key={idx} className="relative">
                <img src={img.uri} alt={`Gallery ${idx}`} className="w-24 h-24 rounded-md object-cover" />
                <button
                  onClick={() => deleteImage(img.uri, idx, img.id)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-black" />
                </button>
              </div>
            ))}
            <button
              onClick={() => handleImagePick((img) => setGallery([...gallery, { ...img, isNew: true }]))}
              className="w-24 h-24 border-2 border-dashed border-black rounded-md flex flex-col justify-center items-center hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-6 h-6 text-black mb-1" />
              <span className="text-xs text-black text-center">Добавить фото</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <label className="text-xs text-gray-400 mb-2 block">Категории работ</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat, idx) => (
              <div
                key={cat.id || idx}
                className="bg-black px-3 py-1 rounded-full flex items-center"
              >
                <span className="text-white text-sm mr-2">{cat.action}</span>
                <button
                  onClick={() => setCategories(categories.filter((_, i) => i !== idx))}
                  className="hover:bg-gray-700 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setCategoryModalVisible(true)}
            className="flex items-center bg-black px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4 text-white mr-2" />
            <span className="text-white font-medium">Добавить категорию</span>
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
        >
          Сохранить изменения
        </button>

        {/* Category Modal */}
        {categoryModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-6">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-semibold text-center">Выберите категорию</h3>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Поиск..."
                  className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div className="max-h-48 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {filteredCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        if (!categories.some((c) => c.id === cat.id)) {
                          setCategories([...categories, cat]);
                        }
                      }}
                      className="bg-black text-white px-3 py-1 rounded-full text-sm hover:bg-gray-800 transition-colors"
                    >
                      {cat.action}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCategoryModalVisible(false)}
                className="w-full bg-gray-200 text-black py-2 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditContractorProfileScreen;