import { useState, useCallback, useEffect } from 'react';

export interface Platform {
  id: number;
  name: string;
  description: string;
  category: string;
  status: 'Live' | 'Beta' | 'Alpha' | 'Draft';
  demoUrl: string;
  imageColor: string;
  views: number;
  users: number;
  revenue: number;
  uptime: number;
  createdAt: string;
  demoHtml?: string;
  featured: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  published: boolean;
  author: string;
  tags: string[];
}

export interface AnalyticsData {
  date: string;
  visitors: number;
  pageViews: number;
  signups: number;
  revenue: number;
}

export interface ActivityLog {
  id: number;
  action: string;
  target: string;
  timestamp: string;
  type: 'platform' | 'blog' | 'system' | 'user';
}

export const ADMIN_CREDENTIALS = {
  email: 'admin@hydraforge.com',
  password: 'HydraForge2024!',
};

export function useDataStore() {
  const [platforms, setPlatformsState] = useState<Platform[]>([]);
  const [blogPosts, setBlogPostsState] = useState<BlogPost[]>([]);
  const [activityLogs, setActivityLogsState] = useState<ActivityLog[]>([]);
  const [analytics, setAnalyticsState] = useState<AnalyticsData[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const [platRes, blogRes, logRes, anaRes] = await Promise.all([
        fetch('/api/platforms'),
        fetch('/api/blog'),
        fetch('/api/logs'),
        fetch('/api/analytics')
      ]);

      if (platRes.ok) setPlatformsState(await platRes.json());
      if (blogRes.ok) setBlogPostsState(await blogRes.json());
      if (logRes.ok) setActivityLogsState(await logRes.json());
      if (anaRes.ok) setAnalyticsState(await anaRes.json());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const setPlatforms = useCallback((newPlatforms: Platform[]) => {
    // This method might need refactoring if it was used to bulk update.
    // For now, we'll keep it but it might not persist to backend correctly without a bulk API.
    // Assuming it's used for local state updates or we need to implement bulk update.
    // For simplicity in this migration, we'll update state and warn or implement individual updates if needed.
    setPlatformsState(newPlatforms);
  }, []);

  const setBlogPosts = useCallback((newPosts: BlogPost[]) => {
    setBlogPostsState(newPosts);
  }, []);

  const setActivityLogs = useCallback((newLogs: ActivityLog[]) => {
    setActivityLogsState(newLogs);
  }, []);

  const addPlatform = useCallback(async (platform: Omit<Platform, 'id' | 'views' | 'users' | 'revenue' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/platforms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(platform),
      });
      if (res.ok) {
        const newPlatform = await res.json();
        setPlatformsState(prev => [...prev, newPlatform]);
        fetchData(); // Refresh logs
        return newPlatform;
      }
    } catch (error) {
      console.error("Failed to add platform:", error);
    }
  }, [fetchData]);

  const updatePlatform = useCallback(async (id: number, updates: Partial<Platform>) => {
    try {
      const res = await fetch(`/api/platforms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updated = await res.json();
        setPlatformsState(prev => prev.map(p => p.id === id ? updated : p));
        fetchData(); // Refresh logs
      }
    } catch (error) {
      console.error("Failed to update platform:", error);
    }
  }, [fetchData]);

  const deletePlatform = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/platforms/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPlatformsState(prev => prev.filter(p => p.id !== id));
        fetchData(); // Refresh logs
      }
    } catch (error) {
      console.error("Failed to delete platform:", error);
    }
  }, [fetchData]);

  const addBlogPost = useCallback(async (post: Omit<BlogPost, 'id'>) => {
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (res.ok) {
        const newPost = await res.json();
        setBlogPostsState(prev => [...prev, newPost]);
        fetchData(); // Refresh logs
        return newPost;
      }
    } catch (error) {
      console.error("Failed to add blog post:", error);
    }
  }, [fetchData]);

  const updateBlogPost = useCallback(async (id: number, updates: Partial<BlogPost>) => {
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updated = await res.json();
        setBlogPostsState(prev => prev.map(p => p.id === id ? updated : p));
        fetchData(); // Refresh logs
      }
    } catch (error) {
      console.error("Failed to update blog post:", error);
    }
  }, [fetchData]);

  const deleteBlogPost = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogPostsState(prev => prev.filter(p => p.id !== id));
        fetchData(); // Refresh logs
      }
    } catch (error) {
      console.error("Failed to delete blog post:", error);
    }
  }, [fetchData]);

  const resetData = useCallback(async () => {
    try {
      const res = await fetch('/api/system/reset', { method: 'POST' });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to reset data:", error);
    }
  }, [fetchData]);

  return {
    platforms,
    blogPosts,
    activityLogs,
    analytics,
    setPlatforms,
    setBlogPosts,
    setActivityLogs,
    addPlatform,
    updatePlatform,
    deletePlatform,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    resetData,
  };
}
