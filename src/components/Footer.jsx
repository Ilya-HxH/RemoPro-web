import React from 'react';
import { Instagram, Send, Smartphone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-yellow-300 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info - Left */}
          <div className="space-y-4">
            <h3 className="font-semibold text-black">О компании</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-black hover:underline text-sm">
                  Политика конфиденциальности
                </button>
              </li>
              <li>
                <button className="text-black hover:underline text-sm">
                  Частые вопросы
                </button>
              </li>
            </ul>
          </div>

          {/* Company Info - Center */}
          <div className="space-y-4">
            <h3 className="font-semibold text-black">О компании</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-black hover:underline text-sm">
                  Политика конфиденциальности
                </button>
              </li>
              <li>
                <button className="text-black hover:underline text-sm">
                  Частые вопросы
                </button>
              </li>
            </ul>
          </div>

          {/* RemoPro Brand & Social - Right */}
          <div className="space-y-4">
            <div className="text-black font-bold text-xl">●RemoPro</div>
            
            {/* Social Icons */}
            <div className="flex space-x-3">
              <button className="w-8 h-8 bg-black rounded flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Instagram size={16} color="white" />
              </button>
              <button className="w-8 h-8 bg-black rounded flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Send size={16} color="white" />
              </button>
              <button className="w-8 h-8 bg-black rounded flex items-center justify-center hover:bg-gray-800 transition-colors">
                <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-black text-xs font-bold">VK</span>
                </div>
              </button>
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                <Smartphone size={16} />
                <span>Google Play</span>
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                <Smartphone size={16} />
                <span>App Store</span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-black/20 text-center">
          <p className="text-black text-sm">
            © 2024 RemoPro. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;