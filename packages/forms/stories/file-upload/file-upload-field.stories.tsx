import { Meta } from '@storybook/react';
import React from 'react';
import { CustomOnChangeEventUploadFile, FileUpload, FileUploadProps, UploadFile } from '../../src';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Button } from '@sk-web-gui/button';

export default {
  title: 'Komponenter/FileUpload/Field',
  component: FileUpload.Field,
  tags: ['autodocs'],
} as Meta<typeof FileUpload.Field>;

export const Template = (args: React.ComponentProps<FileUploadProps['Field']>) => {
  const [files, setFiles] = React.useState<UploadFile[]>([]);

  const onChange = (e: CustomOnChangeEventUploadFile) => {
    if (e.target.value !== null) {
      setFiles(e.target.value);
    }
  };

  React.useEffect(() => {
    console.log('Template files', files);
  }, [files]);

  return (
    <div className="flex flex-col gap-lg">
      <FileUpload.Field {...args} onChange={onChange} />
    </div>
  );
};

Template.storyName = 'FileUpload';

export const FileUploadFieldWithUseFormProvider = (args: React.ComponentProps<FileUploadProps['Field']>) => {
  const context = useForm<{ attachments: UploadFile[] }>({
    defaultValues: { attachments: [] },
    mode: 'onChange',
  });
  const files = context?.watch('attachments');
  const required = true;

  const handleOnSubmit = (values: FieldValues) => {
    console.log('handleOnSubmit', values);
  };

  React.useEffect(() => {
    console.log('FileUploadWithUseFormProvider files', files);
  }, [files]);

  console.log('context.formState.errors', context.formState.errors);

  return (
    <div className="flex flex-col gap-lg">
      <FormProvider {...context}>
        <form className="flex flex-col gap-lg" onSubmit={context.handleSubmit(handleOnSubmit)}>
          <FileUpload.Field
            {...args}
            // use simply with name
            // name="attachments"
            // or with register where e.g. validation is necessary on component
            {...context.register('attachments', {
              validate: {
                required: (value) => (required ? value.length > 0 : true),
              },
            })}
          />
          <Button type="submit">Skicka</Button>
        </form>
      </FormProvider>
    </div>
  );
};
