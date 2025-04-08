import { Meta } from '@storybook/react';
import React from 'react';
import { CustomOnChangeEventUploadFile, FileUpload, FileUploadProps, UploadFile } from '../../src';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Button } from '@sk-web-gui/button';

export default {
  title: 'Komponenter/FileUpload/Area',
  component: FileUpload.Area,
  tags: ['autodocs'],
} as Meta<typeof FileUpload.Area>;

export const Template = (args: React.ComponentProps<FileUploadProps['Area']>) => {
  const [files, setFiles] = React.useState<UploadFile[]>([]);

  const onChange = (event: CustomOnChangeEventUploadFile) => {
    setFiles(event.target.value);
  };

  React.useEffect(() => {
    console.log('Template files', files);
  }, [files]);

  return (
    <FileUpload.Area {...args} onChange={onChange}>
      <div className="inline-flex w-[40rem] h-[40rem] items-center justify-center">En yta</div>
    </FileUpload.Area>
  );
};

Template.storyName = 'FileUpload.Area';

export const FileUploadAreaWithUseFormProvider = (args: React.ComponentProps<FileUploadProps['Field']>) => {
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
          <FileUpload.Area
            {...args}
            // use simply with name
            // name="attachments"
            // or with register where e.g. validation is necessary on component
            {...context.register('attachments', {
              validate: {
                required: (value) => (required ? value.length > 0 : true),
              },
            })}
          >
            <div className="inline-flex w-[40rem] h-[40rem] items-center justify-center">En yta</div>
          </FileUpload.Area>
          <Button type="submit">Skicka</Button>
        </form>
      </FormProvider>
    </div>
  );
};
