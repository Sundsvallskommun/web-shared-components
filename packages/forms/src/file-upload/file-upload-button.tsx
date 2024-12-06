import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { Modal } from '@sk-web-gui/modal';
import { addPropsToChildren, cx, DefaultProps } from '@sk-web-gui/utils';
import { Paperclip } from 'lucide-react';
import React from 'react';
import { FormControl, FormLabel, Input } from '../index';
import { defaults } from './defaults';
import { FileUploadArea } from './file-upload-area';
import { FileUploadList } from './file-upload-list';
import { FileUploadListItem } from './file-upload-list-item';
import { hooks, UseAddFilesProps } from './hooks';
import { CustomOnChangeEventUploadFile, UploadFile } from './types';
import { FormProvider, useForm } from 'react-hook-form';

export interface FileUploadButtonProps
  extends DefaultProps,
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'color' | 'children' | 'onChange' | 'onInvalid'>,
    UseAddFilesProps {
  /** @default false */
  withModal?: boolean;
  modalListProps?: React.ComponentProps<typeof FileUploadList>;
  children?: JSX.Element | JSX.Element[] | string;
  fileNameValidationFunctions?: Record<string, (value: string) => boolean | string>;
}

export const FileUploadButton = React.forwardRef<HTMLSpanElement, FileUploadButtonProps>((props, ref) => {
  const {
    className,
    children,
    withModal = false,
    // useAddFilesProps
    name = 'files',
    allowMultiple = true,
    onChange,
    onInvalid,
    onValid,
    maxFileSizeMB = 10,
    accept = defaults.acceptedMimeTypes,
    appendFiles: _appendFiles,
    fileNameValidationFunctions = defaults.fileNameValidationFunctions,
    // Props for modal-list
    modalListProps,
    ...rest
  } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const useAddFilesProps = {
    name,
    allowMultiple,
    onChange,
    onInvalid,
    onValid,
    maxFileSizeMB,
    accept,
    appendFiles: _appendFiles,
  };

  const context = useForm<{ modalAttachments: UploadFile[] }>({
    defaultValues: { modalAttachments: [] },
    mode: 'onChange',
  });
  const files = context?.watch('modalAttachments');

  const setFiles = (newFiles: UploadFile[] | ((files: UploadFile[]) => UploadFile[])) => {
    if (newFiles instanceof Function) {
      setFiles(newFiles(context.watch('modalAttachments')));
    } else {
      context?.setValue('modalAttachments', newFiles, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    }
  };

  const { addFiles, triggerChange } = hooks.useAddFiles({ ...useAddFilesProps });

  const handleDroppedFiles = (e: CustomOnChangeEventUploadFile) => {
    setFiles(allowMultiple ? [...files, ...e.target.value] : [...e.target.value]);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (withModal) {
      const newFiles = addFiles(e.target.files, { triggerChange: false });
      setFiles(allowMultiple ? [...files, ...newFiles] : [...newFiles]);
      setShowModal(true);
    } else {
      addFiles(e.target.files);
    }
  };

  const handleOnClick = () => {
    if (inputRef?.current) {
      inputRef?.current.click();
    }
  };

  const handleOnModalCancel = () => {
    setFiles([]);
    setShowModal(false);
  };

  const handleOnSubmit = () => {
    triggerChange(files);
    handleOnModalCancel();
  };

  return (
    <span ref={ref} className={cx('sk-form-file-upload-button', className)} {...rest}>
      {children ? (
        addPropsToChildren(children, { 'data-cy': `${name}-add-file-button`, onClick: handleOnClick })
      ) : (
        <Button
          data-cy={`${name}-add-file-button`}
          variant="tertiary"
          showBackground
          leftIcon={<Icon icon={<Paperclip />} size={16} />}
          onClick={handleOnClick}
        >
          Bifoga fil
        </Button>
      )}
      <div className="hidden">
        <FormControl id={`${name}-add-file-item`}>
          <FormLabel>Välj fil att lägga till</FormLabel>
          <Input
            ref={inputRef}
            type="file"
            name={name}
            aria-labelledby={`${name}-add-file-item-label`}
            id={`file-upload-${name}`}
            multiple={allowMultiple}
            accept={Array.isArray(accept) ? accept.join(',') : undefined}
            placeholder="Välj fil att lägga till"
            onChange={onFileChange}
          />
        </FormControl>
      </div>
      {withModal ? (
        <Modal
          className="sk-form-file-upload-modal"
          show={showModal}
          onClose={() => setShowModal(false)}
          label={`Ladda upp fil${allowMultiple ? 'er' : ''}`}
        >
          <FormProvider {...context}>
            <form className="flex flex-col gap-lg" onSubmit={context.handleSubmit(handleOnSubmit)}>
              <Modal.Content>
                <FileUploadArea
                  {...useAddFilesProps}
                  name="modalAttachments"
                  appendFiles={undefined}
                  appendToContext={false}
                  onChange={handleDroppedFiles}
                >
                  <div className="sk-form-file-upload-modal-button-wrapper">
                    <Button data-cy={`${name}-add-file-button-modal`} variant="secondary" onClick={handleOnClick}>
                      Ladda upp fler
                    </Button>
                    <span>{`eller dra fil${allowMultiple ? 'er' : ''} hit`}</span>
                  </div>

                  <div className="sk-form-file-upload-modal-count">{`${files?.length} filer valda`}</div>
                  <div className="sk-form-file-upload-modal-labels">
                    <label>Namn</label>
                    <label>Kategori</label>
                  </div>
                  <FileUploadList
                    isEdit
                    files={files}
                    actionsProps={{ showRemove: true }}
                    {...modalListProps}
                    name="modalAttachments"
                  >
                    {files.map((file, i) => (
                      <FileUploadListItem
                        key={`${file.meta.name}-${i}`}
                        index={i}
                        file={file}
                        nameProps={{
                          inputProps: context.register(`modalAttachments.${i}.meta.name`, {
                            validate: fileNameValidationFunctions,
                          }),
                          formErrors: context.formState.errors,
                        }}
                        categoryProps={{
                          selectProps: context.register(`modalAttachments.${i}.meta.category`),
                        }}
                      />
                    ))}
                  </FileUploadList>
                </FileUploadArea>
              </Modal.Content>
              <Modal.Footer className="justify-end">
                <Button variant="secondary" onClick={handleOnModalCancel}>
                  Avbryt
                </Button>
                <Button variant="primary" type="submit">
                  Ladda upp filer
                </Button>
              </Modal.Footer>
            </form>
          </FormProvider>
        </Modal>
      ) : null}
    </span>
  );
});

export default FileUploadButton;
