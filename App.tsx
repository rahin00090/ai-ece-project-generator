
import React, { useState, useEffect } from 'react';
import { ECE_PROJECT_DATA } from './constants';
import { ProjectData } from './types';
import ProjectSection from './components/ProjectSection';
import Simulator from './components/Simulator';
import { generateProject } from './geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architect' | 'details' | 'report'>('architect');
  const [project, setProject] = useState<ProjectData>(ECE_PROJECT_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form States
  const [inputs, setInputs] = useState({
    semester: '6th Semester',
    skillLevel: 'Intermediate',
    interestArea: 'IoT & Embedded Systems',
    budget: '2500',
    projectType: 'Hardware + AI Integration'
  });

  const totalCost = project.hardwareComponents.reduce((acc, curr) => acc + curr.cost, 0);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    
    const result = await generateProject(inputs);
    
    if ('error' in result) {
      setError(result.error);
    } else {
      setProject(result);
      setActiveTab('details');
    }
    setIsGenerating(false);
  };

  const loadingMessages = [
    "Analyzing hardware availability...",
    "Calculating power efficiency...",
    "Synthesizing schematic logic...",
    "Optimizing component cost...",
    "Drafting technical report...",
    "Validating project feasibility..."
  ];
  
  const [msgIdx, setMsgIdx] = useState(0);
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setMsgIdx((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  return (
    <div className="min-h-screen pb-32 bg-slate-50">
      {/* Dynamic Header */}
      <header className="bg-slate-900 text-white pt-12 pb-24 px-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full mb-6 border border-indigo-500/30 uppercase tracking-widest">
            <i className="fas fa-atom animate-spin-slow"></i> AI-Powered ECE Project Architect
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            {activeTab === 'architect' ? "Engineer Your Future" : project.title}
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {activeTab === 'architect' 
              ? "Tell us your constraints, and our AI Guide will architect a complete engineering project, hardware list, and full report for you."
              : "Complete project architecture, hardware specifications, and technical documentation generated for your criteria."}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 -mt-12 relative z-20">
        {/* Navigation Tabs */}
        <nav className="flex bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 mb-10 overflow-hidden">
          <button 
            onClick={() => setActiveTab('architect')}
            className={`flex-1 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'architect' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <i className="fas fa-compass"></i> <span className="hidden sm:inline">Project Architect</span>
          </button>
          <button 
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'details' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <i className="fas fa-microchip"></i> <span className="hidden sm:inline">Specs & Details</span>
          </button>
          <button 
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'report' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <i className="fas fa-file-invoice"></i> <span className="hidden sm:inline">Full Report</span>
          </button>
        </nav>

        {activeTab === 'architect' ? (
          <div className="grid md:grid-cols-3 gap-8 animate-fadeIn">
            {/* Form Section */}
            <div className="md:col-span-2 space-y-6">
              <form onSubmit={handleGenerate} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                  <i className="fas fa-sliders text-indigo-600"></i> Project Constraints
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Semester</label>
                    <select 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={inputs.semester}
                      onChange={(e) => setInputs({...inputs, semester: e.target.value})}
                    >
                      <option>4th Semester</option>
                      <option>6th Semester</option>
                      <option>Final Year (Major)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skill Level</label>
                    <select 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={inputs.skillLevel}
                      onChange={(e) => setInputs({...inputs, skillLevel: e.target.value})}
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced / Research</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interest Area</label>
                    <input 
                      type="text"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g. Robotics, VLSI, IoT"
                      value={inputs.interestArea}
                      onChange={(e) => setInputs({...inputs, interestArea: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Budget (INR)</label>
                    <input 
                      type="number"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={inputs.budget}
                      onChange={(e) => setInputs({...inputs, budget: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project Focus Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Hardware', 'Simulation', 'IoT + App', 'AI Integration'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInputs({...inputs, projectType: type})}
                        className={`px-3 py-2 text-sm font-bold rounded-lg border transition-all ${inputs.projectType === type ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-white border-slate-200 text-slate-500'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-200 disabled:opacity-70"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Architecting Project...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-magic"></i> GENERATE COMPLETE PROJECT
                    </>
                  )}
                </button>

                {error && <p className="mt-4 text-red-500 text-center font-bold">{error}</p>}
              </form>

              {isGenerating && (
                <div className="bg-indigo-900 text-indigo-200 p-6 rounded-2xl font-mono text-sm animate-pulse shadow-inner">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                    <span className="font-bold text-emerald-400">ENGINEERING_CORE_BUSY</span>
                  </div>
                  <p>{loadingMessages[msgIdx]}</p>
                </div>
              )}
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
                <h3 className="font-black text-emerald-900 mb-3 flex items-center gap-2">
                  <i className="fas fa-check-double"></i> What you get:
                </h3>
                <ul className="space-y-3 text-emerald-800 text-sm">
                  <li className="flex gap-2"><i className="fas fa-check mt-1"></i> Full Technical Report</li>
                  <li className="flex gap-2"><i className="fas fa-check mt-1"></i> Bill of Materials (INR)</li>
                  <li className="flex gap-2"><i className="fas fa-check mt-1"></i> Block Diagram Logic</li>
                  <li className="flex gap-2"><i className="fas fa-check mt-1"></i> Code & Tool Suggestions</li>
                </ul>
              </div>
              <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Academic Tip</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Focus on the <strong>Problem Statement</strong>. Most ECE projects are graded 40% on the hardware complexity and 60% on the societal impact of the solution.
                </p>
              </div>
            </div>
          </div>
        ) : activeTab === 'details' ? (
          <div className="space-y-8 animate-fadeIn">
            <ProjectSection title="1. Problem Definition" icon="fas fa-triangle-exclamation">
              <p className="text-slate-700 leading-relaxed text-lg italic border-l-4 border-indigo-200 pl-4 bg-indigo-50/30 py-2">
                "{project.problemDefinition}"
              </p>
            </ProjectSection>

            <ProjectSection title="2. Working Logic" icon="fas fa-gear">
              <ol className="space-y-4">
                {project.workingLogic.map((step, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 pt-1 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </ProjectSection>

            <ProjectSection title="3. Components Required" icon="fas fa-microchip">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-plug text-indigo-500"></i> Hardware Components
                  </h3>
                  <div className="space-y-3">
                    {project.hardwareComponents.map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="font-bold text-slate-800">{item.name}</div>
                        <div className="text-sm text-slate-600">{item.use}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-code text-indigo-500"></i> Software Tools
                  </h3>
                  <ul className="space-y-2">
                    {project.softwareTools.map((tool, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-700">
                        <i className="fas fa-check-circle text-emerald-500"></i>
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ProjectSection>

            <ProjectSection title="4. Estimated Cost" icon="fas fa-indian-rupee-sign">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider">
                      <th className="px-4 py-3 border-b">Component Name</th>
                      <th className="px-4 py-3 border-b text-right">Cost (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {project.hardwareComponents.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 text-slate-700 font-medium">{item.name}</td>
                        <td className="px-4 py-3 text-slate-900 font-bold text-right">₹{item.cost}</td>
                      </tr>
                    ))}
                    <tr className="bg-indigo-50/50">
                      <td className="px-4 py-4 text-indigo-900 font-black">TOTAL ESTIMATED COST</td>
                      <td className="px-4 py-4 text-indigo-600 font-black text-right text-xl">₹{totalCost}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ProjectSection>

            {/* Render simulator only if title contains 'Vision' or 'Safety' */}
            {(project.title.toLowerCase().includes('vision') || project.title.toLowerCase().includes('safety')) && (
              <ProjectSection title="5. Visual AI Simulator" icon="fas fa-wand-sparkles">
                <Simulator />
              </ProjectSection>
            )}

            <ProjectSection title="6. Future Scope" icon="fas fa-rocket">
              <div className="grid sm:grid-cols-2 gap-4">
                {project.futureScope.map((scope, idx) => (
                  <div key={idx} className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-4">
                    <i className="fas fa-lightbulb text-emerald-600 text-xl"></i>
                    <span className="text-emerald-900 font-medium leading-tight">{scope}</span>
                  </div>
                ))}
              </div>
            </ProjectSection>
          </div>
        ) : (
          <div className="bg-white p-8 md:p-16 rounded-3xl shadow-2xl border border-slate-200 animate-fadeIn space-y-12 mb-20 max-w-4xl mx-auto report-style print:shadow-none print:border-none print:m-0">
            <div className="text-center border-b-4 border-slate-900 pb-10 mb-12">
              <h1 className="text-5xl font-black text-slate-900 mb-3">{project.title.toUpperCase()}</h1>
              <p className="text-slate-500 font-bold tracking-[0.2em] uppercase text-sm">Academic Technical Project Report</p>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-4 border-b-2 border-slate-200 inline-block">I. ABSTRACT</h2>
                <p className="text-slate-700 leading-relaxed text-lg first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-indigo-600">
                  {project.report.abstract}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-4 border-b-2 border-slate-200 inline-block">II. INTRODUCTION</h2>
                <p className="text-slate-700 leading-relaxed text-lg">{project.report.introduction}</p>
              </section>

              <section className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4 border-b-2 border-slate-200 inline-block">III. PROPOSED SYSTEM</h2>
                  <p className="text-slate-700 leading-relaxed">{project.report.proposedSystem}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4 border-b-2 border-slate-200 inline-block">IV. METHODOLOGY</h2>
                  <p className="text-slate-700 leading-relaxed">{project.report.workingMethodology}</p>
                </div>
              </section>

              <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <h2 className="text-2xl font-black text-slate-900 mb-6">V. HARDWARE & SOFTWARE</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-indigo-700 mb-2">Hardware Detail:</h3>
                    <p className="text-slate-700">{project.report.hardwareDescription}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-indigo-700 mb-2">Software Stack:</h3>
                    <p className="text-slate-700">{project.report.softwareDescription}</p>
                  </div>
                </div>
              </section>

              <div className="grid md:grid-cols-2 gap-12">
                <section>
                  <h2 className="text-2xl font-black text-slate-900 mb-4 border-b-2 border-slate-200 inline-block">ADVANTAGES</h2>
                  <ul className="space-y-3">
                    {project.report.advantages.map((adv, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-700">
                        <i className="fas fa-plus-circle text-emerald-500 mt-1"></i>
                        {adv}
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h2 className="text-2xl font-black text-slate-900 mb-4 border-b-2 border-slate-200 inline-block">APPLICATIONS</h2>
                  <ul className="space-y-3">
                    {project.report.applications.map((app, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-700">
                        <i className="fas fa-location-dot text-indigo-500 mt-1"></i>
                        {app}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="bg-indigo-900 p-8 rounded-2xl text-white">
                <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter">Conclusion</h2>
                <p className="text-indigo-100 leading-relaxed italic text-lg">
                  {project.report.conclusion}
                </p>
              </section>
            </div>

            <div className="pt-20 mt-20 border-t-2 border-dashed border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-12 print:mt-10">
              <div className="text-center sm:text-left">
                <p className="text-xs font-black text-slate-400 mb-12 uppercase tracking-[0.3em]">Student Signature</p>
                <div className="w-56 h-px bg-slate-300"></div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs font-black text-slate-400 mb-12 uppercase tracking-[0.3em]">Project Guide Signature</p>
                <div className="w-56 h-px bg-slate-300"></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-5 px-6 shadow-2xl z-50 transition-transform duration-300">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-slate-500 text-sm font-medium">Current Project: </span>
            <span className="font-black text-indigo-600 tracking-tight">{project.title}</span>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={() => window.print()}
              className="flex-1 sm:flex-none px-8 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-slate-200"
            >
              <i className="fas fa-print"></i> PDF REPORT
            </button>
            <button 
              onClick={() => setActiveTab('architect')}
              className="flex-1 sm:flex-none px-8 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-indigo-100"
            >
              <i className="fas fa-plus"></i> NEW PROJECT
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
