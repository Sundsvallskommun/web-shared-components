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
import { Chip } from './components/chip';
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
import { TableAutoTable } from './components/table-autotable';
import { Tabs } from './components/tabs';
import { Tooltip } from './components/tooltip';
import { UserMenu } from './components/user-menu';
//AI COMPONENTS
import { AIFeed } from './components/ai/ai-feed';
import { AIModule } from './components/ai/ai-module';
import { AssistantPresentation } from './components/ai/assistant-presentation';
import { Bubble } from './components/ai/bubble';
import { Feedback } from './components/ai/feedback';
import { InputSection } from './components/ai/input-section';
import { MarkdownRendered } from './components/ai/markdown-rendered';
import { TypingBubble } from './components/ai/typing-bubble';
import { TypingSequence } from './components/ai/typing-sequence';

const components: ((colors: string[], theme: PluginAPI['theme']) => CSSRuleObject)[] = [
  Alert,
  Badge,
  Breadcrumb,
  ButtonGroup,
  Button,
  Checkbox,
  Chip,
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
  TableAutoTable,
  Tabs,
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

  //AI COMPONENTS
  AIFeed,
  AIModule,
  AssistantPresentation,
  Bubble,
  Feedback,
  InputSection,
  MarkdownRendered,
  TypingBubble,
  TypingSequence,
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
