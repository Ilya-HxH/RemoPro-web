import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Search } from 'lucide-react';
import { BACKEND_URL } from '../../../utils/config';
import { useAuthStore } from '../../../store/authStore';
import ClientHeader from '../../../components/ClientHeader';

const CreateProjectStep1Screen = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sourceImages, setSourceImages] = useState([]);
  const [refImages, setRefImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/work-category/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Ошибка загрузки категорий', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  const pickImage = async (setter) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = false;

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const imageObject = {
        uri: URL.createObjectURL(file),
        file: file,
        fileName: file.name,
      };

      setter((prev) => [...prev, imageObject]);
    };

    input.click();
  };

  const removeImage = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleCategory = (id) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (!title || !description || selectedCategoryIds.length === 0) {
      alert('Заполните все поля и выберите категории');
      return;
    }

    // Переход на следующий шаг с передачей данных через sessionStorage
    const projectData = {
      title,
      description,
      sourceImages,
      refImages,
      selectedCategoryIds,
    };
    
    sessionStorage.setItem('projectStep1Data', JSON.stringify(projectData));
    navigate('/create-project-step2');
  };

  const filteredCategories = searchCategory.trim()
    ? categories.filter((cat) =>
        cat.action.toLowerCase().includes(searchCategory.toLowerCase())
      )
    : categories.slice(0, 8);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      

      <div className="px-4 pt-6 pb-24 space-y-6">
        <h1 className="text-2xl font-bold">Новый проект</h1>

        {/* Project title */}
        <div>
          <label className="text-base text-black mb-1 block">Название проекта</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            placeholder="Введите название"
          />
        </div>

        {/* Project description */}
        <div>
          <label className="text-base text-black mb-1 block">Описание проекта</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg min-h-[100px] resize-y"
            placeholder="Опишите суть проекта"
          />
        </div>

        {/* Source images */}
        <div>
          <label className="text-base text-black mb-2 block">Фотографии объекта</label>
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {sourceImages.map((img, i) => (
              <div key={i} className="relative flex-shrink-0">
                <img src={img.uri} alt="Source" className="w-24 h-24 rounded-md object-cover" />
                <button
                  onClick={() => removeImage(setSourceImages, i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <button
              onClick={() => pickImage(setSourceImages)}
              className="w-24 h-24 border-2 border-black border-dashed flex flex-col justify-center items-center rounded-md flex-shrink-0"
            >
              <Plus size={24} color="black" />
              <span className="text-xs mt-1">Добавить</span>
            </button>
          </div>
        </div>

        {/* Reference images */}
        <div>
          <label className="text-base text-black mb-2 block">Фото референса</label>
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {refImages.map((img, i) => (
              <div key={i} className="relative flex-shrink-0">
                <img src={img.uri} alt="Reference" className="w-24 h-24 rounded-md object-cover" />
                <button
                  onClick={() => removeImage(setRefImages, i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <button
              onClick={() => pickImage(setRefImages)}
              className="w-24 h-24 border-2 border-black border-dashed flex flex-col justify-center items-center rounded-md flex-shrink-0"
            >
              <Plus size={24} color="black" />
              <span className="text-xs mt-1">Добавить</span>
            </button>
          </div>
        </div>

        {/* Selected categories */}
        <div>
          <label className="text-base text-black mb-2 block">Выбранные категории</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCategoryIds.map((id) => {
              const cat = categories.find((c) => c.id === id);
              return (
                <div key={id} className="bg-black px-3 py-1 rounded-full flex items-center">
                  <span className="text-white text-xs mr-1">{cat?.action}</span>
                  <button onClick={() => toggleCategory(id)}>
                    <X size={14} color="white" />
                  </button>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setModalVisible(true)}
            className="w-full border border-black py-2 px-4 rounded-xl"
          >
            <span className="text-sm font-medium">Добавить категории работ</span>
          </button>
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold text-base"
        >
          Далее
        </button>

        {/* Categories modal */}
        {modalVisible && (
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center px-6 z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-4 space-y-4 max-h-[80vh] overflow-hidden">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Категории работ</h3>
                <button onClick={() => setModalVisible(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  placeholder="Поиск категории..."
                  className="w-full border border-gray-300 rounded-full pl-10 pr-3 py-2 text-base"
                />
              </div>

              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {filteredCategories.map((cat) => {
                  const selected = selectedCategoryIds.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`px-3 py-1 rounded-full border text-sm ${
                        selected ? 'bg-black text-white' : 'bg-white text-black'
                      }`}
                    >
                      {cat.action}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProjectStep1Screen;