import { useState } from 'react';
import { useDataStore } from '../store/dataStore';
import DashboardOverview from './panels/DashboardOverview';
import PlatformManager from './panels/PlatformManager';
import BlogManager from './panels/BlogManager';
import AnalyticsPanel from './panels/AnalyticsPanel';
import MaintenancePanel from './panels/MaintenancePanel';
import ActivityPanel from './panels/ActivityPanel';

type AdminTab = 'overview' | 'platforms' | 'blog' | 'analytics' | 'maintenance' | 'activity';

interface AdminDashboardProps {
  onLogout: () => void;
  onBack: () => void;
}

const tabs: { key: AdminTab; label: string; icon: string }[] = [
  { key: 'overview', label: 'Overview', icon: '📊' },
  { key: 'platforms', label: 'Platforms', icon: '🚀' },
  { key: 'blog', label: 'Blog', icon: '📝' },
  { key: 'analytics', label: 'Analytics', icon: '📈' },
  { key: 'maintenance', label: 'Maintenance', icon: '🔧' },
  { key: 'activity', label: 'Activity', icon: '📋' },
];

export default function AdminDashboard({ onLogout, onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const store = useDataStore();

  const handleLogout = () => {
    localStorage.removeItem('hydraforge_auth');
    onLogout();
  };

  const renderPanel = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview store={store} onNavigate={(tab: string) => setActiveTab(tab as AdminTab)} />;
      case 'platforms': return <PlatformManager store={store} />;
      case 'blog': return <BlogManager store={store} />;
      case 'analytics': return <AnalyticsPanel store={store} />;
      case 'maintenance': return <MaintenancePanel store={store} />;
      case 'activity': return <ActivityPanel store={store} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#111111] border-r border-gray-800 flex flex-col transform transition-transform lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500" />
            <div>
              <h1 className="font-bold text-lg">HydraForge</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <button
            onClick={onBack}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-white transition-all"
          >
            <span>🌐</span>
            <span className="font-medium">View Site</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
          >
            <span>🚪</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#111111]/95 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-xl font-bold capitalize">{activeTab === 'overview' ? 'Dashboard' : activeTab}</h2>
                <p className="text-sm text-gray-500">Manage your HydraForge ecosystem</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 rounded-full bg-gray-800/50 px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-gray-400">All Systems Online</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Panel content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderPanel()}
        </main>
      </div>
    </div>
  );
}
