import { useState, useRef } from 'react';
import type { useDataStore, BlogPost } from '../../store/dataStore';

interface Props {
  store: ReturnType<typeof useDataStore>;
}

const emptyPost: Omit<BlogPost, 'id'> = {
  title: '',
  excerpt: '',
  content: '',
  date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  category: '',
  readTime: '5 min',
  published: false,
  author: 'HydraForge Team',
  tags: [],
};

export default function BlogManager({ store }: Props) {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = store;
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>(emptyPost);
  const [tagInput, setTagInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openNew = () => {
    setFormData({
      ...emptyPost,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      category: post.category,
      readTime: post.readTime,
      published: post.published,
      author: post.author,
      tags: [...post.tags],
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFormData(prev => ({ ...prev, content }));
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.excerpt || !formData.category) return;
    if (editingId) {
      updateBlogPost(editingId, formData);
    } else {
      addBlogPost(formData);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const filtered = blogPosts.filter(p => {
    if (filter === 'published') return p.published;
    if (filter === 'draft') return !p.published;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Blog Management
            </span>
          </h2>
          <p className="text-gray-400 mt-1">{blogPosts.length} articles total</p>
        </div>
        <button
          onClick={openNew}
          className="rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2.5 font-semibold text-white hover:scale-105 transition-transform"
        >
          + New Article
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex space-x-2">
        {(['all', 'published', 'draft'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === f
                ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30'
                : 'text-gray-400 hover:bg-gray-800/50'
            }`}
          >
            {f} {f === 'all' ? `(${blogPosts.length})` : f === 'published' ? `(${blogPosts.filter(p => p.published).length})` : `(${blogPosts.filter(p => !p.published).length})`}
          </button>
        ))}
      </div>

      {/* Post list */}
      <div className="space-y-4">
        {filtered.map(post => (
          <div key={post.id} className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-6 hover:border-gray-700 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    post.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{post.excerpt}</p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime} read</span>
                  <span>•</span>
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 lg:flex-shrink-0">
                <button
                  onClick={() => {
                    updateBlogPost(post.id, { published: !post.published });
                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    post.published
                      ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  }`}
                >
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => openEdit(post)}
                  className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-700"
                >
                  Edit
                </button>
                {deleteConfirm === post.id ? (
                  <div className="flex items-center space-x-2">
                    <button onClick={() => { deleteBlogPost(post.id); setDeleteConfirm(null); }}
                      className="rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400">Confirm</button>
                    <button onClick={() => setDeleteConfirm(null)}
                      className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirm(post.id)}
                    className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20">Delete</button>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl bg-[#1a1a1a] border border-gray-800 p-12 text-center">
            <p className="text-gray-400">No articles found.</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-10 pb-10 px-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-[#1a1a1a] border border-gray-800 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">{editingId ? 'Edit Article' : 'New Article'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                <input type="text" value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  placeholder="Article title..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt *</label>
                <textarea value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  placeholder="Brief summary..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                <textarea value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  placeholder="Full article content..." />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                  <input type="text" value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    placeholder="Technical" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Read Time</label>
                  <input type="text" value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    placeholder="5 min" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
                  <input type="text" value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    placeholder="HydraForge Team" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                <div className="flex space-x-2">
                  <input type="text" value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                    className="flex-1 rounded-lg bg-gray-900 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    placeholder="Add a tag..." />
                  <button onClick={addTag}
                    className="rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-medium hover:bg-gray-700">Add</button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map(tag => (
                      <span key={tag} className="flex items-center space-x-1 rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
                        <span>{tag}</span>
                        <button onClick={() => removeTag(tag)} className="text-gray-500 hover:text-white ml-1">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="h-5 w-5 rounded border-gray-600 bg-gray-900" />
                  <span className="text-sm text-gray-300">Publish immediately</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-800">
              <button onClick={() => setShowForm(false)}
                className="rounded-lg border border-gray-700 px-6 py-2.5 font-medium text-gray-300 hover:bg-gray-800">Cancel</button>
              <button onClick={handleSave}
                disabled={!formData.title || !formData.excerpt || !formData.category}
                className="rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2.5 font-semibold text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100">
                {editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
