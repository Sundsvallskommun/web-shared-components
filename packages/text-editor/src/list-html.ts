/** Converts Quill's internal list markup to portable HTML lists. */
export function quillListToHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  doc.querySelectorAll('ol').forEach((ol) => {
    const items = Array.from(ol.querySelectorAll(':scope > li[data-list]'));
    if (items.length === 0) return;

    const groups: { type: string; items: Element[] }[] = [];
    items.forEach((item) => {
      const type = item.getAttribute('data-list') || 'ordered';
      const last = groups[groups.length - 1];
      if (last && last.type === type) {
        last.items.push(item);
      } else {
        groups.push({ type, items: [item] });
      }
    });

    const fragment = doc.createDocumentFragment();
    groups.forEach((group) => {
      const list = doc.createElement(group.type === 'bullet' ? 'ul' : 'ol');
      group.items.forEach((item) => {
        const li = doc.createElement('li');
        const clone = item.cloneNode(true) as Element;
        clone.querySelectorAll('span.ql-ui').forEach((element) => element.remove());
        clone.removeAttribute('data-list');
        li.innerHTML = clone.innerHTML;
        list.appendChild(li);
      });
      fragment.appendChild(list);
    });

    ol.parentNode?.replaceChild(fragment, ol);
  });

  return doc.body.innerHTML;
}

/** Converts portable HTML lists to the list format expected by Quill. */
export function htmlToQuillList(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  doc.querySelectorAll('ul').forEach((ul) => {
    const ol = doc.createElement('ol');
    while (ul.firstChild) {
      const child = ul.firstChild;
      if (child instanceof Element && child.tagName === 'LI') {
        child.setAttribute('data-list', 'bullet');
      }
      ol.appendChild(child);
    }
    ul.parentNode?.replaceChild(ol, ul);
  });

  doc.querySelectorAll('ol > li:not([data-list])').forEach((li) => {
    li.setAttribute('data-list', 'ordered');
  });

  return doc.body.innerHTML;
}
