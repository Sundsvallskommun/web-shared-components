import { describe, expect, it } from 'vitest';
import { sanitized } from './index';
import * as speechsdk from './services/speech-sdk';

describe('AI public contract', () => {
  it('keeps supported formatting and removes executable markup', () => {
    const unsafe = '<p>Hello <strong>world</strong></p><script>alert(1)</script><a href="javascript:alert(2)">link</a>';

    expect(sanitized(unsafe)).toBe('<p>Hello <strong>world</strong></p><a>link</a>');
  });

  it('constructs the speech recognizer with the secured UUID dependency', () => {
    const stream = speechsdk.AudioInputStream.createPushStream();
    const audioConfig = speechsdk.AudioConfig.fromStreamInput(stream);
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken('test-token', 'swedencentral');
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    expect(recognizer).toBeInstanceOf(speechsdk.SpeechRecognizer);

    recognizer.close();
    stream.close();
  });
});
