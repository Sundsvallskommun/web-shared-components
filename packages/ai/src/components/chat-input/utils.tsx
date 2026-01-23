import React from 'react';
import { ChatToolbarGroup } from './chat-input';
import Divider from '@sk-web-gui/divider';

export const handleMapToolbar = (tool: ChatToolbarGroup, index: number, total: number): React.ReactNode => {
  if (Array.isArray(tool)) {
    return (
      <React.Fragment key={`toolbar-group-${index}`}>
        {tool.map((childTool, childIndex) => (
          <React.Fragment key={`toolbar-group-${index}-subgroup-${childIndex}`}>
            {handleMapToolbar(childTool, childIndex, total)}
          </React.Fragment>
        ))}
        {index < total ? <Divider orientation="vertical" /> : <></>}
      </React.Fragment>
    );
  }

  if (React.isValidElement<Record<string, string>>(tool)) {
    return React.cloneElement(tool, { ...tool.props, key: `toolbar-tool-${index}` });
  }

  return tool;
};
