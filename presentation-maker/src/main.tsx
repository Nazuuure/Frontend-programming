import { createRoot } from 'react-dom/client';
import App from './App.js';
import { createTestPresentation } from './data.js';
import type { Presentation, Slide } from './types.js';
import { 
  createPresentation, 
  updatePresentationName, 
  savePresentation, 
  loadPresentation,
  addTextObject,
  addImageObject,
  removeObject,
  moveObject,
  resizeObject,
  updateTextObjectStyle,
  generateSlideId,
  addSlide,
  removeSlides,
  moveSlide,
  duplicateSlide,
  setSlideBackgroundColor,
  setSlideBackgroundImage,
  setSlideBackgroundGradient,
  clearSlideBackground
} from './types.js';

const root = createRoot(document.getElementById('root')!);

function renderApp(): void {
  root.render(
    <App />
  );
}

renderApp();