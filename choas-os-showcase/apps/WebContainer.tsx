
import React from 'react';
import { CustomApp } from '../App';

interface WebContainerProps {
  app: CustomApp;
}

export const WebContainer: React.FC<WebContainerProps> = ({ app }) => {
  // Persistence SDK script that is injected into EVERY custom HTML app.
  const sdkScript = `
    <script>
      (function() {
        window.EntropyMesh = {
          save: function(key, data) {
            window.parent.postMessage({ type: 'MESH_SAVE', appId: '${app.id}', key: key, data: data }, '*');
          },
          load: function(key, callback) {
            var listener = function(event) {
              if (event.data.type === 'MESH_LOAD_RESPONSE' && event.data.key === key) {
                callback(event.data.data);
                window.removeEventListener('message', listener);
              }
            };
            window.addEventListener('message', listener);
            window.parent.postMessage({ type: 'MESH_LOAD', appId: '${app.id}', key: key }, '*');
          }
        };
      })();
    </script>
  `;

  const fullHtml = app.code.includes('<head>') 
    ? app.code.replace('<head>', '<head>' + sdkScript)
    : sdkScript + app.code;

  return (
    <div className="h-full w-full bg-white flex flex-col overflow-hidden">
      <iframe
        title={app.name}
        srcDoc={fullHtml}
        className="w-full h-full border-none"
        sandbox="allow-scripts allow-modals allow-popups allow-forms"
      />
      <div className="h-4 bg-slate-900 px-2 flex items-center justify-between text-[8px] font-black text-white/30 uppercase tracking-widest">
        <span>Entropy Isolation: Active</span>
        <span>Secure Persistence Link: Online</span>
      </div>
    </div>
  );
};
