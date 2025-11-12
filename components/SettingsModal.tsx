
import React from 'react';
import { Settings as SettingsType } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  settings: SettingsType;
  onSettingsChange: React.Dispatch<React.SetStateAction<SettingsType>>;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, settings, onSettingsChange, onClose }) => {
  if (!isOpen) return null;

  const handleSettingChange = <K extends keyof SettingsType,>(key: K, value: SettingsType[K]) => {
    onSettingsChange(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 w-full max-w-sm border border-slate-300 dark:border-slate-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg text-indigo-600 dark:text-indigo-400 font-semibold mb-4">Settings</h3>

        <div className="flex flex-col gap-4 text-slate-700 dark:text-gray-200">
          <label className="flex justify-between items-center">
            <span>Font Size (px)</span>
            <input 
              type="number" 
              className="w-24 rounded-md px-2 py-1 bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
              value={settings.fontSize} 
              onChange={(e) => handleSettingChange('fontSize', Number(e.target.value))}
              min="8"
              max="24"
            />
          </label>

          <label className="flex justify-between items-center">
            <span>Auto-run on code change</span>
            <input 
              type="checkbox" 
              className="w-5 h-5 accent-indigo-600" 
              checked={settings.autoRun} 
              onChange={(e) => handleSettingChange('autoRun', e.target.checked)} 
            />
          </label>
          
          <label className="flex justify-between items-center">
            <span>Auto-run Delay (ms)</span>
            <input 
              type="number" 
              className="w-24 rounded-md px-2 py-1 bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
              value={settings.autoRunDelay} 
              onChange={(e) => handleSettingChange('autoRunDelay', Number(e.target.value))}
              min="200"
              max="2000"
              step="100"
              disabled={!settings.autoRun}
            />
          </label>

          <div className="flex justify-end gap-2 mt-5">
            <button 
              onClick={onClose} 
              className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
