import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import { Button } from '@sk-web-gui/button';
import { Divider } from '@sk-web-gui/divider';
import { ContextMenu } from '../src';

export default {
  title: 'WIP/Komponenter/Kontextmeny/Komponent',
  component: ContextMenu,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Template = () => {
  return (
    <div className="h-60">
      <div>
        <ContextMenu>
          <ContextMenu.Button size="sm" variant="outline" color="primary" iconButton rounded>
            <ArrowDownwardIcon />
          </ContextMenu.Button>
          <ContextMenu.Item>
            <Button variant="link" className="text-body" leftIcon={<EditOutlinedIcon />}>
              Redigera
            </Button>
          </ContextMenu.Item>
          <ContextMenu.Item>
            <Button variant="link" className="text-body" leftIcon={<DeleteOutlineOutlinedIcon />}>
              Ta bort
            </Button>
          </ContextMenu.Item>
          <Divider orientation="horizontal" className="w-full" />
          <ContextMenu.Item>
            <Button variant="link" className="text-body" leftIcon={<UndoIcon />}>
              Ångra
            </Button>
          </ContextMenu.Item>
        </ContextMenu>
      </div>
    </div>
  );
};

Template.storyName = 'Komponent';
