import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, MessageCircle, Send, X, Search, User, Clock, CheckCircle, Star } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { BACKEND_URL } from '../../utils/config';

const ProjectDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTag, setActiveTag] = useState(null);
  const [tab, setTab] = useState("description");
  const [contractors, setContractors] = useState([]);
  const [contractorLoading, setContractorLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

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
        projectTagId: 1,
        category: { id: 1, action: "Демонтаж" },
        category_description: "Демонтаж старой плитки, сантехники и электропроводки. Аккуратный снос с вывозом мусора.",
        materials: ["Перфоратор", "Болгарка", "Мешки для мусора", "Защитные средства"],
        hasContractor: false
      },
      {
        id: 2,
        projectTagId: 2,
        category: { id: 2, action: "Отделка" },
        category_description: "Выравнивание стен, покраска, поклейка обоев. Качественная финишная отделка.",
        materials: ["Шпаклевка", "Грунтовка", "Краска", "Обои"],
        hasContractor: true,
        contractor: {
          id: 1,
          accountName: "СтройМастер",
          profileImg: "/api/placeholder/112/112",
          fullDescription: "Профессиональная команда с опытом работы более 10 лет",
          phone: "+7 (777) 123-45-67"
        }
      },
      {
        id: 3,
        projectTagId: 3,
        category: { id: 3, action: "Сантехника" },
        category_description: "Установка раковины, смесителя, подключение воды и канализации.",
        materials: ["Трубы", "Фитинги", "Смеситель", "Раковина"],
        hasContractor: false
      }
    ],
    views: 127,
    comments: 8
  };

  const mockContractors = [
    {
      id: 1,
      account_name: "RemontBistro",
      fullName: "RemontBistro - Мастера ремонта",
      shortDescription: "Качественный ремонт по доступным ценам",
      previewImage: "/api/placeholder/200/150",
      rating: 4.8,
      reviewCount: 52
    },
    {
      id: 2,
      account_name: "СтройПрофи",
      fullName: "СтройПрофи - Профессиональное строительство", 
      shortDescription: "Комплексные ремонтные работы любой сложности",
      previewImage: "/api/placeholder/200/150",
      rating: 4.9,
      reviewCount: 38
    },
    {
      id: 3,
      account_name: "МастерДом",
      fullName: "МастерДом - Ваш надежный помощник",
      shortDescription: "Индивидуальный подход к каждому клиенту",
      previewImage: "/api/placeholder/200/150",
      rating: 4.7,
      reviewCount: 29
    }
  ];

  const mockRequests = [
    {
      id: 1,
      status: "WAITING_USER",
      contractor: {
        id: 1,
        userId: { accountName: "RemontBistro" },
        shortDescription: "Качественный ремонт по доступным ценам",
        profileImg: "/api/placeholder/80/80"
      }
    },
    {
      id: 2,
      status: "PENDING",
      contractor: {
        id: 2,
        userId: { accountName: "СтройПрофи" },
        shortDescription: "Комплексные ремонтные работы",
        profileImg: "/api/placeholder/80/80"
      }
    },
    {
      id: 3,
      status: "APPROVED",
      contractor: {
        id: 3,
        userId: { accountName: "МастерДом" },
        shortDescription: "Индивидуальный подход",
        profileImg: "/api/placeholder/80/80"
      }
    }
  ];

  useEffect(() => {
    // ВРЕМЕННАЯ ЛОГИКА ДЛЯ ТЕСТИРОВАНИЯ
    setTimeout(() => {
      setProject(mockProject);
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    // Загрузка подрядчиков
    if (activeTag && activeTag.mode === "contractors" && tab === "search") {
      setContractorLoading(true);
      setTimeout(() => {
        setContractors(mockContractors);
        setContractorLoading(false);
      }, 1000);
    }
  }, [activeTag, tab]);

  useEffect(() => {
    // Загрузка заявок
    if (activeTag && activeTag.mode === "contractors" && tab === "requests") {
      setRequestsLoading(true);
      setTimeout(() => {
        setRequests(mockRequests);
        setRequestsLoading(false);
      }, 1000);
    }
  }, [activeTag, tab]);

  const statusName = (status) => {
    switch (status) {
      case "PENDING":
        return "На рассмотрении";
      case "APPROVED":
        return "Одобрены";
      case "REJECTED":
        return "Отклонены";
      case "WAITING_USER":
        return "Ожидает подтверждения пользователя";
      case "WAITING_CONTRACTOR":
        return "Ожидает подтверждения подрядчика";
      case "INVITE":
        return "Приглашены";
      default:
        return status;
    }
  };

  const sendInvite = async (contractorId) => {
    setTimeout(() => {
      alert('Заявка успешно отправлена!');
    }, 500);
  };

  const approveContractor = async (requestId) => {
    setTimeout(() => {
      alert('Подрядчик утвержден!');
      // Обновляем заявки
      setRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: "APPROVED" } : req
      ));
    }, 500);
  };

  if (loading || !project) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Project Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-sm text-gray-500 mb-1">Название работы</h3>
          <h1 className="text-xl font-semibold text-black mb-4">{project.title}</h1>
          
          <h3 className="text-sm text-gray-500 mb-1">Описание работы</h3>
          <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Current Object Photos */}
          <div>
            <h3 className="text-sm text-gray-500 mb-3">Объект ремонта сейчас</h3>
            <div className="relative">
              {project.sourceImg && project.sourceImg.length > 0 && (
                <>
                  <img
                    src={project.sourceImg[activeImageIndex]}
                    alt="Текущее состояние"
                    className="w-full h-64 object-cover rounded-lg cursor-pointer"
                    onClick={() => window.open(project.sourceImg[activeImageIndex], '_blank')}
                  />
                  <div className="flex space-x-2 mt-2">
                    {project.sourceImg.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 hover:border-yellow-400 transition-colors ${
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

          {/* Reference Photos */}
          <div>
            <h3 className="text-sm text-gray-500 mb-3">Примеры желаемого объекта</h3>
            <div className="relative">
              {project.refImg && project.refImg.length > 0 && (
                <>
                  <img
                    src={project.refImg[0]}
                    alt="Желаемый результат"
                    className="w-full h-64 object-cover rounded-lg cursor-pointer"
                    onClick={() => window.open(project.refImg[0], '_blank')}
                  />
                  <div className="flex space-x-2 mt-2">
                    {project.refImg.map((img, index) => (
                      <div key={index} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 hover:border-yellow-400 transition-colors cursor-pointer">
                        <img
                          src={img}
                          alt={`Референс ${index + 1}`}
                          className="w-full h-full object-cover"
                          onClick={() => window.open(img, '_blank')}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="text-sm text-gray-500 mb-3">Категории работ</h3>
          {project.tags.map((tag, index) => (
            <div key={index} className="p-4 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-semibold text-black">{tag.category.action}</h4>
                {tag.hasContractor && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Подрядчик назначен
                  </span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setActiveTag({ ...tag, mode: "description" });
                    setTab("description");
                  }}
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-sm text-black hover:bg-gray-50 transition-colors"
                >
                  Подробнее
                </button>
                <button
                  onClick={() => {
                    setActiveTag({ ...tag, mode: "contractors" });
                    setTab("search");
                  }}
                  className="flex-1 py-2 bg-yellow-300 rounded-lg text-sm text-black font-semibold hover:bg-yellow-400 transition-colors"
                >
                  {tag.hasContractor ? 'Просмотр подрядчика' : 'Исполнители'}
                </button>
              </div>
            </div>
          ))}
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
        </div>
      </div>

      {/* Modals */}
      {activeTag && (
        <div className="fixed inset-0 flex justify-center items-center px-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">{activeTag.category.action}</h2>
              <button onClick={() => setActiveTag(null)} className="hover:bg-gray-100 rounded-full p-1 transition-colors">
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {activeTag.mode === "description" ? (
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-sm text-gray-500 mb-2">Описание</h3>
                    <p className="text-base text-black leading-relaxed">
                      {activeTag.category_description || "Описание отсутствует"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-500 mb-2">Материалы</h3>
                    <div className="flex flex-wrap gap-2">
                      {(activeTag.materials || []).map((mat, i) => (
                        <span
                          key={i}
                          className="bg-yellow-200 px-3 py-1 rounded-full text-sm text-black"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : activeTag.hasContractor ? (
                // Показываем назначенного подрядчика
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-6">
                    <img
                      src={activeTag.contractor.profileImg}
                      alt="Подрядчик"
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-black mb-2">
                        {activeTag.contractor.accountName}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {activeTag.contractor.fullDescription}
                      </p>
                      <p className="text-sm text-gray-500">
                        Телефон: {activeTag.contractor.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate(`/team/${activeTag.contractor.id}`)}
                      className="flex-1 py-3 bg-gray-200 rounded-lg text-black font-medium hover:bg-gray-300 transition-colors"
                    >
                      Подробная информация
                    </button>
                    <button
                      onClick={() => alert('Функция отправки сообщения будет реализована')}
                      className="flex-1 py-3 bg-black rounded-lg text-white font-medium hover:bg-gray-800 transition-colors"
                    >
                      Отправить сообщение
                    </button>
                  </div>
                </div>
              ) : (
                // Показываем поиск подрядчиков и заявки
                <div className="p-6">
                  {/* Tabs */}
                  <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setTab("search")}
                      className={`flex-1 py-2 text-center rounded-md transition-colors ${
                        tab === "search" ? "bg-white text-black font-medium shadow-sm" : "text-gray-600"
                      }`}
                    >
                      Поиск
                    </button>
                    <button
                      onClick={() => setTab("requests")}
                      className={`flex-1 py-2 text-center rounded-md transition-colors ${
                        tab === "requests" ? "bg-white text-black font-medium shadow-sm" : "text-gray-600"
                      }`}
                    >
                      Заявки
                    </button>
                  </div>

                  {tab === "search" && (
                    <div>
                      {contractorLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {contractors.map((contractor) => (
                            <div key={contractor.id} className="bg-yellow-50 rounded-xl p-4">
                              <div 
                                className="cursor-pointer"
                                onClick={() => {
                                  setActiveTag(null);
                                  navigate(`/team/${contractor.id}`);
                                }}
                              >
                                <img
                                  src={contractor.previewImage}
                                  alt={contractor.fullName}
                                  className="w-full h-32 object-cover rounded-lg mb-3"
                                />
                                <div className="flex items-center space-x-1 mb-2">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span className="text-xs text-gray-600">
                                    {contractor.rating} ({contractor.reviewCount} отзывов)
                                  </span>
                                </div>
                                <h4 className="font-semibold text-sm mb-2 line-clamp-2">
                                  {contractor.fullName}
                                </h4>
                                <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                                  {contractor.shortDescription}
                                </p>
                              </div>
                              
                              <button
                                onClick={() => sendInvite(contractor.id)}
                                className="w-full py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                              >
                                Отправить заявку
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {tab === "requests" && (
                    <div>
                      {requestsLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                        </div>
                      ) : requests.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-400">Нет заявок</p>
                        </div>
                      ) : (
                        Object.entries(
                          requests.reduce((acc, req) => {
                            if (!acc[req.status]) acc[req.status] = [];
                            acc[req.status].push(req);
                            return acc;
                          }, {})
                        ).map(([status, items]) => (
                          <div key={status} className="mb-6">
                            <h3 className="text-base font-bold text-black mb-3">
                              {statusName(status)}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {items.map((req) => (
                                <div key={req.id} className="bg-yellow-50 rounded-xl p-4">
                                  <div 
                                    className="cursor-pointer"
                                    onClick={() => {
                                      setActiveTag(null);
                                      navigate(`/team/${req.contractor.id}`);
                                    }}
                                  >
                                    <img
                                      src={req.contractor.profileImg}
                                      alt={req.contractor.userId.accountName}
                                      className="w-full h-32 object-cover rounded-lg mb-3"
                                    />
                                    <h4 className="font-semibold text-sm mb-2">
                                      {req.contractor.userId.accountName}
                                    </h4>
                                    <p className="text-xs text-gray-500 mb-3">
                                      {req.contractor.shortDescription}
                                    </p>
                                  </div>

                                  {req.status === "WAITING_USER" && (
                                    <button
                                      onClick={() => approveContractor(req.id)}
                                      className="w-full py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                                    >
                                      Подтвердить
                                    </button>
                                  )}
                                  
                                  {req.status === "APPROVED" && (
                                    <div className="w-full py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium text-center">
                                      Подтвержден
                                    </div>
                                  )}
                                  
                                  {req.status === "PENDING" && (
                                    <div className="w-full py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium text-center flex items-center justify-center">
                                      <Clock className="w-3 h-3 mr-1" />
                                      Ожидает
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailScreen;