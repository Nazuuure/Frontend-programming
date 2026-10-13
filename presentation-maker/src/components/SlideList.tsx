import type { Presentation } from '../types.js';
import styles from './SlideList.module.css';
import SlidePreview from './SlidePreview.js';

type SlideListProps = {
    presentation: Presentation;
    selectedSlideId: string | undefined;
    onSelectSlide: (id: string) => void;
}

function SlideList({presentation, selectedSlideId, onSelectSlide}: SlideListProps) {
  return (
    <div className={styles.slideList}>
      {
        presentation.slides.map((slide, index) => (
          <SlidePreview
            key={slide.id ?? index}
            slide={slide}
            slideCount={index + 1}
            isSelected={slide.id === selectedSlideId}
            onSelect={() => onSelectSlide(slide.id)}
          />
        ))
      }
    </div>
  );
}

export default SlideList;