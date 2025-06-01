import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Star, MapPin, Heart } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { BACKEND_URL } from '../../utils/config';

const HomeScreen = () => {
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, teamsRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/project/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${BACKEND_URL}/api/contractor/filter`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        const projectsData = await projectsRes.json();
        const teamsData = await teamsRes.json();

        setProjects(projectsData);
        setTeams(teamsData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const TeamCard = ({ team }) => {
    const visibleTags = (team.categories || []).slice(0, 2);
    const hiddenTagsCount = (team.categories || []).length - 2;
    const hasImage = Boolean(team.previewImage);
    const imageUrl = hasImage ? `${BACKEND_URL}${team.previewImage}` : null;

    return (
      <div className="bg-yellow-50 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
           onClick={() => navigate(`/team/${team.id}`)}>
        <div className="relative mb-4">
          {hasImage ? (
            <img 
              src={imageUrl} 
              alt={team.fullName}
              className="w-full h-32 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Нет фото</span>
            </div>
          )}
          <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs text-gray-600">
              {team.rating || '5.0'} ({team.reviews || '0'} отзывов)
            </span>
          </div>

          <h3 className="font-medium text-sm line-clamp-2">
            {team.fullName || team.account_name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2">
            {team.shortDescription || 'Описание отсутствует'}
          </p>

          <div className="flex flex-wrap gap-1">
            {visibleTags.map((tag, i) => (
              <span key={i} className="bg-yellow-200 px-2 py-0.5 rounded-full text-xs text-gray-800">
                {tag}
              </span>
            ))}
            {hiddenTagsCount > 0 && (
              <span className="bg-yellow-200 px-2 py-0.5 rounded-full text-xs text-gray-800">
                +{hiddenTagsCount}
              </span>
            )}
          </div>

          <div className="flex items-center text-xs text-gray-600">
            <MapPin className="w-3 h-3 mr-1" />
            {team.location || 'Не указано'}
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
    <div className="space-y-8">
      {/* Ваши проекты */}
      <section>
        <h2 className="text-lg font-medium text-black mb-4">Ваши проекты</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {projects.slice(0, 6).map((project) => (
            <div 
              key={project.id}
              className="flex-shrink-0 w-24 h-24 relative cursor-pointer"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <img
                src={`${BACKEND_URL}${project.sourceImg}`}
                alt={project.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5 rounded-b-lg">
                <p className="text-white text-xs font-medium truncate">
                  {project.title}
                </p>
              </div>
            </div>
          ))}
          <button
            onClick={() => navigate('/project/create/step1')}
            className="flex-shrink-0 w-24 h-24 border-2 border-dashed border-black rounded-lg flex flex-col items-center justify-center text-black hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-xs text-center">Создать проект</span>
          </button>
        </div>
      </section>

      {/* Рекомендованные исполнители */}
      <section>
        <h2 className="text-lg font-medium text-black mb-4">Рекомендованные исполнители</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;