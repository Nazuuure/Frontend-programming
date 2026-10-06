import type { Presentation } from '../types';

type WorkspaceProps = {
  presentation: Presentation;
};

function Workspace({ presentation }: WorkspaceProps) {
    return (
        <div className="workspace">
            <h2>Workspace</h2>
            <p>This is the workspace area.</p>
            <pre>currSlideId: {presentation.slides[0].id}</pre>
        </div>
    );
}

export default Workspace;