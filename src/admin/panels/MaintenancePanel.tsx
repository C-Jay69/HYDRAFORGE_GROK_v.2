import { useState } from 'react';
import type { useDataStore } from '../../store/dataStore';

interface Props {
  store: ReturnType<typeof useDataStore>;
}

interface SystemService {
  name: string;
  status: 'online' | 'degraded' | 'offline';
  uptime: string;
  lastCheck: string;
  response: string;
}

export default function MaintenancePanel({ store }: Props) {
  const { platforms, resetData } = store;
  const [resetConfirm, setResetConfirm] = useState(false);
  const [cacheCleared, setCacheCleared] = useState(false);
  const [backupRunning, setBackupRunning] = useState(false);
  const [backupComplete, setBackupComplete] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const services: SystemService[] = [
    { name: 'API Gateway', status: 'online', uptime: '99.99%', lastCheck: '30s ago', response: '45ms' },
    { name: 'Database Cluster', status: 'online', uptime: '99.97%', lastCheck: '15s ago', response: '12ms' },
    { name: 'CDN Network', status: 'online', uptime: '99.99%', lastCheck: '1m ago', response: '8ms' },
    { name: 'Auth Service', status: 'online', uptime: '99.95%', lastCheck: '45s ago', response: '32ms' },
    { name: 'Email Service', status: 'online', uptime: '99.90%', lastCheck: '2m ago', response: '120ms' },
    { name: 'File Storage', status: 'online', uptime: '99.98%', lastCheck: '1m ago', response: '55ms' },
    { name: 'Search Engine', status: 'online', uptime: '99.93%', lastCheck: '30s ago', response: '28ms' },
    { name: 'Analytics Pipeline', status: 'online', uptime: '99.88%', lastCheck: '1m ago', response: '85ms' },
  ];

  const handleClearCache = () => {
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 3000);
  };

  const handleBackup = () => {
    setBackupRunning(true);
    setTimeout(() => {
      setBackupRunning(false);
      setBackupComplete(true);
      setTimeout(() => setBackupComplete(false), 3000);
    }, 2000);
  };

  const handleReset = () => {
    resetData();
    setResetConfirm(false);
  };

  const systemStats = {
    cpu: 34,
    memory: 62,
    disk: 45,
    network: 28,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            System Maintenance
          </span>
        </h2>
        <p className="text-gray-400 mt-1">Monitor and maintain the HydraForge infrastructure</p>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(systemStats).map(([key, value]) => (
          <div key={key} className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400 capitalize">{key}</span>
              <span className="text-sm font-bold">{value}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full">
              <div
                className={`h-2 rounded-full transition-all ${
                  value > 80 ? 'bg-red-500' : value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6">
        <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Clear Cache */}
          <button
            onClick={handleClearCache}
            disabled={cacheCleared}
            className={`rounded-xl border p-5 text-left transition-all ${
              cacheCleared
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
            }`}
          >
            <span className="text-2xl">{cacheCleared ? '✅' : '🗑️'}</span>
            <h4 className="font-medium mt-3">{cacheCleared ? 'Cache Cleared!' : 'Clear Cache'}</h4>
            <p className="text-xs text-gray-500 mt-1">Purge all cached data</p>
          </button>

          {/* Run Backup */}
          <button
            onClick={handleBackup}
            disabled={backupRunning}
            className={`rounded-xl border p-5 text-left transition-all ${
              backupComplete
                ? 'bg-green-500/10 border-green-500/30'
                : backupRunning
                  ? 'bg-yellow-500/10 border-yellow-500/30'
                  : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
            }`}
          >
            <span className="text-2xl">{backupComplete ? '✅' : backupRunning ? '⏳' : '💾'}</span>
            <h4 className="font-medium mt-3">
              {backupComplete ? 'Backup Complete!' : backupRunning ? 'Backing up...' : 'Run Backup'}
            </h4>
            <p className="text-xs text-gray-500 mt-1">Full system backup</p>
          </button>

          {/* Maintenance Mode */}
          <button
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className={`rounded-xl border p-5 text-left transition-all ${
              maintenanceMode
                ? 'bg-orange-500/10 border-orange-500/30'
                : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
            }`}
          >
            <span className="text-2xl">{maintenanceMode ? '🔴' : '🟢'}</span>
            <h4 className="font-medium mt-3">{maintenanceMode ? 'Maintenance ON' : 'Maintenance Mode'}</h4>
            <p className="text-xs text-gray-500 mt-1">{maintenanceMode ? 'Site is in maintenance' : 'Toggle maintenance mode'}</p>
          </button>

          {/* Reset Data */}
          <button
            onClick={() => setResetConfirm(true)}
            className="rounded-xl border bg-gray-900/50 border-gray-800 hover:border-red-500/50 p-5 text-left transition-all"
          >
            <span className="text-2xl">🔄</span>
            <h4 className="font-medium mt-3">Reset Data</h4>
            <p className="text-xs text-gray-500 mt-1">Reset to defaults</p>
          </button>
        </div>
      </div>

      {/* Services Status */}
      <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Service Status</h3>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-green-400">All Systems Operational</span>
          </div>
        </div>
        <div className="space-y-3">
          {services.map(service => (
            <div key={service.name} className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-0">
              <div className="flex items-center space-x-3">
                <div className={`h-3 w-3 rounded-full ${
                  service.status === 'online' ? 'bg-green-400' :
                  service.status === 'degraded' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span className="hidden sm:inline">{service.response}</span>
                <span className="hidden md:inline">{service.uptime}</span>
                <span>{service.lastCheck}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  service.status === 'online' ? 'bg-green-500/20 text-green-400' :
                  service.status === 'degraded' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {service.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Health */}
      <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6">
        <h3 className="font-bold text-lg mb-4">Platform Health</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map(platform => (
            <div key={platform.id} className="rounded-lg bg-gray-900/50 border border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`h-8 w-8 rounded-lg bg-gradient-to-r ${platform.imageColor}`} />
                  <span className="font-medium text-sm">{platform.name}</span>
                </div>
                <div className={`h-2 w-2 rounded-full ${
                  platform.uptime >= 99.9 ? 'bg-green-400' :
                  platform.uptime >= 99 ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500">Uptime</span>
                  <p className="font-medium">{platform.uptime}%</p>
                </div>
                <div>
                  <span className="text-gray-500">Status</span>
                  <p className={`font-medium ${
                    platform.status === 'Live' ? 'text-green-400' :
                    platform.status === 'Beta' ? 'text-yellow-400' :
                    platform.status === 'Alpha' ? 'text-orange-400' : 'text-gray-400'
                  }`}>{platform.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset confirmation modal */}
      {resetConfirm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
          <div className="rounded-2xl bg-[#1a1a1a] border border-gray-800 p-8 max-w-md w-full">
            <div className="text-center">
              <span className="text-4xl">⚠️</span>
              <h3 className="text-xl font-bold mt-4">Reset All Data?</h3>
              <p className="text-gray-400 mt-2">
                This will reset all platforms and blog posts to their default state. This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => setResetConfirm(false)}
                className="rounded-lg border border-gray-700 px-6 py-2.5 font-medium text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="rounded-lg bg-red-500/20 px-6 py-2.5 font-semibold text-red-400 hover:bg-red-500/30"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
