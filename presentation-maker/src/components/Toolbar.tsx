import type { Presentation, Slide } from '../types.js';
import Button from './Button.js'
import styles from './Toolbar.module.css';
import SlideProperties from './SlideProperties.js';
import TextInput from './TextInput.js'
import { useState } from 'react';

type ToolBarProps = {
    presentation: Presentation;
    currentSlideId: string;
    onAddSlide: ()=>void;
    onPreview: ()=>void;
    onDeleteSlide: ()=>void;
    onSetSlideColor: (slideId: string, color: string) => void;
    onSetSlideImage: (slideId: string, url: string) => void;
    onUpdateName: (newName: string) => void;
    onSavePresentation: () => void;
}

function ToolBar({ 
  presentation, 
  onAddSlide, 
  onPreview, 
  onDeleteSlide, 
  currentSlideId, 
  onSetSlideColor, 
  onSetSlideImage, 
  onUpdateName, 
  onSavePresentation  
}: ToolBarProps) {
  const slide = presentation.slides.find((slide) => slide.id === currentSlideId);

  const [isEditing, setIsEditing] = useState(false);
  const [Name, setName] = useState(presentation.name);

  const handleOpenRename = () => {
    setName(presentation.name);
    setIsEditing(!isEditing);
  };

  const handleSaveName = () => {
    if (Name.trim()) {
      onUpdateName(Name.trim());
    }
    setIsEditing(false); // Закрываем окно
  };

  return (
      <div className={styles.header}>
        <h2 className={styles.presentation_name}>{presentation.name}</h2>  
        <div className={styles.toolbar}>
          <span>PRESENTATION:</span>
          <Button onClick={onSavePresentation}>SAVE</Button>
          <div className={styles.rename_wrapper}>
            <Button onClick={handleOpenRename}>RENAME</Button>
            {isEditing && (
              <div className={styles.dropdown_window}>
                <TextInput 
                  value={Name} 
                  onChange={setName} 
                  placeholder="Новое название..."
                  className={styles.rename_input}
                />
                <div className={styles.dropdown_actions}>
                  <Button onClick={handleSaveName}>SAVE</Button>
                  <Button onClick={() => setIsEditing(false)}>CANCEL</Button>
                </div>
              </div>
            )}
          </div>
          <Button onClick={onPreview}>PREVIEW</Button>
          <Button onClick={onAddSlide}>ADD SLIDE</Button>
          <Button onClick={onDeleteSlide}>DEL SLIDE</Button>
          {slide ? (
            <SlideProperties
              slide={slide} 
              onColorChange={(color) => onSetSlideColor(slide.id, color)} 
              onImageChange={(base64Str) => onSetSlideImage(slide.id, base64Str)}
            />
          ) : (
            <div className={styles.no_slide}>Слайд не выбран</div>
          )}
        </div> 
      </div>
  );
}

export default ToolBar;