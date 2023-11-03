import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@sk-web-gui/button';
import { Divider } from '@sk-web-gui/divider';
import { Link } from '@sk-web-gui/link';
import { LogOut, Settings2, User, Wallet } from 'lucide-react';
import { PopupMenu, PopupMenuProps } from '../src';

export default {
  title: 'Komponenter/Meny/Popupmeny',
  component: PopupMenu,
  tags: ['autodocs'],
};

export const Template = (args: PopupMenuProps) => {
  return (
    <div className="h-[50rem] flex flex-col items-center">
      <div className="relative w-min h-[3.2rem]">
        <PopupMenu {...args}>
          <PopupMenu.Button
            size="sm"
            variant="primary"
            aria-label="More options"
            color="bjornstigen"
            iconButton
            rounded
          >
            <ArrowDownwardIcon />
          </PopupMenu.Button>
          <PopupMenu.Group>
            <PopupMenu.Item>
              <Button leftIcon={<User />} onClick={() => console.log('Profile')}>
                Profil
              </Button>
            </PopupMenu.Item>

            <PopupMenu.Item>
              <Button leftIcon={<Wallet />} onClick={() => console.log('Account')}>
                Konto
              </Button>
            </PopupMenu.Item>
            <PopupMenu.Item>
              <Link onClick={() => console.log('Edit')}>
                <>
                  <Settings2 /> Inställningar
                </>
              </Link>
            </PopupMenu.Item>
          </PopupMenu.Group>
          <PopupMenu.Group>
            <PopupMenu.Item>
              <Button leftIcon={<LogOut />} onClick={() => console.log('Logout')}>
                Logga ut
              </Button>
            </PopupMenu.Item>
          </PopupMenu.Group>
        </PopupMenu>
      </div>

      <div className="mt-32 w-full">
        <h2>Textknapp</h2>
        <div className="w-min relative h-[4rem]">
          <PopupMenu {...args}>
            <PopupMenu.Button variant="tertiary" rightIcon={<ExpandMoreIcon />}>
              Kontextmeny
            </PopupMenu.Button>
            <PopupMenu.Item>
              <Button leftIcon={<User />} onClick={() => console.log('Profile')}>
                Profil
              </Button>
            </PopupMenu.Item>

            <PopupMenu.Item>
              <Button leftIcon={<Wallet />} onClick={() => console.log('Account')}>
                Konto
              </Button>
            </PopupMenu.Item>
            <PopupMenu.Item>
              <Link onClick={() => console.log('Edit')}>
                <Settings2 /> Inställningar
              </Link>
            </PopupMenu.Item>
            <PopupMenu.Item>
              <Button leftIcon={<LogOut />} onClick={() => console.log('Logout')}>
                Logga ut
              </Button>
            </PopupMenu.Item>
          </PopupMenu>
        </div>
      </div>
    </div>
  );
};

Template.storyName = 'PopupMenu';