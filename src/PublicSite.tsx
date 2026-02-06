import { useState } from 'react';
import PlatformCard from './components/PlatformCard';
import BlogCard from './components/BlogCard';
import { useDataStore } from './store/dataStore';

interface PublicSiteProps {
  onAdminClick: () => void;
}

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Platforms", href: "#platforms" },
  { name: "Blog", href: "#blog" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function PublicSite({ onAdminClick }: PublicSiteProps) {
  const { platforms, blogPosts } = useDataStore();
  const visiblePlatforms = platforms.filter(p => p.status !== 'Draft');
  const publishedPosts = blogPosts.filter(p => p.published);
  const [activePlatform, setActivePlatform] = useState(visiblePlatforms[0] ?? null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500" />
              <span className="text-xl font-bold">HydraForge</span>
            </div>
            
            <div className="hidden items-center space-x-8 lg:flex">
              {navItems.map((item) => (
                <a key={item.name} href={item.href}
                  className="text-gray-300 transition-colors hover:text-white">{item.name}</a>
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onAdminClick}
                className="rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2 font-semibold text-white transition-transform hover:scale-105"
              >
                Admin
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-gray-300 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-800 pt-4 space-y-3">
              {navItems.map((item) => (
                <a key={item.name} href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white py-2">{item.name}</a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              <h1 className="text-5xl font-bold leading-tight lg:text-7xl">
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  One Head,
                </span>
                <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Many Platforms
                </span>
              </h1>
              <p className="text-xl text-gray-300 lg:text-2xl">
                HydraForge is the parent platform that powers our ecosystem of specialized SaaS solutions. 
                Each platform is a head of the hydra—independent yet connected.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="#platforms" className="rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-3 text-lg font-semibold text-white transition-transform hover:scale-105 text-center">
                  Explore Platforms
                </a>
                <a href="#platforms" className="rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-white hover:text-black text-center">
                  View Demos
                </a>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="relative h-96 rounded-2xl bg-[#2a2a2a] p-8 lg:h-[500px]">
                <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-gray-900 to-black" />
                <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
                  <h3 className="text-2xl font-bold">Platform Dashboard</h3>
                  <p className="text-center text-gray-400">
                    Centralized control for all HydraForge platforms
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {visiblePlatforms.slice(0, 6).map((p) => (
                      <div key={p.id} className={`h-12 w-full rounded-lg bg-gradient-to-r ${p.imageColor} opacity-60`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Showcase */}
      <section id="platforms" className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold lg:text-5xl">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Our Platform Ecosystem
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
              Each platform is a specialized solution, connected through the HydraForge infrastructure
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePlatforms.map((platform) => (
              <PlatformCard
                key={platform.id}
                platform={platform}
                isActive={activePlatform?.id === platform.id}
                onClick={() => setActivePlatform(platform)}
              />
            ))}
          </div>

          {/* Active Platform Demo */}
          {activePlatform && (
            <div className="mt-20 rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {activePlatform.name} Demo
                    </span>
                  </h3>
                  <p className="mt-2 text-gray-400">Interactive showcase of {activePlatform.name}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-800 px-4 py-2 text-sm">
                    Status: <span className="font-semibold text-cyan-400">{activePlatform.status}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 rounded-xl bg-[#2a2a2a] overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center space-x-2 px-4 py-3 bg-[#1a1a1a] border-b border-gray-800">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-800 rounded-lg px-4 py-1.5 text-sm text-gray-400 text-center max-w-md mx-auto">
                      {activePlatform.name.toLowerCase().replace(/\s+/g, '')}.hydraforge.com
                    </div>
                  </div>
                </div>
                
                <div className="h-96">
                  {activePlatform.demoHtml ? (
                    <iframe
                      srcDoc={`<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#111;color:white;}</style></head><body>${activePlatform.demoHtml}</body></html>`}
                      className="w-full h-full border-0"
                      title={`${activePlatform.name} Demo`}
                      sandbox="allow-scripts"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <div className={`mx-auto h-20 w-20 rounded-full bg-gradient-to-r ${activePlatform.imageColor}`} />
                        <h4 className="mt-6 text-2xl font-bold">{activePlatform.name} Platform</h4>
                        <p className="mt-2 text-gray-400">{activePlatform.description}</p>
                        <div className="mt-6 flex justify-center space-x-4">
                          <div className="h-3 w-3 rounded-full bg-gray-600" />
                          <div className="h-3 w-3 rounded-full bg-gray-600" />
                          <div className="h-3 w-3 rounded-full bg-cyan-400" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold lg:text-5xl">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Tech Insights & Blog
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
              Latest thoughts on platform architecture, SaaS trends, and technology
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {publishedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {publishedPosts.length === 0 && (
            <div className="mt-16 text-center text-gray-500">
              <p>No published articles yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-4xl font-bold lg:text-5xl">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  The HydraForge Vision
                </span>
              </h2>
              <p className="mt-6 text-xl text-gray-300">
                HydraForge represents a new paradigm in SaaS architecture. Instead of building monolithic platforms, 
                we create specialized solutions that work together seamlessly.
              </p>
              <div className="mt-8 space-y-6">
                {[
                  { num: '1', title: 'Modular Architecture', desc: 'Each platform is independent yet interconnected' },
                  { num: '2', title: 'Shared Infrastructure', desc: 'Common services power all platforms efficiently' },
                  { num: '3', title: 'Scalable Ecosystem', desc: 'Add new platforms without disrupting existing ones' },
                ].map(item => (
                  <div key={item.num} className="flex items-start space-x-4">
                    <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                      <span className="text-xl font-bold">{item.num}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{item.title}</h4>
                      <p className="mt-2 text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="rounded-2xl bg-[#2a2a2a] p-8">
                <div className="h-64 rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
                    <h4 className="mt-6 text-2xl font-bold">Platform Network</h4>
                    <p className="mt-2 text-gray-400">{visiblePlatforms.length} platforms connected</p>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {visiblePlatforms.slice(0, 6).map((p) => (
                    <div key={p.id} className={`h-4 rounded-full bg-gradient-to-r ${p.imageColor} opacity-60`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold lg:text-5xl">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
              From concept to deployment in three simple steps
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              { step: '01', title: 'Build Your Platform', desc: 'Create your specialized SaaS solution using our framework and shared infrastructure components.' },
              { step: '02', title: 'Connect to HydraForge', desc: 'Integrate with our ecosystem APIs, authentication, and data layers for seamless connectivity.' },
              { step: '03', title: 'Launch & Scale', desc: 'Deploy your platform with enterprise-grade infrastructure and reach users through the ecosystem.' },
            ].map(item => (
              <div key={item.step} className="rounded-2xl bg-[#2a2a2a] p-8 text-center hover:scale-105 transition-transform">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 p-12 lg:p-20 text-center">
            <h2 className="text-4xl font-bold lg:text-5xl">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Ready to Join the Ecosystem?
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
              Build your next SaaS platform on HydraForge and leverage our shared infrastructure, 
              user base, and ecosystem integrations.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <button className="rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-3 text-lg font-semibold text-white transition-transform hover:scale-105">
                Get Started
              </button>
              <a href="#contact" className="rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-white hover:text-black text-center">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold lg:text-5xl">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Connect With Us
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
              Interested in adding your platform to the HydraForge ecosystem? Get in touch.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[
              { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Email', desc: 'contact@hydraforge.com', cta: 'Send Message →' },
              { icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z', title: 'Community', desc: 'Join our developer community', cta: 'Join Discord →' },
              { icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z', title: 'Documentation', desc: 'API docs and integration guides', cta: 'View Docs →' },
            ].map(card => (
              <div key={card.title} className="rounded-2xl bg-[#2a2a2a] p-8 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-bold">{card.title}</h3>
                <p className="mt-2 text-gray-400">{card.desc}</p>
                <button className="mt-4 text-cyan-400 hover:text-cyan-300">{card.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500" />
              <span className="text-xl font-bold">HydraForge</span>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 lg:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Documentation</a>
              <a href="#" className="text-gray-400 hover:text-white">Support</a>
              <button onClick={onAdminClick} className="text-gray-400 hover:text-white">Admin</button>
            </div>
            
            <div className="mt-8 text-center text-gray-500 lg:mt-0">
              © 2024 HydraForge. All platforms connected.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
