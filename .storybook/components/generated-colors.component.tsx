import { useGui } from '@sk-web-gui/theme';
import { rgbStringToHex } from '@sk-web-gui/utils';
import React from 'react';

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function GeneratedColors({ src, ...props }) {
  const { theme } = useGui();
  const colors = Object.entries(theme.__cssMap).reduce((colors, entry) => {
    const [key, value] = entry;

    if (key.startsWith('colors.')) {
      const keyParts = key.split('.');
      const group = keyParts[1];
      const colorName = keyParts.slice(1).join('-');
      if (colors[group]) {
        colors[group] = colors[group].concat([{ name: colorName, definitions: value }]);
      } else {
        colors[group] = [{ name: colorName, definitions: value }];
      }
    }
    return colors;
  }, {});

  return (
    <>
      <h1>Färger</h1>
      <ul>
        {Object.keys(colors).map((group) => {
          return (
            <li key={`${group}`}>
              <a href={`#${capitalize(group)}`}>{capitalize(group)}</a>
            </li>
          );
        })}
      </ul>
      {Object.keys(colors).map((group) => {
        const groupColors = colors[group];
        return (
          <div key={`${group}`}>
            <div className="flex gap-sm">
              <a style={{ fontSize: '2.4rem', lineHeight: '4.5rem' }} href={`#${capitalize(group)}`}>
                #
              </a>
              <h2 id={`${capitalize(group)}`}>{capitalize(group)}</h2>
            </div>

            <table>
              <tbody>
                <tr>
                  <th>Färg</th>
                  <th>Namn</th>
                  <th>HEX-kod</th>
                  <th>RGB-kod</th>
                </tr>

                {groupColors.map((colorObj) => {
                  const { name, definitions } = colorObj;
                  return (
                    <tr key={`${name}`}>
                      <td style={{ backgroundColor: `${definitions.value}` }}></td>
                      <td>{name}</td>
                      <td>{rgbStringToHex(definitions.value)}</td>
                      <td>{definitions.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}
