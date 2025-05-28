import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X } from 'lucide-react';
import { BACKEND_URL } from '../../../utils/config';
import { useAuthStore } from '../../../store/authStore';

const CreateProjectStep2Screen = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoryData, setCategoryData] = useState(null);
  const [categoryDescriptions, setCategoryDescriptions] = useState({});
  const [categoryMaterials, setCategoryMaterials] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [materialSearch, setMaterialSearch] = useState('');

  useEffect(() => {
    // Получаем данные из предыдущего шага
    const data = sessionStorage.getItem('projectStep1Data');
    if (!data) {
      navigate('/create-project-step1');
      return;
    }
    setProjectData(JSON.parse(data));
  }, [navigate]);

  const currentCategoryId = projectData?.selectedCategoryIds[currentIndex];

  useEffect(() => {
    if (!currentCategoryId) return;
    
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/work-category/${currentCategoryId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCategoryData(data);
      } catch (err) {
        console.error('Ошибка загрузки категории:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [currentCategoryId, token]);

  const handleMaterialToggle = (materialId) => {
    setCategoryMaterials((prev) => {
      const current = prev[currentCategoryId] || [];
      return {
        ...prev,
        [currentCategoryId]: current.includes(materialId)
          ? current.filter((id) => id !== materialId)
          : [...current, materialId],
      };
    });
  };

  const handleNext = () => {
    if (currentIndex < projectData.selectedCategoryIds.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Подготовка материалов: сохранить текст, а не только ID
      const preparedMaterials = {};
      
      projectData.selectedCategoryIds.forEach((categoryId) => {
        const materialsForCategory = categoryMaterials[categoryId] || [];
        const materialsTextArray = materialsForCategory.map((materialId) => {
          const mat = categoryData?.materials?.find((m) => m.id === materialId);
          return mat ? mat.material : `Материал ID: ${materialId}`;
        });
        preparedMaterials[categoryId] = materialsTextArray;
      });
      
      const finalData = {
        ...projectData,
        categoryDescriptions,
        categoryMaterials: preparedMaterials,
      };
      
      sessionStorage.setItem('projectStep2Data', JSON.stringify(finalData));
      navigate('/create-project-step3');
    }
  };

  const filteredMaterials = materialSearch.trim()
    ? (categoryData?.materials || []).filter((mat) =>
        mat.material.toLowerCase().includes(materialSearch.toLowerCase())
      )
    : (categoryData?.materials || []).slice(0, 12);

  if (!projectData) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (loading || !categoryData) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header section */}
      <div className="bg-yellow-300 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/create-project-step1')}
            className="flex items-center space-x-2 mb-6 text-black hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Назад</span>
          </button>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Детализация работ</h1>
              <p className="text-gray-700">
                Шаг {currentIndex + 1} из {projectData.selectedCategoryIds.length}: {categoryData.action}
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="flex space-x-2">
              {projectData.selectedCategoryIds.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex
                      ? 'bg-black'
                      : index < currentIndex
                      ? 'bg-gray-600'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold mb-6">{categoryData.action}</h2>
            
            <div className="space-y-8">
              {/* Description */}
              <div>
                <label className="text-lg font-semibold text-black mb-3 block">
                  Описание работ
                </label>
                <textarea
                  value={categoryDescriptions[currentCategoryId] || ''}
                  onChange={(e) =>
                    setCategoryDescriptions((prev) => ({ 
                      ...prev, 
                      [currentCategoryId]: e.target.value 
                    }))
                  }
                  placeholder="Опишите детально, что нужно сделать по этой категории работ"
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl min-h-[120px] resize-y"
                />
              </div>

              {/* Materials */}
              {categoryData.has_material && (
                <div>
                  <label className="text-lg font-semibold text-black mb-3 block">
                    Материалы
                  </label>
                  
                  {/* Selected materials */}
                  {(categoryMaterials[currentCategoryId] || []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(categoryMaterials[currentCategoryId] || []).map((matId) => {
                        const mat = categoryData.materials.find((m) => m.id === matId);
                        return (
                          <div key={matId} className="bg-black text-white px-3 py-1 rounded-full flex items-center space-x-2">
                            <span className="text-sm">{mat?.material}</span>
                            <button onClick={() => handleMaterialToggle(matId)}>
                              <X size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <button
                    onClick={() => setModalVisible(true)}
                    className="w-full border-2 border-dashed border-gray-300 py-4 px-6 rounded-xl hover:border-gray-400 transition-colors"
                  >
                    <span className="text-gray-600">Выбрать материалы</span>
                  </button>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="px-6 py-3 border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Предыдущий
              </button>
              
              <button
                onClick={handleNext}
                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                {currentIndex === projectData.selectedCategoryIds.length - 1 ? 'Завершить' : 'Следующий'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-6 z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl p-6 max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Выберите материалы</h3>
              <button onClick={() => setModalVisible(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="relative mb-6">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={materialSearch}
                onChange={(e) => setMaterialSearch(e.target.value)}
                placeholder="Поиск материала..."
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
              {filteredMaterials.map((mat) => {
                const selected = categoryMaterials[currentCategoryId]?.includes(mat.id);
                return (
                  <button
                    key={mat.id}
                    onClick={() => handleMaterialToggle(mat.id)}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      selected 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black border-gray-300 hover:border-gray-400 hover:shadow-sm'
                    }`}
                  >
                    {mat.material}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t">
              <button
                onClick={() => setModalVisible(false)}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
              >
                Готово
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProjectStep2Screen;