import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@sk-web-gui/button';
import { Divider } from '@sk-web-gui/divider';
import { Link } from '@sk-web-gui/link';
import { LogOut, Settings2, User, Wallet } from 'lucide-react';
import { PopupMenu } from '../src';

export default {
  title: 'Komponenter/Meny/Popupmeny',
  component: PopupMenu,
  tags: ['autodocs'],
};

export const Template = () => {
  return (
    <div className="h-[50rem]">
      <div>
        <PopupMenu size="sm">
          <PopupMenu.Button size="sm" variant="primary" color="bjornstigen" iconButton rounded>
            <ArrowDownwardIcon />
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
              <>
                <Settings2 /> Inställningar
              </>
            </Link>
          </PopupMenu.Item>
          <Divider orientation="horizontal" className="w-full" />
          <PopupMenu.Item>
            <Button leftIcon={<LogOut />} onClick={() => console.log('Logout')}>
              Logga ut
            </Button>
          </PopupMenu.Item>
        </PopupMenu>
      </div>

      <div className="mt-lg w-max">
        <h2>Textknapp</h2>
        <PopupMenu>
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
              <>
                <Settings2 /> Inställningar
              </>
            </Link>
          </PopupMenu.Item>
          <Divider orientation="horizontal" className="w-full" />
          <PopupMenu.Item>
            <Button leftIcon={<LogOut />} onClick={() => console.log('Logout')}>
              Logga ut
            </Button>
          </PopupMenu.Item>
        </PopupMenu>
      </div>
    </div>
  );
};

Template.storyName = 'PopupMenu';
