import styles from './SlideProperties.module.css'
import Button from './Button';
import type { Slide } from '../types'
import { useRef } from 'react'

interface SlidePropertiesProps {
    slide: Slide;
    onColorChange: (newColor: string) => void;
    onImageChange: (base64Str: string) => void;
}


function SlideProperties({ slide, onColorChange, onImageChange }: SlidePropertiesProps) {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!slide) {
    return <div className={styles.properties_container}>Слайд не выбран</div>;
  }
  const handleButtonClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };
  const handleImageButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
  }};
  const handleImageChange = (inputElement: React.ChangeEvent<HTMLInputElement>) => {
    const file = inputElement.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onImageChange(reader.result); 
      }
    };
    reader.readAsDataURL(file);
  };

  const handleColorChange = (inputElement: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(inputElement.target.value);
  };

  const currentBackgroundColor = slide.background?.type === 'color' ? slide.background.color : '#ffffff';

  return (
    <div className={styles.properties_container}>
      <span>SLIDE:</span>
      <div className={styles.picker_wrapper}>
        <Button onClick={handleButtonClick}>BG COLOR</Button>
        <span 
          className={styles.color_indicator} 
          style={{ backgroundColor: currentBackgroundColor }}
        />
        <input
          ref={colorInputRef}
          type="color"
          value={currentBackgroundColor}
          onChange={handleColorChange}
          className={styles.hidden_input}
        />
      </div>
      <div className={styles.picker_wrapper}>
        <Button onClick={handleImageButtonClick}>BG IMAGE</Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.hidden_input}
        />
      </div>
    </div>
  );
}


export default SlideProperties;