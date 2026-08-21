import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GuiProvider } from '../../../theme/src';
import { FileUpload, type UploadFile } from './index';

const renderList = (list: React.ReactElement) => render(<GuiProvider>{list}</GuiProvider>);

describe('FileUpload.List public contract', () => {
  it('renders a stable empty state', () => {
    renderList(<FileUpload.List placeholder="No files selected" />);

    expect(screen.getByRole('list')).toHaveAttribute('data-isempty', 'true');
    expect(screen.getByText('No files selected')).toBeInTheDocument();
  });

  it('renders supplied files instead of the placeholder', () => {
    const files: UploadFile[] = [
      {
        id: 'document',
        file: new File(['content'], 'document.txt', { type: 'text/plain' }),
        meta: { name: 'document', ending: 'txt' },
      },
    ];

    renderList(<FileUpload.List files={files} iconProps={{ showPreview: false }} />);

    expect(screen.queryByText('Inga filer valda')).not.toBeInTheDocument();
    expect(screen.getByText('document.txt')).toBeInTheDocument();
  });
});
