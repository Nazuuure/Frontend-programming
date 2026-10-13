import type { Slide } from '../types';
import styles from './Workspace.module.css'

type WorkspaceProps = {
  slide: Slide;
};

function Workspace({ slide }: WorkspaceProps) {
    const background = slide.background
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
        <div className={styles.workspace}>
            <div className={styles.current_slide} style={getBackgroundStyle()}>
            </div>    
        </div>
    );
}

export default Workspace;