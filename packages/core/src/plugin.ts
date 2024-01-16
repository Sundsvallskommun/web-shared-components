import TailwindPlugin from 'tailwindcss/plugin';
import { base } from './base';
import { theme } from './theme';

// components
import { CSSRuleObject, PluginAPI } from 'tailwindcss/types/config';
import { Accordion } from './components/accordion';
import { Alert } from './components/alert';
import { Avatar } from './components/avatar';
import { Badge } from './components/badge';
import { Breadcrumb } from './components/breadcrumb';
import { Button } from './components/button';
import { ButtonGroup } from './components/button-group';
import { Card } from './components/card';
import { Checkbox } from './components/checkbox';
import { ComboBox } from './components/combobox';
import { CookieConsent } from './components/cookie-consent';
import { Dialog } from './components/dialog';
import { Divider } from './components/divider';
import { Dot } from './components/dot';
import { Filter } from './components/filter';
import { Footer } from './components/footer';
import { Forms } from './components/forms';
import { Header } from './components/header';
import { Icon } from './components/icon';
import { Input } from './components/input';
import { Label } from './components/label';
import { Link } from './components/link';
import { List } from './components/list';
import { Logo } from './components/logo';
import { MenuVertical } from './components/menu-vertical';
import { MenuBar } from './components/menubar';
import { Modal } from './components/modal';
import { Pagination } from './components/pagination';
import { PopupMenu } from './components/popup-menu';
import { ProgressBar } from './components/progress-bar';
import { ProgressStepper } from './components/progress-stepper';
import { Radio } from './components/radio';
import { SearchField } from './components/search-field';
import { Select } from './components/select';
import { Snackbar } from './components/snackbar';
import { Spinner } from './components/spinner';
import { Switch } from './components/switch';
import { Table } from './components/table';
import { Tabs } from './components/tabs';
import { Tooltip } from './components/tooltip';
import { UserMenu } from './components/user-menu';
import { ZebraTable } from './components/zebratable';

const components: ((colors: string[], theme: PluginAPI['theme']) => CSSRuleObject)[] = [
  Alert,
  Badge,
  Breadcrumb,
  ButtonGroup,
  Button,
  Checkbox,
  Dialog,
  Dot,
  Forms,
  Filter,
  Icon,
  Input,
  Label,
  Link,
  List,
  Logo,
  MenuBar,
  MenuVertical,
  Select,
  Snackbar,
  Spinner,
  Radio,
  Switch,
  Table,
  Tabs,
  ZebraTable,
  CookieConsent,
  Modal,
  Accordion,
  Avatar,
  Card,
  Divider,
  Tooltip,
  UserMenu,
  SearchField,
  Pagination,
  PopupMenu,
  Footer,
  Header,
  ProgressStepper,
  ProgressBar,
  ComboBox,
];

interface PluginOptions {
  colors: string[];
  cssBase: boolean;
}

const defaultColors = ['warning', 'error', 'success', 'info', 'vattjom', 'juniskar', 'bjornstigen', 'gronsta'];

const plugin = TailwindPlugin.withOptions<PluginOptions>(
  function (options = { colors: [], cssBase: true }) {
    return function ({ addComponents, addBase, theme }: PluginAPI) {
      const optionColors = [...defaultColors, ...(options.colors || [])];

      if (options.cssBase) {
        addBase(base);
      }

      addComponents(components.map((component) => component(optionColors, theme)));
    };
  },
  function () {
    return {
      theme: theme,
    };
  }
);

export default plugin;
