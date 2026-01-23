import { Meta } from '@storybook/react';
import { ChatInput } from '../src/components/chat-input';
import type { ChatInputProps } from '../src/components/chat-input/chat-input';
import Icon from '@sk-web-gui/icon';
import { ImagePlus, Mic, Paperclip } from 'lucide-react';
import React, { useState } from 'react';
import Button from '@sk-web-gui/button';
import Divider from '@sk-web-gui/divider';

export default {
  title: 'AI/Komponenter/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
} as Meta<ChatInputProps>;

export const Template = (args: ChatInputProps) => {
  return (
    <div className="flex flex-col gap-32">
      <p>
        <strong>Chat input</strong> är en textarea skapad för chattar.
      </p>
      <p>
        Per automatik så rensas textfältet och skickas med <code>useChat</code> när man klickar send (eller enter).
        <br />
        Detta kan skrivas över med props <code>value</code>, <code>onChangeValue</code> och <code>onSend</code>
      </p>
      <p>
        Det finns stöd för en toolbar, där man kan stoppa in knappar för att t.ex. bifoga filer, eller diktera.
        <br />
        Utan toolbar så visas skickaknappen på samma rad som texten, så länge bara en rad text existerar. Knappen hamnar
        sedan på en egen rad under
      </p>
      <ChatInput placeholder="Skriv något..." {...args} />
    </div>
  );
};

export const WithToolbar = () => {
  const [dicating, setDictating] = React.useState<boolean>(false);
  const [createImage, setCreateImage] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col gap-32">
      <p>
        <strong>Med en toolbar</strong> så blir rutan högre.
        <br />
        Här visas en grupp med 2 knappar som kan togglas (pressed), och en grupp med en enkel knapp.
      </p>

      <ChatInput
        toolbar={[
          [
            <ChatInput.Toolbar.Button onClick={() => setDictating(!dicating)} pressed={dicating} label="Diktera">
              <Icon icon={<Mic />} />
            </ChatInput.Toolbar.Button>,
            <ChatInput.Toolbar.Button
              onClick={() => setCreateImage(!createImage)}
              pressed={createImage}
              label="Skapa bild"
            >
              <Icon icon={<ImagePlus />} />
            </ChatInput.Toolbar.Button>,
          ],
          <ChatInput.Toolbar.Button label="Bifoga dokument">
            <Icon icon={<Paperclip />} />
          </ChatInput.Toolbar.Button>,
        ]}
      />
    </div>
  );
};

export const Custom = () => {
  const [dicating, setDictating] = React.useState<boolean>(false);
  const [createImage, setCreateImage] = React.useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  return (
    <div className="flex flex-col gap-32">
      <p>
        <strong>Chat input</strong> kan byggas upp själv med dess delkomponenter.
        <br />
        Den består av följande delar.
      </p>
      <ul>
        <li>
          <code>{`<ChatInput.Wrapper>`}</code>
        </li>
        <li>
          <code>{`<ChatInput.Textarea>`}</code>
        </li>
        <li>
          <code>{`<ChatInput.Submitbutton>`}</code>
        </li>
        <li>
          <code>{`<ChatInput.Toolbar>`}</code>
        </li>
        <li>
          <code>{`<ChatInput.Toolbar.Button>`}</code>
        </li>
      </ul>
      <p>Då följer ingen logik så som useChat med.</p>
      <ChatInput.Wrapper>
        <ChatInput.Textarea className="font-mono" wrap onChange={(e) => setValue(e.target.value)} value={value} />

        <ChatInput.Toolbar>
          <ChatInput.Toolbar.Button onClick={() => setDictating(!dicating)} pressed={dicating} label="Diktera">
            <Icon icon={<Mic />} />
          </ChatInput.Toolbar.Button>
          <ChatInput.Toolbar.Button
            onClick={() => setCreateImage(!createImage)}
            pressed={createImage}
            label="Skapa bild"
          >
            <Icon icon={<ImagePlus />} />
          </ChatInput.Toolbar.Button>
          <Divider orientation="vertical" />
          <ChatInput.Toolbar.Button onClick={() => setValue('')} variant="secondary" iconButton={false} size="sm">
            Radera
          </ChatInput.Toolbar.Button>
        </ChatInput.Toolbar>
        <ChatInput.Submitbutton>
          <Button
            size="sm"
            onClick={() => {
              console.log(value);
              setValue('');
            }}
            color={value ? 'success' : 'primary'}
          >
            Skicka
          </Button>
        </ChatInput.Submitbutton>
      </ChatInput.Wrapper>
    </div>
  );
};
