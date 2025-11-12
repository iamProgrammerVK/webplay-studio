import React, { useState, useEffect, useCallback } from 'react';
import Split from 'react-split';

import { useLocalStorage } from './hooks/useLocalStorage';
import { useMediaQuery } from './hooks/useMediaQuery';
import { useHistory } from './hooks/useHistory';
import { Editor, Settings, Layout, Language, Theme } from './types';
import { DEFAULT_EDITORS, DEFAULT_SETTINGS } from './constants';

import { Header } from './components/Header';
import { EditorPanel } from './components/EditorPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { SettingsModal } from './components/SettingsModal';

const getInitialStateFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export default function App() {
  const [theme, setTheme] = useLocalStorage<Theme>('webplay_theme', 'dark');
  const [layout, setLayout] = useLocalStorage<Layout>('webplay_layout', 'horizontal');
  const [settings, setSettings] = useLocalStorage<Settings>('webplay_settings', DEFAULT_SETTINGS);

  const {
    state: editors,
    set: setEditors,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory<Editor[]>(getInitialStateFromLocalStorage('webplay_editors', DEFAULT_EDITORS));

  const [srcDoc, setSrcDoc] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);
  
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Persist the current editor state to local storage whenever it changes.
  useEffect(() => {
    try {
      window.localStorage.setItem('webplay_editors', JSON.stringify(editors));
    } catch (e) {
      console.error(`Error setting localStorage key "webplay_editors":`, e);
    }
  }, [editors]);


  const compileCode = useCallback(() => {
    const htmlPart = editors.find(e => e.language === 'html')?.code || '';
    const cssPart = editors.find(e => e.language === 'css')?.code || '';
    const jsPart = editors.find(e => e.language === 'js')?.code || '';

    const output = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${cssPart}</style>
        </head>
        <body>
          ${htmlPart}
          <script>${jsPart}</script>
        </body>
      </html>
    `;
    setSrcDoc(output);
  }, [editors]);

  useEffect(() => {
    if (settings.autoRun) {
      const timer = setTimeout(() => compileCode(), settings.autoRunDelay);
      return () => clearTimeout(timer);
    }
  }, [editors, settings.autoRun, settings.autoRunDelay, compileCode]);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Close mobile preview if we resize to desktop
  useEffect(() => {
    if (!isMobile) {
      setShowPreviewOnMobile(false);
    }
  }, [isMobile]);

  const addEditor = (lang: Language) => {
    if (editors.some(e => e.language === lang)) {
      alert(`${lang.toUpperCase()} editor already exists.`);
      return;
    }
    const newEditor: Editor = {
      id: `${lang}-${Date.now()}`,
      title: lang.toUpperCase(),
      language: lang,
      code: `/* New ${lang.toUpperCase()} code here */`
    };
    setEditors([...editors, newEditor]);
  };

  const deleteEditor = (id: string) => {
    if (editors.length <= 1) {
      alert("You can't close the last editor!");
      return;
    }
    setEditors(editors.filter(e => e.id !== id));
  };

  const updateEditorCode = (id: string, value: string) => {
    setEditors(editors.map(e => e.id === id ? { ...e, code: value } : e));
  };

  const resetApp = () => {
    if (window.confirm('Are you sure you want to reset the playground? This will be added to your undo history.')) {
      setEditors(DEFAULT_EDITORS);
      setSettings(DEFAULT_SETTINGS);
      setLayout('horizontal');
    }
  };

  const saveProject = () => {
    const blob = new Blob([srcDoc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'webplay-project.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const mainSplitSizes = layout === 'horizontal' ? [60, 40] : [70, 30];
  const editorSplitDirection = isMobile ? 'vertical' : (layout === 'horizontal' ? 'vertical' : 'horizontal');
  const editorSplitSizes = new Array(editors.length).fill(100 / editors.length);

  const EditorView = editors.length > 0 ? (
    <Split
      key={`editor-split-${layout}-${editors.length}-${editorSplitDirection}`}
      className={`flex h-full gap-2 ${editorSplitDirection === 'vertical' ? 'flex-col' : 'flex-row'}`}
      sizes={editorSplitSizes}
      minSize={100}
      gutterSize={8}
      direction={editorSplitDirection}
    >
      {editors.map(editor => (
        <EditorPanel
          key={editor.id}
          editor={editor}
          onChange={(value) => updateEditorCode(editor.id, value)}
          onDelete={deleteEditor}
          settings={settings}
          theme={theme}
        />
      ))}
    </Split>
  ) : (
    <div className="flex items-center justify-center h-full bg-slate-100 dark:bg-slate-800 rounded-lg">
      <p className="text-slate-500">No editors open. Add one from the toolbar.</p>
    </div>
  );

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-200 dark:bg-slate-950 text-slate-800 dark:text-white overflow-hidden">
      <Header
        onAddEditor={addEditor}
        onRun={compileCode}
        toggleLayout={() => setLayout(p => p === 'horizontal' ? 'vertical' : 'horizontal')}
        openSettings={() => setIsSettingsOpen(true)}
        resetApp={resetApp}
        saveProject={saveProject}
        toggleTheme={() => setTheme(p => p === 'dark' ? 'light' : 'dark')}
        theme={theme}
        isMobile={isMobile}
        showPreviewOnMobile={showPreviewOnMobile}
        onToggleMobilePreview={() => setShowPreviewOnMobile(p => !p)}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      <main className="flex-1 min-h-0">
        {isMobile ? (
          <div className="p-2 h-full">
            {showPreviewOnMobile ? <PreviewPanel srcDoc={srcDoc} /> : EditorView}
          </div>
        ) : (
          <Split
            key={`main-split-${layout}-${editors.length}`}
            className={`flex h-full p-2 gap-2 ${layout === 'horizontal' ? 'flex-row' : 'flex-col'}`}
            sizes={mainSplitSizes}
            minSize={250}
            gutterSize={8}
            direction={layout}
          >
            {EditorView}
            <PreviewPanel srcDoc={srcDoc} />
          </Split>
        )}
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        settings={settings}
        onSettingsChange={setSettings} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
}