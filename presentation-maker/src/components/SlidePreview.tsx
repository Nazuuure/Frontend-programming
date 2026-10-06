import type { Slide } from '../types';
import styles from './SlidePreview.module.css';

type SlidePreviewProps = {
  slide: Slide;
  slideCount: number;
};

function SlidePreview({ slide, slideCount }: SlidePreviewProps) {
  const background = slide.background;

  const backgroundStyle = {
    '--slide-bg':
      background?.type === 'color' ? background.color :
      background?.type === 'gradient' ? `linear-gradient(${background.angle ?? 0}deg, ${background.colors.join(', ')})` :
      background?.type === 'image' ? `url(${background.url})` :
      '#ffffff',
  } as React.CSSProperties;

  return (
    <div className={styles.slideBase}>
      <p className={styles.slideCount}>{slideCount}</p>
      <div
        className={styles.slide}
        style={backgroundStyle}
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