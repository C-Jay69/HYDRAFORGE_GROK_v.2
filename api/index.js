import express from 'express';
import cors from 'cors';
import { defaultPlatforms, defaultBlogPosts, defaultAnalytics, defaultActivityLogs, ADMIN_CREDENTIALS } from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

// In-memory data store
let platforms = [...defaultPlatforms];
let blogPosts = [...defaultBlogPosts];
let activityLogs = [...defaultActivityLogs];

// Helper to add log
const addLog = (action, target, type) => {
    const newLog = {
        id: Date.now(),
        action,
        target,
        timestamp: "Just now",
        type,
    };
    activityLogs = [newLog, ...activityLogs.slice(0, 49)];
    return newLog;
};

// Routes

// Platforms
app.get('/api/platforms', (req, res) => {
    res.json(platforms);
});

app.post('/api/platforms', (req, res) => {
    const platform = req.body;
    const newPlatform = {
        ...platform,
        id: Date.now(),
        views: 0,
        users: 0,
        revenue: 0,
        createdAt: new Date().toISOString().split('T')[0],
    };
    platforms.push(newPlatform);
    addLog("Platform Added", platform.name, "platform");
    res.status(201).json(newPlatform);
});

app.put('/api/platforms/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updates = req.body;
    const index = platforms.findIndex(p => p.id === id);
    if (index !== -1) {
        platforms[index] = { ...platforms[index], ...updates };
        addLog("Platform Updated", platforms[index].name, "platform");
        res.json(platforms[index]);
    } else {
        res.status(404).json({ error: 'Platform not found' });
    }
});

app.delete('/api/platforms/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const platform = platforms.find(p => p.id === id);
    if (platform) {
        platforms = platforms.filter(p => p.id !== id);
        addLog("Platform Deleted", platform.name, "platform");
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Platform not found' });
    }
});

// Blog Posts
app.get('/api/blog', (req, res) => {
    res.json(blogPosts);
});

app.post('/api/blog', (req, res) => {
    const post = req.body;
    const newPost = { ...post, id: Date.now() };
    blogPosts.push(newPost);
    addLog("Blog Created", post.title, "blog");
    res.status(201).json(newPost);
});

app.put('/api/blog/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updates = req.body;
    const index = blogPosts.findIndex(p => p.id === id);
    if (index !== -1) {
        blogPosts[index] = { ...blogPosts[index], ...updates };
        addLog("Blog Updated", blogPosts[index].title, "blog");
        res.json(blogPosts[index]);
    } else {
        res.status(404).json({ error: 'Blog post not found' });
    }
});

app.delete('/api/blog/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = blogPosts.find(p => p.id === id);
    if (post) {
        blogPosts = blogPosts.filter(p => p.id !== id);
        addLog("Blog Deleted", post.title, "blog");
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Blog post not found' });
    }
});

// Analytics
app.get('/api/analytics', (req, res) => {
    res.json(defaultAnalytics);
});

// Logs
app.get('/api/logs', (req, res) => {
    res.json(activityLogs);
});

// Auth
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// System Reset
app.post('/api/system/reset', (req, res) => {
    platforms = [...defaultPlatforms];
    blogPosts = [...defaultBlogPosts];
    activityLogs = [...defaultActivityLogs];
    addLog("System Reset", "All data reset to defaults", "system");
    res.json({ success: true });
});

// For local testing
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
