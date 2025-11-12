
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html as langHtml } from '@codemirror/lang-html';
import { css as langCss } from '@codemirror/lang-css';
import { javascript as langJs } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { githubLight } from '@uiw/codemirror-theme-github';
import { Editor, Settings, Theme } from '../types';
import { X } from 'lucide-react';

interface EditorPanelProps {
  editor: Editor;
  onChange: (value: string) => void;
  onDelete: (id: string) => void;
  settings: Settings;
  theme: Theme;
}

const languageExtensions = {
  html: langHtml(),
  css: langCss(),
  js: langJs({ jsx: true, typescript: true }), // For better syntax highlighting
};

export const EditorPanel: React.FC<EditorPanelProps> = ({ editor, onChange, onDelete, settings, theme }) => {
  const { id, title, language, code } = editor;

  return (
    <div className="flex flex-col bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 shadow-md overflow-hidden h-full">
      <div className="flex justify-between items-center bg-slate-200 dark:bg-slate-900/50 px-3 py-2 border-b border-slate-300 dark:border-slate-700">
        <h2 className="text-sm text-slate-700 dark:text-gray-200 font-semibold">{title}</h2>
        <button 
          onClick={() => onDelete(id)} 
          className="text-slate-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors" 
          title={`Close ${title} Editor`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-grow overflow-auto">
        <CodeMirror
          value={code}
          height="100%"
          theme={theme === 'dark' ? vscodeDark : githubLight}
          extensions={[languageExtensions[language]]}
          onChange={onChange}
          style={{ fontSize: `${settings.fontSize}px`, height: '100%' }}
          basicSetup={{
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
          }}
        />
      </div>
    </div>
  );
};
