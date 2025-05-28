import React from 'react';
import { Bell, CheckCircle, Wrench, User, MessageCircle } from 'lucide-react';

const NotificationScreen = () => {
  // Mock data - в реальном приложении это будет из API
  const notifications = [
    {
      id: 1,
      type: "chat",
      title: "Новый ответ в чате!",
      text: "Это да, нужно будет в уже созданном курсе возможность добавлять студентов...",
      time: "23/04 15:46",
      avatar: null,
    },
    {
      id: 2,
      type: "info",
      title: "Материалы подобраны!",
      text: "Мы нашли подходящие стройматериалы по вашему запросу.",
      time: "23/04 15:46",
      icon: "checkmark-circle-outline",
    },
    {
      id: 3,
      type: "info",
      title: "Почти готово!",
      text: "Осталось утвердить выбор сантехники.",
      time: "23/04 15:46",
      icon: "construct-outline",
    },
    {
      id: 4,
      type: "request",
      team: {
        name: "Construction B&R",
        logo: null,
        project: "Ремонт двухкомнатной квартиры площадью 65 м² с полной заменой отделки и коммуникаций.",
        projectImage: null,
      },
    }
  ];

  const getNotificationIcon = (type, iconName) => {
    if (type === "info") {
      if (iconName === "checkmark-circle-outline") {
        return <CheckCircle className="w-6 h-6 text-black" />;
      }
      if (iconName === "construct-outline") {
        return <Wrench className="w-6 h-6 text-black" />;
      }
    }
    return <Bell className="w-6 h-6 text-black" />;
  };

  const renderNotification = (item) => {
    if (item.type === "info") {
      return (
        <div key={item.id} className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="flex items-start space-x-3">
            <div className="w-16 h-16 rounded-lg bg-yellow-200 flex items-center justify-center">
              {getNotificationIcon(item.type, item.icon)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-base text-black">{item.title}</h3>
                <span className="text-sm text-gray-400 ml-2">{item.time}</span>
              </div>
              <p className="text-sm text-gray-600">{item.text}</p>
            </div>
          </div>
        </div>
      );
    }

    if (item.type === "chat") {
      return (
        <div key={item.id} className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="flex items-start space-x-3">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-base text-black">{item.title}</h3>
                <span className="text-sm text-gray-400 ml-2">{item.time}</span>
              </div>
              <p className="text-sm text-gray-600">{item.text}</p>
            </div>
          </div>
        </div>
      );
    }

    if (item.type === "request") {
      return (
        <div key={item.id} className="bg-gray-50 rounded-xl p-4 mb-4">
          {/* Header */}
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base text-black">{item.team.name}</h3>
              <p className="text-sm text-gray-700">откликнулась на ваш проект</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-300 my-3" />

          {/* Project */}
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-400">Проект</span>
            </div>
            <p className="text-sm text-gray-700 flex-1 line-clamp-3">
              {item.team.project}
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="flex-1 bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              Подтвердить
            </button>
            <button className="flex-1 border border-black text-black py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Отказаться
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Bell className="w-6 h-6 text-black" />
        <h1 className="text-2xl font-bold text-black">Уведомления</h1>
      </div>

      {/* Notifications list */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Пока что уведомлений нет</p>
            <p className="text-gray-400 text-sm px-6">
              Мы сообщим вам, как только появится что-то важное по вашему проекту.
            </p>
          </div>
        ) : (
          notifications.map(renderNotification)
        )}
      </div>
    </div>
  );
};

export default NotificationScreen;