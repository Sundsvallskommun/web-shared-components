import { Button } from '@sk-web-gui/button';
import { ContextMenu } from '@sk-web-gui/context-menu';
import { DefaultProps } from '@sk-web-gui/utils';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { Dispatch, SetStateAction } from 'react';

interface ICommentContextProps extends DefaultProps {
  /* React node */
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteCallback: (id: string | number) => void;
  setInputValue: (comment: string) => void;
  commentValue: string;
  commentItem: { id: string | number | undefined; comment: string };
  setItemToEdit: Dispatch<SetStateAction<{ id: string | number | undefined; comment: string } | undefined>>;
}

export const CommentItemContextmenu = React.forwardRef<HTMLDivElement, ICommentContextProps>((props, ref) => {
  const { onDeleteCallback, setIsEdit, setInputValue, commentValue, commentItem, setItemToEdit } = props;

  const onHandleEdit = () => {
    setIsEdit(true);
    setItemToEdit({
      id: commentItem.id,
      comment: commentItem.comment,
    });
    setInputValue(commentValue);
  };

  const onHandleDelete = () => {
    if (commentItem && commentItem.id) {
      onDeleteCallback(commentItem.id);
    }
  };

  return (
    <ContextMenu classNameItems="p-0 absolute right-10" ref={ref}>
      <ContextMenu.Button title="Redigera Kommentar" variant="tertiary" size="lg" className="border-0" iconButton>
        <MoreVertIcon />
      </ContextMenu.Button>

      <ContextMenu.Item className="w-full">
        <Button
          onClick={onHandleEdit}
          className="flex border-none text-body w-full px-4"
          variant="secondary"
          size="md"
          type="button"
          leftIcon={<EditOutlinedIcon fontSize="large" />}
        >
          <span className="grow text-left">Ändra kommentar</span>
        </Button>
      </ContextMenu.Item>

      <ContextMenu.Item className="w-full">
        <Button
          onClick={onHandleDelete}
          className="flex border-none text-body w-full px-4"
          variant="primary"
          size="md"
          type="button"
          leftIcon={<DeleteOutlineIcon fontSize="large" />}
        >
          <span className="grow text-left">Ta bort</span>
        </Button>
      </ContextMenu.Item>
    </ContextMenu>
  );
});

export default CommentItemContextmenu;
