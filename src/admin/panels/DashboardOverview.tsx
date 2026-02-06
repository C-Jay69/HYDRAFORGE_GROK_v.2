import type { useDataStore } from '../../store/dataStore';

interface Props {
  store: ReturnType<typeof useDataStore>;
  onNavigate: (tab: string) => void;
}

export default function DashboardOverview({ store, onNavigate }: Props) {
  const { platforms, blogPosts, activityLogs, analytics } = store;

  const totalRevenue = platforms.reduce((acc, p) => acc + p.revenue, 0);
  const totalUsers = platforms.reduce((acc, p) => acc + p.users, 0);
  const totalViews = platforms.reduce((acc, p) => acc + p.views, 0);
  const avgUptime = platforms.length > 0
    ? (platforms.reduce((acc, p) => acc + p.uptime, 0) / platforms.length).toFixed(2)
    : '0';

  const livePlatforms = platforms.filter(p => p.status === 'Live').length;
  const publishedPosts = blogPosts.filter(p => p.published).length;
  const latestMonth = analytics[analytics.length - 1];

  const statCards = [
    { label: 'Total Revenue', value: `$${(totalRevenue / 1000).toFixed(1)}K`, change: '+12.5%', positive: true, color: 'from-purple-500 to-cyan-500' },
    { label: 'Total Users', value: totalUsers.toLocaleString(), change: '+8.2%', positive: true, color: 'from-blue-400 to-cyan-400' },
    { label: 'Total Views', value: `${(totalViews / 1000).toFixed(1)}K`, change: '+15.1%', positive: true, color: 'from-cyan-400 to-green-400' },
    { label: 'Avg Uptime', value: `${avgUptime}%`, change: '+0.1%', positive: true, color: 'from-green-400 to-emerald-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6 hover:border-gray-700 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-r ${stat.color} opacity-80`} />
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform status */}
        <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Platform Status</h3>
            <button onClick={() => onNavigate('platforms')} className="text-cyan-400 text-sm hover:text-cyan-300">View All →</button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Live Platforms</span>
              <span className="font-bold text-green-400">{livePlatforms}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Beta</span>
              <span className="font-bold text-yellow-400">{platforms.filter(p => p.status === 'Beta').length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Alpha</span>
              <span className="font-bold text-orange-400">{platforms.filter(p => p.status === 'Alpha').length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Draft</span>
              <span className="font-bold text-gray-400">{platforms.filter(p => p.status === 'Draft').length}</span>
            </div>
            <div className="h-px bg-gray-800 my-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300 font-medium">Total</span>
              <span className="font-bold">{platforms.length}</span>
            </div>
          </div>
        </div>

        {/* Monthly summary */}
        <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">This Month</h3>
            <button onClick={() => onNavigate('analytics')} className="text-cyan-400 text-sm hover:text-cyan-300">Analytics →</button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Visitors</span>
                <span className="font-medium">{latestMonth?.visitors.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Page Views</span>
                <span className="font-medium">{latestMonth?.pageViews.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Sign-ups</span>
                <span className="font-medium">{latestMonth?.signups.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <div className="h-2 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Revenue</span>
                <span className="font-medium">${latestMonth?.revenue.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Blog summary */}
        <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Blog</h3>
            <button onClick={() => onNavigate('blog')} className="text-cyan-400 text-sm hover:text-cyan-300">Manage →</button>
          </div>
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Published</span>
              <span className="font-bold text-green-400">{publishedPosts}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Drafts</span>
              <span className="font-bold text-yellow-400">{blogPosts.length - publishedPosts}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Total</span>
              <span className="font-bold">{blogPosts.length}</span>
            </div>
          </div>
          <div className="h-px bg-gray-800 my-3" />
          <p className="text-sm text-gray-500">Latest categories:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {[...new Set(blogPosts.map(p => p.category))].map(cat => (
              <span key={cat} className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">{cat}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Recent Activity</h3>
          <button onClick={() => onNavigate('activity')} className="text-cyan-400 text-sm hover:text-cyan-300">View All →</button>
        </div>
        <div className="space-y-3">
          {activityLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-0">
              <div className="flex items-center space-x-3">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm ${
                  log.type === 'platform' ? 'bg-purple-500/20 text-purple-400' :
                  log.type === 'blog' ? 'bg-blue-500/20 text-blue-400' :
                  log.type === 'system' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {log.type === 'platform' ? '🚀' : log.type === 'blog' ? '📝' : log.type === 'system' ? '🔧' : '👤'}
                </div>
                <div>
                  <p className="text-sm font-medium">{log.action}</p>
                  <p className="text-xs text-gray-500">{log.target}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
