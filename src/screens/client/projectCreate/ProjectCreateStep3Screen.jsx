import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { BACKEND_URL } from '../../../utils/config';
import { useAuthStore } from '../../../store/authStore';

const CreateProjectStep3Screen = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Получаем данные из предыдущих шагов
    const step2Data = sessionStorage.getItem('projectStep2Data');
    if (!step2Data) {
      navigate('/create-project-step1');
      return;
    }
    setProjectData(JSON.parse(step2Data));
  }, [navigate]);

  const handleSubmit = async () => {
    if (!projectData) return;

    setSubmitting(true);

    try {
      const formData = new FormData();
      
      // Основная информация
      formData.append('title', projectData.title);
      formData.append('description', projectData.description);
      
      // Изображения
      projectData.sourceImages.forEach((img, index) => {
        formData.append('sourceImg', img.file);
      });
      
      projectData.refImages.forEach((img, index) => {
        formData.append('refImg', img.file);
      });
      
      // Теги проекта
      const projectTagsJson = projectData.selectedCategoryIds.map((id) => ({
        categoryId: id,
        categoryDescription: projectData.categoryDescriptions[id] || '',
        selectedMaterialIds: [], // Пока пустой массив, так как нет материалов по ID
      }));
      
      formData.append('projectTagsJson', JSON.stringify(projectTagsJson));

      const response = await fetch(`${BACKEND_URL}/api/project/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Произошла ошибка при создании проекта');
      }

      // Очищаем sessionStorage
      sessionStorage.removeItem('projectStep1Data');
      sessionStorage.removeItem('projectStep2Data');
      
      alert('Проект успешно создан!');
      navigate('/projects');
    } catch (err) {
      console.error('Ошибка создания проекта:', err);
      alert('Ошибка при создании проекта: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!projectData) {
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
            onClick={() => navigate('/create-project-step2')}
            className="flex items-center space-x-2 mb-6 text-black hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Назад</span>
          </button>
          
          <h1 className="text-3xl font-bold mb-2">Проверка и создание проекта</h1>
          <p className="text-gray-700">Шаг 3 из 3: Финальная проверка</p>
        </div>
      </div>

      {/* Review content */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold mb-8">Проверьте информацию о проекте</h2>
            
            <div className="space-y-8">
              {/* Basic info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Основная информация</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <span className="text-sm text-gray-500">Название проекта</span>
                    <p className="text-lg font-medium">{projectData.title}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Описание</span>
                    <p className="text-gray-700">{projectData.description}</p>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Изображения</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Source images */}
                  <div>
                    <span className="text-sm text-gray-500 block mb-3">Фото объекта сейчас</span>
                    <div className="grid grid-cols-3 gap-2">
                      {projectData.sourceImages.map((img, i) => (
                        <img 
                          key={i} 
                          src={img.uri} 
                          alt="Source" 
                          className="w-full h-20 object-cover rounded-lg" 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Reference images */}
                  <div>
                    <span className="text-sm text-gray-500 block mb-3">Примеры желаемого результата</span>
                    <div className="grid grid-cols-3 gap-2">
                      {projectData.refImages.map((img, i) => (
                        <img 
                          key={i} 
                          src={img.uri} 
                          alt="Reference" 
                          className="w-full h-20 object-cover rounded-lg" 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories and work details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Категории работ</h3>
                <div className="space-y-4">
                  {projectData.selectedCategoryIds.map((categoryId, index) => (
                    <div key={categoryId} className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-2">Категория {index + 1}</h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-500">Описание работ</span>
                          <p className="text-gray-700">
                            {projectData.categoryDescriptions[categoryId] || 'Без описания'}
                          </p>
                        </div>
                        
                        {projectData.categoryMaterials[categoryId]?.length > 0 && (
                          <div>
                            <span className="text-sm text-gray-500 block mb-2">Материалы</span>
                            <div className="flex flex-wrap gap-2">
                              {projectData.categoryMaterials[categoryId].map((materialText, idx) => (
                                <span 
                                  key={idx} 
                                  className="bg-yellow-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                                >
                                  {materialText}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="mt-12 pt-8 border-t text-center">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-black text-white px-12 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Создание проекта...</span>
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    <span>Создать проект</span>
                  </>
                )}
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                После создания проект будет опубликован и исполнители смогут оставлять заявки
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectStep3Screen;