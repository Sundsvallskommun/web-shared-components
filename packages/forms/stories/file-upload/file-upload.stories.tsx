import { Switch } from '@sk-web-gui/forms';
import { Meta } from '@storybook/react';
import React from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { CustomOnChangeEventUploadFile, FileUpload, FileUploadProps, UploadFile } from '../../src';
import { Button } from '@sk-web-gui/button';
import { PopupMenu } from '@sk-web-gui/popup-menu';

export default {
  title: 'Komponenter/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
} as Meta<typeof FileUpload>;

const defaultCategories = {
  '': 'Välj kategori',
  CATETORY1: 'Kategori 1',
  CATETORY2: 'Kategori 2',
  CATETORY3: 'Kategori 3',
};

const MorePanel = (
  <PopupMenu.Panel>
    <PopupMenu.Items>
      <PopupMenu.Group>
        <PopupMenu.Item>
          <Button
            onClick={() => {
              console.log('Gör något');
            }}
          >
            Gör något
          </Button>
        </PopupMenu.Item>
      </PopupMenu.Group>
      <PopupMenu.Group>
        <PopupMenu.Item>
          <Button
            onClick={() => {
              console.log('Gör något annat');
            }}
          >
            Gör något annat
          </Button>
        </PopupMenu.Item>
      </PopupMenu.Group>
    </PopupMenu.Items>
  </PopupMenu.Panel>
);

export const Template = (args: React.ComponentProps<FileUploadProps['Component']>) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState<UploadFile[]>([]);

  const onChange = (e: CustomOnChangeEventUploadFile) => {
    if (e.target.value !== null) {
      setFiles((files) => files.concat(e.target.value));
    }
  };

  const handleRemoveFile = (file: UploadFile) => {
    setFiles((files) => {
      const index = files.indexOf(file);
      const newFiles = [...files];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleOnChangeName = (file: UploadFile) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles((files) => {
      const index = files.indexOf(file);
      const newFiles = [...files];
      newFiles[index].meta.name = e.target.value;
      return newFiles;
    });
  };

  const handleOnChangeCategory = (file: UploadFile) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiles((files) => {
      const index = files.indexOf(file);
      const newFiles = [...files];
      newFiles[index].meta.category = e.target.value;
      return newFiles;
    });
  };

  React.useEffect(() => {
    console.log('Template files', files);
  }, [files]);

  return (
    <div className="flex flex-col gap-lg">
      <Switch value={isEdit.toString()} checked={isEdit} onChange={() => setIsEdit((value) => !value)}>
        Redigera
      </Switch>
      <FileUpload.Area onChange={onChange}>
        <div className="flex flex-col gap-lg">
          <FileUpload.Button
            {...args}
            onChange={onChange}
            modalListProps={{
              categoryProps: {
                categories: defaultCategories,
              },
              actionsProps: { showRemove: true, onRemove: handleRemoveFile },
            }}
          />
          <FileUpload.List isEdit={isEdit}>
            {files?.map((file, i) => (
              <FileUpload.ListItem
                key={file.file.name}
                file={file}
                index={i}
                nameProps={{
                  inputProps: {
                    onChange: handleOnChangeName(file),
                  },
                }}
                categoryProps={{
                  categories: defaultCategories,
                  selectProps: {
                    onChange: handleOnChangeCategory(file),
                  },
                }}
                actionsProps={{
                  showRemove: true,
                  showMore: true,
                  morePopupMenuPanel: MorePanel,
                  onRemove: handleRemoveFile,
                }}
              />
            ))}
          </FileUpload.List>
        </div>
      </FileUpload.Area>
    </div>
  );
};

Template.storyName = 'FileUpload';

export const FileUploadWithUseFormProvider = (args: React.ComponentProps<FileUploadProps['Component']>) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(true);
  const context = useForm<{ attachments: UploadFile[] }>({
    defaultValues: { attachments: [] },
    mode: 'onChange',
  });
  const files = context?.watch('attachments');

  const handleOnSubmit = (values: FieldValues) => {
    console.log('handleOnSubmit', values);
  };

  React.useEffect(() => {
    console.log('FileUploadWithUseFormProvider files', files);
  }, [files]);

  return (
    <div className="flex flex-col gap-lg">
      <Switch value={isEdit.toString()} checked={isEdit} onChange={() => setIsEdit((value) => !value)}>
        Redigera
      </Switch>

      <FormProvider {...context}>
        <form className="flex flex-col gap-lg" onSubmit={context.handleSubmit(handleOnSubmit)}>
          <FileUpload.Button
            name="attachments"
            withModal
            modalListProps={{
              categoryProps: {
                categories: defaultCategories,
              },
              actionsProps: { showRemove: true },
            }}
          />
          <FileUpload.List name="attachments" isEdit={isEdit}>
            {files?.map((file, i) => (
              <FileUpload.ListItem
                key={`${file?.meta.name}-${i}`}
                index={i}
                nameProps={{
                  inputProps: context.register(`attachments.${i}.meta.name`),
                }}
                categoryProps={{
                  categories: defaultCategories,
                }}
                actionsProps={{ showRemove: true, showMore: true, morePopupMenuPanel: MorePanel }}
              />
            ))}
          </FileUpload.List>
          <Button type="submit">Skicka</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export const FileUploadWithUseForm = (args: React.ComponentProps<FileUploadProps['Component']>) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(true);
  const { register, watch, setValue, getValues, formState } = useForm<{ attachments: UploadFile[] }>({
    defaultValues: { attachments: [] },
    mode: 'onChange',
  });
  const attachments = watch('attachments');

  const handleRemoveFile = (file: UploadFile) => {
    setValue(
      'attachments',
      watch('attachments').filter((x) => x !== file)
    );
  };

  React.useEffect(() => {
    console.log('FileUploadWithListUseForm attachments', attachments);
  }, [attachments]);

  React.useEffect(() => {
    console.log('formState.errors', formState.errors);
  }, [formState.errors]);

  return (
    <div className="flex flex-col gap-lg">
      <Switch value={isEdit.toString()} checked={isEdit} onChange={() => setIsEdit((value) => !value)}>
        Redigera
      </Switch>
      <FileUpload.Button
        appendFiles={attachments}
        withModal
        modalListProps={{
          categoryProps: {
            categories: defaultCategories,
          },
          actionsProps: { showRemove: true, onRemove: handleRemoveFile },
        }}
        {...register('attachments')}
      />
      <FileUpload.List isEdit={isEdit} name="attachments">
        {attachments?.map((attachment, i) => (
          <FileUpload.ListItem
            key={`${attachment?.meta.name}-${i}`}
            file={attachment}
            index={i}
            nameProps={{
              inputProps: register(`attachments.${i}.meta.name`),
              formErrors: formState.errors,
            }}
            categoryProps={{
              categories: defaultCategories,
              selectProps: register(`attachments.${i}.meta.category`),
            }}
            actionsProps={{
              showRemove: true,
              showMore: true,
              morePopupMenuPanel: MorePanel,
              onRemove: handleRemoveFile,
            }}
          />
        ))}
      </FileUpload.List>
      <Button onClick={() => console.log('getValues', getValues())}>Skicka</Button>
    </div>
  );
};
