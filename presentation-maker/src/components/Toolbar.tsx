import type { Presentation } from '../types.js';
import { setPreviewMode } from '../editor.js';
import styles from './Toolbar.module.css';

type ToolBarProps = {
    presentation: Presentation;
}

function ToolBar({ presentation }: ToolBarProps) {
  return ( 
      <div className={styles.header}> 
        <h2 className={styles.presentation_name}>{presentation.name}</h2>  
        <div className={styles.toolbar}>
          <button className={styles.button} onClick={() => setPreviewMode(true)}>PREVIEW</button>
        </div> 
      </div>
  );
}

export default ToolBar;