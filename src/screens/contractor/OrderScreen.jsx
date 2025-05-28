import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, X, Eye, MessageCircle, MapPin } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { BACKEND_URL } from '../../utils/config';

const OrderScreen = () => {
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  
  const [projects, setProjects] = useState([]);
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
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let url = `${BACKEND_URL}/api/contractor/project/find`;
        if (selectedCategories.length > 0) {
          const query = selectedCategories.map((id) => `categoryId=${id}`).join('&');
          url += `?${query}`;
        }

        const response = await fetch(url, {
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

  const filteredProjects = projects.filter(project =>
    project.title?.toLowerCase().includes(searchText.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with search and filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <h1 className="text-2xl font-bold text-black">Каталог</h1>
        
        <div className="flex-1 max-w-md">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Поиск проектов..."
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

      {/* Projects list */}
      <div className="space-y-4">
        <div className="flex space-x-2 mb-4">
          <span className="bg-black text-white px-3 py-1 rounded-full text-sm">Отделка</span>
          <span className="bg-black text-white px-3 py-1 rounded-full text-sm">Отделка</span>
          <span className="bg-black text-white px-3 py-1 rounded-full text-sm">Отделка</span>
        </div>

        <h2 className="text-base font-medium text-black mb-4">Проекты</h2>

        {loading ? (
          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const firstImage = project.sourceImg?.find((img) => img.type === 'SOURCE')?.imageUrl;
              const imageUrl = firstImage ? `${BACKEND_URL}${firstImage}` : null;
              const tags = project.projectTags || [];

              return (
                <div
                  key={project.id}
                  className="bg-yellow-50 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/contractor/project/${project.id}`)}
                >
                  <div className="flex space-x-4">
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
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-gray-500">{new Date(project.createdAt || Date.now()).toLocaleDateString('ru-RU')}</p>
                          <h3 className="font-medium text-black text-base mb-1 line-clamp-2">
                            {project.title}
                          </h3>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {project.description || 'Нет описания'}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {tags.slice(0, 6).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-yellow-200 px-2 py-1 rounded-full text-xs text-black"
                          >
                            {tag.category?.action || 'Демонтаж'}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center space-x-4 text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{project.views || Math.floor(Math.random() * 100)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{project.comments || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Проекты не найдены</p>
            <p className="text-gray-400 text-sm mt-1">
              Попробуйте изменить параметры поиска или фильтры
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderScreen;