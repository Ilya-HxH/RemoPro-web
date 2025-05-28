import React, { useState } from "react";
import { Send, MoreHorizontal } from "lucide-react";

const ChatScreen = () => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);

  // Mock data для чатов
  const chatList = [
    {
      id: 1,
      name: "RemontBistro",
      lastMessage: "Ремонт по хорошим ценам. Быстро, качественно полавершь! Быстро, качественно",
      unreadCount: 3,
      avatar: "/api/placeholder/60/60",
      isActive: true
    },
    {
      id: 2,
      name: "RemontBistro",
      lastMessage: "Ремонт по хорошим ценам. Быстро, качественно полавершь! Быстро, качественно",
      unreadCount: 1,
      avatar: "/api/placeholder/60/60",
      isActive: false
    },
    {
      id: 3,
      name: "RemontBistro",
      lastMessage: "Ремонт по хорошим ценам. Быстро, качественно полавершь! Быстро, качественно",
      unreadCount: 0,
      avatar: "/api/placeholder/60/60",
      isActive: false
    }
  ];

  // Mock сообщения для активного чата
  const mockMessages = [
    {
      id: 1,
      text: "Здравствуйте! Подскажите, вы могли бы взяться за реализацию одного проекта?",
      sender: "client",
      time: "14:20"
    },
    {
      id: 2,
      text: "Здравствуйте! Спасибо за обращение. Сейчас ознакомился с файлами и уточним детали. Дайте нам пару минут.",
      sender: "contractor",
      time: "14:25"
    }
  ];

  const [currentMessages, setCurrentMessages] = useState(mockMessages);
  const [selectedChat, setSelectedChat] = useState(chatList[0]);

  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: Date.now(),
        text: messageText,
        sender: "contractor",
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setCurrentMessages([...currentMessages, newMessage]);
      setMessageText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      

      <div className="flex h-[calc(100vh-120px)]">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r border-gray-200 bg-white">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Чат</h2>
          </div>
          
          <div className="overflow-y-auto">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-start p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedChat.id === chat.id ? 'bg-gray-100' : ''
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="relative mr-3">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-black truncate">{chat.name}</h3>
                    <button className="p-1">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                    {chat.lastMessage}
                  </p>
                  
                  {chat.unreadCount > 0 && (
                    <div className="flex justify-end">
                      <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                        {chat.unreadCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-lg object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-black">{selectedChat.name}</h3>
                    <p className="text-sm text-gray-500">онлайн</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'contractor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === 'contractor'
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-black'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'contractor' 
                          ? 'text-gray-300' 
                          : 'text-gray-500'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-end space-x-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Напишите сообщение..."
                      className="w-full border border-gray-300 rounded-2xl px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      rows={1}
                      style={{ minHeight: '44px', maxHeight: '120px' }}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!messageText.trim()}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Выберите чат</h3>
                <p className="text-gray-400">Выберите беседу из списка слева</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;