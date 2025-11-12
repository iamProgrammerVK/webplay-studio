
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface PreviewPanelProps {
  srcDoc: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ srcDoc }) => {
  return (
    <div className="flex flex-col bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden h-full">
      <div className="flex items-center justify-between px-3 py-2 bg-slate-200 dark:bg-slate-900/50 border-b border-slate-300 dark:border-slate-600">
        <div className="flex gap-1.5 items-center">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 mx-4 bg-slate-100 dark:bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-500 dark:text-gray-300 truncate">
          preview://webplay.studio/result
        </div>
        <div className="text-xs text-green-600 dark:text-green-400 font-medium">Live</div>
      </div>
      <div className="flex-1 bg-white overflow-auto">
        <iframe
          srcDoc={srcDoc}
          title="Live Preview"
          sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};
