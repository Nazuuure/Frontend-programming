import type { Slide } from '../types';
import styles from './SlidePreview.module.css';

type SlidePreviewProps = {
  slide: Slide;
  slideCount: number;
  isSelected: boolean;
  onSelect: () => void;
};

function SlidePreview({ slide, slideCount, isSelected, onSelect }: SlidePreviewProps) {
  const background = slide.background;

  const getBackgroundStyle = () => {
    if (background?.type === 'color') {
      return { backgroundColor: background.color };
    }
    if (background?.type === 'gradient') {
      return { backgroundImage: `linear-gradient(${background.angle ?? 0}deg, ${background.colors.join(', ')})` };
    }
    if (background?.type === 'image') {
      return { backgroundImage: `url(${background.url})`, backgroundSize: 'cover' };
    }
    return { backgroundColor: '#ffffff' };
  };

  return (
    <div className={styles.slideBase}>
      <p className={styles.slideCount}>{slideCount}</p>
      <div
        className={`${styles.slide} ${isSelected ? styles.active : ""}`}
        style={getBackgroundStyle()}
        onClick={onSelect}
      >
        {
          slide.objects.map((object, index) => {
          if (object.type === 'image') {
            return (
              <img
                key={object.id ?? index}
                src={object.imageUrl}
                alt=""
              />
            );
          }
          if (object.type === 'text') {
            return (
                <p 
                  className={styles.slide} 
                  key={object.id ?? index}
                >
                  {object.content}
                </p>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default SlidePreview;