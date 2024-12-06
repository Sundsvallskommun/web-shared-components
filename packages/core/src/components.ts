import { CSSRuleObject, PluginAPI } from 'tailwindcss/types/config';

// components
import { Accordion } from './components/accordion';
import { Avatar } from './components/avatar';
import { Badge } from './components/badge';
import { Breadcrumb } from './components/breadcrumb';
import { Button } from './components/button';
import { ButtonGroup } from './components/button-group';
import { Callout } from './components/callout';
import { Card } from './components/card';
import { Checkbox } from './components/checkbox';
import { Chip } from './components/chip';
import { ComboBox } from './components/combobox';
import { CookieConsent } from './components/cookie-consent';
import { Dialog } from './components/dialog';
import { Divider } from './components/divider';
import { Dot } from './components/dot';
import { FileUpload } from './components/file-upload';
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
//AI COMPONENTS
import { AIFeed } from './components/ai/ai-feed';
import { AICornerModule } from './components/ai/ai-corner-module';
import { AIServiceModule } from './components/ai/ai-service-module';
import { AssistantPresentation } from './components/ai/assistant-presentation';
import { AssistantSwitch } from './components/ai/assistant-switch';
import { Bubble } from './components/ai/bubble';
import { Feedback } from './components/ai/feedback';
import { InputSection } from './components/ai/input-section';
import { MarkdownRendered } from './components/ai/markdown-rendered';
import { NewSessionButton } from './components/ai/new-session-button';
import { TypingBubble } from './components/ai/typing-bubble';
import { TypingSequence } from './components/ai/typing-sequence';

export type Component = (colors: string[], theme: PluginAPI['theme']) => CSSRuleObject;
interface ComponentWithDeps {
  comp: Component;
  deps?: Component[];
}

export const components: ComponentWithDeps[] = [
  { comp: Accordion, deps: [Button, Divider, Icon, Label] },
  { comp: Avatar },
  { comp: Badge },
  { comp: Breadcrumb, deps: [Link] },
  { comp: Button, deps: [Link, Spinner, ButtonGroup] },
  { comp: ButtonGroup },
  { comp: Callout },
  { comp: Card, deps: [Button, Link] },
  { comp: Checkbox },
  { comp: Chip, deps: [Icon] },
  { comp: ComboBox },
  { comp: CookieConsent, deps: [Button, Forms] },
  { comp: Dialog, deps: [Modal] },
  { comp: Divider },
  { comp: Dot },
  { comp: FileUpload, deps: [Icon, Forms, Button, PopupMenu, Modal, Divider, Link] },
  { comp: Filter, deps: [Badge, Forms] },
  { comp: Footer, deps: [Divider, Link, Logo] },
  { comp: Forms, deps: [Icon, Checkbox, ComboBox, Select, Input, Radio, Switch, PopupMenu] },
  { comp: Header, deps: [Divider, Link, Logo] },
  { comp: Input },
  { comp: Label },
  { comp: Link, deps: [Icon] },
  { comp: List, deps: [Link] },
  { comp: Logo, deps: [Divider] },
  { comp: MenuBar, deps: [PopupMenu] },
  { comp: Icon },
  { comp: MenuVertical, deps: [Button, Divider, Icon, Logo] },
  { comp: Modal, deps: [Button, Icon] },
  { comp: Pagination, deps: [Button, Forms, Icon] },
  { comp: PopupMenu, deps: [Button, Link] },
  { comp: ProgressBar },
  { comp: ProgressStepper, deps: [Divider, Icon] },
  { comp: SearchField, deps: [Button, Forms, Icon] },
  { comp: Select },
  { comp: Snackbar, deps: [Button, Icon] },
  { comp: Spinner },
  { comp: Radio },
  { comp: Switch, deps: [Icon] },
  { comp: Table, deps: [Forms, Icon, Pagination] },
  { comp: Tabs, deps: [Button, MenuBar] },
  { comp: Tooltip },
  { comp: UserMenu, deps: [Avatar, Logo, PopupMenu] },

  //AI COMPONENTS

  { comp: AIFeed, deps: [Accordion, Button, Avatar, TypingBubble, Feedback, MarkdownRendered] },
  {
    comp: AICornerModule,
    deps: [AIFeed, AssistantPresentation, InputSection, Avatar, Bubble, Link, Button, Divider, Icon, Tooltip, MenuBar],
  },
  { comp: AIServiceModule, deps: [AIFeed, Bubble, InputSection, Forms, Link, Button, Icon] },
  { comp: AssistantPresentation, deps: [Avatar] },
  { comp: AssistantSwitch, deps: [Avatar, Icon] },
  { comp: Bubble, deps: [Icon] },
  { comp: Feedback, deps: [Button, Icon] },
  { comp: InputSection, deps: [Forms, Button, Icon] },
  { comp: MarkdownRendered, deps: [Link] },
  { comp: NewSessionButton, deps: [Button, Icon] },
  { comp: TypingBubble, deps: [TypingSequence] },
  { comp: TypingSequence },
];
