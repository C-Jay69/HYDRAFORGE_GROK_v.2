import { useState } from 'react';
import type { useDataStore, ActivityLog } from '../../store/dataStore';

interface Props {
  store: ReturnType<typeof useDataStore>;
}

export default function ActivityPanel({ store }: Props) {
  const { activityLogs } = store;
  const [filterType, setFilterType] = useState<ActivityLog['type'] | 'all'>('all');

  const filtered = filterType === 'all'
    ? activityLogs
    : activityLogs.filter(log => log.type === filterType);

  const typeConfig = {
    platform: { emoji: '🚀', label: 'Platform', color: 'bg-purple-500/20 text-purple-400' },
    blog: { emoji: '📝', label: 'Blog', color: 'bg-blue-500/20 text-blue-400' },
    system: { emoji: '🔧', label: 'System', color: 'bg-orange-500/20 text-orange-400' },
    user: { emoji: '👤', label: 'User', color: 'bg-green-500/20 text-green-400' },
  };

  const typeCounts = {
    all: activityLogs.length,
    platform: activityLogs.filter(l => l.type === 'platform').length,
    blog: activityLogs.filter(l => l.type === 'blog').length,
    system: activityLogs.filter(l => l.type === 'system').length,
    user: activityLogs.filter(l => l.type === 'user').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Activity Log
          </span>
        </h2>
        <p className="text-gray-400 mt-1">{activityLogs.length} events recorded</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'platform', 'blog', 'system', 'user'] as const).map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filterType === type
                ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30'
                : 'text-gray-400 hover:bg-gray-800/50 border border-transparent'
            }`}
          >
            {type === 'all' ? '📋' : typeConfig[type].emoji} {type} ({typeCounts[type]})
          </button>
        ))}
      </div>

      {/* Activity list */}
      <div className="rounded-xl bg-[#1a1a1a] border border-gray-800">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No activity found for this filter.</div>
        ) : (
          <div className="divide-y divide-gray-800/50">
            {filtered.map((log) => {
              const config = typeConfig[log.type];
              return (
                <div key={log.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-900/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-lg ${config.color}`}>
                      {config.emoji}
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <p className="font-medium">{log.action}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{log.target}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{log.timestamp}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
