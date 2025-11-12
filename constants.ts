
import { Editor, Settings } from './types';

export const DEFAULT_EDITORS: Editor[] = [
  {
    id: 'html',
    title: 'HTML',
    language: 'html',
    code: '<div class="container">\n  <h1>Welcome to WebPlay Studio</h1>\n  <p>Your professional real-time code playground.</p>\n  <button onclick="greet()">Click Me</button>\n</div>'
  },
  {
    id: 'css',
    title: 'CSS',
    language: 'css',
    code: `body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f0f4f8;
  display: grid;
  place-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  text-align: center;
  background: white;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

h1 {
  color: #4f46e5; /* Indigo */
}

button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #4338ca;
}`
  },
  {
    id: 'js',
    title: 'JavaScript',
    language: 'js',
    code: `function greet() {
  const heading = document.querySelector('h1');
  heading.textContent = 'Powered By VK Thinks!';
  console.log('Button clicked! Welcome to the console.');
}`
  },
];

export const DEFAULT_SETTINGS: Settings = {
  fontSize: 14,
  autoRun: true,
  autoRunDelay: 500,
};
