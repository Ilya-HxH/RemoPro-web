// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Eye, MessageCircle, Send, ChevronLeft, ChevronRight } from 'lucide-react';
// import { useAuthStore } from '../../store/authStore';
// import { BACKEND_URL } from '../../utils/config';

// const ProjectDetailScreen = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = useAuthStore(state => state.token);
  
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [activeSection, setActiveSection] = useState(null);
//   const [showContractors, setShowContractors] = useState({});

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const response = await fetch(`${BACKEND_URL}/api/project/${id}`);
//         const data = await response.json();
//         setProject(data);
//       } catch (error) {
//         console.error('Ошибка загрузки проекта:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProject();
//   }, [id]);

//   const handleCategoryClick = (categoryId) => {
//     setActiveSection(activeSection === categoryId ? null : categoryId);
//     if (!showContractors[categoryId]) {
//       // Здесь можно загрузить подрядчиков для конкретной категории
//       setShowContractors(prev => ({ ...prev, [categoryId]: true }));
//     }
//   };

//   const sendRequest = async (contractorId, categoryId) => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/project-contractor/invite`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           projectId: categoryId,
//           contractorId: contractorId,
//         }),
//       });

//       if (response.ok) {
//         alert('Заявка успешно отправлена!');
//       } else {
//         alert('Ошибка при отправке заявки');
//       }
//     } catch (error) {
//       console.error('Ошибка отправки заявки:', error);
//       alert('Ошибка сети при отправке заявки');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
//       </div>
//     );
//   }

//   if (!project) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-500">Проект не найден</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-8">
//       {/* Project Header */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <div className="mb-4">
//           <h3 className="text-sm text-gray-500 mb-1">Суть работы:</h3>
//           <h1 className="text-xl font-semibold text-black mb-4">{project.title}</h1>
//           <p className="text-gray-700 leading-relaxed">{project.description}</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Current Object Photos */}
//           <div>
//             <h3 className="text-sm text-gray-500 mb-3">Объект ремонта сейчас</h3>
//             <div className="relative">
//               {project.sourceImg && project.sourceImg.length > 0 && (
//                 <>
//                   <img
//                     src={`${BACKEND_URL}${project.sourceImg[activeImageIndex]}`}
//                     alt="Текущее состояние"
//                     className="w-full h-64 object-cover rounded-lg"
//                   />
//                   <div className="flex space-x-2 mt-2">
//                     {project.sourceImg.map((img, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setActiveImageIndex(index)}
//                         className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
//                           activeImageIndex === index ? 'border-yellow-400' : 'border-gray-200'
//                         }`}
//                       >
//                         <img
//                           src={`${BACKEND_URL}${img}`}
//                           alt={`Фото ${index + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Categories and Tools */}
//           <div>
//             <h3 className="text-sm text-gray-500 mb-3">Категории работ</h3>
//             <div className="space-y-3">
//               {project.tags?.map((tag) => (
//                 <div key={tag.id} className="bg-gray-50 rounded-lg p-3">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <span className="font-medium text-black">{tag.category?.action}</span>
//                   </div>
//                   <div className="flex flex-wrap gap-1 mb-2">
//                     <span className="text-xs bg-gray-200 px-2 py-1 rounded">Демонтаж</span>
//                     <span className="text-xs bg-gray-200 px-2 py-1 rounded">Отделка</span>
//                     <span className="text-xs bg-gray-200 px-2 py-1 rounded">Дизайн интерьера</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Materials/Tools Section */}
//             <div className="mt-6">
//               <h4 className="text-sm text-gray-500 mb-2">Товары:</h4>
//               <div className="space-y-2">
//                 <div className="text-sm text-gray-600">Плинтуса</div>
//                 <div className="text-sm text-gray-600">Шпаклёвка</div>
//                 <div className="text-sm text-gray-600">Штукатурка</div>
//                 <div className="text-sm text-gray-600">Линолеум</div>
//                 <p className="text-xs text-gray-400">Выбрано позиций: 7</p>
//               </div>

//               <div className="mt-4">
//                 <div className="text-sm text-gray-600 space-y-1">
//                   <div>Диван</div>
//                   <div>Кресло</div>
//                   <div>Стол</div>
//                   <div>Комод</div>
//                 </div>
//                 <p className="text-xs text-gray-400 mt-1">Выбрано позиций: 7</p>
//               </div>

//               <div className="mt-4">
//                 <h5 className="text-sm text-gray-500 mb-2">Исполнители:</h5>
//                 <div className="space-y-2">
//                   <div className="text-sm text-gray-600">Отделка</div>
//                   <div className="text-sm text-gray-600">Дизайн</div>
//                   <div className="text-sm text-gray-600">Сборка мебели</div>
//                   <div className="text-sm text-gray-600">Покраска</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Reference Photos */}
//         <div className="mt-8">
//           <h3 className="text-sm text-gray-500 mb-3">Примеры желаемого объекта</h3>
//           <div className="relative">
//             {project.refImg && project.refImg.length > 0 && (
//               <>
//                 <img
//                   src={`${BACKEND_URL}${project.refImg[0]}`}
//                   alt="Желаемый результат"
//                   className="w-full h-64 object-cover rounded-lg"
//                 />
//                 <div className="flex space-x-2 mt-2">
//                   {project.refImg.map((img, index) => (
//                     <div key={index} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
//                       <img
//                         src={`${BACKEND_URL}${img}`}
//                         alt={`Референс ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Project Description */}
//         <div className="mt-8">
//           <h3 className="text-sm text-gray-500 mb-2">Описание работы</h3>
//           <p className="text-gray-700 leading-relaxed">
//             {project.description}
//           </p>
//         </div>

//         {/* Project Stats */}
//         <div className="flex items-center space-x-6 mt-6 pt-4 border-t border-gray-200">
//           <div className="flex items-center space-x-1 text-gray-600">
//             <Eye className="w-4 h-4" />
//             <span className="text-sm">{project.views || 0}</span>
//           </div>
//           <div className="flex items-center space-x-1 text-gray-600">
//             <MessageCircle className="w-4 h-4" />
//             <span className="text-sm">{project.comments || 0}</span>
//           </div>
//           <div className="ml-auto">
//             <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
//               <Send className="w-4 h-4" />
//               <span>Принять заявку</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetailScreen;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, MessageCircle, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { BACKEND_URL } from '../../utils/config';

const ProjectDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const [showContractors, setShowContractors] = useState({});

  // Mock data
  const mockProject = {
    id: parseInt(id) || 1,
    title: "Ремонт кухни в двухкомнатной квартире",
    description: "Требуется полный ремонт кухни площадью 12 кв.м. Включает в себя замену плитки, покраску стен, установку новой сантехники и электропроводки. Важно сделать качественно и в срок.",
    sourceImg: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300"
    ],
    refImg: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300"
    ],
    tags: [
      {
        id: 1,
        category: { id: 1, action: "Демонтаж" }
      },
      {
        id: 2,
        category: { id: 2, action: "Отделка" }
      },
      {
        id: 3,
        category: { id: 3, action: "Сантехника" }
      },
      {
        id: 4,
        category: { id: 4, action: "Электрика" }
      }
    ],
    views: 127,
    comments: 8
  };

  useEffect(() => {
    // ОТКЛЮЧЕНО ДЛЯ ТЕСТИРОВАНИЯ - закомментированный код ниже
    /*
    const fetchProject = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/project/${id}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Ошибка загрузки проекта:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
    */

    // ВРЕМЕННАЯ ЛОГИКА ДЛЯ ТЕСТИРОВАНИЯ
    setTimeout(() => {
      setProject(mockProject);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleCategoryClick = (categoryId) => {
    setActiveSection(activeSection === categoryId ? null : categoryId);
    if (!showContractors[categoryId]) {
      setShowContractors(prev => ({ ...prev, [categoryId]: true }));
    }
  };

  const sendRequest = async (contractorId, categoryId) => {
    // ОТКЛЮЧЕНО ДЛЯ ТЕСТИРОВАНИЯ - закомментированный код ниже
    /*
    try {
      const response = await fetch(`${BACKEND_URL}/api/project-contractor/invite`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: categoryId,
          contractorId: contractorId,
        }),
      });

      if (response.ok) {
        alert('Заявка успешно отправлена!');
      } else {
        alert('Ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      alert('Ошибка сети при отправке заявки');
    }
    */

    // ВРЕМЕННАЯ ЛОГИКА ДЛЯ ТЕСТИРОВАНИЯ
    setTimeout(() => {
      alert('Заявка успешно отправлена!');
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Проект не найден</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Project Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-sm text-gray-500 mb-1">Суть работы:</h3>
          <h1 className="text-xl font-semibold text-black mb-4">{project.title}</h1>
          <p className="text-gray-700 leading-relaxed">{project.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Object Photos */}
          <div>
            <h3 className="text-sm text-gray-500 mb-3">Объект ремонта сейчас</h3>
            <div className="relative">
              {project.sourceImg && project.sourceImg.length > 0 && (
                <>
                  <img
                    src={project.sourceImg[activeImageIndex]}
                    alt="Текущее состояние"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="flex space-x-2 mt-2">
                    {project.sourceImg.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          activeImageIndex === index ? 'border-yellow-400' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Фото ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Categories and Tools */}
          <div>
            <h3 className="text-sm text-gray-500 mb-3">Категории работ</h3>
            <div className="space-y-3">
              {project.tags?.map((tag) => (
                <div key={tag.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-black">{tag.category?.action}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">Демонтаж</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">Отделка</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">Дизайн интерьера</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Materials/Tools Section */}
            <div className="mt-6">
              <h4 className="text-sm text-gray-500 mb-2">Товары:</h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Плинтуса</div>
                <div className="text-sm text-gray-600">Шпаклёвка</div>
                <div className="text-sm text-gray-600">Штукатурка</div>
                <div className="text-sm text-gray-600">Линолеум</div>
                <p className="text-xs text-gray-400">Выбрано позиций: 7</p>
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Диван</div>
                  <div>Кресло</div>
                  <div>Стол</div>
                  <div>Комод</div>
                </div>
                <p className="text-xs text-gray-400 mt-1">Выбрано позиций: 7</p>
              </div>

              <div className="mt-4">
                <h5 className="text-sm text-gray-500 mb-2">Исполнители:</h5>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Отделка</div>
                  <div className="text-sm text-gray-600">Дизайн</div>
                  <div className="text-sm text-gray-600">Сборка мебели</div>
                  <div className="text-sm text-gray-600">Покраска</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Photos */}
        <div className="mt-8">
          <h3 className="text-sm text-gray-500 mb-3">Примеры желаемого объекта</h3>
          <div className="relative">
            {project.refImg && project.refImg.length > 0 && (
              <>
                <img
                  src={project.refImg[0]}
                  alt="Желаемый результат"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="flex space-x-2 mt-2">
                  {project.refImg.map((img, index) => (
                    <div key={index} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={img}
                        alt={`Референс ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Project Description */}
        <div className="mt-8">
          <h3 className="text-sm text-gray-500 mb-2">Описание работы</h3>
          <p className="text-gray-700 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Project Stats */}
        <div className="flex items-center space-x-6 mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-1 text-gray-600">
            <Eye className="w-4 h-4" />
            <span className="text-sm">{project.views || 0}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{project.comments || 0}</span>
          </div>
          <div className="ml-auto">
            <button 
              onClick={() => alert('Функция будет реализована')}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Принять заявку</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailScreen;