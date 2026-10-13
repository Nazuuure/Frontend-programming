import type { Presentation } from '../types.js';
import Button from './Button.js'
import { useState } from 'react';

type PreviewOverlayProps = {
  presentation: Presentation;
  onClose: () => void;
};

function PreviewOverlay({ presentation, onClose }: PreviewOverlayProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const onNext = () => {
    if (slideIndex < presentation.slides.length - 1) {
      setSlideIndex(slideIndex + 1)
    }
  }
  const onPrev = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1)
    }
  }
  return (
    <div className="preview-overlay">
      <div className="preview-content">
        <h2>Preview Mode</h2>
        <div className="slide-counter">
          Слайд {slideIndex + 1} из {presentation.slides.length}
        </div>
        <Button onClick={onPrev}>{'<'}</Button>
        <Button onClick={onClose}>CLOSE</Button>
        <Button onClick={onNext}>{'>'}</Button>
      </div>
    </div>
  );
}

export default PreviewOverlay;