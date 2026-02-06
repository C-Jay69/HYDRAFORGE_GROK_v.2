import { useState } from 'react';
import type { useDataStore, Platform } from '../../store/dataStore';

interface Props {
  store: ReturnType<typeof useDataStore>;
}

const gradientOptions = [
  { label: 'Blue → Cyan', value: 'from-blue-400 to-cyan-400' },
  { label: 'Purple → Blue', value: 'from-purple-400 to-blue-400' },
  { label: 'Cyan → Green', value: 'from-cyan-400 to-green-400' },
  { label: 'Orange → Red', value: 'from-orange-400 to-red-400' },
  { label: 'Pink → Purple', value: 'from-pink-400 to-purple-400' },
  { label: 'Green → Teal', value: 'from-green-400 to-teal-400' },
  { label: 'Yellow → Orange', value: 'from-yellow-400 to-orange-400' },
  { label: 'Indigo → Purple', value: 'from-indigo-400 to-purple-400' },
];

const emptyPlatform: {
  name: string;
  description: string;
  category: string;
  status: Platform['status'];
  demoUrl: string;
  imageColor: string;
  uptime: number;
  featured: boolean;
  demoHtml: string;
} = {
  name: '',
  description: '',
  category: '',
  status: 'Draft',
  demoUrl: '',
  imageColor: 'from-blue-400 to-cyan-400',
  uptime: 99.9,
  featured: false,
  demoHtml: '',
};

export default function PlatformManager({ store }: Props) {
  const { platforms, addPlatform, updatePlatform, deletePlatform } = store;
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState(emptyPlatform);
  const [previewDemo, setPreviewDemo] = useState<Platform | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const openNewForm = () => {
    setFormData(emptyPlatform);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (platform: Platform) => {
    setFormData({
      name: platform.name,
      description: platform.description,
      category: platform.category,
      status: platform.status,
      demoUrl: platform.demoUrl,
      imageColor: platform.imageColor,
      uptime: platform.uptime,
      featured: platform.featured,
      demoHtml: platform.demoHtml || '',
    });
    setEditingId(platform.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.description || !formData.category) return;

    if (editingId) {
      updatePlatform(editingId, formData);
    } else {
      addPlatform(formData);
    }
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyPlatform);
  };

  const handleDelete = (id: number) => {
    deletePlatform(id);
    setDeleteConfirm(null);
  };

  const filtered = platforms.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (previewDemo) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPreviewDemo(null)}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <h2 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {previewDemo.name} Demo Preview
              </span>
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              previewDemo.status === 'Live' ? 'bg-green-500/20 text-green-400' :
              previewDemo.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
              previewDemo.status === 'Alpha' ? 'bg-orange-500/20 text-orange-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {previewDemo.status}
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center space-x-2 px-4 py-3 bg-[#111] border-b border-gray-800">
            <div className="flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-800 rounded-lg px-4 py-1.5 text-sm text-gray-400 text-center">
                {previewDemo.name.toLowerCase().replace(/\s+/g, '')}.hydraforge.com
              </div>
            </div>
          </div>
          {/* Demo content */}
          <div className="h-[500px]">
            {previewDemo.demoHtml ? (
              <iframe
                srcDoc={`<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#111;color:white;}</style></head><body>${previewDemo.demoHtml}</body></html>`}
                className="w-full h-full border-0"
                title={`${previewDemo.name} Demo`}
                sandbox="allow-scripts"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className={`h-20 w-20 rounded-full bg-gradient-to-r ${previewDemo.imageColor} mb-6`} />
                <h3 className="text-2xl font-bold">{previewDemo.name}</h3>
                <p className="text-gray-400 mt-2">No demo content uploaded yet</p>
                <button
                  onClick={() => { setPreviewDemo(null); openEditForm(previewDemo); }}
                  className="mt-6 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2 font-semibold text-white"
                >
                  Add Demo Content
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Platform stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold">{previewDemo.views.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Views</p>
          </div>
          <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold">{previewDemo.users.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Users</p>
          </div>
          <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold">${(previewDemo.revenue / 1000).toFixed(1)}K</p>
            <p className="text-sm text-gray-400">Revenue</p>
          </div>
          <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-4 text-center">
            <p className="text-2xl font-bold">{previewDemo.uptime}%</p>
            <p className="text-sm text-gray-400">Uptime</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Platform Management
            </span>
          </h2>
          <p className="text-gray-400 mt-1">{platforms.length} platforms in ecosystem</p>
        </div>
        <button
          onClick={openNewForm}
          className="rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2.5 font-semibold text-white hover:scale-105 transition-transform"
        >
          + Add Platform
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search platforms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-[#1a1a1a] border border-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg bg-[#1a1a1a] border border-gray-800 px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
        >
          <option value="all">All Status</option>
          <option value="Live">Live</option>
          <option value="Beta">Beta</option>
          <option value="Alpha">Alpha</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      {/* Platform list */}
      <div className="space-y-4">
        {filtered.map((platform) => (
          <div key={platform.id} className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6 hover:border-gray-700 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-r ${platform.imageColor} flex-shrink-0`} />
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-bold">{platform.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      platform.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                      platform.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                      platform.status === 'Alpha' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {platform.status}
                    </span>
                    {platform.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{platform.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{platform.category}</span>
                    <span>•</span>
                    <span>{platform.views.toLocaleString()} views</span>
                    <span>•</span>
                    <span>{platform.users.toLocaleString()} users</span>
                    <span>•</span>
                    <span>{platform.demoHtml ? '✅ Demo' : '❌ No Demo'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 lg:flex-shrink-0">
                <button
                  onClick={() => setPreviewDemo(platform)}
                  className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Preview
                </button>
                <button
                  onClick={() => openEditForm(platform)}
                  className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Edit
                </button>
                {deleteConfirm === platform.id ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDelete(platform.id)}
                      className="rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/30"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(platform.id)}
                    className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-12 text-center">
            <p className="text-gray-400">No platforms found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-10 pb-10 px-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-[#1a1a1a] border border-gray-800 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">
                {editingId ? 'Edit Platform' : 'Add New Platform'}
              </h3>
              <button
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Platform Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    placeholder="e.g., NexusCRM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    placeholder="e.g., CRM, Analytics"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  placeholder="Brief description of the platform..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Platform['status'] })}
                    className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Alpha">Alpha</option>
                    <option value="Beta">Beta</option>
                    <option value="Live">Live</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Color Theme</label>
                  <select
                    value={formData.imageColor}
                    onChange={(e) => setFormData({ ...formData, imageColor: e.target.value })}
                    className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  >
                    {gradientOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Demo URL</label>
                <input
                  type="text"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  placeholder="https://demo.example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Demo HTML Content
                  <span className="text-gray-500 font-normal ml-2">(Paste HTML to render as an embedded demo)</span>
                </label>
                <textarea
                  value={formData.demoHtml}
                  onChange={(e) => setFormData({ ...formData, demoHtml: e.target.value })}
                  rows={8}
                  className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 font-mono text-sm"
                  placeholder='<div style="padding:40px;text-align:center;color:white;">&#10;  <h1>My Platform Demo</h1>&#10;  <p>Your demo content here...</p>&#10;</div>'
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Uptime %</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.uptime}
                    onChange={(e) => setFormData({ ...formData, uptime: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="h-5 w-5 rounded border-gray-600 bg-gray-900 text-cyan-400 focus:ring-cyan-400"
                    />
                    <span className="text-sm text-gray-300">Featured Platform</span>
                  </label>
                </div>
              </div>

              {/* Preview */}
              {formData.demoHtml && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Demo Preview</label>
                  <div className="rounded-lg border border-gray-700 overflow-hidden">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-gray-900 border-b border-gray-700">
                      <div className="flex space-x-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs text-gray-500">Preview</span>
                    </div>
                    <iframe
                      srcDoc={`<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#111;color:white;}</style></head><body>${formData.demoHtml}</body></html>`}
                      className="w-full h-48 border-0"
                      title="Preview"
                      sandbox="allow-scripts"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-800">
              <button
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="rounded-lg border border-gray-700 px-6 py-2.5 font-medium text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.name || !formData.description || !formData.category}
                className="rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2.5 font-semibold text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                {editingId ? 'Update Platform' : 'Add Platform'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
