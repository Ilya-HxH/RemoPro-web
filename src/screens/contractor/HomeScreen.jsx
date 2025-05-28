import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, MessageCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { BACKEND_URL } from '../../utils/config';

const ContractorHomeScreen = () => {
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  
  const [myProjects, setMyProjects] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, recsRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/project-contractor/get/my/approved`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${BACKEND_URL}/api/contractor/project/find`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const projectsData = await projectsRes.json();
        const recsData = await recsRes.json();

        // Убираем дубли по projectId
        const uniqueProjects = [];
        const seen = new Set();
        for (const project of projectsData) {
          if (!seen.has(project.projectId)) {
            uniqueProjects.push(project);
            seen.add(project.projectId);
          }
        }

        setMyProjects(uniqueProjects);
        setRecommendations(recsData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Ваши проекты */}
      <section>
        <h2 className="text-lg font-medium text-black mb-4">Ваши проекты</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {myProjects.slice(0, 6).map((project) => (
            <div 
              key={project.projectId}
              className="flex-shrink-0 w-24 h-24 relative cursor-pointer"
              onClick={() => navigate(`/contractor/project/${project.projectId}`)}
            >
              <img
                src={`${BACKEND_URL}${project.projectFirstImg}`}
                alt={project.projectTitle}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5 rounded-b-lg">
                <p className="text-white text-xs font-medium truncate">
                  {project.projectTitle}
                </p>
              </div>
            </div>
          ))}
          <button
            onClick={() => navigate('/contractor/projects')}
            className="flex-shrink-0 w-24 h-24 border-2 border-dashed border-black rounded-lg flex flex-col items-center justify-center text-black hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-xs text-center">Посмотреть заявки</span>
          </button>
        </div>
      </section>

      {/* Рекомендации */}
      <section>
        <h2 className="text-lg font-medium text-black mb-4">Рекомендации</h2>
        <div className="grid gap-4">
          {recommendations.map((project) => {
            const firstImage = project.sourceImg?.find((img) => img.type === 'SOURCE')?.imageUrl;
            const imageUrl = firstImage ? `${BACKEND_URL}${firstImage}` : null;
            const tags = project.projectTags || [];

            return (
              <div
                key={project.id}
                className="bg-yellow-50 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/contractor/project/${project.id}`)}
              >
                <div className="flex space-x-4 mb-4">
                  {/* Project Image */}
                  <div className="flex-shrink-0">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Нет фото</span>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-black text-base mb-1 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                      {project.description || 'Нет описания'}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-yellow-200 px-2 py-1 rounded-full text-xs text-black"
                        >
                          {tag.category?.action}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="flex items-center space-x-4 pt-3 border-t border-gray-200">
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
            );
          })}
        </div>

        {recommendations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Пока нет подходящих проектов</p>
            <button
              onClick={() => navigate('/orders')}
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Просмотреть каталог
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ContractorHomeScreen;