
import React from 'react';

interface ProjectSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ title, icon, children }) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
        <i className={`${icon} text-indigo-600 text-xl`}></i>
        <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wide">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </section>
  );
};

export default ProjectSection;
