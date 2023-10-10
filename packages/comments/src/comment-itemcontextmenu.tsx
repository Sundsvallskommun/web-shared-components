import { Button, ContextMenu, DefaultProps } from '@sk-web-gui/react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { Dispatch, SetStateAction } from 'react';

interface ICommentContextProps extends DefaultProps {
  /* React node */
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  doDelete: (id: string | number) => void;
  setInputValue: (comment: string) => void;
  commentValue: string;
  commentItem: { id: string | number | undefined; comment: string };
  setItemToEdit: Dispatch<SetStateAction<{ id: string | number | undefined; comment: string } | undefined>>;
}

export const CommentItemContextmenu = React.forwardRef<HTMLDivElement, ICommentContextProps>((props, ref) => {
  const { doDelete, setIsEdit, setInputValue, commentValue, commentItem, setItemToEdit } = props;

  const onHandleEdit = () => {
    setIsEdit(true);
    setItemToEdit({
      id: commentItem.id,
      comment: commentItem.comment,
    });
    setInputValue(commentValue);
  };

  const onHandleDelete = () => {
    doDelete(commentItem.id as string | number);
  };
  return (
    <ContextMenu>
      <ContextMenu.Button title="Redigera anställning" variant="ghost" size="lg" className="border-0" iconButton>
        <MoreVertIcon />
      </ContextMenu.Button>

      <ContextMenu.Item className="w-full">
        <Button
          onClick={onHandleEdit}
          className="flex items-center text-body w-full"
          variant="link"
          type="button"
          leftIcon={<EditOutlinedIcon fontSize="large" />}
        >
          <span className="grow text-left">Ändra kommentar</span>
        </Button>
      </ContextMenu.Item>

      <ContextMenu.Item className="w-full">
        <Button
          onClick={onHandleDelete}
          className="flex items-center text-body w-full"
          variant="link"
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
