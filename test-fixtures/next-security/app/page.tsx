import { NextLink } from '@sk-web-gui/next-link';
import { TextEditor } from '@sk-web-gui/text-editor';

export default function Page() {
  return (
    <main>
      <h1>Next security fixture</h1>
      <NextLink href="/health">Verify the SK Web GUI adapter</NextLink>
      <TextEditor readOnly disableToolbar value={{ markup: '<p>Verify the client-only editor boundary</p>' }} />
    </main>
  );
}
