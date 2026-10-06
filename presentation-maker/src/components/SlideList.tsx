import type { Presentation } from '../types.js';
import styles from './SlideList.module.css';

type SlideListProps = {
    presentation: Presentation;
}

function SlideList({ presentation }: SlideListProps) {
  return (
    <div className={styles.slideList}>
        {presentation.slides.map((slide, index) => (
          <div key={slide.id ?? index}>slideId: {slide.id}</div>
        ))}
    </div>
  );
}

export default SlideList;