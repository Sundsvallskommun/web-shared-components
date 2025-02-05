import { LucideIcon } from '@sk-web-gui/lucide-icon';
import { IconName } from 'lucide-react/dynamic';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import React from 'react';

function IconsComponent() {
  const copyName = (name) => () => {
    navigator.clipboard.writeText(name);
  };

  return (
    <div className="flex flex-wrap gap-sm">
      {Object.keys(dynamicIconImports).map((x) => {
        return (
          <LucideIcon
            className="hover:bg-inverted-background-content hover:text-inverted-body"
            onClick={copyName(x)}
            key={`${x}`}
            title={x}
            size="fit"
            variant="ghost"
            name={x as IconName}
          />
        );
      })}
    </div>
  );
}

export const Icons = React.memo(IconsComponent);
