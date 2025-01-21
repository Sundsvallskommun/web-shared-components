import { useFieldArray, useFormContext } from 'react-hook-form';
import { defaults } from './defaults';
import { CustomOnChangeEventUploadFile, UploadFile } from './types';
import { utils } from './utils';

export interface UseAddFilesProps {
  /** @default files */
  name?: string;
  /** @default true */
  allowMultiple?: boolean;
  onChange?: (event: CustomOnChangeEventUploadFile) => void;
  /** @default 10 */
  maxFileSizeMB?: number;
  accept?: string[];
  appendFiles?: UploadFile[];
  /** @default true */
  appendToContext?: boolean;
  onInvalid?: (message: string) => void;
  onValid?: () => void;
}

const useAddFiles = (props: UseAddFilesProps) => {
  const {
    name = 'files',
    onChange,
    onInvalid,
    onValid,
    maxFileSizeMB = 10,
    accept = defaults.acceptedMimeTypes,
    appendFiles: _appendFiles = [],
    appendToContext = true,
    allowMultiple = true,
  } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useFormContext ? useFormContext() : null;
  const fieldArrayContext = context
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useFieldArray({
        control: context?.control,
        name: name,
      })
    : null;

  const triggerChange = (files: UploadFile[]) => {
    let newFiles: UploadFile[] = [];
    if (fieldArrayContext) {
      newFiles = [...files];
      if (appendToContext) {
        fieldArrayContext?.append(files);
      }
    } else {
      newFiles = [..._appendFiles, ...files];
    }
    const event = { target: { value: newFiles, name: name } } as unknown as CustomOnChangeEventUploadFile;
    onChange?.(event);
  };

  const addFiles = (
    addedFiles: FileList | null,
    options: { triggerChange?: boolean; files?: UploadFile[] } = { triggerChange: true }
  ) => {
    if (!addedFiles) return [];
    const newFiles: UploadFile[] = [];

    // Max file size in bytes (from MB)
    const maxFileSize = maxFileSizeMB * 1024 * 1024;

    // Validate each file
    for (const file of Array.from(addedFiles)) {
      // Validate file type against accept list
      const validFileType = accept.includes(file.type);
      if (!validFileType) {
        const message = `Filtypen stöds ej: ${file.name}. Accepterade filtyper är: ${accept.join(', ')}`;
        context?.setError?.(name, { type: 'filetypeUnsupported', message: message });
        onInvalid?.(message);
        return [];
      }

      // Validate file size
      if (file.size > maxFileSize) {
        const message = `Filen är för stor: ${file.name}. Överstiger ${maxFileSizeMB} MB.`;
        context?.setError?.(name, { type: 'filesize', message: message });
        onInvalid?.(message);
        return [];
      }

      newFiles.push(utils.toUploadFile(file));
    }

    // Clear any previous errors
    onValid?.();
    context?.clearErrors?.(name);

    if (options.triggerChange) {
      triggerChange(allowMultiple ? newFiles : [newFiles[0]]);
    }

    return newFiles;
  };

  return { addFiles, triggerChange };
};

export const hooks = {
  useAddFiles,
};
