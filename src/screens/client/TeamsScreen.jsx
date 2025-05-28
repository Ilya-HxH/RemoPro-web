import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, X, Star, MapPin, Heart } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { BACKEND_URL } from '../../utils/config';

const TeamsScreen = () => {
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  
  const [teams, setTeams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/work-category/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        let url = `${BACKEND_URL}/api/contractor/filter`;
        if (selectedCategories.length > 0) {
          const query = selectedCategories.map((id) => `categoryIds=${id}`).join('&');
          url += `?${query}`;
        }

        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Ошибка загрузки команд:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [selectedCategories, token]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const removeCategory = (categoryId) => {
    setSelectedCategories(prev => prev.filter(id => id !== categoryId));
  };

  const filteredTeams = teams.filter(team =>
    team.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
    team.account_name?.toLowerCase().includes(searchText.toLowerCase()) ||
    team.shortDescription?.toLowerCase().includes(searchText.toLowerCase())
  );

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

  return (
    <div className="space-y-6">
      {/* Header with search and filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <h1 className="text-2xl font-bold text-black">Исполнители</h1>
        
        <div className="flex-1 max-w-md">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Поиск исполнителей..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center px-4 py-2 border rounded-lg transition-colors ${
            selectedCategories.length > 0 
              ? 'border-black bg-black text-white' 
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-4 h-4 mr-2" />
          Фильтры
          {selectedCategories.length > 0 && (
            <span className="ml-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {selectedCategories.length}
            </span>
          )}
        </button>
      </div>

      {/* Selected categories */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((categoryId) => {
            const category = categories.find(c => c.id === categoryId);
            return (
              <div
                key={categoryId}
                className="bg-black text-white px-3 py-1 rounded-full flex items-center space-x-2"
              >
                <span className="text-sm">{category?.action || 'Категория'}</span>
                <button
                  onClick={() => removeCategory(categoryId)}
                  className="hover:bg-gray-800 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-black mb-3">Категории работ</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`px-3 py-1 rounded-full border transition-colors ${
                    isSelected
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {category.action}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Teams grid */}
      {loading ? (
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}

      {filteredTeams.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">Исполнители не найдены</p>
          <p className="text-gray-400 text-sm mt-1">
            Попробуйте изменить параметры поиска или фильтры
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamsScreen;