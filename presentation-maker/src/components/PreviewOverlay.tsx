import type { Presentation } from '../types.js';

type PreviewOverlayProps = {
  presentation: Presentation;
  onClose: () => void;
};

function PreviewOverlay({ presentation, onClose }: PreviewOverlayProps) {
  return (
    <div className="preview-overlay">
      <div className="preview-content">
        <h2>Preview Mode</h2>
        <p>This is the preview of your presentation.</p>
        <pre>CurrentSlide: {presentation.slides[0].id}</pre>
        <button onClick={onClose}>Close Preview</button>
      </div>
    </div>
  );
}

export default PreviewOverlay;