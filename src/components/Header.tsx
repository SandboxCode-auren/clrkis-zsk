import React from 'react';
import { Menu, Archive, Share2, Github, ChevronDown, Columns, BookOpen } from 'lucide-react';
import { UserProfile, PushNotification } from '../types/shell';

interface HeaderProps {
  user: UserProfile;
  notifications: PushNotification[];
  onOpenAuth: () => void;
  onOpenNotifications: () => void;
  onToggleMainMenu: () => void;
  isSyncing: boolean;
  onManualSync: () => void;
  cleanHomeMode?: boolean;
  activeNavTab: 'chat' | 'diff' | 'logs' | 'rfc';
  onChangeNavTab: (tab: 'chat' | 'diff' | 'logs' | 'rfc') => void;
  onToggleCleanHomeMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  notifications,
  onOpenAuth,
  onOpenNotifications,
  onToggleMainMenu,
  isSyncing,
  onManualSync,
  cleanHomeMode = true,
  activeNavTab,
  onChangeNavTab,
  onToggleCleanHomeMode
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-black border-b-2 border-neutral-800 sticky top-0 z-30 select-none font-mono">
      {/* Top Main Navigation Header */}
      <header className="flex items-center justify-between px-3 sm:px-6 py-2">
        {/* Left: menu Button (Sharp rectangular button) */}
        <button
          onClick={onToggleMainMenu}
          className="flex items-center space-x-2 px-3 py-1.5 bg-black hover:bg-neutral-900 text-white rounded-none border-2 border-neutral-700 hover:border-cyan-400 transition-all duration-150 cursor-pointer active:scale-95 group font-bold"
          title="Mở Menu 3 Gạch"
        >
          <Menu className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          <span className="font-extrabold text-xs uppercase tracking-wider text-white">menu</span>
        </button>

        {/* Right Action Icons & GitHub Dropdown */}
        <div className="flex items-center space-x-2">
          {/* RFC Editor Badge Link */}
          <a
            href="https://www.rfc-editor.org/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center space-x-1 px-2.5 py-1 bg-black border-2 border-neutral-700 hover:border-cyan-400 text-xs text-cyan-300 font-bold font-mono transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>rfc-editor.org</span>
          </a>

          {/* Archive / Storage Icon Button */}
          <button
            onClick={onManualSync}
            className="p-1.5 bg-black hover:bg-neutral-900 text-white rounded-none border-2 border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer active:scale-95"
            title="Đồng bộ Cloudant"
          >
            <Archive className="w-4 h-4 text-neutral-300" />
          </button>

          {/* Share / Export Icon Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-1.5 bg-black hover:bg-neutral-900 text-white rounded-none border-2 border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer active:scale-95"
            title="Chia sẻ / Thông báo"
          >
            <Share2 className="w-4 h-4 text-neutral-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-none animate-pulse border border-black"></span>
            )}
          </button>

          {/* GitHub User Button (Sharp rectangular button) */}
          <button
            onClick={onOpenAuth}
            className="flex items-center space-x-2 px-3 py-1 bg-white text-black hover:bg-neutral-200 rounded-none font-extrabold text-xs transition-all cursor-pointer border-2 border-white active:scale-95"
            title="Tài khoản GitHub"
          >
            <Github className="w-4 h-4 text-black" />
            <ChevronDown className="w-3.5 h-3.5 text-neutral-800" />
          </button>
        </div>
      </header>

      {/* Sub Header Navigation Tabs Bar (Cuộc trò chuyện | Diff | Nhật ký | RFC Specs) */}
      <div className="flex items-center justify-between px-3 sm:px-6 border-t-2 border-neutral-800 bg-black text-xs py-1.5">
        <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onChangeNavTab('chat')}
            className={`px-2.5 py-1 font-extrabold uppercase tracking-wider text-[11px] transition-all cursor-pointer whitespace-nowrap border-2 rounded-none ${
              activeNavTab === 'chat'
                ? 'bg-cyan-400 text-black border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                : 'bg-black text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white'
            }`}
          >
            Cuộc trò chuyện
          </button>

          <button
            onClick={() => onChangeNavTab('diff')}
            className={`px-2.5 py-1 font-extrabold uppercase tracking-wider text-[11px] transition-all cursor-pointer whitespace-nowrap border-2 rounded-none ${
              activeNavTab === 'diff'
                ? 'bg-cyan-400 text-black border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                : 'bg-black text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white'
            }`}
          >
            Diff
          </button>

          <button
            onClick={() => onChangeNavTab('logs')}
            className={`px-2.5 py-1 font-extrabold uppercase tracking-wider text-[11px] transition-all cursor-pointer whitespace-nowrap border-2 rounded-none ${
              activeNavTab === 'logs'
                ? 'bg-cyan-400 text-black border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                : 'bg-black text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white'
            }`}
          >
            Nhật ký
          </button>

          <button
            onClick={() => onChangeNavTab('rfc')}
            className={`px-2.5 py-1 font-extrabold uppercase tracking-wider text-[11px] transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap border-2 rounded-none ${
              activeNavTab === 'rfc'
                ? 'bg-cyan-400 text-black border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                : 'bg-black text-cyan-300 border-neutral-800 hover:border-cyan-400'
            }`}
          >
            <BookOpen className={`w-3.5 h-3.5 ${activeNavTab === 'rfc' ? 'text-black' : 'text-cyan-400'}`} />
            <span>RFC Specs</span>
          </button>
        </div>

        {/* Right Split View Toggle Icon */}
        <button
          onClick={onToggleCleanHomeMode}
          className={`p-1.5 rounded-none border-2 transition-all cursor-pointer shrink-0 ml-2 ${
            cleanHomeMode ? 'bg-black border-neutral-800 text-neutral-400 hover:text-white' : 'bg-cyan-950 border-cyan-700 text-cyan-300'
          }`}
          title={cleanHomeMode ? "Mở Bảng Phân Tích Song Song" : "Đóng Bảng Phân Tích"}
        >
          <Columns className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

