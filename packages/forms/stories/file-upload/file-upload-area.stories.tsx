import { Meta } from '@storybook/react';
import React from 'react';
import { CustomOnChangeEventUploadFile, FileUpload, FileUploadProps, UploadFile } from '../../src';

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
