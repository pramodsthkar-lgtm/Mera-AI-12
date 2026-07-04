'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Settings, 
  Plus, 
  Github, 
  Terminal, 
  CheckCircle, 
  AlertCircle, 
  Server, 
  Globe, 
  RefreshCw, 
  FileCode2, 
  ShieldCheck, 
  History, 
  CreditCard,
  ChevronRight,
  Database,
  UploadCloud,
  Wrench,
  Zap,
  ArrowLeft,
  PlayCircle,
  MessageSquare,
  BellRing,
  Calendar,
  Smartphone,
  Search,
  Lock,
  MessageCircle,
  Mail,
  BrainCircuit,
  GitPullRequest,
  Activity,
  Code2,
  Wand2,
  Sparkles,
  Loader2
} from 'lucide-react';

type ViewState = 'dashboard' | 'new_job' | 'project_detail' | 'repair_execution' | 'report' | 'ai_assistant' | 'settings' | 'billing' | 'ai_builder' | 'builder_execution';

// --- MOCK DATA ---
const PROJECTS = [
  { id: 1, url: 'ecommerce-frontend.vercel.app', status: 'Warning', lastFix: '2 hours ago', issuesFixed: 12, healthScore: 78, framework: 'Next.js' },
  { id: 2, url: 'blog.acmecorp.com', status: 'Healthy', lastFix: '1 day ago', issuesFixed: 4, healthScore: 98, framework: 'WordPress' },
  { id: 3, url: 'dashboard.saas-app.io', status: 'Critical', lastFix: '3 days ago', issuesFixed: 28, healthScore: 45, framework: 'React' },
];

const METRICS = [
  { label: 'Sites Monitored', value: '14', icon: Globe, color: 'text-blue-400' },
  { label: 'Autonomous Fixes', value: '1,284', icon: Wrench, color: 'text-emerald-400' },
  { label: 'Tests Passed', value: '9,402', icon: ShieldCheck, color: 'text-indigo-400' },
  { label: 'AI Memory Patterns', value: '342', icon: BrainCircuit, color: 'text-amber-400' },
];

const CONNECTION_METHODS = [
  { id: 'github', name: 'GitHub', icon: Github, description: 'Clone, Commit, & PR' },
  { id: 'vercel', name: 'Vercel', icon: UploadCloud, description: 'Direct Vercel Deploy' },
  { id: 'netlify', name: 'Netlify', icon: UploadCloud, description: 'Direct Netlify Deploy' },
  { id: 'wordpress', name: 'WordPress', icon: Globe, description: 'WP Admin Login (REST)' },
  { id: 'cpanel', name: 'cPanel', icon: Database, description: 'Legacy cPanel access' },
  { id: 'ftp', name: 'FTP/SFTP', icon: Server, description: 'Direct server connection' },
];

const AGENT_STAGES = [
  { id: 'scan', name: 'Scanner Agent', icon: Search, desc: 'Detects HTML, CSS, React issues' },
  { id: 'repair', name: 'Repair Agent', icon: Wrench, desc: 'Edits code automatically' },
  { id: 'test', name: 'Test Agent', icon: Activity, desc: 'Playwright browser automation' },
  { id: 'deploy', name: 'Deploy Agent', icon: UploadCloud, desc: 'GitHub PR & Auto Deploy' }
];

const REPAIR_STEPS = [
  { stage: 'scan', log: "[SCANNER AGENT] Initializing repository clone (GitHub)..." },
  { stage: 'scan', log: "[SCANNER AGENT] Analyzing AST and dependencies..." },
  { stage: 'scan', log: "[SCANNER AGENT] 3 critical issues found: Hydration mismatch, broken links, CSS grid." },
  { stage: 'repair', log: "[REPAIR AGENT] Accessing AI Memory for similar previous fixes..." },
  { stage: 'repair', log: "[REPAIR AGENT] Rewriting layout.tsx to fix hydration mismatch." },
  { stage: 'repair', log: "[REPAIR AGENT] Updating Next.js Image components in /public." },
  { stage: 'repair', log: "[REPAIR AGENT] Patching Tailwind classes for mobile viewports." },
  { stage: 'test', log: "[TEST AGENT] Spinning up Playwright headless browsers..." },
  { stage: 'test', log: "[TEST AGENT] Running e2e/critical-path.spec.ts (Chromium, WebKit, Firefox)..." },
  { stage: 'test', log: "[TEST AGENT] Validating forms and responsive layouts..." },
  { stage: 'test', log: "[TEST AGENT] Success: 42/42 tests passed. No regressions detected." },
  { stage: 'deploy', log: "[DEPLOY AGENT] Creating pre-deployment backup snapshot..." },
  { stage: 'deploy', log: "[DEPLOY AGENT] Committing changes: 'Autonomous fix: Hydration and UI patches'" },
  { stage: 'deploy', log: "[DEPLOY AGENT] Opening GitHub Pull Request..." },
  { stage: 'deploy', log: "[DEPLOY AGENT] Triggering Vercel production deployment..." },
  { stage: 'deploy', log: "[SYSTEM] Repair cycle complete. Website health restored." }
];

export default function RepairPlatform() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  
  // Job State
  const [targetUrl, setTargetUrl] = useState('');
  const [connectionMethod, setConnectionMethod] = useState('github');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  // Execution State
  const [activeStage, setActiveStage] = useState<string>('');
  const [scanLogs, setScanLogs] = useState<{stage: string, log: string}[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const logContainerRef = useRef<HTMLDivElement>(null);
  
  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Hello! I am your Autonomous Website Engineer. I learn from every repair and can help you maintain your digital infrastructure. How can I assist you today?' }
  ]);

  // Builder State
  const [builderPrompt, setBuilderPrompt] = useState('');
  const [builderProgress, setBuilderProgress] = useState(0);
  const [builderLogs, setBuilderLogs] = useState<{stage: string, log: string}[]>([]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [scanLogs]);

  const viewProject = (project: any) => {
    setSelectedProject(project);
    setCurrentView('project_detail');
  };

  const startAutonomousRepair = () => {
    setCurrentView('repair_execution');
    setScanLogs([]);
    setScanProgress(0);
    setActiveStage('scan');
    
    let step = 0;
    const interval = setInterval(() => {
      if (step < REPAIR_STEPS.length) {
        const currentStep = REPAIR_STEPS[step];
        setActiveStage(currentStep.stage);
        setScanLogs(prev => [...prev, currentStep]);
        setScanProgress(Math.floor(((step + 1) / REPAIR_STEPS.length) * 100));
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentView('report');
        }, 1500);
      }
    }, 600);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: 'user', text: chatInput }]);
    const input = chatInput;
    setChatInput('');
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Based on my AI Memory patterns, "${input}" often correlates with recent dependency updates. I can deploy the Repair Agent to automatically patch the configuration and run Playwright tests to verify.` 
      }]);
    }, 1000);
  };

  const startWebsiteGeneration = () => {
    if (!builderPrompt.trim()) return;
    setCurrentView('builder_execution');
    setBuilderLogs([]);
    setBuilderProgress(0);
    
    const BUILDER_STEPS = [
      { stage: 'design', log: "[AI ARCHITECT] Analyzing prompt and generating optimal layout..." },
      { stage: 'design', log: "[AI ARCHITECT] Selecting Tailwind CSS color palette and typography..." },
      { stage: 'code', log: "[AI CODER] Scaffolding Next.js application..." },
      { stage: 'code', log: "[AI CODER] Writing reusable React components (Hero, Features, Footer)..." },
      { stage: 'code', log: "[AI CODER] Implementing responsive grid and mobile navigation..." },
      { stage: 'code', log: "[AI CODER] Wiring up mock API integration..." },
      { stage: 'deploy', log: "[DEPLOYMENT AGENT] Initializing GitHub repository..." },
      { stage: 'deploy', log: "[DEPLOYMENT AGENT] Pushing compiled code to 'main' branch..." },
      { stage: 'deploy', log: "[DEPLOYMENT AGENT] Triggering Vercel build pipeline..." },
      { stage: 'deploy', log: "[SYSTEM] Website generated and deployed successfully! Live URL ready." }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < BUILDER_STEPS.length) {
        setBuilderLogs(prev => [...prev, BUILDER_STEPS[step]]);
        setBuilderProgress(Math.floor(((step + 1) / BUILDER_STEPS.length) * 100));
        step++;
      } else {
        clearInterval(interval);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 flex overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl flex flex-col z-20 relative">
        <div className="p-6 flex items-center gap-3 border-b border-zinc-800/50">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <BrainCircuit size={18} />
          </div>
          <span className="font-display font-semibold text-zinc-100 tracking-tight">AutoFix AI Engineer</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')} 
          />
          <SidebarItem 
            icon={Plus} 
            label="New Repair Job" 
            active={currentView === 'new_job'} 
            onClick={() => setCurrentView('new_job')} 
          />
          <SidebarItem 
            icon={MessageSquare} 
            label="AI Chat Assistant" 
            active={currentView === 'ai_assistant'} 
            onClick={() => setCurrentView('ai_assistant')} 
          />
          <SidebarItem 
            icon={Sparkles} 
            label="AI Website Builder" 
            active={currentView === 'ai_builder'} 
            onClick={() => setCurrentView('ai_builder')} 
          />
          <SidebarItem 
            icon={History} 
            label="Scan History & Rollbacks" 
            active={false} 
            onClick={() => {}} 
          />
          
          <div className="pt-6 pb-2 px-3 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
            Configuration
          </div>
          
          <SidebarItem 
            icon={Calendar} 
            label="Scheduled Maintenance" 
            active={false} 
            onClick={() => {}} 
          />
          <SidebarItem 
            icon={CreditCard} 
            label="Billing & Subscription" 
            active={currentView === 'billing'} 
            onClick={() => setCurrentView('billing')} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings & Alerts" 
            active={currentView === 'settings'} 
            onClick={() => setCurrentView('settings')} 
          />
        </nav>
        
        <div className="p-4 border-t border-zinc-800/50">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-900/50 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-medium text-sm text-zinc-300">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-200 truncate w-32">pramodsthkar@gmail.com</span>
              <span className="text-xs text-zinc-500">Pro Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <header className="h-16 border-b border-zinc-800/50 flex items-center px-8 shrink-0 relative z-10 bg-zinc-950/50 backdrop-blur-md">
          <h1 className="font-display text-lg font-medium text-zinc-100 capitalize">
            {currentView.replace(/_/g, ' ')}
          </h1>
          <div className="ml-auto flex items-center gap-4">
            <button className="text-zinc-400 hover:text-zinc-200 transition-colors relative">
              <BellRing size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 p-8 relative z-10">
          <div className="max-w-6xl mx-auto w-full">
            
            <AnimatePresence mode="wait">
              
              {/* DASHBOARD VIEW */}
              {currentView === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {METRICS.map((metric, i) => (
                      <div key={i} className="bg-zinc-900/50 border border-zinc-800/50 p-5 rounded-xl shadow-sm backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-zinc-400">{metric.label}</span>
                          <metric.icon size={18} className={metric.color} />
                        </div>
                        <div className="text-3xl font-display font-semibold text-zinc-100">{metric.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden backdrop-blur-sm">
                    <div className="px-6 py-5 border-b border-zinc-800/50 flex items-center justify-between">
                      <h2 className="font-display text-lg font-medium text-zinc-100 flex items-center gap-2">
                        <Activity size={20} className="text-indigo-400"/>
                        Fleet Health Overview
                      </h2>
                      <button 
                        onClick={() => setCurrentView('new_job')}
                        className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-md text-sm font-medium transition-colors"
                      >
                        <Plus size={16} />
                        Add Project
                      </button>
                    </div>
                    <div className="divide-y divide-zinc-800/50">
                      {PROJECTS.map((project) => (
                        <div 
                          key={project.id} 
                          onClick={() => viewProject(project)}
                          className="p-6 flex items-center justify-between hover:bg-zinc-800/20 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              {/* Health Score Ring */}
                              <svg className="w-12 h-12 transform -rotate-90">
                                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-zinc-800" />
                                <circle 
                                  cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" 
                                  strokeDasharray={125} strokeDashoffset={125 - (125 * project.healthScore) / 100}
                                  className={project.healthScore > 80 ? 'text-emerald-500' : project.healthScore > 50 ? 'text-amber-500' : 'text-red-500'} 
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-zinc-200">
                                {project.healthScore}
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-zinc-200 mb-1 group-hover:text-indigo-400 transition-colors">{project.url}</div>
                              <div className="text-xs text-zinc-500 flex items-center gap-2">
                                <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">{project.framework}</span>
                                <span>•</span>
                                Last autonomous fix: {project.lastFix}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {project.status !== 'Healthy' && (
                              <button onClick={(e) => { e.stopPropagation(); viewProject(project); }} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors">
                                <Wrench size={14} /> Fix Now
                              </button>
                            )}
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                project.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                project.status === 'Warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                'bg-red-500/10 text-red-400 border-red-500/20'
                              }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                project.status === 'Healthy' ? 'bg-emerald-400' : 
                                project.status === 'Warning' ? 'bg-amber-400' :
                                'bg-red-400'
                              }`}></span>
                              {project.status}
                            </span>
                            <ChevronRight size={18} className="text-zinc-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PROJECT DETAIL VIEW */}
              {currentView === 'project_detail' && selectedProject && (
                <motion.div
                  key="project_detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <button onClick={() => setCurrentView('dashboard')} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors">
                      <ArrowLeft size={20} />
                    </button>
                    <div>
                      <h2 className="text-2xl font-display font-semibold text-zinc-100">{selectedProject.url}</h2>
                      <div className="text-sm text-zinc-500 flex items-center gap-2 mt-1">
                        <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">{selectedProject.framework}</span>
                        Connected via GitHub • ID: {selectedProject.id}
                      </div>
                    </div>
                    
                    <div className="ml-auto flex items-center gap-3">
                      <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-lg text-sm font-medium transition-colors">
                        View Logs
                      </button>
                      <button onClick={startAutonomousRepair} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-indigo-900/20">
                        <Wrench size={16} /> Autonomous Auto-Fix
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Health & Agents */}
                    <div className="space-y-6">
                      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex flex-col items-center justify-center mb-6">
                          <svg className="w-32 h-32 transform -rotate-90">
                            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-800" />
                            <circle 
                              cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" 
                              strokeDasharray={351} strokeDashoffset={351 - (351 * selectedProject.healthScore) / 100}
                              className={selectedProject.healthScore > 80 ? 'text-emerald-500' : selectedProject.healthScore > 50 ? 'text-amber-500' : 'text-red-500'} 
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className="text-4xl font-display font-bold text-zinc-100">{selectedProject.healthScore}</span>
                            <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mt-1">Health Score</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">SEO & Metadata</span>
                            <span className="text-zinc-200">92/100</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Performance</span>
                            <span className="text-amber-400">65/100</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Code Quality</span>
                            <span className="text-red-400">45/100</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="text-sm font-medium text-zinc-200 mb-4 flex items-center gap-2"><BrainCircuit size={16} className="text-indigo-400"/> Multi-Agent System</h3>
                        <div className="space-y-4">
                          {AGENT_STAGES.map((agent) => (
                            <div key={agent.id} className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0 border border-zinc-700">
                                <agent.icon size={14} />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-zinc-200">{agent.name}</div>
                                <div className="text-xs text-zinc-500">{agent.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: AI Code Editor Preview & Issues */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden backdrop-blur-sm flex flex-col h-[320px]">
                        <div className="px-4 py-3 border-b border-zinc-800/50 bg-zinc-900 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Code2 size={16} className="text-indigo-400" />
                            <span className="text-sm font-medium text-zinc-200">AI Code Editor (Proposed Fixes)</span>
                          </div>
                          <div className="text-xs font-mono text-zinc-500">app/layout.tsx</div>
                        </div>
                        <div className="flex-1 p-4 bg-[#0d0d0f] overflow-y-auto font-mono text-sm">
                          <div className="text-red-400/80 bg-red-500/10 px-2 py-0.5 rounded mb-1 border-l-2 border-red-500/50">
                            - &lt;body className="font-sans"&gt;
                          </div>
                          <div className="text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded mb-4 border-l-2 border-emerald-500/50">
                            + &lt;body suppressHydrationWarning className="font-sans antialiased"&gt;
                          </div>
                          <div className="text-zinc-500 px-2 py-0.5">  &#123;children&#125;</div>
                          <div className="text-zinc-500 px-2 py-0.5">&lt;/body&gt;</div>
                        </div>
                      </div>

                      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden backdrop-blur-sm">
                        <div className="px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between">
                          <h3 className="font-display font-medium text-zinc-100 flex items-center gap-2">
                            <AlertCircle size={18} className="text-amber-400" />
                            Detected Issues
                          </h3>
                        </div>
                        <div className="divide-y divide-zinc-800/50">
                          <div className="p-4 flex gap-4 hover:bg-zinc-800/20">
                            <div className="mt-1"><Terminal size={16} className="text-red-400" /></div>
                            <div>
                              <div className="font-medium text-zinc-200 text-sm mb-1">React Hydration Mismatch</div>
                              <div className="text-xs text-zinc-500">Critical rendering path error preventing optimal load.</div>
                            </div>
                          </div>
                          <div className="p-4 flex gap-4 hover:bg-zinc-800/20">
                            <div className="mt-1"><Search size={16} className="text-amber-400" /></div>
                            <div>
                              <div className="font-medium text-zinc-200 text-sm mb-1">Broken Links Detected</div>
                              <div className="text-xs text-zinc-500">2 footer links returning 404 Not Found.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* NEW JOB VIEW */}
              {currentView === 'new_job' && (
                <motion.div
                  key="new_job"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-2xl mx-auto space-y-8"
                >
                  <div className="text-center space-y-3 mb-10">
                    <h2 className="text-3xl font-display font-semibold text-zinc-100">Connect New Repository</h2>
                    <p className="text-zinc-400 text-sm">Provide your website details and connection method. Our AI agents will clone, analyze, fix, test, and deploy automatically.</p>
                  </div>

                  <div className="space-y-6 bg-zinc-900/50 border border-zinc-800/50 p-8 rounded-2xl backdrop-blur-sm shadow-xl">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300 ml-1">Target Website URL</label>
                      <input 
                        type="url" 
                        placeholder="https://example.com"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-zinc-700"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-zinc-300 ml-1">Connection & Deployment Method</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {CONNECTION_METHODS.map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setConnectionMethod(method.id)}
                            className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                              connectionMethod === method.id 
                                ? 'bg-indigo-500/10 border-indigo-500/50 ring-1 ring-indigo-500/20' 
                                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            <method.icon size={20} className={connectionMethod === method.id ? 'text-indigo-400' : 'text-zinc-500'} />
                            <div>
                              <div className={`font-medium text-sm mb-0.5 ${connectionMethod === method.id ? 'text-indigo-300' : 'text-zinc-300'}`}>
                                {method.name}
                              </div>
                              <div className="text-xs text-zinc-500">{method.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button 
                        onClick={() => setCurrentView('dashboard')}
                        disabled={!targetUrl}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/20"
                      >
                        <PlayCircle size={18} />
                        Connect & Scan
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* REPAIR EXECUTION VIEW (Multi-Agent System) */}
              {currentView === 'repair_execution' && (
                <motion.div
                  key="repair_execution"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-5xl mx-auto h-[75vh] flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-display font-semibold text-zinc-100 flex items-center gap-3">
                        <BrainCircuit size={24} className="text-indigo-400" />
                        Autonomous Multi-Agent Execution
                      </h2>
                      <p className="text-zinc-500 text-sm mt-1">Target: {selectedProject?.url || targetUrl || 'Target Repository'}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Health Score Projection:</span>
                        <div className="flex items-center gap-1 text-emerald-400 font-bold">
                          45 <ArrowLeft size={14} className="rotate-180" /> 98
                        </div>
                      </div>
                      <div className="w-48 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                        <motion.div 
                          className="h-full bg-indigo-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${scanProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Agent Stages Visualizer */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {AGENT_STAGES.map((agent, idx) => {
                      const isActive = activeStage === agent.id;
                      const isComplete = REPAIR_STEPS.findIndex(s => s.stage === agent.id) !== -1 && activeStage !== agent.id && scanProgress > (idx * 25);
                      
                      return (
                        <div key={agent.id} className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${
                          isActive ? 'border-indigo-500/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/5' : 
                          isComplete ? 'border-emerald-500/30 bg-emerald-500/5' : 
                          'border-zinc-800 bg-zinc-900/50 opacity-50'
                        }`}>
                          <div className="flex items-center justify-between">
                            <agent.icon size={18} className={isActive ? 'text-indigo-400' : isComplete ? 'text-emerald-400' : 'text-zinc-500'} />
                            {isActive && <RefreshCw size={14} className="animate-spin text-indigo-400" />}
                            {isComplete && <CheckCircle size={14} className="text-emerald-400" />}
                          </div>
                          <div className={`font-medium text-sm ${isActive ? 'text-indigo-200' : isComplete ? 'text-emerald-200' : 'text-zinc-400'}`}>
                            {agent.name}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex-1 bg-[#0d0d0f] border border-zinc-800/50 rounded-xl overflow-hidden flex flex-col shadow-2xl relative">
                    {/* Terminal Header */}
                    <div className="h-10 bg-zinc-900/80 border-b border-zinc-800/50 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      <div className="ml-4 text-xs font-mono text-zinc-500">autofix-multi-agent-cluster-v2</div>
                    </div>
                    
                    {/* Terminal Body */}
                    <div 
                      ref={logContainerRef}
                      className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-2"
                    >
                      {scanLogs.map((logItem, index) => {
                        let colorClass = "text-zinc-300";
                        if (logItem.log.includes("critical")) colorClass = "text-amber-400";
                        if (logItem.stage === 'scan') colorClass = "text-blue-400";
                        if (logItem.stage === 'repair') colorClass = "text-indigo-400";
                        if (logItem.stage === 'test') colorClass = "text-amber-400";
                        if (logItem.stage === 'deploy') colorClass = "text-purple-400";
                        if (logItem.log.includes("Success") || logItem.log.includes("restored")) colorClass = "text-emerald-400 font-bold";

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${colorClass}`}
                          >
                            <span className="opacity-50 mr-3 text-zinc-600">{new Date().toISOString().split('T')[1].slice(0, 8)}</span>
                            {logItem.log}
                          </motion.div>
                        )
                      })}
                      
                      {scanProgress < 100 && (
                        <motion.div
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="text-zinc-500 mt-4 flex items-center gap-2"
                        >
                          <RefreshCw size={14} className="animate-spin" />
                          Agents processing next instruction set...
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* REPORT VIEW */}
              {currentView === 'report' && (
                <motion.div
                  key="report"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto space-y-6"
                >
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 mb-2">
                      <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-display font-semibold text-emerald-400">Autonomous Repair & Deployment Successful</h2>
                    <p className="text-emerald-400/80">Website ({selectedProject?.url || targetUrl}) has been fixed, tested via Playwright, and deployed via GitHub PR.</p>
                    
                    <div className="flex justify-center gap-4 pt-4">
                      <button 
                        onClick={() => setCurrentView('dashboard')}
                        className="px-6 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-lg text-sm font-medium transition-colors"
                      >
                        Return to Dashboard
                      </button>
                      <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <GitPullRequest size={16} />
                        View Pull Request
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 flex flex-col gap-2">
                      <div className="flex items-center justify-between mb-2">
                         <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm"><Code2 size={16}/> Code Quality</div>
                         <CheckCircle size={16} className="text-emerald-400" />
                      </div>
                      <div className="text-xs text-zinc-400">Rewrote layout.tsx and suppressed hydration warnings automatically.</div>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 flex flex-col gap-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-amber-400 font-medium text-sm"><Activity size={16}/> Playwright Tests</div>
                         <CheckCircle size={16} className="text-emerald-400" />
                      </div>
                      <div className="text-xs text-zinc-400">42/42 tests passed across Chromium, Firefox, and WebKit.</div>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 flex flex-col gap-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-blue-400 font-medium text-sm"><BrainCircuit size={16}/> AI Memory</div>
                         <CheckCircle size={16} className="text-emerald-400" />
                      </div>
                      <div className="text-xs text-zinc-400">Learned new resolution path for Next.js 15 Image component changes.</div>
                    </div>
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-900">
                      <h3 className="font-display font-medium text-zinc-100 flex items-center gap-2">
                        <FileCode2 size={18} className="text-indigo-400" />
                        AI Editor Output Diffs
                      </h3>
                      <button className="text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/20 flex items-center gap-1.5 transition-colors">
                        <History size={14} />
                        One-Click Rollback
                      </button>
                    </div>
                    <div className="p-0">
                      <div className="divide-y divide-zinc-800/50">
                        <div className="p-4 flex flex-col lg:flex-row gap-6">
                           <div className="lg:w-1/3">
                              <div className="font-medium text-zinc-200 text-sm mb-1">layout.tsx</div>
                              <div className="text-xs text-zinc-500 mb-2">Hydration mismatch resolved.</div>
                           </div>
                           <div className="flex-1 bg-zinc-950 p-4 rounded-lg border border-zinc-800 font-mono text-xs overflow-x-auto">
                              <div className="text-red-400/80 bg-red-500/10 px-2 py-0.5 rounded mb-1">
                                - &lt;body className="font-sans"&gt;
                              </div>
                              <div className="text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded">
                                + &lt;body suppressHydrationWarning className="font-sans antialiased"&gt;
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* AI CHAT ASSISTANT VIEW */}
              {currentView === 'ai_assistant' && (
                <motion.div
                  key="ai_assistant"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-3xl mx-auto h-[75vh] flex flex-col bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl"
                >
                  <div className="p-4 border-b border-zinc-800/50 bg-zinc-900 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <BrainCircuit size={20} />
                    </div>
                    <div>
                      <h3 className="font-display font-medium text-zinc-100">Autonomous Multi-Agent Brain</h3>
                      <p className="text-xs text-zinc-500">I scan, repair, test, and deploy code autonomously.</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-zinc-800 text-zinc-300' : 'bg-indigo-500/20 text-indigo-400'}`}>
                          {msg.role === 'user' ? 'U' : <BrainCircuit size={14} />}
                        </div>
                        <div className={`p-4 rounded-2xl max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-zinc-800/80 text-zinc-200 border border-zinc-700/50 rounded-tl-none'}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/80">
                    <div className="relative">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Instruct the agent (e.g. 'Fix the broken links on the staging site')..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-4 pr-12 py-3 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                      <button 
                        onClick={handleSendMessage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-500 hover:bg-indigo-400 rounded-lg flex items-center justify-center text-white transition-colors"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SETTINGS VIEW */}
              {currentView === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-3xl mx-auto space-y-8"
                >
                  <div className="space-y-2 mb-8">
                    <h2 className="text-2xl font-display font-semibold text-zinc-100">Settings & Alerts</h2>
                    <p className="text-sm text-zinc-400">Configure your autonomous agent schedules and notifications.</p>
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden backdrop-blur-sm">
                    <div className="p-5 border-b border-zinc-800/50">
                      <h3 className="font-medium text-zinc-200 flex items-center gap-2"><BellRing size={18} className="text-indigo-400" /> Notifications & Alerts</h3>
                    </div>
                    <div className="p-5 space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm text-zinc-200 flex items-center gap-2"><MessageCircle size={16}/> WhatsApp Alerts</div>
                          <div className="text-xs text-zinc-500 mt-0.5">Get instantly notified if your website goes down.</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm text-zinc-200 flex items-center gap-2"><Mail size={16}/> Email Reports</div>
                          <div className="text-xs text-zinc-500 mt-0.5">Receive weekly summaries of SEO improvements and fixes.</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* BILLING VIEW */}
              {currentView === 'billing' && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto space-y-8"
                >
                  <div className="text-center space-y-3 mb-10">
                    <h2 className="text-3xl font-display font-semibold text-zinc-100">Subscription Plans</h2>
                    <p className="text-zinc-400 text-sm">Choose the right autonomous agent plan for your business.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Basic Plan */}
                    <div className="bg-zinc-900/50 border border-zinc-800/50 p-6 rounded-2xl backdrop-blur-sm">
                      <h3 className="text-lg font-medium text-zinc-200 mb-2">Starter</h3>
                      <div className="text-3xl font-display font-bold text-zinc-100 mb-6">$29<span className="text-sm font-normal text-zinc-500">/mo</span></div>
                      <ul className="space-y-3 mb-8 text-sm text-zinc-400">
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> 1 Website Connection</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Weekly Scans</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Basic HTML/CSS Fixes</li>
                      </ul>
                      <button className="w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition-colors">Subscribe via Stripe</button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-indigo-900/20 border border-indigo-500/50 p-6 rounded-2xl backdrop-blur-sm relative transform md:-translate-y-4 shadow-xl shadow-indigo-500/10">
                      <div className="absolute -top-3 inset-x-0 flex justify-center">
                        <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                      </div>
                      <h3 className="text-lg font-medium text-zinc-200 mb-2">Pro AI</h3>
                      <div className="text-3xl font-display font-bold text-zinc-100 mb-6">$99<span className="text-sm font-normal text-zinc-500">/mo</span></div>
                      <ul className="space-y-3 mb-8 text-sm text-zinc-300">
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-indigo-400" /> 10 Website Connections</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-indigo-400" /> Daily Automated Scans</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-indigo-400" /> React/Next.js/WP Fixes</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-indigo-400" /> Playwright Auto-Testing</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-indigo-400" /> One-Click Rollbacks</li>
                      </ul>
                      <button className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors">Subscribe via Razorpay</button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-zinc-900/50 border border-zinc-800/50 p-6 rounded-2xl backdrop-blur-sm">
                      <h3 className="text-lg font-medium text-zinc-200 mb-2">Enterprise</h3>
                      <div className="text-3xl font-display font-bold text-zinc-100 mb-6">$299<span className="text-sm font-normal text-zinc-500">/mo</span></div>
                      <ul className="space-y-3 mb-8 text-sm text-zinc-400">
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Unlimited Websites</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Multi-Agent Execution</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Custom AI Rules</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Dedicated Account Manager</li>
                      </ul>
                      <button className="w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition-colors">Pay with UPI / Stripe</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* AI BUILDER VIEW */}
              {currentView === 'ai_builder' && (
                <motion.div
                  key="ai_builder"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto space-y-8"
                >
                  <div className="text-center space-y-3 mb-10">
                    <div className="w-16 h-16 bg-fuchsia-500/20 border border-fuchsia-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-fuchsia-400">
                      <Sparkles size={32} />
                    </div>
                    <h2 className="text-3xl font-display font-semibold text-zinc-100">AI Prompt-to-Website Builder</h2>
                    <p className="text-zinc-400 text-sm max-w-xl mx-auto">Describe the website you want to build in plain English or Hindi. Our AI Architect will design, code, and deploy a fully functional Next.js application in minutes.</p>
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-800/50 p-6 rounded-2xl backdrop-blur-sm shadow-xl space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">What do you want to build?</label>
                      <textarea
                        className="w-full h-40 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all resize-none"
                        placeholder="e.g. 'Ek real estate agency ke liye modern website banao jisme properties ki listing ho, contact form ho, aur dark mode support kare...'"
                        value={builderPrompt}
                        onChange={(e) => setBuilderPrompt(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={startWebsiteGeneration}
                      disabled={!builderPrompt.trim()}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Wand2 size={20} />
                      Generate & Deploy Website
                    </button>
                  </div>
                </motion.div>
              )}

              {/* BUILDER EXECUTION VIEW */}
              {currentView === 'builder_execution' && (
                <motion.div
                  key="builder_execution"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-4xl mx-auto space-y-6 h-full flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-display font-semibold text-zinc-100 flex items-center gap-3">
                        <Loader2 size={24} className="text-fuchsia-400 animate-spin" />
                        Generating Website...
                      </h2>
                      <p className="text-sm text-zinc-400 mt-1 truncate max-w-md">"{builderPrompt}"</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-display font-bold text-fuchsia-400">{builderProgress}%</div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Progress</div>
                    </div>
                  </div>

                  <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                      initial={{ width: '0%' }}
                      animate={{ width: `${builderProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="flex-1 bg-black/60 border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col font-mono text-sm shadow-2xl relative backdrop-blur-md min-h-[400px]">
                    <div className="h-10 bg-zinc-900/80 border-b border-zinc-800 flex items-center px-4 gap-2 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                      <span className="ml-4 text-xs text-zinc-500 font-medium">auto-builder.sh — AI Architect</span>
                    </div>
                    <div className="p-4 overflow-y-auto flex-1 space-y-2">
                      {builderLogs.map((log, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          key={i} 
                          className="flex gap-3"
                        >
                          <span className="text-zinc-600 shrink-0">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                          <span className={
                            log.stage === 'design' ? 'text-fuchsia-400' :
                            log.stage === 'code' ? 'text-indigo-400' :
                            'text-emerald-400'
                          }>
                            {log.log}
                          </span>
                        </motion.div>
                      ))}
                      {builderProgress < 100 && (
                        <div className="flex gap-3 animate-pulse">
                          <span className="text-zinc-600">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                          <span className="text-zinc-500">_</span>
                        </div>
                      )}
                    </div>
                    
                    {builderProgress === 100 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2"
                      >
                        <button 
                          onClick={() => setCurrentView('dashboard')}
                          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded-full flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
                        >
                          <Globe size={18} />
                          Visit Live Website
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium ${
        active 
          ? 'bg-zinc-800/80 text-zinc-100 border border-zinc-700/50 shadow-sm' 
          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
      }`}
    >
      <Icon size={18} className={active ? 'text-indigo-400' : 'text-zinc-500'} />
      {label}
    </button>
  );
}
