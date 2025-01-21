import { v4 as uuidv4 } from 'uuid';
import { UploadFile } from './types';

function splitByLastCharacter(input: string, character: string): [string, string] {
  const lastDotIndex = input.lastIndexOf(character);
  if (lastDotIndex === -1) return [input, '']; // No dot found

  const left = input.slice(0, lastDotIndex);
  const right = input.slice(lastDotIndex + 1);
  return [left, right];
}

function toUploadFile(file: File, extraMeta?: { [key: string]: unknown }): UploadFile {
  const [name, ending] = splitByLastCharacter(file.name, '.');
  return {
    id: uuidv4(),
    file: file,
    meta: {
      name: name,
      ending: ending,
      ...(extraMeta ? extraMeta : {}),
    },
  };
}

function getFileHeading(file: UploadFile): string {
  if (!file.meta.name || !file.meta.ending) {
    const [name, ending] = splitByLastCharacter(file.file.name, '.');
    return `${name}.${ending}`;
  } else {
    return `${file.meta.name}.${file.meta.ending}`;
  }
}

function getFileEnding(file: UploadFile): string {
  const [, ending] = splitByLastCharacter(file.file.name, '.');
  return `${ending}`;
}

export const utils = {
  splitByLastCharacter,
  toUploadFile,
  getFileHeading,
  getFileEnding,
};
