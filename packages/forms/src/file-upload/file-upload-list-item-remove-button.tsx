import Button from '@sk-web-gui/button';
import Icon from '@sk-web-gui/icon';
import { useThemeQueries } from '@sk-web-gui/theme';
import Tooltip from '@sk-web-gui/tooltip';
import { cx } from '@sk-web-gui/utils';
import { Trash } from 'lucide-react';

export const RemoveActionButton: React.FC<{
  onClick: () => void;
  tooltip?: string;
  className?: string;
}> = ({ onClick, tooltip = 'Ta bort bifogad fil', className }) => {
  const { isMinMediumDevice } = useThemeQueries();

  if (isMinMediumDevice) {
    return (
      <div className={cx('relative group inline-flex flex-col items-center', className)}>
        <Button
          className="sk-form-file-upload-list-item-actions-remove"
          aria-label="Ta bort bifogad fil"
          onClick={onClick}
          variant="tertiary"
          showBackground={false}
          size="sm"
          iconButton
        >
          <Icon icon={<Trash />} />
        </Button>

        <div className="sk-form-file-upload-list-item-actions-remove-tooltip">
          <Tooltip position="above">{tooltip}</Tooltip>
        </div>
      </div>
    );
  }

  return (
    <Button
      className={cx('sk-form-file-upload-list-item-actions-remove', className)}
      aria-label="Ta bort bifogad fil"
      onClick={onClick}
      variant="tertiary"
      showBackground
      leftIcon={<Trash />}
    >
      Ta bort
    </Button>
  );
};
