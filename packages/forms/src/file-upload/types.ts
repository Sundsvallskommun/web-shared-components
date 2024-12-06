import { CustomOnChangeEvent } from '@sk-web-gui/utils';

export interface UploadFile<TExtraMeta extends object = {}> {
  id: string;
  file: File;
  meta: {
    name: string;
    ending: string;
    category?: string;
    [key: string]: unknown;
  } & TExtraMeta;
}

export type OnCallWithUploadFile = (file: UploadFile) => void;

export type CustomOnChangeEventUploadFile = CustomOnChangeEvent<UploadFile[]>;
