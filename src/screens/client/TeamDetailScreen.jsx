import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, Mail, Phone, MessageSquare, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { BACKEND_URL } from '../../utils/config';

const TeamDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/contractor/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setTeam(data);
      } catch (error) {
        console.error('Ошибка загрузки данных команды:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Исполнитель не найден</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Назад</span>
        </button>
        <button
          onClick={() => setLiked(!liked)}
          className={`p-2 rounded-full transition-colors ${
            liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Image Gallery */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="relative">
          {team.gallery && team.gallery.length > 0 ? (
            <>
              <img
                src={`${BACKEND_URL}${team.gallery[activeImageIndex]?.img}`}
                alt="Работы исполнителя"
                className="w-full h-64 object-cover"
              />
              {team.gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => 
                      prev === 0 ? team.gallery.length - 1 : prev - 1
                    )}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => 
                      prev === team.gallery.length - 1 ? 0 : prev + 1
                    )}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {team.gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === activeImageIndex ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Нет изображений</span>
            </div>
          )}
        </div>
      </div>

      {/* Team Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            {team.profileImg ? (
              <img
                src={`${BACKEND_URL}${team.profileImg}`}
                alt="Профиль"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-xl font-bold text-black">{team.account_name}</h1>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{team.rating || '5.0'}</span>
                <span className="text-sm text-gray-500">({team.reviewCount || '0'} отзывов)</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{team.shortDescription}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-black mb-3">О команде</h2>
          <p className="text-gray-700 leading-relaxed">
            {team.fullDescription || 'Команда RemontBistro, мастера своего дела в сфере ремонта, отделки и малоэтажного строительства. Более 8 лет опыта, десятки реализованных проектов, довольные клиенты и репутация, на которую мы по-настоящему опираемся.'}
          </p>
        </div>

        {/* Categories */}
        {team.categories && team.categories.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black mb-3">Категории</h3>
            <div className="flex flex-wrap gap-2">
              {team.categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-yellow-200 px-3 py-1 rounded-full text-sm text-gray-800"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-3">Контактная информация</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{team.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{team.phone}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            // Здесь будет логика отправки сообщения
            alert('Функция отправки сообщения будет реализована');
          }}
          className="w-full bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="font-semibold">Отправить сообщение</span>
        </button>
      </div>

      {/* Reviews */}
      {team.reviews && team.reviews.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-black mb-4">Отзывы:</h2>
          <div className="space-y-6">
            {team.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt="Аватар"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-black">{review.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{review.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">{review.role}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">{review.text}</p>
                    
                    {review.photos && review.photos.length > 0 && (
                      <div className="flex space-x-2 overflow-x-auto">
                        {review.photos.slice(0, 6).map((photo, index) => (
                          <div key={index} className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                            <img
                              src={photo}
                              alt={`Фото ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {review.photos.length > 6 && (
                          <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500">+{review.photos.length - 6}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetailScreen;