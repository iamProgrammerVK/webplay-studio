
export type Language = 'html' | 'css' | 'js';

export interface Editor {
  id: string;
  title: string;
  language: Language;
  code: string;
}

export interface Settings {
  fontSize: number;
  autoRun: boolean;
  autoRunDelay: number;
}

export type Layout = 'horizontal' | 'vertical';

export type Theme = 'dark' | 'light';
