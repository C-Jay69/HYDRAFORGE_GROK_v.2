import { useState, useCallback } from 'react';

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

export const defaultPlatforms: Platform[] = [
  {
    id: 1,
    name: "NexusCRM",
    description: "Customer Relationship Management platform with AI-powered insights and automated workflows for sales teams.",
    category: "CRM",
    status: "Live",
    demoUrl: "#",
    imageColor: "from-blue-400 to-cyan-400",
    views: 15420,
    users: 2340,
    revenue: 45200,
    uptime: 99.9,
    createdAt: "2024-01-15",
    featured: true,
    demoHtml: '<div style="padding:40px;text-align:center;background:linear-gradient(135deg,#1e3a5f,#0d1b2a);color:white;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif"><h1 style="font-size:32px;margin-bottom:16px">NexusCRM Dashboard</h1><p style="color:#94a3b8;margin-bottom:24px">AI-Powered Customer Management</p><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;width:100%;max-width:600px"><div style="background:rgba(255,255,255,0.1);padding:20px;border-radius:12px"><div style="font-size:24px;font-weight:bold;color:#60a5fa">2,340</div><div style="color:#94a3b8;font-size:14px">Active Users</div></div><div style="background:rgba(255,255,255,0.1);padding:20px;border-radius:12px"><div style="font-size:24px;font-weight:bold;color:#22d3ee">$45.2K</div><div style="color:#94a3b8;font-size:14px">Revenue</div></div><div style="background:rgba(255,255,255,0.1);padding:20px;border-radius:12px"><div style="font-size:24px;font-weight:bold;color:#34d399">98.5%</div><div style="color:#94a3b8;font-size:14px">Satisfaction</div></div></div></div>',
  },
  {
    id: 2,
    name: "FlowTask",
    description: "Project management and workflow automation for distributed teams with real-time collaboration.",
    category: "Productivity",
    status: "Beta",
    demoUrl: "#",
    imageColor: "from-purple-400 to-blue-400",
    views: 8730,
    users: 1250,
    revenue: 22100,
    uptime: 99.5,
    createdAt: "2024-02-20",
    featured: true,
    demoHtml: '<div style="padding:40px;background:linear-gradient(135deg,#2d1b4e,#1a0a2e);color:white;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif"><h1 style="font-size:32px;margin-bottom:16px">FlowTask</h1><p style="color:#c4b5fd;margin-bottom:24px">Workflow Automation Suite</p><div style="width:100%;max-width:500px"><div style="background:rgba(255,255,255,0.08);padding:16px;border-radius:12px;margin-bottom:12px;display:flex;align-items:center;gap:12px"><div style="width:20px;height:20px;border-radius:50%;background:#22d3ee"></div><span>Design Sprint — In Progress</span></div><div style="background:rgba(255,255,255,0.08);padding:16px;border-radius:12px;margin-bottom:12px;display:flex;align-items:center;gap:12px"><div style="width:20px;height:20px;border-radius:50%;background:#a855f7"></div><span>API Integration — Review</span></div><div style="background:rgba(255,255,255,0.08);padding:16px;border-radius:12px;display:flex;align-items:center;gap:12px"><div style="width:20px;height:20px;border-radius:50%;background:#34d399"></div><span>Testing Phase — Complete</span></div></div></div>',
  },
  {
    id: 3,
    name: "DataForge",
    description: "Real-time data analytics and visualization platform with ML-powered insights.",
    category: "Analytics",
    status: "Live",
    demoUrl: "#",
    imageColor: "from-cyan-400 to-green-400",
    views: 12100,
    users: 1890,
    revenue: 38500,
    uptime: 99.8,
    createdAt: "2024-01-05",
    featured: false,
    demoHtml: '<div style="padding:40px;background:linear-gradient(135deg,#0a2e2a,#0d1117);color:white;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif"><h1 style="font-size:32px;margin-bottom:16px">DataForge Analytics</h1><p style="color:#5eead4;margin-bottom:24px">Real-Time Data Visualization</p><div style="display:flex;gap:4px;align-items:flex-end;height:120px;margin-bottom:24px"><div style="width:30px;background:linear-gradient(to top,#06b6d4,#22d3ee);height:40%;border-radius:4px 4px 0 0"></div><div style="width:30px;background:linear-gradient(to top,#06b6d4,#22d3ee);height:65%;border-radius:4px 4px 0 0"></div><div style="width:30px;background:linear-gradient(to top,#06b6d4,#22d3ee);height:45%;border-radius:4px 4px 0 0"></div><div style="width:30px;background:linear-gradient(to top,#06b6d4,#22d3ee);height:80%;border-radius:4px 4px 0 0"></div><div style="width:30px;background:linear-gradient(to top,#06b6d4,#22d3ee);height:55%;border-radius:4px 4px 0 0"></div><div style="width:30px;background:linear-gradient(to top,#06b6d4,#22d3ee);height:90%;border-radius:4px 4px 0 0"></div><div style="width:30px;background:linear-gradient(to top,#06b6d4,#22d3ee);height:70%;border-radius:4px 4px 0 0"></div></div><p style="color:#94a3b8">Processing 1.2M events/second</p></div>',
  },
  {
    id: 4,
    name: "SecureVault",
    description: "Enterprise-grade security and compliance management with zero-trust architecture.",
    category: "Security",
    status: "Alpha",
    demoUrl: "#",
    imageColor: "from-orange-400 to-red-400",
    views: 5200,
    users: 680,
    revenue: 12300,
    uptime: 99.99,
    createdAt: "2024-03-01",
    featured: false,
    demoHtml: '',
  },
  {
    id: 5,
    name: "MarketPulse",
    description: "AI-driven market intelligence and competitor analysis for strategic decision making.",
    category: "Marketing",
    status: "Live",
    demoUrl: "#",
    imageColor: "from-pink-400 to-purple-400",
    views: 9800,
    users: 1560,
    revenue: 29800,
    uptime: 99.7,
    createdAt: "2024-01-28",
    featured: true,
    demoHtml: '',
  },
  {
    id: 6,
    name: "CloudSync",
    description: "Multi-cloud infrastructure management and optimization with cost analytics.",
    category: "Infrastructure",
    status: "Beta",
    demoUrl: "#",
    imageColor: "from-green-400 to-teal-400",
    views: 6300,
    users: 940,
    revenue: 18700,
    uptime: 99.6,
    createdAt: "2024-02-10",
    featured: false,
    demoHtml: '',
  },
];

export const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of SaaS: Multi-Platform Ecosystems",
    excerpt: "Exploring how interconnected platforms create more value than standalone solutions.",
    content: "Full article content about multi-platform ecosystems and how they're shaping the future of SaaS...",
    date: "Mar 15, 2024",
    category: "Industry",
    readTime: "5 min",
    published: true,
    author: "HydraForge Team",
    tags: ["SaaS", "Ecosystem", "Strategy"],
  },
  {
    id: 2,
    title: "Building Scalable Architecture for Platform Networks",
    excerpt: "Technical deep dive into the architecture patterns that power HydraForge's ecosystem.",
    content: "In-depth technical article about scalable architecture patterns for platform networks...",
    date: "Mar 10, 2024",
    category: "Technical",
    readTime: "8 min",
    published: true,
    author: "Engineering Team",
    tags: ["Architecture", "Scalability", "Backend"],
  },
  {
    id: 3,
    title: "AI Integration Strategies for Modern SaaS Platforms",
    excerpt: "How we're implementing AI across our platform portfolio to enhance user experiences.",
    content: "Comprehensive guide to AI integration strategies across SaaS platforms...",
    date: "Mar 5, 2024",
    category: "AI",
    readTime: "6 min",
    published: true,
    author: "AI Research Team",
    tags: ["AI", "Machine Learning", "Integration"],
  },
];

export const defaultAnalytics: AnalyticsData[] = [
  { date: "Jan", visitors: 4200, pageViews: 12400, signups: 320, revenue: 28500 },
  { date: "Feb", visitors: 5100, pageViews: 15200, signups: 410, revenue: 32100 },
  { date: "Mar", visitors: 4800, pageViews: 14100, signups: 380, revenue: 30800 },
  { date: "Apr", visitors: 6200, pageViews: 18600, signups: 520, revenue: 41200 },
  { date: "May", visitors: 7100, pageViews: 21300, signups: 610, revenue: 48500 },
  { date: "Jun", visitors: 6800, pageViews: 20400, signups: 580, revenue: 45900 },
  { date: "Jul", visitors: 7900, pageViews: 23700, signups: 690, revenue: 52300 },
  { date: "Aug", visitors: 8500, pageViews: 25500, signups: 740, revenue: 56100 },
  { date: "Sep", visitors: 9200, pageViews: 27600, signups: 810, revenue: 61400 },
  { date: "Oct", visitors: 10100, pageViews: 30300, signups: 890, revenue: 67200 },
  { date: "Nov", visitors: 11400, pageViews: 34200, signups: 980, revenue: 74800 },
  { date: "Dec", visitors: 12800, pageViews: 38400, signups: 1100, revenue: 82500 },
];

export const defaultActivityLogs: ActivityLog[] = [
  { id: 1, action: "Platform Updated", target: "NexusCRM", timestamp: "2 min ago", type: "platform" },
  { id: 2, action: "Blog Published", target: "AI Integration Strategies", timestamp: "15 min ago", type: "blog" },
  { id: 3, action: "New User Signup", target: "enterprise@company.com", timestamp: "32 min ago", type: "user" },
  { id: 4, action: "System Backup", target: "Full Backup Complete", timestamp: "1 hour ago", type: "system" },
  { id: 5, action: "Platform Deployed", target: "FlowTask v2.1", timestamp: "2 hours ago", type: "platform" },
  { id: 6, action: "SSL Renewed", target: "*.hydraforge.com", timestamp: "3 hours ago", type: "system" },
  { id: 7, action: "Blog Draft", target: "Kubernetes Best Practices", timestamp: "5 hours ago", type: "blog" },
  { id: 8, action: "User Role Changed", target: "dev@hydraforge.com", timestamp: "6 hours ago", type: "user" },
];

const STORAGE_KEY = 'hydraforge_data';

interface StoreData {
  platforms: Platform[];
  blogPosts: BlogPost[];
  activityLogs: ActivityLog[];
}

function loadFromStorage(): StoreData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

function saveToStorage(data: StoreData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

export function useDataStore() {
  const stored = loadFromStorage();

  const [platforms, setPlatformsState] = useState<Platform[]>(stored?.platforms ?? defaultPlatforms);
  const [blogPosts, setBlogPostsState] = useState<BlogPost[]>(stored?.blogPosts ?? defaultBlogPosts);
  const [activityLogs, setActivityLogsState] = useState<ActivityLog[]>(stored?.activityLogs ?? defaultActivityLogs);

  const persist = useCallback((p: Platform[], b: BlogPost[], a: ActivityLog[]) => {
    saveToStorage({ platforms: p, blogPosts: b, activityLogs: a });
  }, []);

  const addLog = useCallback((action: string, target: string, type: ActivityLog['type'], currentLogs: ActivityLog[]) => {
    const newLog: ActivityLog = {
      id: Date.now(),
      action,
      target,
      timestamp: "Just now",
      type,
    };
    return [newLog, ...currentLogs.slice(0, 49)];
  }, []);

  const setPlatforms = useCallback((newPlatforms: Platform[]) => {
    setPlatformsState(newPlatforms);
    persist(newPlatforms, blogPosts, activityLogs);
  }, [blogPosts, activityLogs, persist]);

  const setBlogPosts = useCallback((newPosts: BlogPost[]) => {
    setBlogPostsState(newPosts);
    persist(platforms, newPosts, activityLogs);
  }, [platforms, activityLogs, persist]);

  const setActivityLogs = useCallback((newLogs: ActivityLog[]) => {
    setActivityLogsState(newLogs);
    persist(platforms, blogPosts, newLogs);
  }, [platforms, blogPosts, persist]);

  const addPlatform = useCallback((platform: Omit<Platform, 'id' | 'views' | 'users' | 'revenue' | 'createdAt'>) => {
    const newPlatform: Platform = {
      ...platform,
      id: Date.now(),
      views: 0,
      users: 0,
      revenue: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const newPlatforms = [...platforms, newPlatform];
    const newLogs = addLog("Platform Added", platform.name, "platform", activityLogs);
    setPlatformsState(newPlatforms);
    setActivityLogsState(newLogs);
    persist(newPlatforms, blogPosts, newLogs);
    return newPlatform;
  }, [platforms, blogPosts, activityLogs, persist, addLog]);

  const updatePlatform = useCallback((id: number, updates: Partial<Platform>) => {
    const newPlatforms = platforms.map(p => p.id === id ? { ...p, ...updates } : p);
    const target = platforms.find(p => p.id === id);
    const newLogs = addLog("Platform Updated", target?.name ?? "Unknown", "platform", activityLogs);
    setPlatformsState(newPlatforms);
    setActivityLogsState(newLogs);
    persist(newPlatforms, blogPosts, newLogs);
  }, [platforms, blogPosts, activityLogs, persist, addLog]);

  const deletePlatform = useCallback((id: number) => {
    const target = platforms.find(p => p.id === id);
    const newPlatforms = platforms.filter(p => p.id !== id);
    const newLogs = addLog("Platform Deleted", target?.name ?? "Unknown", "platform", activityLogs);
    setPlatformsState(newPlatforms);
    setActivityLogsState(newLogs);
    persist(newPlatforms, blogPosts, newLogs);
  }, [platforms, blogPosts, activityLogs, persist, addLog]);

  const addBlogPost = useCallback((post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = { ...post, id: Date.now() };
    const newPosts = [...blogPosts, newPost];
    const newLogs = addLog("Blog Created", post.title, "blog", activityLogs);
    setBlogPostsState(newPosts);
    setActivityLogsState(newLogs);
    persist(platforms, newPosts, newLogs);
    return newPost;
  }, [platforms, blogPosts, activityLogs, persist, addLog]);

  const updateBlogPost = useCallback((id: number, updates: Partial<BlogPost>) => {
    const newPosts = blogPosts.map(p => p.id === id ? { ...p, ...updates } : p);
    const target = blogPosts.find(p => p.id === id);
    const newLogs = addLog("Blog Updated", target?.title ?? "Unknown", "blog", activityLogs);
    setBlogPostsState(newPosts);
    setActivityLogsState(newLogs);
    persist(platforms, newPosts, newLogs);
  }, [platforms, blogPosts, activityLogs, persist, addLog]);

  const deleteBlogPost = useCallback((id: number) => {
    const target = blogPosts.find(p => p.id === id);
    const newPosts = blogPosts.filter(p => p.id !== id);
    const newLogs = addLog("Blog Deleted", target?.title ?? "Unknown", "blog", activityLogs);
    setBlogPostsState(newPosts);
    setActivityLogsState(newLogs);
    persist(platforms, newPosts, newLogs);
  }, [platforms, blogPosts, activityLogs, persist, addLog]);

  const resetData = useCallback(() => {
    const newLogs = addLog("System Reset", "All data reset to defaults", "system", defaultActivityLogs);
    setPlatformsState(defaultPlatforms);
    setBlogPostsState(defaultBlogPosts);
    setActivityLogsState(newLogs);
    persist(defaultPlatforms, defaultBlogPosts, newLogs);
  }, [persist, addLog]);

  return {
    platforms,
    blogPosts,
    activityLogs,
    analytics: defaultAnalytics,
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
