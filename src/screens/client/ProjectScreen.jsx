// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Plus, MoreHorizontal, Eye, MessageCircle } from 'lucide-react';
// import { useAuthStore } from '../../store/authStore';
// import { BACKEND_URL } from '../../utils/config';

// const ProjectScreen = () => {
//   const navigate = useNavigate();
//   const token = useAuthStore(state => state.token);
  
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeProject, setActiveProject] = useState(null);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch(`${BACKEND_URL}/api/project/all`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();
//         setProjects(data);
//       } catch (error) {
//         console.error('Ошибка загрузки проектов:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, [token]);

//   const handleProjectAction = (action, projectId) => {
//     if (action === 'edit') {
//       alert(`Редактировать проект ${projectId}`);
//     } else if (action === 'delete') {
//       alert(`Удалить проект ${projectId}`);
//     }
//     setActiveProject(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header with create button */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-black">Проекты и заявки</h1>
//         <button
//           onClick={() => navigate('/project/create')}
//           className="bg-yellow-300 border border-black px-6 py-3 rounded-xl text-black font-medium hover:bg-yellow-400 transition-colors inline-flex items-center space-x-2"
//         >
//           <Plus className="w-5 h-5" />
//           <span>Создать проект с <strong>RemoAI</strong></span>
//         </button>
//       </div>

//       {/* Projects Grid */}
//       <div className="grid gap-4">
//         {projects.map((project) => (
//           <div
//             key={project.id}
//             className="bg-yellow-50 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer relative"
//             onClick={() => navigate(`/project/${project.id}`)}
//           >
//             <div className="flex space-x-4">
//               {/* Project Image */}
//               <div className="flex-shrink-0">
//                 <img
//                   src={`${BACKEND_URL}${project.sourceImg}`}
//                   alt={project.title}
//                   className="w-20 h-20 object-cover rounded-lg"
//                 />
//               </div>

//               {/* Project Info */}
//               <div className="flex-1 min-w-0">
//                 <h3 className="font-medium text-black text-base mb-1 line-clamp-2">
//                   {project.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm line-clamp-3 mb-3">
//                   {project.description}
//                 </p>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2">
//                   {project.tags?.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="bg-yellow-200 px-2 py-1 rounded-full text-xs text-black"
//                     >
//                       {tag.category?.action}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Actions Menu */}
//               <div className="flex-shrink-0 relative">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setActiveProject(activeProject === project.id ? null : project.id);
//                   }}
//                   className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
//                 >
//                   <MoreHorizontal className="w-5 h-5 text-gray-600" />
//                 </button>

//                 {activeProject === project.id && (
//                   <div className="absolute right-0 top-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg py-2 z-10 w-44">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleProjectAction('edit', project.id);
//                       }}
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Редактировать
//                     </button>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleProjectAction('delete', project.id);
//                       }}
//                       className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                     >
//                       Удалить
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Project Stats */}
//             <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-gray-200">
//               <div className="flex items-center space-x-1 text-gray-600">
//                 <Eye className="w-4 h-4" />
//                 <span className="text-sm">{project.views || 0}</span>
//               </div>
//               <div className="flex items-center space-x-1 text-gray-600">
//                 <MessageCircle className="w-4 h-4" />
//                 <span className="text-sm">{project.comments || 0}</span>
//               </div>
//               <div className="ml-auto text-sm text-gray-500">
//                 {new Date(project.createdAt).toLocaleDateString('ru-RU')}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {projects.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 mb-4">У вас пока нет проектов</p>
//           <button
//             onClick={() => navigate('/project/create')}
//             className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
//           >
//             Создать первый проект
//           </button>
//         </div>
//       )}

//       {/* Click outside to close dropdown */}
//       {activeProject && (
//         <div
//           className="fixed inset-0 z-0"
//           onClick={() => setActiveProject(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default ProjectScreen;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MoreHorizontal, Eye, MessageCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { BACKEND_URL } from '../../utils/config';

const ProjectScreen = () => {
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(null);

  // Mock data
  const mockProjects = [
    {
      id: 1,
      title: "Ремонт кухни в двухкомнатной квартире",
      description: "Требуется полный ремонт кухни площадью 12 кв.м. Включает в себя замену плитки, покраску стен, установку новой сантехники и электропроводки.",
      sourceImg: "/api/placeholder/100/100",
      tags: [
        { category: { action: "Демонтаж" } },
        { category: { action: "Отделка" } },
        { category: { action: "Сантехника" } },
        { category: { action: "Электрика" } }
      ],
      views: 127,
      comments: 8,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Ремонт ванной комнаты",
      description: "Полная реконструкция ванной комнаты площадью 6 кв.м. Замена сантехники, плитки, установка душевой кабины.",
      sourceImg: "/api/placeholder/100/100",
      tags: [
        { category: { action: "Демонтаж" } },
        { category: { action: "Сантехника" } },
        { category: { action: "Плитка" } }
      ],
      views: 89,
      comments: 5,
      createdAt: new Date(Date.now() - 86400000).toISOString() // 1 день назад
    },
    {
      id: 3,
      title: "Ремонт гостиной",
      description: "Косметический ремонт гостиной комнаты 25 кв.м. Покраска стен, замена напольного покрытия, установка освещения.",
      sourceImg: "/api/placeholder/100/100",
      tags: [
        { category: { action: "Отделка" } },
        { category: { action: "Покраска" } },
        { category: { action: "Электрика" } }
      ],
      views: 156,
      comments: 12,
      createdAt: new Date(Date.now() - 172800000).toISOString() // 2 дня назад
    }
  ];

  useEffect(() => {
    // ОТКЛЮЧЕНО ДЛЯ ТЕСТИРОВАНИЯ - закомментированный код ниже
    /*
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/project/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Ошибка загрузки проектов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    */

    // ВРЕМЕННАЯ ЛОГИКА ДЛЯ ТЕСТИРОВАНИЯ
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, [token]);

  const handleProjectAction = (action, projectId) => {
    if (action === 'edit') {
      alert(`Редактировать проект ${projectId}`);
    } else if (action === 'delete') {
      if (window.confirm('Вы уверены, что хотите удалить этот проект?')) {
        setProjects(prev => prev.filter(p => p.id !== projectId));
        alert(`Проект ${projectId} удален`);
      }
    }
    setActiveProject(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with create button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Проекты и заявки</h1>
        <button
          onClick={() => navigate('/project/create/step1')}
          className="bg-yellow-300 border border-black px-6 py-3 rounded-xl text-black font-medium hover:bg-yellow-400 transition-colors inline-flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Создать проект с <strong>RemoAI</strong></span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-yellow-50 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer relative"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <div className="flex space-x-4">
              {/* Project Image */}
              <div className="flex-shrink-0">
                <img
                  src={project.sourceImg}
                  alt={project.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>

              {/* Project Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-black text-base mb-1 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-yellow-200 px-2 py-1 rounded-full text-xs text-black"
                    >
                      {tag.category?.action}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Menu */}
              <div className="flex-shrink-0 relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProject(activeProject === project.id ? null : project.id);
                  }}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>

                {activeProject === project.id && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg py-2 z-10 w-44">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectAction('edit', project.id);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectAction('delete', project.id);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Удалить
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Project Stats */}
            <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-1 text-gray-600">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{project.views || 0}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{project.comments || 0}</span>
              </div>
              <div className="ml-auto text-sm text-gray-500">
                {new Date(project.createdAt).toLocaleDateString('ru-RU')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">У вас пока нет проектов</p>
          <button
            onClick={() => navigate('/project/create/step1')}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            Создать первый проект
          </button>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {activeProject && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setActiveProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectScreen;