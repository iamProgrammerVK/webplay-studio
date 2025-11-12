import React from 'react';
import { Settings, LayoutGrid, Play, Plus, RefreshCw, Save, Moon, Sun, Code2, Eye, Undo, Redo } from 'lucide-react';
import { Language, Layout, Theme } from '../types';

interface HeaderProps {
  onAddEditor: (lang: Language) => void;
  onRun: () => void;
  toggleLayout: () => void;
  openSettings: () => void;
  resetApp: () => void;
  saveProject: () => void;
  toggleTheme: () => void;
  theme: Theme;
  isMobile: boolean;
  showPreviewOnMobile: boolean;
  onToggleMobilePreview: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

interface IconButtonProps {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, title, children, disabled = false }) => (
  <button
    onClick={onClick}
    title={title}
    disabled={disabled}
    className="p-2 rounded-md bg-slate-200 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600/70 text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-200 disabled:dark:hover:bg-slate-700/50 disabled:hover:text-slate-600 disabled:dark:hover:text-slate-300"
  >
    {children}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ 
  onAddEditor, 
  onRun, 
  toggleLayout, 
  openSettings, 
  resetApp, 
  saveProject, 
  toggleTheme, 
  theme,
  isMobile,
  showPreviewOnMobile,
  onToggleMobilePreview,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}) => {
  return (
    <header className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 px-4 py-2 border-b border-slate-300 dark:border-slate-800 shadow-sm z-10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <Code2 className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-indigo-400 tracking-tight flex items-center gap-2">
          WebPlay Studio
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <select
          onChange={(e) => {
            if (e.target.value) {
              onAddEditor(e.target.value as Language);
            }
            e.target.value = '';
          }}
          defaultValue=""
          className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-gray-200 px-3 py-2 rounded-md border border-slate-300 dark:border-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="" disabled>Add Editor...</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
        </select>
        
        <IconButton onClick={onRun} title="Run Code">
          <Play className="w-4 h-4" />
        </IconButton>

        {isMobile ? (
          <IconButton onClick={onToggleMobilePreview} title={showPreviewOnMobile ? 'View Code' : 'View Preview'}>
            {showPreviewOnMobile ? <Code2 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </IconButton>
        ) : (
          <IconButton onClick={toggleLayout} title="Toggle Layout">
            <LayoutGrid className="w-4 h-4" />
          </IconButton>
        )}

        <IconButton onClick={saveProject} title="Save Project as HTML">
          <Save className="w-4 h-4" />
        </IconButton>
        
        <IconButton onClick={onUndo} title="Undo" disabled={!canUndo}>
          <Undo className="w-4 h-4" />
        </IconButton>

        <IconButton onClick={onRedo} title="Redo" disabled={!canRedo}>
          <Redo className="w-4 h-4" />
        </IconButton>

        <IconButton onClick={resetApp} title="Reset Playground">
          <RefreshCw className="w-4 h-4" />
        </IconButton>

        <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1"></div>

        <IconButton onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </IconButton>
        
        <IconButton onClick={openSettings} title="Settings">
          <Settings className="w-4 h-4" />
        </IconButton>
      </div>
    </header>
  );
};
