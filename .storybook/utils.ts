import { Plugin } from 'vite';
import path from 'path';

export function reloadStylesOnFolderChange(folderPath: string, stylePath: string): Plugin {
  return {
    name: 'reload-styles-on-folder-change',
    async handleHotUpdate({ file, server }) {
      // Normalize paths
      const normalizedFile = file.replace(/\\/g, '/');
      const normalizedFolder = path.resolve(folderPath).replace(/\\/g, '/');
      const normalizedStylePath = path.resolve(stylePath).replace(/\\/g, '/');

      // Check if the changed file is within the specified folder
      if (normalizedFile.startsWith(normalizedFolder)) {
        // Try to get the module for the styles
        const styleModule = server.moduleGraph.getModuleById(normalizedStylePath);

        if (styleModule) {
          // Invalidate the module to trigger reloading of styles
          server.moduleGraph.invalidateModule(styleModule);
          server.reloadModule(styleModule);
          console.log('Styles reloaded due to', normalizedFile);
        } else {
          console.warn('No module found for styles');
        }
        return [];
      }

      // Let Vite handle the update normally if the file isn't in the target folder
      return undefined;
    },
  };
}
