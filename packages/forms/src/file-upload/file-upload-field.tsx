import { FileUploadButton, FileUploadButtonProps } from './file-upload-button';
import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { defaults } from './defaults';
import { FileUploadArea } from './file-upload-area';
import { Link } from '@sk-web-gui/link';
import { Icon } from '@sk-web-gui/icon';
import { Upload } from 'lucide-react';

export interface FileUploadFieldProps
  extends DefaultProps,
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'color' | 'children' | 'onChange' | 'onInvalid'>,
    FileUploadButtonProps {
  /** @default horizontal */
  variant: 'vertical' | 'horizontal';
  /** @default false */
  invalid: boolean;
  children: JSX.Element | JSX.Element[] | string;
}

export const FileUploadField = React.forwardRef<HTMLSpanElement, FileUploadFieldProps>((props, ref) => {
  const {
    className,
    variant = 'horizontal',
    invalid = false,
    // useAddFilesProps
    name = 'files',
    allowMultiple = true,
    onChange,
    onInvalid,
    maxFileSizeMB = 10,
    accept = defaults.acceptedMimeTypes,
    appendFiles: _appendFiles,
    ...rest
  } = props;
  const [isInvalid, setIsInvalid] = React.useState(invalid);

  const handleOnInvalid = (message: string) => {
    setIsInvalid(true);
    onInvalid?.(message);
  };

  const handleOnValid = () => {
    setIsInvalid(false);
  };

  const useAddFilesProps = {
    name,
    allowMultiple,
    onChange,
    onInvalid: handleOnInvalid,
    onValid: handleOnValid,
    maxFileSizeMB,
    accept,
    appendFiles: _appendFiles,
  };

  React.useEffect(() => {
    setIsInvalid(invalid);
  }, [invalid]);

  return (
    <span
      ref={ref}
      className={cx('sk-form-file-upload-field', className)}
      data-variant={variant}
      data-invalid={isInvalid}
      {...rest}
    >
      <FileUploadArea {...useAddFilesProps} relativity="component">
        <FileUploadButton {...useAddFilesProps}>
          <button className="sk-form-file-upload-field-button">
            <div className="sk-form-file-upload-field-button-icon">
              <Icon icon={<Upload />} />
            </div>
            <div className="sk-form-file-upload-field-button-content">
              <div className="sk-form-file-upload-field-button-content-text">
                <Link as="span">Välj fil</Link> eller dra och släpp den här.
              </div>
              <div className="sk-form-file-upload-field-button-content-restrictions">
                {accept && Array.isArray(accept) ? (
                  <div className="sk-form-file-upload-field-button-content-restrictions-mimetypes">{`Tillåtna filtyper: ${accept?.join(', ')}`}</div>
                ) : null}
                <div className="sk-form-file-upload-field-button-content-restrictions-filesize">{`Max filstorlek: ${maxFileSizeMB} MB`}</div>
              </div>
            </div>
          </button>
        </FileUploadButton>
      </FileUploadArea>
    </span>
  );
});
