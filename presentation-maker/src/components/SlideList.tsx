import type { Presentation } from '../types.js';
import styles from './SlideList.module.css';
import SlidePreview from './SlidePreview.js';

type SlideListProps = {
    presentation: Presentation;
}

function SlideList({ presentation }: SlideListProps) {
  return (
    <div className={styles.slideList}>
      {presentation.slides.map((slide, index) => (
        <SlidePreview
          key={slide.id ?? index}
          slide={slide}
          slideCount={index + 1}
        />
      ))}
    </div>
  );
}

export default SlideList;