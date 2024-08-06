import { Icon } from '@sk-web-gui/icon';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import React from 'react';

export function Icons() {
  const copyName = (name) => () => {
    navigator.clipboard.writeText(name);
  };

  return (
    <div className="flex flex-wrap gap-sm">
      {Object.keys(dynamicIconImports).map((x) => {
        return (
          <Icon
            className="hover:bg-inverted-background-content hover:text-inverted-body"
            onClick={copyName(x)}
            key={`${x}`}
            title={x}
            size="fit"
            variant="ghost"
            name={x}
          />
        );
      })}
    </div>
  );
}
