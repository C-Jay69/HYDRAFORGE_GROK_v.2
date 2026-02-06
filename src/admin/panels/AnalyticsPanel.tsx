import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { useDataStore } from '../../store/dataStore';

interface Props {
  store: ReturnType<typeof useDataStore>;
}

type MetricKey = 'visitors' | 'pageViews' | 'signups' | 'revenue';

const COLORS = ['#a855f7', '#06b6d4', '#22d3ee', '#34d399', '#f59e0b', '#ef4444'];

export default function AnalyticsPanel({ store }: Props) {
  const { analytics, platforms } = store;
  const [activeMetric, setActiveMetric] = useState<MetricKey>('visitors');

  const metrics: { key: MetricKey; label: string; color: string; prefix?: string }[] = [
    { key: 'visitors', label: 'Visitors', color: '#a855f7' },
    { key: 'pageViews', label: 'Page Views', color: '#06b6d4' },
    { key: 'signups', label: 'Sign-ups', color: '#22d3ee' },
    { key: 'revenue', label: 'Revenue', color: '#34d399', prefix: '$' },
  ];

  const currentMetric = metrics.find(m => m.key === activeMetric)!;

  const totalForMetric = analytics.reduce((sum, d) => sum + d[activeMetric], 0);
  const lastMonth = analytics[analytics.length - 1]?.[activeMetric] ?? 0;
  const prevMonth = analytics[analytics.length - 2]?.[activeMetric] ?? 0;
  const growth = prevMonth > 0 ? (((lastMonth - prevMonth) / prevMonth) * 100).toFixed(1) : '0';

  // Platform distribution by category for pie chart
  const categoryData = platforms.reduce((acc, p) => {
    const existing = acc.find(a => a.name === p.category);
    if (existing) {
      existing.value += p.users;
    } else {
      acc.push({ name: p.category, value: p.users });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Platform views for bar chart
  const platformViewData = platforms.map(p => ({
    name: p.name,
    views: p.views,
    users: p.users,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Analytics Dashboard
          </span>
        </h2>
        <p className="text-gray-400 mt-1">Track performance across all platforms</p>
      </div>

      {/* Metric selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(metric => {
          const total = analytics.reduce((sum, d) => sum + d[metric.key], 0);
          return (
            <button
              key={metric.key}
              onClick={() => setActiveMetric(metric.key)}
              className={`rounded-xl p-5 text-left transition-all ${
                activeMetric === metric.key
                  ? 'bg-[#1a1a1a] border-2 border-cyan-400/50 shadow-lg shadow-cyan-400/10'
                  : 'bg-[#1a1a1a] border border-gray-800 hover:border-gray-700'
              }`}
            >
              <p className="text-sm text-gray-400">{metric.label}</p>
              <p className="text-2xl font-bold mt-1">
                {metric.prefix}{total.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">Total (12 months)</p>
            </button>
          );
        })}
      </div>

      {/* Main chart */}
      <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-lg">{currentMetric.label} Over Time</h3>
            <p className="text-sm text-gray-500">Monthly trend for the past year</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Year Total</p>
            <p className="text-xl font-bold">{currentMetric.prefix}{totalForMetric.toLocaleString()}</p>
            <p className={`text-sm ${parseFloat(growth) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {parseFloat(growth) >= 0 ? '+' : ''}{growth}% MoM
            </p>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentMetric.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={currentMetric.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
              <Area
                type="monotone"
                dataKey={activeMetric}
                stroke={currentMetric.color}
                strokeWidth={2}
                fill="url(#colorMetric)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform views bar chart */}
        <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6">
          <h3 className="font-bold text-lg mb-4">Platform Views</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformViewData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
                <Bar dataKey="views" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category distribution pie chart */}
        <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6">
          <h3 className="font-bold text-lg mb-4">Users by Category</h3>
          <div className="h-64 flex items-center">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-2">
              {categoryData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-gray-400">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Platform performance table */}
      <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6">
        <h3 className="font-bold text-lg mb-4">Platform Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="pb-3 text-sm font-medium text-gray-400">Platform</th>
                <th className="pb-3 text-sm font-medium text-gray-400 text-right">Views</th>
                <th className="pb-3 text-sm font-medium text-gray-400 text-right">Users</th>
                <th className="pb-3 text-sm font-medium text-gray-400 text-right">Revenue</th>
                <th className="pb-3 text-sm font-medium text-gray-400 text-right">Uptime</th>
                <th className="pb-3 text-sm font-medium text-gray-400 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map(p => (
                <tr key={p.id} className="border-b border-gray-800/50 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className={`h-8 w-8 rounded-lg bg-gradient-to-r ${p.imageColor}`} />
                      <div>
                        <span className="font-medium">{p.name}</span>
                        <p className="text-xs text-gray-500">{p.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-right text-sm">{p.views.toLocaleString()}</td>
                  <td className="py-3 text-right text-sm">{p.users.toLocaleString()}</td>
                  <td className="py-3 text-right text-sm">${(p.revenue / 1000).toFixed(1)}K</td>
                  <td className="py-3 text-right text-sm">{p.uptime}%</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                      p.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                      p.status === 'Alpha' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
