import React, { useEffect, useState } from "react";
import { ArrowLeft, Bell, User, X } from "lucide-react";

// Mock config
const BACKEND_URL = "http://185.47.167.143:8000";

// Mock auth store
const useAuthStore = {
  getState: () => ({
    token: "demo-token"
  })
};

const ProjectDetailScreen = ({ projectId = 1 }) => {
  const [project, setProject] = useState(null);
  const [myActions, setMyActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [pendingTagId, setPendingTagId] = useState(null);
  const [selectedActionStatus, setSelectedActionStatus] = useState(null);
  const [pendingActionId, setPendingActionId] = useState(null);

  // Mock data
  const mockProject = {
    id: 1,
    title: "Ремонт кухни в двухкомнатной квартире",
    description: "Требуется полный ремонт кухни площадью 12 кв.м. Включает в себя замену плитки, покраску стен, установку новой сантехники и электропроводки.",
    client: {
      accountName: "Анна Петрова",
      profileImg: "/api/placeholder/112/112"
    },
    sourceImg: [
      "/api/placeholder/96/96",
      "/api/placeholder/96/96",
      "/api/placeholder/96/96"
    ],
    refImg: [
      "/api/placeholder/96/96",
      "/api/placeholder/96/96"
    ],
    tags: [
      {
        id: 1,
        category: {
          categoryId: 1,
          action: "Демонтаж"
        },
        category_description: "Демонтаж старой плитки, сантехники и электропроводки",
        materials: ["Перфоратор", "Болгарка", "Мешки для мусора"]
      },
      {
        id: 2,
        category: {
          categoryId: 2,
          action: "Отделка"
        },
        category_description: "Выравнивание стен, покраска, поклейка обоев",
        materials: ["Шпаклевка", "Грунтовка", "Краска", "Обои"]
      },
      {
        id: 3,
        category: {
          categoryId: 3,
          action: "Сантехника"
        },
        category_description: "Установка раковины, смесителя, подключение воды",
        materials: ["Трубы", "Фитинги", "Смеситель", "Раковина"]
      }
    ]
  };

  const mockActions = [
    {
      id: 1,
      status: "WAITING_USER", // INVITE, WAITING_USER, APPROVED
      projectTag: {
        id: 1,
        category: { id: 1 }
      }
    },
    {
      id: 2,
      status: "INVITE",
      projectTag: {
        id: 2,
        category: { id: 2 }
      }
    }
  ];

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setProject(mockProject);
      setMyActions(mockActions);
      setLoading(false);
    }, 1000);
  }, [projectId]);

  const getActionForCategory = (catId) => {
    return myActions.find(action => action.projectTag?.category?.id === catId) || null;
  };

  const sendRequest = async (projectTagId, actionStatus) => {
    try {
      // В реальном приложении здесь будут API запросы
      console.log("Sending request:", { projectTagId, actionStatus, pendingActionId });
      
      // Имитация успешного запроса
      setTimeout(() => {
        // Обновляем состояние действий
        const updatedActions = [...myActions];
        if (actionStatus === "INVITE") {
          // Изменяем статус с INVITE на APPROVED
          const actionIndex = updatedActions.findIndex(a => a.id === pendingActionId);
          if (actionIndex !== -1) {
            updatedActions[actionIndex].status = "APPROVED";
          }
        } else {
          // Добавляем новое действие для BID
          updatedActions.push({
            id: Date.now(),
            status: "WAITING_USER",
            projectTag: {
              id: projectTagId,
              category: { id: projectTagId }
            }
          });
        }
        
        setMyActions(updatedActions);
        alert(actionStatus === "INVITE" ? "Запрос успешно подтверждён!" : "Заявка успешно отправлена!");
        setConfirmModal(false);
      }, 500);
    } catch (err) {
      console.error("Ошибка при отправке запроса:", err);
      alert("Не удалось выполнить действие.");
      setConfirmModal(false);
    }
  };

  const handleNavigation = (screen) => {
    console.log(`Navigate to ${screen}`);
  };

  if (loading || !project) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-yellow-300 rounded-b-3xl px-4 pt-20 pb-4 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <button className="p-1" onClick={() => handleNavigation("back")}>
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <div className="absolute left-0 right-0 flex justify-center z-0">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
              <span className="font-bold text-black text-xl">RemoPro</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-1">
              <Bell className="w-6 h-6 text-black" />
            </button>
            <button className="p-1">
              <User className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-40 pb-24">
        <div className="px-4">
          {/* Client Info */}
          <div className="flex items-center mb-6">
            <img
              src={project.client.profileImg}
              alt="Client"
              className="w-28 h-28 rounded-md mr-4 object-cover"
            />
            <div>
              <h2 className="text-sm font-semibold text-black">{project.client.accountName}</h2>
              <p className="text-xs text-gray-500">Владелец проекта</p>
            </div>
          </div>

          {/* Project Title */}
          <div className="mb-4">
            <label className="text-sm text-gray-500 mb-1 block">Название работы</label>
            <h1 className="text-lg font-semibold">{project.title}</h1>
          </div>

          {/* Project Description */}
          <div className="mb-4">
            <label className="text-sm text-gray-500 mb-1 block">Описание работы</label>
            <p className="text-base text-gray-700">{project.description}</p>
          </div>

          {/* Source Images */}
          <div className="mb-4">
            <label className="text-sm text-gray-500 mb-2 block">Объект ремонта сейчас</label>
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {project.sourceImg.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Source ${i + 1}`}
                  className="w-24 h-24 rounded-md flex-shrink-0 object-cover"
                />
              ))}
            </div>
          </div>

          {/* Reference Images */}
          <div className="mb-4">
            <label className="text-sm text-gray-500 mb-2 block">Примеры желаемого объекта</label>
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {project.refImg.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Reference ${i + 1}`}
                  className="w-24 h-24 rounded-md flex-shrink-0 object-cover"
                />
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-4">
            <label className="text-sm text-gray-500 mb-2 block">Категории работ</label>
            {project.tags.map((tag, idx) => {
              const action = getActionForCategory(tag.category.categoryId);

              let buttonText = "Отправить заявку";
              let disabled = false;
              let buttonStyle = "bg-black hover:bg-gray-800";

              if (action) {
                if (action.status === "INVITE") {
                  buttonText = "Ответить на запрос";
                } else if (action.status === "WAITING_USER") {
                  buttonText = "Отправлена заявка";
                  buttonStyle = "bg-gray-300 cursor-not-allowed";
                  disabled = true;
                } else if (action.status === "APPROVED") {
                  buttonText = "В работе";
                  buttonStyle = "bg-green-500 cursor-not-allowed";
                  disabled = true;
                }
              }

              return (
                <div key={idx} className="p-4 bg-white rounded-xl border border-gray-200 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-black">
                      {tag.category.action}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        className="py-2 px-4 border border-gray-300 rounded-full text-sm text-black hover:bg-gray-50 transition-colors"
                        onClick={() => setActiveTag(tag)}
                      >
                        Описание
                      </button>
                      <button
                        disabled={disabled}
                        className={`py-2 px-4 rounded-full text-sm text-white transition-colors ${buttonStyle}`}
                        onClick={() => {
                          if (!disabled) {
                            setPendingTagId(tag.id);
                            setSelectedActionStatus(action?.status || null);
                            setPendingActionId(action?.id);
                            setConfirmModal(true);
                          }
                        }}
                      >
                        {buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-8 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-center mb-6">
              {selectedActionStatus === "INVITE" ? "Подтвердите принятие запроса" : "Подтвердите отправку заявки"}
            </h3>
            <div className="flex space-x-4">
              <button
                className="flex-1 py-3 bg-gray-300 rounded-xl text-black font-medium hover:bg-gray-400 transition-colors"
                onClick={() => setConfirmModal(false)}
              >
                Отмена
              </button>
              <button
                className="flex-1 py-3 bg-black rounded-xl text-white font-medium hover:bg-gray-800 transition-colors"
                onClick={() => sendRequest(pendingTagId, selectedActionStatus)}
              >
                {selectedActionStatus === "INVITE" ? "Принять" : "Отправить"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Description Modal */}
      {activeTag && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center px-4 z-50">
          <div className="bg-white rounded-2xl w-full max-h-[80%] p-6 max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{activeTag.category.action}</h3>
              <button onClick={() => setActiveTag(null)} className="hover:bg-gray-100 rounded-full p-1 transition-colors">
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-96">
              <div className="mb-4">
                <label className="text-sm text-gray-500 mb-1 block">Описание</label>
                <p className="text-base">
                  {activeTag.category_description || "Описание отсутствует"}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Материалы</label>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailScreen;