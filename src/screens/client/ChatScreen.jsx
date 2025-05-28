import React, { useState } from 'react';
import { MessageCircle, User } from 'lucide-react';

const ChatScreen = () => {
  const [activeTab, setActiveTab] = useState('projects');

  // Mock data - в реальном приложении это будет из API
  const projectChats = [
    {
      id: 1,
      name: "Construction B&R",
      message: "Завтра, 16 апреля, в 10:00 прие...",
      avatar: null,
      badge: 1,
      project: {
        image: null,
        title: "Будет выполнен демонтаж старой отделки, замена всех инженерных сетей, включая электрику, водоснабжение и вентиляцию..."
      }
    },
    {
      id: 2,
      name: "Kominre",
      message: "Сегодня завершили демонтаж...",
      avatar: null,
      badge: 4,
      project: {
        image: null,
        title: "В рамках проекта планируется выполнение комплексного ремонта двухкомнатной квартиры общей площадью 65 м²."
      }
    },
  ];

  const messages = [
    {
      id: 1,
      name: "Trust CO",
      message: "Мы предлагаем комплексный р...",
      avatar: null,
      badge: 2,
    },
    {
      id: 2,
      name: "Macron group",
      message: "Наши мастера с 10-летним опы...",
      avatar: null,
      badge: 1,
    },
    {
      id: 3,
      name: "Concrete",
      message: "Отлично!",
      avatar: null,
      badge: 0,
    },
  ];

  const renderProjectChatItem = (chat) => (
    <div key={chat.id} className="bg-gray-50 rounded-xl p-4 mb-4 cursor-pointer hover:bg-gray-100 transition-colors">
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-gray-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-base text-black">{chat.name}</h3>
            {chat.badge > 0 && (
              <div className="bg-yellow-300 rounded-full px-2 py-1 min-w-[24px] flex items-center justify-center">
                <span className="text-xs font-bold text-black">{chat.badge}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-700 line-clamp-1">{chat.message}</p>
        </div>
      </div>
      
      <div className="h-px bg-gray-200 mb-3" />
      
      <div className="flex items-start space-x-3">
        <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-xs text-gray-400">Проект</span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2 flex-1">
          {chat.project.title}
        </p>
      </div>
    </div>
  );

  const renderMessageItem = (msg) => (
    <div key={msg.id} className="bg-gray-50 rounded-xl p-4 mb-4 cursor-pointer hover:bg-gray-100 transition-colors">
      <div className="flex items-start space-x-3">
        <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-gray-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-base text-black">{msg.name}</h3>
            {msg.badge > 0 && (
              <div className="bg-yellow-300 rounded-full px-2 py-1 min-w-[24px] flex items-center justify-center">
                <span className="text-xs font-bold text-black">{msg.badge}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-700 line-clamp-1">{msg.message}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-6 h-6 text-black" />
        <h1 className="text-2xl font-bold text-black">Чаты</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'projects'
              ? 'text-black border-b-2 border-yellow-400'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Проекты
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'messages'
              ? 'text-black border-b-2 border-yellow-400'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Сообщения
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'projects'
          ? projectChats.map(renderProjectChatItem)
          : messages.map(renderMessageItem)}
      </div>

      {/* Empty state */}
      {((activeTab === 'projects' && projectChats.length === 0) ||
        (activeTab === 'messages' && messages.length === 0)) && (
        <div className="text-center py-12">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">
            {activeTab === 'projects' ? 'Нет чатов по проектам' : 'Нет сообщений'}
          </p>
          <p className="text-gray-400 text-sm">
            {activeTab === 'projects' 
              ? 'Чаты появятся когда исполнители откликнутся на ваши проекты'
              : 'Начните общение с исполнителями'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;