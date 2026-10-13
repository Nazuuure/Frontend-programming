import type { Presentation, Slide } from './types.js';
import { useState } from 'react';
import Toolbar from './components/Toolbar.js';
import SlideList from './components/SlideList.js';
import Workspace from './components/Workspace.js';
import PreviewOverlay from './components/PreviewOverlay.js';
import styles from './App.module.css';
import { createTestPresentation } from './data.js';
import { addSlide, removeSlides } from './types.js';

const LOCAL_STORAGE_KEY = 'presentation_maker_data';

function App() {
  const [presentation, setPresentation] = useState<Presentation>(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Ошибка чтения сохраненной презентации:", error);
      }
    }
    return createTestPresentation();
  });
  const [selectedSlideId, setSelectedSlideId] = useState<string>(presentation.slides[0]?.id ?? undefined);
  const [previewMode, setPreviewMode] = useState(false);

  if (previewMode) {
    return (
      <PreviewOverlay
        presentation={presentation}
        onClose={() => setPreviewMode(false)}
      />
    );
  }

  const handleSavePresentation = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(presentation));
    alert('Презентация успешно сохранена!'); // Уведомление для пользователя
  };
  const handleAddSlide = () => {
    const updatedPresentation = addSlide(presentation);
    setSelectedSlideId(updatedPresentation.slides[updatedPresentation.slides.length - 1]?.id ?? undefined);
    setPresentation(updatedPresentation)
  };
  const handleSetPreviewMode = () => {
    setPreviewMode(true)
  };
  const handleDeleteSlide = () => {
    if (!selectedSlideId) return;
    const deletingIndex = presentation.slides.findIndex((slide) => slide.id === selectedSlideId);

    const updatedPresentation = removeSlides(presentation, [selectedSlideId]);
    if (deletingIndex - 1 >= 0) {
      setSelectedSlideId(presentation.slides[deletingIndex - 1].id)
    }
    
    setPresentation(updatedPresentation)
  }
  const handleSetSlideColor = (slideId: string, newColor: string) => {
    setPresentation((prevPresentation) => ({
      ...prevPresentation,
      slides: prevPresentation.slides.map((slide) =>
        slide.id === slideId
          ? {
              ...slide,
              background: { type: 'color', color: newColor }
            }
          : slide
      ),
    }));
  };
  const handleSetSlideImage = (slideId: string, base64Str: string) => {
    setPresentation((prevPresentation) => ({
      ...prevPresentation,
      slides: prevPresentation.slides.map((slide) =>
        slide.id === slideId
          ? {
              ...slide,
              background: { type: 'image', url: base64Str }, 
            }
          : slide
      ),
    }));
  };
  const handleUpdateName = (newName: string) => {
    setPresentation((prev) => ({
      ...prev,
      name: newName,
    }));
  };

  const selectedSlide = presentation.slides.find((slide) => slide.id === selectedSlideId) ?? presentation.slides[0] ?? null;

  return (
    <div className={styles.appContainer}>
      <Toolbar
        presentation={presentation}
        onSavePresentation={handleSavePresentation}
        onAddSlide={handleAddSlide} 
        onPreview={handleSetPreviewMode}
        onDeleteSlide={handleDeleteSlide}
        currentSlideId={selectedSlideId}
        onSetSlideColor={handleSetSlideColor}
        onSetSlideImage={handleSetSlideImage}
        onUpdateName={handleUpdateName}
      />
      <div className={styles.mainArea}>
        <SlideList 
          presentation={presentation} 
          selectedSlideId={selectedSlideId ?? undefined}
          onSelectSlide={setSelectedSlideId}
        />
        {selectedSlide ? (<Workspace slide={selectedSlide} />) : (<div>Нет слайдов</div>)}
      </div>
    </div>
  );
}

export default App;
