import { Meta } from '@storybook/react';
import React from 'react';
import { CustomOnChangeEventUploadFile, FileUpload, FileUploadProps, UploadFile } from '../../src';

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
