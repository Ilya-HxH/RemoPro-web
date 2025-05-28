import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { BACKEND_URL } from '../../utils/config';

const ContractorProjectsScreen = () => {
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  
  const [activeTab, setActiveTab] = useState('active');
  const [projects, setProjects] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, requestsRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/project-contractor/get/my/approved`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${BACKEND_URL}/api/project-contractor/get/my/action`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        const projectsData = await projectsRes.json();
        const requestsData = await requestsRes.json();

        // Remove duplicates
        const uniqueProjects = [];
        const seen = new Set();
        for (const project of projectsData) {
          if (!seen.has(project.projectId)) {
            uniqueProjects.push(project);
            seen.add(project.projectId);
          }
        }

        const uniqueRequests = [];
        const seenRequests = new Set();
        for (const request of requestsData) {
          if (!seenRequests.has(request.projectId)) {
            uniqueRequests.push(request);
            seenRequests.add(request.projectId);
          }
        }

        setProjects(uniqueProjects);
        setRequests(uniqueRequests);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const ProjectCard = ({ project, type = 'project' }) => {
    const tags = project.projectTags || [];
    const imageUrl = project.projectFirstImg ? `${BACKEND_URL}${project.projectFirstImg}` : null;

    return (
      <div
        className="bg-yellow-50 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => navigate(`/contractor/project/${project.projectId}`)}
      >
        <div className="flex space-x-4">
          {/* Project Image */}
          <div className="flex-shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={project.projectTitle}
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
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs text-gray-500">
                  {new Date(project.createdAt || Date.now()).toLocaleDateString('ru-RU')}
                </p>
                <h3 className="font-medium text-black text-base mb-1 line-clamp-2">
                  {project.projectTitle}
                </h3>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {project.projectDescription || 'Нет описания'}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-yellow-200 px-2 py-1 rounded-full text-xs text-black"
                >
                  {tag.categoryName || 'Демонтаж'}
                </span>
              ))}
              {tags.length === 0 && (
                <>
                  <span className="bg-yellow-200 px-2 py-1 rounded-full text-xs text-black">Демонтаж</span>
                  <span className="bg-yellow-200 px-2 py-1 rounded-full text-xs text-black">Отделка</span>
                  <span className="bg-yellow-200 px-2 py-1 rounded-full text-xs text-black">Дизайн интерьера</span>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{project.views || Math.floor(Math.random() * 100)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{project.comments || Math.floor(Math.random() * 10)}</span>
              </div>
              {type === 'request' && (
                <div className="ml-auto">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    <Clock className="w-3 h-3 mr-1" />
                    Ожидает
                  </span>
                </div>
              )}
              {type === 'project' && (
                <div className="ml-auto">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    В работе
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
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
      <h1 className="text-2xl font-bold text-black">Ваши проекты</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'active'
              ? 'text-black border-b-2 border-yellow-400'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Активные
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'requests'
              ? 'text-black border-b-2 border-yellow-400'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Заявки
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'active' ? (
          <>
            <h2 className="text-base font-medium text-black">Активные проекты</h2>
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">У вас пока нет активных проектов</p>
                <button
                  onClick={() => navigate('/orders')}
                  className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Найти проекты
                </button>
              </div>
            ) : (
              projects.map((project) => (
                <ProjectCard key={project.projectId} project={project} type="project" />
              ))
            )}
          </>
        ) : (
          <>
            <h2 className="text-base font-medium text-black">Заявки</h2>
            {requests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">У вас пока нет заявок</p>
                <button
                  onClick={() => navigate('/orders')}
                  className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Найти проекты
                </button>
              </div>
            ) : (
              requests.map((request) => (
                <ProjectCard key={request.projectId} project={request} type="request" />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContractorProjectsScreen;