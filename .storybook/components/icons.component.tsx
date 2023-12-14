import React from 'react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { Icon } from '@sk-web-gui/icon';

export function Icons() {
  return (
    <div className="flex flex-wrap gap-sm">
      {Object.keys(dynamicIconImports).map((x) => {
        return <Icon key={`${x}`} title={x} size="fit" variant="ghost" name={x} />;
      })}
    </div>
  );
}
